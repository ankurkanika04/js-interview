import { Store } from '../../../src/orders/infrastructure/store';
import { createStore } from '../../../src/orders/store';
import { ORDER_AMOUNT_CHANGE } from '../../../src/orders/store/actionTypes';
import { CCYPair } from "../../../src/orders/model/orderType";

describe('Store test', () => {
  it('"createStore" should return new Store<Order>', () => {
    expect(createStore(jest.fn) instanceof Store);
  });

  it('"createStore" should return current state', () => {
    const store = createStore(jest.fn);
    expect(store.currentState).toEqual({
      amount: '1m',
      currencyPair: CCYPair.USD_TO_GBP,
      isBooking: false,
      bookingResults: null,
    });
  });

  it('"createStore" should trigger "onStateChanged" callback on dispatching action to return new state', () => {
    const onStateChanged = jest.fn();
    const store = createStore(onStateChanged);
    expect(onStateChanged).toHaveBeenCalledTimes(0);

    store.dispatchAction(ORDER_AMOUNT_CHANGE, '3m');
    expect(onStateChanged).toHaveBeenCalledWith({
        amount: '3m',
        currencyPair: CCYPair.USD_TO_GBP,
        isBooking: false,
        bookingResults: null,
      });
  });
});