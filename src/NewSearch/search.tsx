import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {normalize, vh, vw} from '../utilis/dimensions';
import {IMAGES} from '../utilis/localeimages';
import {useDispatch, useSelector} from 'react-redux';
import {getTrackPlayersAction} from './actiont';

const SearchAndPagination = () => {
  const dispatch = useDispatch<any>();
  const [isloading, setisloading] = useState(false);
  const [IsRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [text, settext] = useState('ed');
  const {SearchDataReducer} = useSelector(
    (store: any) => store.NewSearchReducer,
  );

  useEffect(() => {
    optimize(text, currentPage);
  }, [text]);

  const onEndReached = () => {
    setisloading(true);
    setCurrentPage(currentPage + 1);
    dispatch(getTrackPlayersAction(text, currentPage + 1));
    // setisloading(false)
  };

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.renderItemViewStyle}>
        <Text style={styles.AlbumnameStyle}>{item?.albumName}</Text>
        <Text style={styles.ArtistnameStyle}>{item?.artistName}</Text>
      </View>
    );
  };

  const debounce = (fun: any, time: number) => {
    let timeOut: number;
    return (arg: any, page: number) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fun(arg, page);
      }, time);
    };
  };

  const optimize = React.useCallback(
    debounce((txt: any, page: any) => {
      setCurrentPage(1);
      dispatch({type: 'SEARCH_NEW_TRACK', payload: []});
      dispatch(getTrackPlayersAction(txt, page));
    }, 1000),
    [],
  );

  const renderListFooter = () => {
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
    wait(2000).then(() => setIsRefreshing(false));
  }, []);


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
  return (
    <View style={styles.MainViewStyle}>
      <View style={styles.InnerViewStyle}>
        <View style={styles.searchInputNImagesStyle}>
          <Image style={styles.SearchImageStyle} source={IMAGES.SEARCH} />
          <TextInput
            placeholder="Search here.."
            style={styles.SearchTextStyle}
            onChangeText={txt => settext(txt)}
          />
        </View>
      </View>
      <FlatList
        data={SearchDataReducer}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.id + index}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={_nodataAvliable}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={IsRefreshing}
            onRefresh={onRefresh}
            tintColor={'#eedd82'}
          />
        }
      />
    </View>
  );
};

export default SearchAndPagination;

const styles = StyleSheet.create({
  MainViewStyle: {
    marginHorizontal: normalize(24),
    marginTop: vh(40),
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
  AlbumnameStyle: {
    fontSize: 16,
    maxWidth: vw(150),
  },
  ArtistnameStyle: {
    fontSize: 16,
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
  ActivityindicatorStyle: {
    marginTop: 370,
    marginLeft: 170,
    position: 'absolute',
  },
});
