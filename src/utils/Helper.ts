export const getToday = () => new Date().toISOString().split("T")[0];

export const getStorage = (): { [key: string]: number } => {
    const today = getToday();
    const storage = localStorage.getItem(today);

    return storage ? JSON.parse(storage) : {};
};

export const generateClientId = (): string => {
    const now = Date.now();
    const random = Array.from({ length: 19 }, () =>
        Math.floor(Math.random() * 10),
    ).join("");

    return `${now}-${random}`;
};

export const generateEventId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (character) => {
            const random = Math.floor(Math.random() * 16);
            const value = character === "x" ? random : (random & 0x3) | 0x8;

            return value.toString(16);
        },
    );
};

export const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const copyToClipboard = (data: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(data);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = data;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand("copy");
        } finally {
            document.body.removeChild(textArea);
        }
    }
};
