import axios from 'axios';
export const getTrackPlayersAction = (text: string, page: number) => {
  // console.log('---  Query Text ---->>>>',text);
  return (dispatch: any, getState: any) => {
    const {
      NewSearchReducer: {SearchDataReducer},
    } = getState();
     axios .get(`https://api.napster.com/v2.2/search/verbose?offset=${page}&apikey=ZWI4MGU4MzYtYTZhOS00NGYyLTk3YzUtMTUwNzFhMGI5ZDY1&query=${text}&per_type_limit=20`)
      .then(resp => {
        console.log('resp is here ========>', resp);
        if (page > 1 && SearchDataReducer.length > 0) {
          dispatch({
            type: 'SEARCH_NEW_TRACK',
            payload: [...SearchDataReducer, ...resp.data?.search?.data?.tracks],
          });
        } else {
          dispatch({type: 'SEARCH_NEW_TRACK', payload: resp.data?.search?.data?.tracks});
        }
      })
      .catch(error => {
        console.log('searchERRRORRR', error);
      });
  };
};