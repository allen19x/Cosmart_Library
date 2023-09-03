/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Colors, StorageKey } from '@/theme/Variables';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import { reduxStorage } from '@/store';
import { useTranslation } from 'react-i18next';

const HistoryListScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation(['example', 'welcome']);
  const { Fonts, Common, darkMode: isDark } = useTheme();
  const [list, setList] = useState<any>([]);
  const [selectedBook, setSelectedBook] = useState<any>([]);
  const listRef = useRef<FlatList>(null);
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    handlegetOrderedStorage();
  }, []);

  const handlegetOrderedStorage = async () => {
    const dataStorage = await reduxStorage.getItem(StorageKey.BOOK_ORDERED);
    if (dataStorage) {
      setList(JSON.parse(dataStorage));
    }
  };

  const renderedContentItem = useCallback(({ item }: { item: any }) => {
    return (
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
              {item?.bookData?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                { color: Colors.circleButtonBackground },
                Fonts.textLight,
              ]}
            >
              {item?.bookData?.authors[0]?.name}
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
              {item?.bookData?.key?.split('/').pop()}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }, []);

  const renderedKey = useCallback(
    (item: any, index: any) => index.toString(),
    [],
  );

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
          <View style={{ flex: 2 }}>
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
              {t('welcome:bookOrderedText')}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <FlatList
            ref={listRef}
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            data={list}
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
            {selectedBook?.bookData?.title}
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
            {selectedBook?.bookData?.key?.split('/').pop()}
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
          {selectedBook?.bookData?.authors?.map((item: any) => (
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
            Date & Time
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
            {selectedBook?.date} {selectedBook?.time}
          </Text>
        </View>
      </Modalize>
    </>
  );
};

export default HistoryListScreen;
