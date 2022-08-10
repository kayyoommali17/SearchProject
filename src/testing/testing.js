"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var redux = require('redux');
var createStore = redux.createStore;
var intitalstate = {
    numberOfCake: 10
};
var CAKE_ORDERED = 'CAKE_ORDERED';
function OrderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    };
}
var reducer = function (state, action) {
    if (state === void 0) { state = intitalstate; }
    switch (action.type) {
        case CAKE_ORDERED:
            return __assign(__assign({}, state), { numberOfCake: state.numberOfCake - 1 });
        default:
            return state;
    }
};
var store = createStore(reducer);
console.log('Intial State', store.getState());
var unsubscribe = store.subscribe(function () { return console.log('update state', store.getState()); });
store.dispatch(OrderCake());
store.dispatch(OrderCake());
store.dispatch(OrderCake());
unsubscribe();
