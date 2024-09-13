import React, { FC } from "react";

import "./Input.scss";

type Props = {
    value: string | number;
};

const Input: FC<Props> = ({ value }) => {
    return (
        <div className="input">
            <input
                type="text"
                value={value}
                readOnly={true}
            />
        </div>
    );
};

export default Input;
