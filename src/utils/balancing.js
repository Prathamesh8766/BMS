/**
 * Runs one balancing step by transferring a small charge from the highest
 * cell to the lowest cell.
 *
 * @param {number[]} cells Current cell voltages.
 * @returns {number[]} Updated cell voltages.
 */
export function simulateStep(cells) {
  if (!Array.isArray(cells) || cells.length === 0) {
    return cells;
  }

  let maxIndex = 0;
  let minIndex = 0;

  for (let i = 1; i < cells.length; i += 1) {
    if (cells[i] > cells[maxIndex]) {
      maxIndex = i;
    }

    if (cells[i] < cells[minIndex]) {
      minIndex = i;
    }
  }

  const difference = cells[maxIndex] - cells[minIndex];
  if (difference <= 0.05) {
    return cells;
  }

  // Move a small amount from max to min without overshooting the threshold.
  const step = Math.min(0.05, (difference - 0.05) / 2 || 0.05);
  const nextCells = [...cells];

  nextCells[maxIndex] = Number((nextCells[maxIndex] - step).toFixed(3));
  nextCells[minIndex] = Number((nextCells[minIndex] + step).toFixed(3));

  return nextCells;
}