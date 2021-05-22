/**
 * 
 * @param {Transaction[]} items 
 */
export function compress(items) {
  const uniqueData = items.reduce((prev, value, index) => {
    const key = JSON.stringify([value.tradingParty, value.counterParty]);
    if (!prev[key]) {
      prev[key] = 0;
    }
    prev[key] += value.amount;
    return prev;
  }, {});

  const result = [];
  for (const key in uniqueData) {
    const amount = uniqueData[key];
    const [tradingParty, counterParty] = JSON.parse(key);
    result.push({tradingParty, counterParty, amount});
  }
  return result;
}