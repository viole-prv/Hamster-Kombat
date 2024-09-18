import React, { FC } from "react";

import "./Button.scss";

type Props = {
    disabled?: boolean;
    children: string;
    onClick?: () => void;
};

const Button: FC<Props> = ({ disabled, children, onClick }) => {
    return (
        <button
            className="button"
            disabled={disabled}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );
};

export default Button;
