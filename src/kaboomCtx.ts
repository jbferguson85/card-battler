import kaboom, { KaboomOpt } from "kaboom";
import { scale } from "./constants";

const kConfig: KaboomOpt = {
    width: 256 * scale,
    height: 144 * scale,
    scale,
    letterbox: true,
    global: false,
    background: [50, 50, 50]
};

export const k = kaboom(kConfig);