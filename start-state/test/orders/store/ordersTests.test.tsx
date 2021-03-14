import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Order, CCYPair } from '../../../src/orders/model/orderType';
import OrdersView from "../../../src/orders/views/ordersView";
import { Constants } from "../../../src/orders/model/constants";


describe('<OrderView />', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });
    afterEach(() => {
      document.body.removeChild(container);
      container = null;
    });

    // it('should render correctly', () => {
    //     expect(() => ReactDOM.render(<OrdersView />, container)).not.toThrowError();
    // });

    it('OrderView should render with initial state', () => {
        act(() => {
            ReactDOM.render(<OrdersView />, container);
        });
        const currencyPair: HTMLSelectElement = container.querySelector('select');
	    const amount: HTMLInputElement = container.querySelector('input[type="text"]');
        expect(amount.value).toBe('1m');
        expect(currencyPair.value).toBe(CCYPair.USD_TO_GBP);
    });

    it('Orderview should render booking status on button click', () => {
        act(() => {
            ReactDOM.render(<OrdersView />, container);
        });
        const button: HTMLButtonElement = container.querySelector('button');
        act(() => {
          button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        const h2: HTMLHeadingElement = container.querySelector('h2');
        expect(h2.textContent).toBe(Constants.BOOKING_IN_PROGRESS);
    });

    // it('Orderview should render booking status on button click after 2 seconds for amount 1m', () => {
    //     act(() => {
    //         ReactDOM.render(<OrdersView />, container);
    //     });
    //     const button: HTMLButtonElement = container.querySelector('button');
    //     act(() => {
    //       button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    //     });
    //     const h2: HTMLHeadingElement = container.querySelector('h2');
    //     jest.useFakeTimers();
    //     setTimeout(() => {
    //       expect(h2.textContent).toEqual(Constants.BOOKING_SUCCESS);
    //     }, 3000);
    //     jest.runAllTimers();
    // });

    // it('Orderview should render failed booking status on button click after 2 seconds for amount 2m', () => {
    //     act(() => {
    //         ReactDOM.render(<OrdersView />, container);
    //     });
    //     const amount: HTMLInputElement = container.querySelector('input[type="text"]');
    //     const button: HTMLButtonElement = container.querySelector('button');
    //     //Set input element value to 2m
    //     act(() => {
    //       button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    //     });
    //     const h2: HTMLHeadingElement = container.querySelector('h2');
    //     jest.useFakeTimers();
    //     setTimeout(() => {
    //       expect(h2.textContent).toEqual(Constants.BOOKING_FAILED);
    //     }, 3000);
    //     jest.runAllTimers();
    // });

});