import {StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import SearchingTracks from './src/search';
import store from './src/reducer/store';
import SearchAndPagination from './src/search/search';
import Parent from './parent';
const App = () => {
  return (
    <Provider store={store}>
      <SearchingTracks />
      {/* <Parent/> */}
      
       {/* <SearchAndPagination/> */}
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});


