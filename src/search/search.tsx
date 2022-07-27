import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {normalize, vh, vw} from '../utilis/dimensions';
import {IMAGES} from '../utilis/localeimages';

const SearchAndPagination = () => {
  const [data, setdata] = useState<any>([]);
  const [isloading, setisloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [text, settext] = useState('');

  useEffect(() => {
    getData(text, currentPage);
  }, [text, currentPage]);

  const getData = async (text: any, page: any) => {
    axios
      .get(
        `https://api.napster.com/v2.2/search/verbose?offset=${page}&apikey=ZWI4MGU4MzYtYTZhOS00NGYyLTk3YzUtMTUwNzFhMGI5ZDY1&query=${text}&per_type_limit=10`,
      )
      .then(resp => {
        console.log('Sucess  >>>>>>>>> ', resp);
        setdata(data.concat(resp));
        setisloading(false);
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  const _renderItem = ({item}: any) => {
    console.log('item ..', item?.data?.search?.data?.tracks);
    return (
      <View style={styles.renderItemViewStyle}>
        <Text style={styles.AlbumnameStyle}>{item?.albumName}</Text>
        <Text style={styles.ArtistnameStyle}>{item?.artistName}</Text>
      </View>
    );
  };

  const renderListFooter = () => {
    return (
      <View>
        {isloading && <ActivityIndicator size={'large'} color={'red'} />}
      </View>
    );
  };

  const onEndReached = () => {
    setCurrentPage(currentPage + 10);
    setisloading(true);
  };
  const onChageSearchText = (text: any) => {
    settext(text);
    // setCurrentPage(0);
  };
  return (
    <View style={styles.MainViewStyle}>
      <View style={styles.InnerViewStyle}>
        <View style={styles.searchInputNImagesStyle}>
          <Image style={styles.SearchImageStyle} source={IMAGES.SEARCH} />
          <TextInput
            placeholder="Search here.."
            style={styles.SearchTextStyle}
            onChangeText={onChageSearchText}
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.id + index}
        ListFooterComponent={renderListFooter}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
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
