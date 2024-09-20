import React, { FC } from "react";

import "./Spinner.scss";

const Spinner: FC = () => {
    const sizeStyle = 16;
    const borderStyle = `${sizeStyle * 0.125}px`;
    const colorStyle = "#fff";

    return (
        <div className="spinner-wrapper">
            <div
                className="spinner"
                style={{
                    color: colorStyle,
                }}
            >
                {Array.from({ length: 4 }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: sizeStyle,
                            height: sizeStyle,
                            borderWidth: borderStyle,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Spinner;
