import { msg } from "@lit/localize";

export function nodeTitle(label: string): string {
    switch (label) {
        case "Key":
            return msg("Key", { desc: "Name of the node holding the text that gets hashed" });
        case "Salt":
            return msg("Salt", { desc: "Name of the node appending a salt to the key" });
        case "HashFunction":
            return msg("Hash Function", { desc: "Name of the node selecting the hash algorithm" });
        case "HashValue":
            return msg("Hash Value", { desc: "Name of the node showing the hashing result" });
        default:
            return label;
    }
}

export function displayNodeTitle(label: string, customTitle?: string): string {
    return !customTitle || customTitle === label ? nodeTitle(label) : customTitle;
}
