/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';

import {ContentContext} from './src/context/ContextProvider';
import RoutesNav from './src/components/RoutesNav';

function App(): JSX.Element {
  const {state, dispatch}: any = useContext(ContentContext);
  useEffect(() => {
    dispatch({
      type: 'userRouterPermissions',
      payload: ['InfoScreen'],
    });
    const Interval = setInterval(() => {
      dispatch({
        type: 'communityTab',
        payload: 3 * Math.floor(Math.random() * 10) + 1,
      });
      dispatch({
        type: 'eventTab',
        payload: 3 * Math.floor(Math.random() * 10) + 1,
      });
      //轮询新数据;
    }, 1000);
    return () => clearInterval(Interval);
    // NavigationBar.setColor('white')
  }, [dispatch]);
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
