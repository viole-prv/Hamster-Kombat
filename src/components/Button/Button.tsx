import React, { FC } from "react";

import "./Button.scss";

type Props = {
    children: string;
    onClick?: () => void;
};

const Button: FC<Props> = ({ children, onClick }) => {
    return (
        <button
            className="button"
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );
};

export default Button;
