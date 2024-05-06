import { Card, makeCard, makeDrawButton, makeEarth } from "./entities";
import { k } from "./kaboomCtx"
import { globalState } from "./state";

async function setupGame() {
    // const cards: Card[] = [
    //     {power: 1, color: { name: "red", value: "#880000"}}
    // ]
    k.loadSprite("assets", "./elements.png", {
        sliceX: 5,
        sliceY: 4,
        anims: {
            fire: {from: 0, to: 2, speed: 5, loop: true},
            earth: {from: 15, to: 19, speed: 5, loop: false },
            wind: {from: 10, to: 12, speed: 5, loop: false},
            tornado: { from: 12, to: 13, speed: 15, loop: true},
            water: {from: 5, to: 9, speed: 5, loop: false}
        }
    });
    
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
        await k.wait(2, () => {card.destroy()});
        const earth = makeEarth(k);
        k.add(earth);
        await k.wait(2, () => {k.go("draw")})
    });

    k.go("draw");
}

setupGame();