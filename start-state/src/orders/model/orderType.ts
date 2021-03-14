export enum CCYPair {
    EUR_TO_USD = 'EURUSD',
    USD_TO_JPY = 'USDJPY',
    USD_TO_GBP = 'USDGBP'
};

export type Order = {
  amount: string;
  currencyPair: CCYPair;
  isBooking: boolean;
  bookingResults: string;
};