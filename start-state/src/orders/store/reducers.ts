import {
    ORDER_AMOUNT_CHANGE,
    ORDER_CCYPAIR_CHANGE,
    ORDER_BOOK,
    ORDER_BOOKING_COMPLETE
} from './actionTypes';
import { Order, CCYPair } from '../model/orderType';
import { Constants } from '../model/constants';

export const Reducers = {
    [ORDER_AMOUNT_CHANGE](state: Order, amount: string): Order {
        console.log(`Amount changed from ${state.amount} to ${amount}`);
        return {
            ...state,
            amount
        };
    },

    [ORDER_CCYPAIR_CHANGE](state: Order, currencyPair: CCYPair): Order {
        console.log(`currencyPair changed from ${state.currencyPair} to ${currencyPair}`);
        return {
            ...state,
            currencyPair
        };
    },

    [ORDER_BOOK](state: Order): Order {
        console.log(`booking`);
        return {
            ...state,
            isBooking: true
        };
    },

    [ORDER_BOOKING_COMPLETE](state: Order, bookingSuccess: boolean): Order {
        console.log(`booking completed`);
        return {
            ...state,
            isBooking: false,
            bookingResults: bookingSuccess ? Constants.BOOKING_SUCCESS : Constants.BOOKING_FAILED
          };
    },
};