import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Page from "./pages/Page/Page";

import "./App.scss";

export interface IEntry {
    id: string;
    max: number;
    type: "key" | "coin";
    image: string;
    token: string;
}

interface IApp {
    [key: string]: IEntry;
}

export const appList: IApp = {
    "Hide Ball": {
        id: "4bf4966c-4d22-439b-8ff2-dc5ebca1a600",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/hide_balls/image.jpg",
        token: "4bf4966c-4d22-439b-8ff2-dc5ebca1a600",
    },
    Bouncemasters: {
        id: "bc72d3b9-8e91-4884-9c33-f72482f0db37",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/bouncemasters/image.jpg",
        token: "bc72d3b9-8e91-4884-9c33-f72482f0db37",
    },
    "Merge Away": {
        id: "dc128d28-c45b-411c-98ff-ac7726fbaea4",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/merge_away/image.jpg",
        token: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
    },
    "Stone Age": {
        id: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/stone_age/image.jpg",
        token: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
    },
    "Train Miner": {
        id: "c4480ac7-e178-4973-8061-9ed5b2e17954",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/train_miner/image.jpg",
        token: "82647f43-3f87-402d-88dd-09a90025313f",
    },
    "Mow and Trim": {
        id: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/mow_trim/image.jpg",
        token: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
    },
    "Chain Cube 2048": {
        id: "b4170868-cef0-424f-8eb9-be0622e8e8e3",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/chain_cube/image.jpg",
        token: "d1690a07-3780-4068-810f-9b5bbf2931b2",
    },
    "Fluff Crusade": {
        id: "112887b0-a8af-4eb2-ac63-d82df78283d9",
        max: 8,
        type: "coin",
        image: "https://cdn.hamsterkombat.io/fluff/image.jpg",
        token: "112887b0-a8af-4eb2-ac63-d82df78283d9",
    },
    Polysphere: {
        id: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/polysphere/image.jpg",
        token: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
    },
    "Twerk Race 3D": {
        id: "61308365-9d16-4040-8bb0-2f4a4c69074c",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/twerk/image.jpg",
        token: "61308365-9d16-4040-8bb0-2f4a4c69074c",
    },
    Zoopolis: {
        id: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/zoopolis/image.jpg",
        token: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
    },
    "Tile Trio": {
        id: "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
        max: 4,
        type: "key",
        image: "https://cdn.hamsterkombat.io/tile_trio/image.jpg",
        token: "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
    },
};

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/:name"
                    element={<Page />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;
