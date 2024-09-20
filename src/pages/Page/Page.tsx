import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { appList, IEntry } from "../../App";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Point from "../../components/Loader/Point";
import Switch from "../../components/Switch/Switch";
import { Context } from "../../utils/Context";
import {
    copyToClipboard,
    generateClientId,
    generateEventId,
    sleep,
} from "../../utils/Helper";

import "./Page.scss";

interface ICode {
    value: string | null;
    copy?: boolean;
    loading?: boolean;
}

const Page: FC = () => {
    const { app } = useParams<{ app: string }>();

    if (app === undefined) return null;

    const { setCount } = useContext(Context);

    const [value, setValue] = useState(1);
    const [loading, setLoading] = useState(false);

    const [entry, setEntry] = useState<IEntry | null>(null);
    const [code, setCode] = useState<ICode[]>([]);

    useEffect(() => {
        if (app in appList) {
            setEntry(appList[app]);
        }
    }, [app]);

    if (entry === null) return null;

    interface ILoginClientResponse {
        clientToken: string;
    }

    const loginClient = async (
        clientId: string,
        appToken: string,
    ): Promise<string | null> => {
        const response = await fetch(
            "https://api.gamepromo.io/promo/login-client",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clientId,
                    appToken,
                    clientOrigin: "deviceid",
                }),
            },
        );

        if (!response.ok) {
            return null;
        }

        const data: ILoginClientResponse = await response.json();

        return data.clientToken;
    };

    interface IRegisterEventResponse {
        hasCode: boolean;
    }

    const registerEvent = async (
        clientToken: string,
        promoId: string,
    ): Promise<boolean> => {
        const response = await fetch(
            "https://api.gamepromo.io/promo/register-event",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promoId,
                    eventId: generateEventId(),
                    eventOrigin: "undefined",
                }),
            },
        );

        if (!response.ok) {
            return false;
        }

        const data: IRegisterEventResponse = await response.json();

        return data.hasCode;
    };

    interface ICreateCodeResponse {
        promoCode: string;
    }

    const createCode = async (
        clientToken: string,
        promoId: string,
    ): Promise<string | null> => {
        const response = await fetch(
            "https://api.gamepromo.io/promo/create-code",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${clientToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promoId,
                }),
            },
        );

        if (!response.ok) {
            return null;
        }

        const data: ICreateCodeResponse = await response.json();

        return data.promoCode;
    };

    const generateCode = async (): Promise<string | null> => {
        const clientId = generateClientId();

        const clientToken = await loginClient(clientId, entry.token);

        if (!clientToken) {
            return null;
        }

        for (let i = 0; i < 30; i++) {
            const hasCode = await registerEvent(clientToken, entry.id);

            if (hasCode) {
                break;
            }

            await sleep(30 * 1000);
        }

        const code = await createCode(clientToken, entry.id);

        if (!code) {
            return null;
        }

        return code;
    };

    const onGenerate = async () => {
        try {
            setLoading(true);

            const N = await Promise.all(
                Array.from({ length: value }, generateCode),
            );

            const code = N.map((code) => ({ value: code }));

            setCode(code);

            setCount(app, code.length);
        } finally {
            setLoading(false);
        }
    };

    const updateCode = (index: number, data: Partial<ICode>) => {
        setCode((early) =>
            early.map((code, i) => (i === index ? { ...code, ...data } : code)),
        );
    };

    const onCopy = (value: string, index: number) => {
        copyToClipboard(value);

        updateCode(index, {
            copy: true,
        });
    };

    const onRetry = async (index: number) => {
        try {
            updateCode(index, {
                loading: true,
            });

            updateCode(index, { value: await generateCode() });
        } finally {
            updateCode(index, {
                loading: false,
            });
        }
    };

    return (
        <main className="page">
            {loading ? (
                <Point />
            ) : (
                <>
                    {code.length === 0 ? (
                        <>
                            <Switch
                                min={1}
                                value={value}
                                max={entry.max}
                                onChange={(value) => setValue(value)}
                            />
                            <Button onClick={onGenerate}>GENERATE</Button>
                        </>
                    ) : (
                        code.map(({ value, copy, loading }, index) => (
                            <div
                                key={index}
                                className="page__code"
                                style={{
                                    opacity: copy ? 0.5 : 1,
                                }}
                            >
                                <Input value={value || ""} />
                                {value ? (
                                    <Button
                                        onClick={() => {
                                            if (value == null) return;

                                            onCopy(value, index);
                                        }}
                                    >
                                        COPY
                                    </Button>
                                ) : (
                                    <Button
                                        loading={loading}
                                        onClick={() => {
                                            if (loading) return;

                                            onRetry(index);
                                        }}
                                    >
                                        RETRY
                                    </Button>
                                )}
                            </div>
                        ))
                    )}
                    <Link to="/">
                        <Button>BACK</Button>
                    </Link>
                </>
            )}
        </main>
    );
};

export default Page;
