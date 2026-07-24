/**
 * Finds the maximum profit from selling and buying the stocks.
 * ACCUMULATOR APPROACH.
 *
 * @param prices - Array of stock prices, i.e. [7, 6, 4, 3, 1]
 * @param visit - Visiting callback to calculate the number of iterations.
 * @return - The maximum profit
 */
export const accumulatorBestTimeToBuySellStocks = (prices: number[], visit = () => {
}): number => {
    visit();
    let profit = 0;
    for (let day = 1; day < prices.length; day += 1) {
        visit();
        // Add the increase of the price from yesterday till today (if there was any) to the profit.
        profit += Math.max(prices[day]! - prices[day - 1]!, 0);
    }
    return profit;
};
