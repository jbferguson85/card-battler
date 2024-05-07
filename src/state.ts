export const globalState: {
    enemyHp: number,
    decrementEnemyHp: (amount: number) => void,
    resetState: () => void;
} = {
    enemyHp: 20,
    decrementEnemyHp(amount: number) {
        this.enemyHp -= amount;
    },
    resetState() {
        this.enemyHp = 20;
    }
}