/* eslint-disable @typescript-eslint/no-unused-vars */
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

const App = () => {
  const {state, dispatch} = useContext(ContentContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{flex: 1}}>
      {/* {state.safeAreaViewStatus ? (
        <SafeAreaView
          style={{flex: 0, backgroundColor: 'rgba(255,255,255,0.7)'}}
        />
      ) : null} */}
      <RoutesNav />
      {/* {state.safeAreaViewStatus ? (
        <SafeAreaView
          style={{flex: 0, backgroundColor: 'rgba(255,255,255,0.7)'}}
        />
      ) : null} */}
    </View>
  );
};
export default App;
