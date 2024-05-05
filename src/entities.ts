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

export function makeCard(k: KaboomCtx, card: Card) {
    const c = k.add([
        k.rect(48, 78),
        k.color(k.Color.fromHex(card.color.value)),
        {
            power: card.power,
            element: getElement(card.color.name)
        }
    ]
    )
    return c;
}

export function makeButton(k: KaboomCtx) {
    const button = k.make([
        k.rect(60 * scale, 20 * scale),
        k.color(100, 100, 100),
        k.outline(4),
        k.area(),
        k.pos(k.width() * 0.3, k.height() * 0.5),
        k.anchor("center")
    ]);

    const label = k.make([
        k.text("Draw Card"),
        k.anchor("center")
    ]);

    button.add(label)

    button.onClick(() => {
        console.log("hello")
    })

    return button
}