/**
 * Finds the maximum profit from selling and buying the stocks.
 * DIVIDE & CONQUER APPROACH.
 *
 * @param prices - Array of stock prices, i.e. [7, 6, 4, 3, 1]
 * @param visit - Visiting callback to calculate the number of iterations.
 * @return - The maximum profit
 */
export const dqBestTimeToBuySellStocks = (prices: number[], visit = () => {
}): number => {
    /**
     * Recursive implementation of the main function. It is hidden from the users.
     *
     * @param buy - Whether we're allowing to sell or to buy now
     * @param day - Current day of trading (current index of prices array)
     * @returns - Max profit from buying/selling
     */
    const recursiveBuyerSeller = (buy: boolean, day: number): number => {
        // Registering the recursive call visit to calculate the complexity.
        visit();

        // Quitting the recursion if this is the last day of trading (prices array ended).
        if (day === prices.length) return 0;

        // If we're buying - we're loosing money (-1), if we're selling we're getting money (+1).
        const operationSign = buy ? -1 : +1;
        return Math.max(
            // Option 1: Don't do anything.
            recursiveBuyerSeller(buy, day + 1),
            // Option 2: Sell or Buy at the current price.
            operationSign * prices[day]! + recursiveBuyerSeller(!buy, day + 1),
        );
    };

    const buy = true;
    const day = 0;

    return recursiveBuyerSeller(buy, day);
};
