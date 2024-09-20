import React, { FC } from "react";

import Spinner from "../Loader/Spinner";

import "./Button.scss";

type Props = {
    loading?: boolean;
    children: string;
    onClick?: () => void;
};

const Button: FC<Props> = ({ loading, children, onClick }) => {
    return (
        <button
            className="button"
            onClick={onClick}
        >
            {loading ? <Spinner /> : <span>{children}</span>}
        </button>
    );
};

export default Button;
