import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import getTrackPlayers from './action';
import {IMAGES} from '../utilis/localeimages';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {normalize, vh, vw} from '../utilis/dimensions';
const SearchingTracks = () => {
  const dispatch = useDispatch<any>();
  const [text, settext] = useState<any>('ed');
  const [currentPage, setCurrentPage] = useState(0);
  const [isloading, setisloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {SearchApiReducerData} = useSelector(
    (store: any) => store.SearchApiReducer,
  );
//   const [updateData, setUpdateData] = useState<any>(SearchApiReducerData);
  console.log('>>>>>>>', SearchApiReducerData);

  useEffect(() => {
    dispatch(getTrackPlayers(text, currentPage));
  }, [text, currentPage]);

  const onChageSearchText = (text: any) => {
    setCurrentPage(0);
    settext(text);
    
  };
  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.renderItemViewStyle}>
        <Text style={styles.AlbumnameStyle}>{item?.albumName}</Text>
        <Text style={styles.ArtistnameStyle}>{item?.artistName}</Text>
      </View>
    );
  };

  const _nodataAvliable = () => {
    return (
      <View style={styles.noDataAvliableViewStyle}>
        <Image style={styles.notSearchImageStyle} source={IMAGES.NotClose} />
        <Text style={styles.NotSearchTextStyle}>
          {'Please search to get Data '}
        </Text>
      </View>
    );
  };
  const debounce = (fun: any) => {
    let timeOut: number;
    return (...args: any) => {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fun.apply(timeOut, args);
      }, 1000);
    };
  };

  // closure
  const optimizedFn = React.useCallback(debounce(onChageSearchText), []);

  const loadMoreItem = () => {
    //   Alert.alert('page end')
    setisloading(true);
    dispatch(getTrackPlayers(text, currentPage + 1));
    setCurrentPage(currentPage + 1);
  };

  const _renderLoder = () => {
    return (
      <View>
        {isloading && <ActivityIndicator size={'large'} color={'#eedd82'} />}
      </View>
    );
  };

  const wait = (timeout: any) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  };

  // pull to refresh
  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    wait(2000).then(
      () => setIsRefreshing(false),
      dispatch(getTrackPlayers('honey', 10)),
    );
  }, []);

  return (
    <SafeAreaView style={styles.MainViewStyle}>
      <View style={styles.InnerViewStyle}>
        <View style={styles.searchInputNImagesStyle}>
          <Image style={styles.SearchImageStyle} source={IMAGES.SEARCH} />
          <TextInput
            placeholder="Search here.."
            style={styles.SearchTextStyle}
            onChangeText={val => optimizedFn(val)}
          />
        </View>
      </View>

      <View style={styles.SSviewStyle}>
        <Text style={styles.ssTextStyle}>{'Songs'}</Text>
        <Text style={[styles.ssTextStyle, {marginRight: 5}]}>{'Singer'}</Text>
      </View>

      <FlatList
        data={SearchApiReducerData}
        renderItem={_renderItem}
        ListEmptyComponent={_nodataAvliable}
        ListFooterComponent={_renderLoder}
        // inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id + index}
        onEndReachedThreshold={0.7}
        onEndReached={loadMoreItem}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={'#eedd82'}
          />
        }
      />
    </SafeAreaView>
  );
};

export default SearchingTracks;

const styles = StyleSheet.create({
  MainViewStyle: {
    flex: 1,
    marginHorizontal: normalize(24),
  },
  InnerViewStyle: {
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: normalize(10),
    justifyContent: 'space-between',
  },
  SearchTextStyle: {
    paddingRight: vw(25),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
  },
  SearchImageStyle: {
    height: vh(20),
    width: vw(20),
    resizeMode: 'contain',
  },
  searchInputNImagesStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  CrossImageStyle: {
    height: vh(10),
    width: vw(13),
    marginRight: vw(10),
    resizeMode: 'contain',
  },
  renderItemViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(10),
    backgroundColor: '#eedd82',
    borderRadius: normalize(10),
    marginVertical: normalize(10),
    justifyContent: 'space-between',
  },
  SSviewStyle: {
    marginTop: vh(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ssTextStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  noDataAvliableViewStyle: {
    flex: 1,
    marginTop: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notSearchImageStyle: {
    width: vw(80),
    height: vh(80),
    resizeMode: 'contain',
  },
  NotSearchTextStyle: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: normalize(20),
  },
  AlbumnameStyle: {
    fontSize: 16,
    maxWidth: vw(150),
  },
  ArtistnameStyle: {
    fontSize: 16,
  },
  ActivityindicatorStyle: {
    marginTop: 370,
    marginLeft: 170,
    position: 'absolute',
  },
});
// setSearchtext(
//   SearchApiReducerData.filter(
//     (item: any) =>
//       item?.albumName.toLowerCase().includes(text.toLowerCase()),
//     console.log('text', text),
//   ),ed
// );

//   for closure
//   const debounceSearch = debounce(onChageSearchText, 3000);
