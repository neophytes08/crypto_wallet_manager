const isJwtExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000 ? false : true;
};

const getCoinBalance = (arry: any, coin_symbol: string) => {
  const coin = arry.find(
    ({ contract_ticker_symbol }) => contract_ticker_symbol === coin_symbol,
  );
  return coin && Number(coin.balance) > 0 && coin.contract_decimals > 0
    ? getFormattedBalance(coin)
    : coin
    ? Number(coin.balance)
    : 0;
};

const getFormattedBalance = (coin: any) => {
  return Number(coin.balance) * generateZeroDecimals(coin.contract_decimals);
};

const generateZeroDecimals = (num: number) => {
  let zeros = '1';
  for (let index = 0; index < num; index++) {
    zeros += '0';
  }

  return 1 / Number(zeros);
};

export {
  isJwtExpired,
  getCoinBalance,
  getFormattedBalance,
  generateZeroDecimals,
};
