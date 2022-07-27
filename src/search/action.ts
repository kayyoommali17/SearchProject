import axios from 'axios';
import {SET_SEARCH_TRACKS} from './types';

export default function getTrackPlayers(
  text?: any,
  page?: any,
  callback?: Function,
  ErrorCallback?: Function,
) {
  return (dispatch: any, getState: any) => {
    // console.log('hfjhfj', text);
    const {
      SearchApiReducer: {SearchApiReducerData},
    } = getState();
    axios
      .get(
        `https://api.napster.com/v2.2/search/verbose?offset=${page}&apikey=ZWI4MGU4MzYtYTZhOS00NGYyLTk3YzUtMTUwNzFhMGI5ZDY1&query=${text}&per_type_limit=20`,
      )
      .then(resp => {
        console.log('Succes resp', resp);
        // console.log('Succes resp', page,SearchApiReducerData);
        if (page.length > 0) {
          dispatch({
            type: SET_SEARCH_TRACKS,
            payload: [
              ...SearchApiReducerData,
              ...resp.data?.search?.data?.tracks,
            ],
          });
        } else {
          dispatch({
            type: SET_SEARCH_TRACKS,
            payload: resp.data?.search?.data?.tracks,
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        // ErrorCallback(err)
      });
  };
}

// [...zipCodeData, ...resp.data.data.result]
