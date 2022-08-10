const intialState = {
   SearchDataReducer:[]
  };
  
  const NewSearchReducer = (state = intialState, action: any) => {
    const {type, payload} = action;
    switch (type) {
      case 'SEARCH_NEW_TRACK':
        return {...state, SearchDataReducer: payload};
      default:
        return state;
    }
  };
  export default NewSearchReducer;