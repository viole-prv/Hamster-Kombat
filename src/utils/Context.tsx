import React, { createContext, FC, ReactNode, useState } from "react";

import { getJsonStorage, setJsonStorage } from "./Helper";

interface IContext {
    getCount: (name: string) => number;
    setCount: (app: string, length: number) => void;
}

export const Context = createContext<IContext>({
    getCount: () => 0,
    setCount: () => {},
});

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [storage, setStorage] = useState<{ [code: string]: number }>(() =>
        getJsonStorage(),
    );

    const getCount = (app: string): number => storage[app] || 0;

    const setCount = (app: string, length: number) => {
        setStorage((early) => {
            const storage = {
                ...early,
                [app]: getCount(app) + length,
            };

            setJsonStorage(storage);

            return storage;
        });
    };

    return (
        <Context.Provider value={{ getCount, setCount }}>
            {children}
        </Context.Provider>
    );
};
