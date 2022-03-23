export class RoninResDto {
  from: string;
  to: string;
  value: string;
  log_index: string;
  tx_hash: string;
  block_number: number;
  timestamp: number;
  token_address: string;
  token_decimals: number;
  token_name: string;
  token_symbol: string;
  token_type: string;
}

export class RoninResListsDto {
  count: number;
  data: RoninResDto[];
}
