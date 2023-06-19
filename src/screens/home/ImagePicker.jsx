/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
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
import CustomButton from 'src/components/CustomButton';
import {Center} from 'src/commonStyle/commonStyle';
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
        launchImageLibrary(options, response =>
            response?.didCancel
                ? setPreview(null)
                : setPreview(response?.assets[0]?.uri),
        );
    };
    const takePhotoTapped = async () => {
        launchCamera(options, response =>
            response?.didCancel
                ? setPreview(null)
                : setPreview(response?.assets[0]?.uri),
        );
    };
    useEffect(() => {
        !preview ? setIsshow(true) : setIsshow(false);
    }, [preview]);

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
            onClick: () => setIsshow(false),
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
                onRequestClose={() => setIsshow(false)}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.outSideView}
                    onPress={() => setIsshow(false)}
                />
                <View style={styles.container}>
                    {buttons.map(item => (
                        <CustomButton
                            key={item.label}
                            title={item.label}
                            titleColor={'rgba(255,255,255,0.75)'}
                            fontSize={11}
                            width={150}
                            height={50}
                            marginTop={10}
                            backgroundColor={'rgba(10,10,10,0.9)'}
                            borderRadius={2.5}
                            align={Center}
                            onPress={item.onClick}
                        />
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
