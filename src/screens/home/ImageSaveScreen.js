import React, {View, Text} from 'react-native';
const ImageSaveScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 16}}>ImageSaveScreen!</Text>
    </View>
  );
};
export default ImageSaveScreen;
// import React, {useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
// import RNFetchBlob from 'rn-fetch-blob';

// const ImageSaveScreen = () => {
//   const [url, setUrl] = useState(
//     'https://img0.baidu.com/it/u=4254314593,3842655474&fm=253&fmt=auto&app=120&f=JPEG?w=828&h=455',
//   );
//   const [saving, setSaving] = useState(false);
//   const updateUrl = url => {
//     setUrl(url);
//   };
//   const getPermissionAndroid = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: '请求访问相册',
//           message: '我们将访问你的的相册',
//           buttonNegative: '取消',
//           buttonPositive: '确认',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return true;
//       }
//       Alert.alert(
//         'Save remote Image',
//         'Grant Me Permission to save Image',
//         [{text: '好的', onPress: () => console.log('OK Pressed')}],
//         {cancelable: false},
//       );
//     } catch (err) {
//       Alert.alert(
//         'Save remote Image',
//         'Failed to save Image: ' + err.message,
//         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
//         {cancelable: false},
//       );
//     }
//   };

//   const onDownload = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await getPermissionAndroid();
//       if (!granted) {
//         return;
//       }
//     }
//     setSaving(true);
//     RNFetchBlob.config({
//       fileCache: true,
//       appendExt: 'png',
//     })
//       .fetch('GET', url)
//       .then(res => {
//         CameraRoll.saveToCameraRoll(res.data, 'photo')
//           .then(() => {
//             Alert.alert(
//               '提示',
//               '保存成功',
//               [{text: '好的', onPress: () => console.log('OK Pressed')}],
//               {cancelable: false},
//             );
//           })
//           .catch(err => {
//             Alert.alert(
//               '提示',
//               '保存失败 ' + err.message,
//               [{text: 'OK', onPress: () => console.log('OK Pressed')}],
//               {cancelable: false},
//             );
//           })
//           .finally(() => setSaving(false));
//       })
//       .catch(error => {
//         setSaving(false);
//         Alert.alert(
//           '提示',
//           '保存失败 ' + err.message,
//           [{text: 'OK', onPress: () => console.log('OK Pressed')}],
//           {cancelable: false},
//         );
//       });
//   };
//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.app}>
//           {saving ? (
//             <View style={styles.loader}>
//               <ActivityIndicator size="large" />
//             </View>
//           ) : (
//             <>
//               <Image source={{uri: url}} style={styles.imagePreview} />
//               <TouchableOpacity
//                 style={styles.downloadButton}
//                 onPress={onDownload}>
//                 <Text>保存图片</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#2FF345CC',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   app: {
//     backgroundColor: '#11131B',
//     flex: 1,
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     paddingVertical: 30,
//   },
//   headerText: {
//     marginTop: 50,
//     fontSize: 26,
//     color: 'white',
//   },
//   textInputWrapper: {
//     marginTop: 30,
//     alignSelf: 'stretch',
//     padding: 10,
//   },
//   textInput: {
//     padding: 10,
//     backgroundColor: '#EFEFEF',
//     borderWidth: 1,
//     borderColor: '#DDD',
//     borderRadius: 3,
//   },
//   imagePreview: {
//     height: 300,
//     width: 300,
//     backgroundColor: 'purple',
//     marginTop: 30,
//   },
//   downloadButton: {
//     backgroundColor: 'white',
//     marginTop: 40,
//     paddingHorizontal: 40,
//     paddingVertical: 20,
//     borderRadius: 3,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });
// export default ImageSaveScreen;
