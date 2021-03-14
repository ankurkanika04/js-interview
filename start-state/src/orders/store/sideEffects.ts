
import {OrdersService} from "../services/ordersService";
import {
    ORDER_BOOK,
    ORDER_BOOKING_COMPLETE
} from './actionTypes';
import { Order } from '../model/orderType';

const ordersService = new OrdersService();

export const SideEffects = {
    [ORDER_BOOK](state: Order, onDone: (doneAction: string, isSuccess: boolean) => void) {
      const {currencyPair, amount} = state;
      ordersService.book(currencyPair, amount, (isSuccess: boolean) =>
        onDone(ORDER_BOOKING_COMPLETE, isSuccess),
      );
    },
  };