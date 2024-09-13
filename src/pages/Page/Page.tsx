import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { appList, IEntry } from "../../App";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Point from "../../components/Loader/Point";
import Switch from "../../components/Switch/Switch";
import {
    copyToClipboard,
    generateClientId,
    generateEventId,
    getStorage,
    getToday,
    sleep,
} from "../../utils/Helper";

import "./Page.scss";

const Page: FC = () => {
    const { name } = useParams<{ name: string }>();

    if (name === undefined) return null;

    const [value, setValue] = useState(1);
    const [loading, setLoading] = useState(false);

    const [entry, setEntry] = useState<IEntry | null>(null);
    const [array, setArray] = useState<string[]>([]);

    useEffect(() => {
        if (name in appList) {
            setEntry(appList[name]);
        }
    }, [name]);

    useEffect(() => {
        if (array.length) {
            const keyList = getStorage();

            keyList[name] = (keyList[name] || 0) + array.length;

            localStorage.setItem(getToday(), JSON.stringify(keyList));
        }
    }, [array]);

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

            const keyList = await Promise.all(
                Array.from({ length: value }, generateCode),
            );

            setArray(keyList.filter((key): key is string => key !== null));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="page">
            {loading ? (
                <Point />
            ) : (
                <>
                    {array.length === 0 ? (
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
                        array.map((value, index) => (
                            <div
                                className="page__key"
                                key={index}
                            >
                                <Input value={value} />
                                <Button onClick={() => copyToClipboard(value)}>
                                    COPY
                                </Button>
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
