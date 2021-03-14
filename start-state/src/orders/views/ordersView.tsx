import * as React from 'react';
import {
    ORDER_AMOUNT_CHANGE,
    ORDER_CCYPAIR_CHANGE,
    ORDER_BOOK
} from '../store/actionTypes';
import {Store} from '../infrastructure/store';
import { createStore } from '../store';
import { Order, CCYPair } from '../model/orderType';
import { Constants } from '../model/constants';

type DefaultProps = {};

export default class OrdersView extends React.Component<DefaultProps, Order> {
    private store: Store<Order>;

    constructor(props: DefaultProps) {
        super(props);

        this.store = createStore((nextState) => this.setState(nextState));

        // set initial state
        this.state = this.store.currentState;
    }

    onAmountChanged = (amount: string) => {
        this.store.dispatchAction(ORDER_AMOUNT_CHANGE, amount);
    };

    onCurrencyPairChanged = (ccyPair: CCYPair) => {
        this.store.dispatchAction(ORDER_CCYPAIR_CHANGE, ccyPair);
    };

    onBookRequested = () => {
        this.store.dispatchAction(ORDER_BOOK);
    };

    render() {
        return (
            <div>
                <h1>OrdersList</h1>
                Amount: <input type="text" value={this.state.amount}
                               onChange={(e) => this.onAmountChanged(e.target.value)}/>
                <br/>
                Currency:
                <select value={this.state.currencyPair} onChange={(e) => this.onCurrencyPairChanged(e.target.value as CCYPair)}>
                    {Object.values(CCYPair).map((pair) => (
                        <option key={pair} value={pair}>{pair}</option>
                    ))}
                </select>
                <br/>
                Order summary: <br/>
                Amount({this.state.amount})
                <br/>
                <button onClick={(e) => this.onBookRequested()}>
                    book
                </button>
                <h2>{(this.state.isBooking) ? Constants.BOOKING_IN_PROGRESS : this.state.bookingResults}</h2>
            </div>
        );
    }
}
