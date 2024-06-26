import { KaboomCtx } from "kaboom"
import { scale } from "./constants"

export interface Card {
    power: number
    color: Color
}

export interface Color {
    name: string
    value: string
}

function getElement(color: string): string {
    switch (color) {
        case "red":
            return "fire";
        case "blue":
            return "water";
        case "green":
            return "wind";
        case "brown":
            return "earth";
        default:
            throw new Error("invalid color");
    }
}

function newCard(): Card {
    const colors: Color[] = [
        {name: "red", value: "#b3101b"},
        {name: "blue", value: "#0c3dad"},
        {name: "green", value: "#4ca82d"},
        {name: "brown", value: "#473429"},
    ];

    const power = Math.floor(Math.random() * 10) + 1;
    const colorIndex = Math.floor(Math.random() * 4);

    return {
        power,
        color: colors[colorIndex] 
    }
}

export function makeCard(k: KaboomCtx) {
    const card = newCard();
    const c = k.make([
        k.rect(46 * scale, 74 * scale),
        k.pos(k.width() * 0.5, k.height() + 160),
        k.offscreen({destroy: true}),
        k.anchor("center"),
        k.color(k.Color.fromHex(card.color.value)),
        {
            power: card.power,
            element: getElement(card.color.name)
        }
    ]);

    const powerLabel = k.make([
        k.text(card.power.toString(), {
            size: 24 * scale
        }),
        k.color(0,0,0),
        k.anchor("center")
    ]);

    c.add(powerLabel)

    return c;
}

export function makeElementalAnimation(k: KaboomCtx, element: string) {
    const effect = k.make([
        k.sprite("assets", { anim: element}),
        k.scale(4 * scale),
        k.anchor("center"),
        k.pos(k.width() * 0.5, k.height() * 0.5)
    ]);
    
    return effect;
}

export function makeDrawButton(k: KaboomCtx) {
    const button = k.make([
        k.rect(60 * scale, 20 * scale),
        k.color(100, 100, 100),
        k.outline(4),
        k.area(),
        k.pos(k.width() * 0.5, k.height() * 0.5),
        k.anchor("center")
    ]);

    const label = k.make([
        k.text("Draw Card"),
        k.anchor("center")
    ]);

    button.add(label)

    return button
}

export function makeStartButton(k: KaboomCtx) {
    const button = k.make([
        k.rect(60 * scale, 20 * scale),
        k.color(100, 100, 100),
        k.outline(4),
        k.area(),
        k.pos(k.width() * 0.5, k.height() * 0.7),
        k.anchor("center")
    ]);

    const label = k.make([
        k.text("Start"),
        k.anchor("center")
    ]);

    button.add(label)

    return button 
}