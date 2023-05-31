/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const ImagePicker = () => {
  const [isShow, setIsshow] = useState(true);
  const [preview, setPreview] = useState(null);
  const options = {
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 1200,
    quality: 100,
    cameraType: 'back',
    includeBase64: true,
    saveToPhotos: true,
    selectionLimit: 5,
  };
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '请求访问相册',
          message: '我们将访问你的的相册',
          buttonNegative: '取消',
          buttonPositive: '确认',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: '好的', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  const selectPhotoTapped = () => {
    setIsshow(false);
    launchImageLibrary(options, response => setPreview(response.assets[0].uri));
  };
  const takePhotoTapped = async () => {
    // launchCamera(options, response => dealImage(response));
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    launchCamera(options, response => setPreview(response.assets[0].uri));
  };

  const buttons = [
    {
      label: '相册',
      onClick: () => selectPhotoTapped(),
    },
    {
      label: '拍摄',
      onClick: () => takePhotoTapped(),
    },
    {
      label: '取消',
      textStyle: {color: 'white'},
      onClick: () => onCancel(),
    },
  ];

  return (
    <View>
      {preview ? (
        <Image
          source={{uri: preview}}
          style={{height: 500, width: Dimensions.get('screen').width}}
        />
      ) : null}
      <Modal
        animationType={'slide'}
        transparent={true}
        statusBarTranslucent={true}
        visible={isShow}
        onRequestClose={onCancel}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.outSideView}
          onPress={onCancel}
        />
        <View style={styles.container}>
          {buttons.map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.openButton}
              onPress={item.onClick}
              activeOpacity={0.7}>
              <Text style={styles.buttonTitle}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outSideView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  openButton: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 10,
    borderBottomColor: 'white',
  },
  buttonTitle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});
export default ImagePicker;
