/**
 * Finds the maximum profit from selling and buying the stocks.
 * DYNAMIC PROGRAMMING APPROACH.
 *
 * @param prices - Array of stock prices, i.e. [7, 6, 4, 3, 1]
 * @param visit - Visiting callback to calculate the number of iterations.
 * @return - The maximum profit
 */
export const dpBestTimeToBuySellStocks = (prices: number[], visit = () => {
}): number => {
    visit();
    let lastBuy = -prices[0]!;
    let lastSold = 0;

    for (let day = 1; day < prices.length; day += 1) {
        visit();
        const curBuy = Math.max(lastBuy, lastSold - prices[day]!);
        const curSold = Math.max(lastSold, lastBuy + prices[day]!);
        lastBuy = curBuy;
        lastSold = curSold;
    }

    return lastSold;
};
