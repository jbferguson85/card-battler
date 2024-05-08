export interface GlobalState {
    playerHp: number,
    enemyHp: number,
    decrementPlayerHp: (amount: number) => void,
    decrementEnemyHp: (amount: number) => void,
    resetState: () => void;
}

export const globalState: GlobalState = {
    playerHp: 50,
    enemyHp: 20,
    decrementPlayerHp(amount: number) {
        this.playerHp -= amount;
    },
    decrementEnemyHp(amount: number) {
        this.enemyHp -= amount;
    },
    resetState() {
        this.playerHp = 50;
        this.enemyHp = 20;
    }
}