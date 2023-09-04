/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLazyFetchOneQuery } from '../../services/modules/Books';
import {
  BookSubject,
  Colors,
  NavigationKey,
  StorageKey,
} from '@/theme/Variables';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import moment from 'moment';
import { reduxStorage } from '@/store';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';

const BookListScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation(['example', 'welcome']);
  const { Fonts, Common, darkMode: isDark } = useTheme();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    BookSubject[0],
  );
  const [selectedBook, setSelectedBook] = useState<any>([]);
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const limit = 10;

  const [fetchOne, { data: dataListBook, isLoading, isFetching }] =
    useLazyFetchOneQuery();
  const [list, setList] = useState<any>([]);

  useMemo(() => {
    if (page > 1) {
      return dataListBook?.works && setList([...list, ...dataListBook?.works]);
    }
    return dataListBook?.works && setList(dataListBook?.works);
  }, [dataListBook]);

  const isFocused = useIsFocused();

  const listRef = useRef<FlatList>(null);
  const modalRef = useRef<Modalize>(null);
  const modalDateRef = useRef<Modalize>(null);
  const modalDateRefAndroid = useRef<Modalize>(null);

  useEffect(() => {
    fetchOne({
      subject: selectedCategory,
      offset: page,
      limit: limit,
      details: false,
    });
  }, [selectedCategory, page, isFocused]);

  const onRefresh = () => {
    setPage(1);
    fetchOne({
      subject: selectedCategory,
      offset: 1,
      limit: limit,
      details: false,
    });
    handleScrollToTop();
  };

  const handleScrollToTop = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const renderedContentItem = useCallback(
    ({ item }: { item: any }) => (
      <>
        <TouchableOpacity
          onPress={() => {
            setSelectedBook(item);
            modalRef?.current?.open();
          }}
          style={{
            height: 80,
            flex: 1,
            borderRadius: 20,
            backgroundColor: '#547bba',
            justifyContent: 'center',
            paddingHorizontal: 24,
            marginBottom: 8,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
            }}
          >
            <Text
              numberOfLines={2}
              style={[{ color: Colors.circleButtonBackground }, Fonts.textBold]}
            >
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                { color: Colors.circleButtonBackground },
                Fonts.textLight,
              ]}
            >
              {item.authors[0].name}
            </Text>
          </View>
          <View
            style={{
              width: 20,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Text
              style={[
                { color: Colors.circleButtonBackground },
                Fonts.textLight,
              ]}
            >
              {item?.key?.split('/').pop()}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    ),
    [dataListBook],
  );

  const renderedKey = useCallback(
    (item: any, index: any) => index.toString(),
    [],
  );

  const renderFooter = () => {
    if (isLoading && page > 1) {
      return null;
    }
    return (
      <View style={{ height: 100, justifyContent: 'center' }}>
        <Text
          style={[
            {
              color: isDark ? 'white' : 'black',
              paddingHorizontal: 30,
              fontSize: 20,
            },
            Fonts.textCenter,
          ]}
        >
          LOAD MORE ...
        </Text>
      </View>
    );
  };

  if (isLoading && page === 1) {
    return (
      <View style={{ height: 100, justifyContent: 'center' }}>
        <Text
          style={[
            {
              color: isDark ? 'white' : 'black',
              paddingHorizontal: 30,
              fontSize: 20,
            },
            Fonts.textCenter,
          ]}
        >
          LOADING
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1, paddingTop: 30 }}>
        <TouchableOpacity
          style={[
            Common.button.circleSmall,
            {
              flexDirection: 'row',
              paddingHorizontal: 30,
              width: '100%',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[Fonts.textBold, { color: isDark ? 'white' : 'black' }]}
            >
              {t('welcome:backText')}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                {
                  color: isDark ? 'white' : 'black',
                  fontSize: 20,
                },
                Fonts.textCenter,
                Fonts.textBold,
              ]}
            >
              {t('welcome:bookText')}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        <Text
          style={[
            {
              color: isDark ? 'white' : 'black',
              paddingHorizontal: 30,
              paddingTop: 20,
              fontSize: 20,
              paddingBottom: 10,
            },
            Fonts.textLeft,
            Fonts.textBold,
          ]}
        >
          {t('welcome:bookSubjectText')}
        </Text>
        <View style={{ height: 100 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              flexDirection: 'row',
              paddingTop: 15,
              paddingHorizontal: 30,
            }}
          >
            {BookSubject.map(item => {
              const isSelectedItem = item === selectedCategory;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    handleScrollToTop();
                    setPage(1);
                    setSelectedCategory(item);
                  }}
                  style={{
                    height: 60,
                    minWidth: 100,
                    borderRadius: 20,
                    borderWidth: 4,
                    borderColor: isSelectedItem ? '#203c69' : '#547bba',
                    backgroundColor: isSelectedItem ? '#547bba' : '#203c69',
                    marginRight: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      {
                        color: Colors.circleButtonBackground,
                        padding: 12,
                        marginTop: -4,
                      },
                      Fonts.textCenter,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              {
                color: isDark ? 'white' : 'black',
                paddingHorizontal: 30,
                fontSize: 20,
                paddingTop: 10,
                paddingBottom: 10,
              },
              Fonts.textLeft,
              Fonts.textBold,
            ]}
          >
            {t('welcome:bookListText')}
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={['#3b91ed']}
                tintColor={'#3b91ed'}
                refreshing={isFetching}
                onRefresh={() => onRefresh()}
              />
            }
            ref={listRef}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.2}
            data={list}
            ListFooterComponent={renderFooter}
            keyExtractor={renderedKey}
            renderItem={renderedContentItem}
          />
        </View>
      </View>
      <Modalize
        handlePosition="inside"
        ref={modalRef}
        adjustToContentHeight
        modalStyle={{
          backgroundColor: '#1c3c5e',
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: 25,
          flexGrow: 0.05,
        }}
      >
        <View
          style={{
            paddingTop: 40,
          }}
        >
          <Text
            style={[
              {
                color: '#6392b8',
                fontSize: 20,
                paddingTop: 30,
                paddingBottom: 10,
              },
              Fonts.textCenter,
              Fonts.textBold,
            ]}
          >
            Title
          </Text>
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                paddingBottom: 10,
              },
              Fonts.textCenter,
            ]}
          >
            {selectedBook.title}
          </Text>
          <Text
            style={[
              {
                color: '#6392b8',
                fontSize: 20,
                paddingTop: 30,
                paddingBottom: 10,
              },
              Fonts.textCenter,
              Fonts.textBold,
            ]}
          >
            Edition
          </Text>
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                paddingBottom: 10,
              },
              Fonts.textCenter,
            ]}
          >
            {selectedBook?.key?.split('/').pop()}
          </Text>
          <Text
            style={[
              {
                color: '#6392b8',
                fontSize: 20,
                paddingTop: 30,
                paddingBottom: 10,
              },
              Fonts.textCenter,
              Fonts.textBold,
            ]}
          >
            Authors
          </Text>
          {selectedBook?.authors?.map((item: any) => (
            <View key={item?.key}>
              <Text
                style={[
                  {
                    color: 'white',
                    fontSize: 20,
                    paddingBottom: 10,
                  },
                  Fonts.textCenter,
                ]}
              >
                {item.name}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => modalDateRef?.current?.open()}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#6392b8',
            }}
          >
            <Text
              style={[
                {
                  color: '#6392b8',
                  fontSize: 20,
                  paddingTop: 30,
                  paddingBottom: 10,
                },
                Fonts.textCenter,
                Fonts.textBold,
              ]}
            >
              {moment(dateAndTime).format('DD/MM/YYYY : hh:mm A')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={async () => {
            const valueStorage: any = {
              bookData: selectedBook,
              date: moment(dateAndTime).format('DD/MM/YYYY'),
              time: moment(dateAndTime).format('hh:mm A'),
            };
            const currentStorage = await reduxStorage.getItem(
              StorageKey.BOOK_ORDERED,
            );
            if (currentStorage) {
              const parsedCurrentStorage = JSON.parse(currentStorage);
              const combinedData = [...parsedCurrentStorage, valueStorage];
              await reduxStorage.setItem(
                StorageKey.BOOK_ORDERED,
                JSON.stringify(combinedData),
              );
            } else {
              await reduxStorage.setItem(
                StorageKey.BOOK_ORDERED,
                JSON.stringify([valueStorage]),
              );
            }
            modalRef?.current?.close();
            navigation.navigate(NavigationKey.HISTORY_LIST, {});
          }}
          style={{
            borderRadius: 20,
            flex: 1,
            paddingTop: 20,
            paddingBottom: 10,
            marginTop: 20,
            backgroundColor: '#2d69a8',
          }}
        >
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                paddingBottom: 10,
              },
              Fonts.textCenter,
            ]}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </Modalize>
      <Modalize
        handlePosition="inside"
        ref={modalDateRef}
        adjustToContentHeight
        modalStyle={{
          backgroundColor: '#1c3c5e',
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: 25,
          flexGrow: 0.05,
        }}
      >
        <DatePicker
          style={{
            marginVertical: 60,
            marginLeft: Platform.OS === 'ios' ? 30 : 0,
          }}
          textColor="white"
          open
          androidVariant="nativeAndroid"
          minimumDate={new Date()}
          date={dateAndTime}
          onDateChange={setDateAndTime}
          onCancel={() => {
            modalDateRef.current?.close();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            modalDateRef?.current?.close();
          }}
        >
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
              },
              Fonts.textCenter,
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </Modalize>
      <Modalize
        handlePosition="inside"
        ref={modalDateRefAndroid}
        adjustToContentHeight
        modalStyle={{
          backgroundColor: '#1c3c5e',
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: 25,
          flexGrow: 0.05,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            modalDateRefAndroid?.current?.close();
          }}
        >
          <Text
            style={[
              {
                fontSize: 20,
              },
              Fonts.textCenter,
              Fonts.textRegular,
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </Modalize>
    </>
  );
};

export default BookListScreen;
