const { compress } = require("./compress")

describe('Compress', () => {
  it('should compress work', () => {
    const transactions = [
      { tradingParty: "me", counterParty: "you", amount: -400 },
      { tradingParty: "me", counterParty: "you", amount: 500 },
      { tradingParty: "me", counterParty: "someone_else", amount: 100 },
    ]
    const result = compress(transactions);
    expect(result).toEqual([
      { tradingParty: "me", counterParty: "you", amount: 100 },
      { tradingParty: "me", counterParty: "someone_else", amount: 100 },
    ]);
  })
})