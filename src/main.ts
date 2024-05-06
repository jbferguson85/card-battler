import { Card, makeDrawButton } from "./entities";
import { k } from "./kaboomCtx"
import { globalState } from "./state";

async function setupGame() {
    // const cards: Card[] = [
    //     {power: 1, color: { name: "red", value: "#880000"}}
    // ]
    
    k.scene("draw", () => {
        const drawButton = makeDrawButton(k)
        drawButton.onClick(() => {
            globalState.decrementHp(5)
        })
        k.add(drawButton) 
        const scoreLabel = k.add([
            k.text(`Enemy HP: ${globalState.enemyHp}`),
            k.pos(24)
        ]);
        k.onUpdate(() => {
            scoreLabel.text = `Enemy HP: ${globalState.enemyHp}` 
        })
    });

    k.go("draw")
}

setupGame();