import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookList, MainHome } from '@/screens';
import { NavigationKey } from '@/theme/Variables';
import HistoryListScreen from '@/screens/HistoryList/HistoryList';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationKey.MAIN_HOME_KEY} component={MainHome} />
      <Stack.Screen name={NavigationKey.BOOK_LIST} component={BookList} />
      <Stack.Screen
        name={NavigationKey.HISTORY_LIST}
        component={HistoryListScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
