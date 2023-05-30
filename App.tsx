/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';

import {ContentContext} from './src/context/ContextProvider';
import RoutesNav from './src/components/RoutesNav';

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const {state, dispatch}: any = useContext(ContentContext);
  console.log('React1');
  return (
    <View style={{flex: 1}}>
      {state.safeAreaViewStatus ? (
        <SafeAreaView
          style={{flex: 0, backgroundColor: 'rgba(255,255,255,0.7)'}}
        />
      ) : null}
      <RoutesNav />
      {state.safeAreaViewStatus ? (
        <SafeAreaView
          style={{flex: 0, backgroundColor: 'rgba(255,255,255,0.7)'}}
        />
      ) : null}
    </View>
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Text>中国</Text>
    //   </ScrollView>
    // </SafeAreaView>
  );
}
export default App;
