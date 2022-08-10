import {StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/reducer/store';
import SearchAndPagination from './src/NewSearch/search';
const App = () => {
  return (
    <Provider store={store}>
      {/* <SearchingTracks /> */}
      {/* <Parent/> */}
      
       <SearchAndPagination/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});


