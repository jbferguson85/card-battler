export const globalState: {
    enemyHp: number,
    decrementHp: (amount: number) => void,
    resetState: () => void;
} = {
    enemyHp: 20,
    decrementHp(amount: number) {
        this.enemyHp -= amount;
    },
    resetState() {
        this.enemyHp = 20;
    }
}