// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const redux=require('redux')
const createStore=redux.createStore
const intitalstate={
    numberOfCake:10
}
const CAKE_ORDERED='CAKE_ORDERED'

function OrderCake(){
    return{
        type:CAKE_ORDERED,
        quantity:1
    }
}

const reducer =(state=intitalstate,action:any)=>{
    switch (action.type) {
        case CAKE_ORDERED:
            return{
                ...state,
                numberOfCake:state.numberOfCake-1

            }
        default:
            return state
    }

}

const store=createStore(reducer)
console.log('Intial State',store.getState());

const unsubscribe=store.subscribe(()=>console.log('update state',store.getState()))


store.dispatch(OrderCake())
store.dispatch(OrderCake())
store.dispatch(OrderCake())

unsubscribe()


