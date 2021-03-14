import { Order, CCYPair } from "../../../src/orders/model/orderType";
import {
  ORDER_BOOKING_COMPLETE
} from '../../../src/orders/store/actionTypes';
const mockBookOrderFn = jest.fn((currencyPair: string,amount: string,onResultsReceivedCallback: (success: boolean) => void) => {
    const bookingSuccess = amount === "1m";
    onResultsReceivedCallback(bookingSuccess);
  }
);
import { SideEffects } from "../../../src/orders/store/sideEffects";
import { OrdersService } from "../../../src/orders/services/ordersService";

jest.mock("../../../src/orders/services/ordersService", () => ({
  OrdersService: jest.fn().mockImplementation(() => {
    return { book: mockBookOrderFn };
  }),
}));

beforeEach(() => {
  (OrdersService as jest.Mock).mockClear();//Clean up mock usage data between two assertions
  mockBookOrderFn.mockClear();
});

describe("Side effects for Orders Store", () => {
  let initialState: Order;

  beforeEach(() => {
    initialState = {
      amount: "1m",
      currencyPair: CCYPair.USD_TO_GBP,
      isBooking: false,
      bookingResults: null,
    };
  });

  it('"book" should dispatch action "bookingComplete" on book function Call', (done) => {
    SideEffects.ORDER_BOOK(initialState, (action, isSuccess) => {
      expect(mockBookOrderFn).toHaveBeenCalledTimes(1);
      expect(action).toBe(ORDER_BOOKING_COMPLETE);
      expect(isSuccess).toBe(true);
      done();
    });
  });

  it('"book" should dispatch "isSuccess" false if amount is not 1m', (done) => {
    const newState = { ...initialState, amount: "2m" };
    SideEffects.ORDER_BOOK(newState, (action, isSuccess) => {
      expect(mockBookOrderFn).toHaveBeenCalledTimes(1);
      expect(action).toBe(ORDER_BOOKING_COMPLETE);
      expect(isSuccess).toBe(false);
      done();
    });
  });
});