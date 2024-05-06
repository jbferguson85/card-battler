import { Card, makeCard, makeDrawButton } from "./entities";
import { k } from "./kaboomCtx"
import { globalState } from "./state";

async function setupGame() {
    // const cards: Card[] = [
    //     {power: 1, color: { name: "red", value: "#880000"}}
    // ]
    
    k.scene("draw", () => {
        const drawButton = makeDrawButton(k)
        drawButton.onClick(() => {
            k.go("card");
        })
        k.add(drawButton) 
        const scoreLabel = k.add([
            k.text(`Enemy HP: ${globalState.enemyHp}`),
            k.pos(24)
        ]);
        k.onUpdate(() => {
            scoreLabel.text = `Enemy HP: ${globalState.enemyHp}` 
        });
    });

    k.scene("card", async () => {
        const card = makeCard(k)
        k.add(card);
        k.tween(card.pos, k.vec2(k.width() * 0.5, k.height() * 0.5), 0.5, (p) => card.pos = p, k.easings.linear)
        console.log(card.power);
        console.log(card.element);
        globalState.decrementHp(card.power);
        card.onKeyPress('space', () => {
            k.go("draw")
        })
    })

    k.go("draw");
}

setupGame();