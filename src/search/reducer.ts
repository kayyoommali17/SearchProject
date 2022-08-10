import * as Actions from './types';
const initialState = {
  SearchApiReducerData: [],
};

const SearchApiReducer = (state = initialState, action: any) => {
  const {type, payload} = action;

  switch (type) {
    case Actions.SET_SEARCH_TRACKS:
      // console.log('@@@@', action.payload);
      return {
        ...state,
        SearchApiReducerData: [...state.SearchApiReducerData, ...payload],
      };
    // return {...state,SearchApiReducerData:payload};
    case Actions.SET_SEARCH_NEW_TRACKS:
      return {...state, SearchApiReducerData: payload};
    default:
      return state;
  }
};
export default SearchApiReducer;
//return {...state,SearchApiReducerData: [...(state.SearchApiReducerData), ...payload],};
