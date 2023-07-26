/* eslint-disable eqeqeq */
/* eslint-disable curly */
import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    Alert,
    ActivityIndicator
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchCamera} from 'react-native-image-picker';
const ImageSaveScreen = () => {
    console.log('CameraRoll', CameraRoll);
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
    const [saving, setSaving] = useState(false);
    const getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: '请求访问相册',
                    message: '我们将访问你的的相册',
                    buttonNegative: '取消',
                    buttonPositive: '确认'
                },
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err) {
            Alert.alert(
                'Save remote Image',
                'Failed to save Image: ' + err.message,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false}
            );
        }
    };
    useEffect(() => {
        const fetch = async () => {
            if (Platform.OS === 'android') {
                const granted = await getPermissionAndroid();
                if (!granted) return;
            }
        };
        fetch();
    }, []);
    const onDownload = async () => {
       setSaving(true);
        if (!preview) return null;
        console.log(preview);
        console.log(CameraRoll);
        let promise = CameraRoll.save(preview, {type: 'photo', album: 'rehu'}); //rehu为相册名
        promise
            .then(res => {
                setSaving(false);
                Alert.alert('保存成功', res, [
                    {
                        text: '确认',
                        onPress: () => console.log('success Pressed'),
                        style: 'success'
                    },
                ]);
            })
            .catch(err => {
                setSaving(false);
                Alert.alert('保存失败', err, [
                    {
                        text: '确认',
                        onPress: () => console.log('success Pressed'),
                        style: 'success'
                    },
                ]);
            });
    };
    const takePhotoTapped = () => {
        launchCamera(options, response => setPreview(response.assets[0].uri));
    };
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.app}>
                    {saving ? (
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                        <>
                            {preview ? (
                                <Image
                                    source={{uri: preview}}
                                    style={styles.imagePreview}
                                />
                            ) : null}
                            <TouchableOpacity
                                style={styles.downloadButton}
                                onPress={takePhotoTapped}>
                                <Text>拍摄图片</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.downloadButton}
                                onPress={onDownload}>
                                <Text>保存图片</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2FF345CC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    app: {
        backgroundColor: '#11131B',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingVertical: 30
    },
    headerText: {
        marginTop: 50,
        fontSize: 26,
        color: 'white'
    },
    textInputWrapper: {
        marginTop: 30,
        alignSelf: 'stretch',
        padding: 10
    },
    textInput: {
        padding: 10,
        backgroundColor: '#EFEFEF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 3
    },
    imagePreview: {
        height: 300,
        width: 300,
        backgroundColor: 'purple',
        marginTop: 30
    },
    downloadButton: {
        backgroundColor: 'white',
        marginTop: 40,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 3
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
});
export default ImageSaveScreen;
