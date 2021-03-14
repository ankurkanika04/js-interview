export type Reducer<TState> = (currentState: TState, ...args: any) => TState;
export type SideEffect<TState> = (currentState: TState, ...args: any) => void;

export class Store<TState> {
    constructor(
        private state: TState,
        private readonly reducers: { [name: string]: Reducer<TState> },
        private readonly sideEffects: { [name: string]: SideEffect<TState> },
        private readonly onStateChanged: (state: TState) => void
    ) {
    }

    get currentState(): TState {
        return this.state;
    }

    dispatchAction(name: string, ...rest: any) {
        const reducer = this.reducers[name];
        if (reducer) {
            const nextState = reducer(this.state, ...rest);
            const sideEffect = this.sideEffects[name];
            if (sideEffect) {
                const onSideEffectDone = (doneAction: string, ...args: any) => {
                    this.dispatchAction(doneAction, ...args);
                };
                sideEffect(nextState, onSideEffectDone);
            }
            this.state = nextState;
            this.onStateChanged(this.state);
        }
    }
}