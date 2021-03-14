import { Store } from '../infrastructure/store';
import { Reducers } from './reducers';
import { SideEffects } from './sideEffects';
import { Order, CCYPair } from '../model/orderType';


export const createStore = (onStateChanged: (state: Order) => void) => {
    const initialState: Order = {
        amount: '1m',
        currencyPair: CCYPair.USD_TO_GBP,
        isBooking: false,
        bookingResults: null,
      };

    const store = new Store<Order>(
        initialState,
        Reducers,
        SideEffects,
        onStateChanged,
    );

    return store;
}