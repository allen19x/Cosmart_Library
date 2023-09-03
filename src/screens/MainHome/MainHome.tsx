/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Brand } from '../../components';
import { useTheme } from '../../hooks';
import { changeTheme, ThemeState } from '../../store/theme';
import i18next from 'i18next';
import { NavigationKey } from '@/theme/Variables';

const MainHome = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation(['example', 'welcome']);
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useDispatch();

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.fullWidth,
          Gutters.smallTMargin,
          ,
          { paddingHorizontal: 34 },
        ]}
      >
        <TouchableOpacity
          style={[Common.button.circleSmall, Gutters.regularBMargin]}
          onPress={() => onChangeTheme({ darkMode: !isDark })}
        >
          <Image
            source={Images.icons.colors}
            style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
          />
          <Text style={[Fonts.textSuperTiny]}>Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.button.circleSmall, Gutters.regularBMargin]}
          onPress={() =>
            onChangeLanguage(i18next.language === 'fr' ? 'en' : 'fr')
          }
        >
          <Image
            source={Images.icons.translate}
            style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
          />
          <Text style={[Fonts.textSuperTiny]}>Language</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          Layout.fill,
          Layout.relative,
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <View
          style={[
            Layout.absolute,
            {
              height: 250,
              width: 250,
              backgroundColor: isDark ? '#000000' : '#DFDFDF',
              borderRadius: 140,
            },
          ]}
        />
        <View
          style={[
            Layout.absolute,
            {
              height: 300,
              width: 300,
              transform: [{ translateY: 40 }],
            },
          ]}
        >
          <Brand height={300} width={300} />
        </View>
      </View>
      <View
        style={[
          Layout.fill,
          Layout.justifyContentBetween,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
        ]}
      >
        <View>
          <Text style={[Fonts.titleRegular]}>{t('welcome:title')}</Text>
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            {t('welcome:subtitle')}
          </Text>
          <Text style={[Fonts.textSmall, Fonts.textLight]}>
            {t('welcome:description')}
          </Text>
        </View>
      </View>
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.fullWidth,
          Gutters.smallTMargin,
          ,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingHorizontal: 30,
            alignItems: 'flex-end',
          },
        ]}
      >
        <TouchableOpacity
          style={[Common.button.circle, Gutters.regularBMargin]}
          onPress={() => {
            navigation.navigate(NavigationKey.BOOK_LIST, {});
          }}
        >
          <Image
            resizeMode="contain"
            source={Images.icons.icBook}
            style={{
              tintColor: isDark ? '#A6A4F0' : '#44427D',
              height: 60,
              width: 60,
            }}
          />
          <Text style={[Fonts.textTiny]}>{t('welcome:bookListText')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.button.circle, Gutters.regularBMargin]}
          onPress={() => navigation.navigate(NavigationKey.HISTORY_LIST, {})}
        >
          <Image
            source={Images.icons.icHistory}
            style={{
              tintColor: isDark ? '#A6A4F0' : '#44427D',
              height: 60,
              width: 60,
            }}
          />
          <Text style={[Fonts.textTiny]}>{t('welcome:historyText')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MainHome;
