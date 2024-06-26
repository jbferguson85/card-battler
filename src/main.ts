import { makeCard, makeDrawButton, makeElementalAnimation, makeStartButton } from "./entities";
import { k } from "./kaboomCtx"
import { globalState } from "./state";

async function setupGame() {
    k.loadSprite("assets", "./elements.png", {
        sliceX: 6,
        sliceY: 4,
        anims: {
            fire: { from: 0, to: 2, speed: 5, loop: true },
            earth: { from: 18, to: 23, speed: 5, loop: false },
            notUsed: { from: 12, to: 14, speed: 5, loop: false },
            wind: { from: 15, to: 16, speed: 15, loop: true },
            water: { from: 6, to: 11, speed: 5, loop: false }
        }
    });
    k.loadSprite("bad-guy", "./bad-guy.png", {
        anims: {
            badGuy: 0
        }
    });

    k.scene("start", () => {
        const title = k.add([
            k.text("Card Battler", {
                size: 48
            }),
            k.pos(k.width() * 0.5, k.height() * 0.2),
            k.anchor("center")
        ]);

        const startButton = makeStartButton(k);

        startButton.onClick(() => {
            title.destroy();
            k.go("encounter");
        });

        k.add(startButton);
    });

    k.scene("encounter",  async () => {
        const badGuy = k.make([
            k.sprite("bad-guy", { anim: "badGuy" }),
            k.pos(k.width() * 0.5, k.height() * 0.5),
            k.anchor("center"),
            k.scale(0.0001)
        ]);

        k.add(badGuy);

        await k.tween(badGuy.scale, k.vec2(16), 0.5, (p) => badGuy.scale = p, k.easings.linear);

        badGuy.destroy();

        const encounterText = k.make([
            k.text("You found a bad guy!"),
            k.pos(k.width() * 0.5, k.height() * 0.5), 
            k.anchor("center")
        ]);

        k.add(encounterText);

        k.wait(2, () => {
            k.go("draw");
        })
    })

    k.scene("draw", () => {
        const drawButton = makeDrawButton(k)
        drawButton.onClick(() => {
            k.go("card");
        })
        k.add(drawButton)
        const playerHpLabel = k.add([
            k.text(`Player HP: ${globalState.playerHp}`),
            k.pos(740, 24)
        ]);

        const scoreLabel = k.add([
            k.text(`Enemy HP: ${globalState.enemyHp}`),
            k.pos(24)
        ]);
        k.onUpdate(() => {
            scoreLabel.text = `Enemy HP: ${globalState.enemyHp}`,
            playerHpLabel.text = `Player HP: ${globalState.playerHp}`
        });
    });

    k.scene("card", async () => {
        const card = makeCard(k)
        k.add(card);
        k.tween(card.pos, k.vec2(k.width() * 0.5, k.height() * 0.5), 0.5, (p) => card.pos = p, k.easings.linear)
        console.log(card.power);
        console.log(card.element);
        globalState.decrementEnemyHp(card.power);
        const elementalEffect = makeElementalAnimation(k, card.element);
        await k.wait(2, () => { card.destroy() });
        k.add(elementalEffect);
        await k.wait(2, () => {
            if (globalState.enemyHp <= 0) {
                k.go("end")
            } else {
                k.go("draw")
            }
        })
    });

    k.scene("end", () => {

        const endText = k.make([
            k.text("Congratulations! You've defeated the enemy!", {
                size: 24,
            }),
            k.pos(k.width() * 0.5, k.height() * 0.5),
            k.anchor("center")
        ]);
        k.add(endText);
        const startButton = makeStartButton(k);

        startButton.onClick(() => {
            globalState.resetState();
            k.go("draw");
        });
        k.add(startButton);

    });

    k.go("start");
}

setupGame();