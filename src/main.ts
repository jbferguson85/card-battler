import { Card, makeButton } from "./entities";
import { k } from "./kaboomCtx"

async function setupGame() {
    // const cards: Card[] = [
    //     {power: 1, color: { name: "red", value: "#880000"}}
    // ]
    k.scene("draw", () => {
       k.add(makeButton(k)) 
    });

    k.go("draw")
}

setupGame();