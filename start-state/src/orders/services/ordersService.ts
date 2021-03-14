export class OrdersService {
    book(currencyPair: string, amount: string, onResultsReceivedCallback: (success: boolean) => void) {
        setTimeout(() => {
                const bookingSuccess = amount === "1m";
                onResultsReceivedCallback(bookingSuccess);
            },
            2000
        )
    }
}