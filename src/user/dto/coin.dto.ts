export class UserCoinData {
  id: number;

  coin_id: string;

  user_id: number;

  coin?: CoinGecko;

  createDate: Date;

  updateDate: Date;
}

export class CoinGecko {
  id: string;

  name: string;

  symbol: string;

  details?: CoinDetails;
}

export class CoinDetails {
  id: string;

  symbol: string;

  name: string;

  image: string;

  current_price: number;

  market_cap: number;

  market_cap_rank: number;

  fully_diluted_valuation: number;

  total_volume: number;

  high_24h: number;

  low_24h: number;

  price_change_24h: number;

  price_change_percentage_24h: number;

  market_cap_change_24h: number;

  market_cap_change_percentage_24h: number;

  circulating_supply: number;

  total_supply: number;

  max_supply: number;

  ath: number;

  ath_change_percentage: number;

  ath_date: string;

  atl: number;

  atl_change_percentage: number;

  atl_date: string;

  roi: string;

  last_updated: string;
}
