export const parseMonthlyDataByYear = (history: Record<string, number>, year: string) => {
  const result: (number | null)[] = Array(12).fill(null);
  Object.entries(history).forEach(([key, value]) => {
    const [y, m] = key.split('-');
    const month = parseInt(m, 10);
    if (y === year && month >= 1 && month <= 12) {
      const index = month - 1;
      result[index] = value;
    }
  });
  return result;
};
