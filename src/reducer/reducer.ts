import {combineReducers} from 'redux';
import NewSearchReducer from '../NewSearch/reducer';
import SearchApiReducer from '../search/reducer';
const rootReducer = combineReducers({
  SearchApiReducer,
  NewSearchReducer,
});
export default rootReducer;
