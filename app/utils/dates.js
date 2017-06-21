export const oneDayMilliseconds = 24 * 60 * 60 * 1000;

export const setMinTotalDaysToRange = (range, minTotalDays) => {
  let rangeDaysCount = getRangeDaysCount(range);
  let result = range;
  while (rangeDaysCount < minTotalDays) {
    if (rangeDaysCount % 2 === 0) {
      const min = result.min - oneDayMilliseconds;
      result = { ...result, min };
    } else {
      const max = result.max + oneDayMilliseconds;
      result = { ...result, max };
    }
    rangeDaysCount++;
  }
  return result;
};

const getRangeDaysCount = range => {
  return (range.max - range.min) / oneDayMilliseconds;
};

export const addDaysMarinToRange = (range, days) => {
  const margin = days * oneDayMilliseconds;
  const min = range.min - margin;
  const max = range.max + margin;
  return { min, max };
};

export const getDateLimits = dates => {
  const min = Math.min(...dates);
  const max = Math.max(...dates);
  return { min, max };
};
