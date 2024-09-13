import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { appList } from "../../App";
import { getStorage } from "../../utils/Helper";

import "./Home.scss";

const Home: FC = () => {
    const [keyList] = useState(getStorage());

    return (
        <main className="home">
            <ul className="home__game-container">
                {Object.keys(appList).map((name) => {
                    const app = appList[name];
                    const key = keyList[name];

                    return (
                        <li
                            key={name}
                            className="game"
                        >
                            <Link
                                className="game__info"
                                to={`/${name}`}
                            >
                                <div className="info__image">
                                    <img
                                        alt={name}
                                        src={app.image}
                                    />
                                </div>
                                <span className="info__name">{name}</span>
                                <div className="info__key">
                                    <div className="key">
                                        <img
                                            className="key__icon"
                                            alt={app.type}
                                            src={
                                                app.type === "key"
                                                    ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNi41NSAxNi44NyI+DQogICAgPHBhdGgNCiAgICAgICAgZD0iTTE1LjE1LDIuMTNjLTItMS42MS01LjA1LS44OC02LjU3LjQ1YTQuODEsNC44MSwwLDAsMC0uODYsNS43NWwtNi4xMyw2YTcuMTgsNy4xOCwwLDAsMC0uNDksMi4zNGwuODMuNTdzMS40MS40MiwyLS4wNUEyLjY3LDIuNjcsMCwwLDAsNSwxNS40N2EuNjYuNjYsMCwwLDEsLjE2LS41N0EuNzIuNzIsMCwwLDEsNiwxNC43OWEuNjYuNjYsMCwwLDAsLjY0LS4xNWwuMDYtLjA2YS43MS43MSwwLDAsMCwuMjEtLjdBMS4wNiwxLjA2LDAsMCwxLDcuMSwxM2ExLDEsMCwwLDEsLjc1LS4zMUExLjQzLDEuNDMsMCwwLDAsOSwxMi4yNmwuOS0uODdBNS4zOCw1LjM4LDAsMCwwLDE2LDEwLjE3QzE4LjA1LDgsMTcuNTMsNCwxNS4xNSwyLjEzWk0xMy45NCw2LjgyYTEuNDcsMS40NywwLDAsMS0yLDAsMS40LDEuNCwwLDAsMSwwLTIsMS40NywxLjQ3LDAsMCwxLDIsMEExLjQsMS40LDAsMCwxLDEzLjk0LDYuODJaIg0KICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MyAtMC41NikiDQogICAgICAgIHN0eWxlPSJmaWxsOiM5ZTc0MGIiDQogICAgLz4NCiAgICA8cGF0aA0KICAgICAgICBkPSJNMTUuMTYsMi4xM0E1LjM2LDUuMzYsMCwwLDAsNi40NSw4LjA1TDEuMSwxMy4zN2ExLjE4LDEuMTgsMCwwLDAtLjI4LjQ0LDEuMTMsMS4xMywwLDAsMC0uMDkuNTFMLjc5LDE2Yy4zLjE4LjMxLjcyLjMxLjcybDEuNC4xYTEuMywxLjMsMCwwLDAsMS0uMzdMMy44OSwxNmExLjIzLDEuMjMsMCwwLDAsLjM2LTEuMDUuNjguNjgsMCwwLDEsLjE2LS42MS43MS43MSwwLDAsMSwuNzQtLjEyLjY5LjY5LDAsMCwwLC42Ny0uMTVMNS44OCwxNGEuNzMuNzMsMCwwLDAsLjIyLS43MiwxLjA4LDEuMDgsMCwwLDEsLjI0LS44OSwxLDEsMCwwLDEsLjc1LS4zMSwxLjUyLDEuNTIsMCwwLDAsMS4xNi0uNDZsLjg0LS44NGE1LjM2LDUuMzYsMCwwLDAsNi4wNy04LjY0Wm0tMS45Miw0QTEuNDUsMS40NSwwLDEsMSwxMS4xOSw0LDEuNDUsMS40NSwwLDAsMSwxMy4yNCw2LjFaIg0KICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MyAtMC41NikiDQogICAgICAgIHN0eWxlPSJmaWxsOiNmZmNhMjgiDQogICAgLz4NCiAgICA8cGF0aA0KICAgICAgICBkPSJNLjc5LDE2cy4xNy4xMi4zMS43Mkw3Ljc4LDkuOWMuMjEtLjI0LS43Ni0uMTItMSwuMTdaIg0KICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MyAtMC41NikiDQogICAgICAgIHN0eWxlPSJmaWxsOiNkYmEwMTAiDQogICAgLz4NCiAgICA8cGF0aA0KICAgICAgICBkPSJNOC41LDIuOEEzLjA4LDMuMDgsMCwwLDAsNy4xNiw1LjA1YTMuNTMsMy41MywwLDAsMCwuMjcsMi4zOWMuMzkuNjkuOTMuMzIuNzItLjM1QTMsMywwLDAsMSw4LDZhMy4zMiwzLjMyLDAsMCwxLC4xMi0xLjA5LDUuNzEsNS43MSwwLDAsMSwxLTEuNzNDOS4zMywyLjgzLDksMi41NCw4LjUsMi44Wk00LjY1LDExLjIxYy0uNC4zNCwwLS43Mi4zMi0xLjA4QTE1LjMsMTUuMywwLDAsMSw2LjUsOC41N2MuMjMtLjExLjIyLjUzLjEyLjY1QTI2LjQyLDI2LjQyLDAsMCwxLDQuNjUsMTEuMjFaIg0KICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MyAtMC41NikiDQogICAgICAgIHN0eWxlPSJmaWxsOiNmZmY1OWQiDQogICAgLz4NCjwvc3ZnPg0K"
                                                    : "data:image/webp;base64,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"
                                            }
                                        />
                                        <span className="key__count">
                                            {key || 0}/{app.max}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default Home;
