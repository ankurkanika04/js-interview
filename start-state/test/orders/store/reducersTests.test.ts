import { Reducers } from "../../../src/orders/store/reducers";
import { Order, CCYPair } from "../../../src/orders/model/orderType";
import { Constants } from "../../../src/orders/model/constants";

describe("Reducers for Order store", () => {
  let initialState: Order;

  beforeEach(() => {
    initialState = {
      amount: "1m",
      currencyPair: CCYPair.USD_TO_JPY,
      isBooking: false,
      bookingResults: null,
    };
  });

  it('"onAmountChanged" should update "amount" from state', () => {
    expect(Reducers.ORDER_AMOUNT_CHANGE(initialState, "5m")).toEqual({
      ...initialState,
      amount: "5m",
    });
    expect(Reducers.ORDER_AMOUNT_CHANGE(initialState, "3m")).toEqual({
      ...initialState,
      amount: "3m",
    });
  });

  it('"onCurrencyPairChanged" should update "currencyPair" from state', () => {
    expect(Reducers.ORDER_CCYPAIR_CHANGE(initialState, CCYPair.USD_TO_GBP)).toEqual({
      ...initialState,
      currencyPair: "USDGBP",
    });
  });

  it('"book" should set "isBooking" to true', () => {
    expect(Reducers.ORDER_BOOK(initialState)).toEqual({
      ...initialState,
      isBooking: true,
    });
  });

  it('"bookingComplete" should set "bookingResults" from state', () => {
    expect(Reducers.ORDER_BOOKING_COMPLETE(initialState, true)).toEqual({
      ...initialState,
      isBooking: false,
      bookingResults: Constants.BOOKING_SUCCESS,
    });
    expect(Reducers.ORDER_BOOKING_COMPLETE(initialState, false)).toEqual({
      ...initialState,
      isBooking: false,
      bookingResults: Constants.BOOKING_FAILED,
    });
  });
});