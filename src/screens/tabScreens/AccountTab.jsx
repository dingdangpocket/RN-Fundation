import React, {useContext} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Linking,
} from 'react-native';
import wrapNavigationAuthRoute from 'src/functions/wrapNavigationAuthRoute';
import {ContentContext} from 'src/context/ContextProvider';

const WechatTab = ({navigation}) => {
  const {state} = useContext(ContentContext);
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                wrapNavigationAuthRoute(
                  'InfoScreen',
                  state?.routerPermissions,
                  navigation,
                )
              }>
              <Text>权限页面Stack页面</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('foundation://InfoScreen/10')}>
              <Text>DeepLinking-InfoScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('myapp://')}>
              <Text>DeepLinking其他应用</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
});
export default WechatTab;
