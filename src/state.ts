export const globalState: {
    enemyHp: number,
    decrementHp: (amount: number) => void
} = {
    enemyHp: 20,
    decrementHp(amount: number) {
        this.enemyHp -= amount;
    }
}