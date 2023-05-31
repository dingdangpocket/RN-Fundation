/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, {useEffect, useContext, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Linking,
} from 'react-native';
import * as WeChat from 'react-native-wechat-lib';
import wrapNavigationAuthRoute from 'src/functions/wrapNavigationAuthRoute';
import {ContentContext} from 'src/context/ContextProvider';

const WechatTab = ({navigation}) => {
  const [appid] = useState('wx9013ae9aee782bfc');
  const [secretID] = useState('7a9ebc6f2902f9648989382ewe');
  const [apiVersion, setApiVersion] = useState(null);
  const [isWXAppInstalled, setIsWXAppInstalled] = useState(true);
  const [wxAppInstallUrl, setWxAppInstallUrl] = useState(null);
  const [isWXAppSupportApi, setIsWXAppSupportApi] = useState(false);
  const {state} = useContext(ContentContext);
  useEffect(() => {
    // appid和secretID/在微信开发平台申请(https://open.weixin.qq.com/)universalLink就是填写的申请资料;
    // 必须与申请的数据保持一致才能进行注册成功,否则返回false;
    WeChat.registerApp('wx9013ae9aeexxxxxx', 'https://www.baidu.com')
      .then(res => {
        console.log('weixin open sdk successfully integrated', res);
      })
      .catch(err => {
        console.log('weixin open sdk integration failed: ', err);
      });
    const initWxApiStatus = async () => {
      const apiVersion = await WeChat.getApiVersion();
      const wxAppInstallUrl =
        Platform.OS === 'ios'
          ? await WeChat.getWXAppInstallUrl()
          : 'https://dldir1.qq.com/weixin/android/weixin8028android2240.apk';
      const isWXAppSupportApi = await WeChat.isWXAppSupportApi();
      const isWXAppInstalled = await WeChat.isWXAppInstalled();
      console.log(
        'apiVersion',
        apiVersion,
        'wxAppInstallUrl',
        wxAppInstallUrl,
        'isWXAppSupportApi',
        isWXAppSupportApi,
        'isWXAppInstalled',
        isWXAppInstalled,
      );
      setApiVersion(apiVersion);
      setWxAppInstallUrl(wxAppInstallUrl);
      setIsWXAppSupportApi(isWXAppSupportApi);
      setIsWXAppInstalled(isWXAppInstalled);
    };
    initWxApiStatus();
  }, []);
  const shareOptions = {
    title: 'playground',
    description: '微信分享测试',
    thumbImage: 'https://i.loli.net/2019/09/03/62FauzAY37gsEXV.png',
    type: 'news',
    webpageUrl: 'https://github.com/little-snow-fox/react-native-wechat-lib',
  };
  const onOpenWechat = () => {
    isWXAppInstalled
      ? WeChat.openWXApp()
      : Alert.alert('没有安装微信，请安装之后重试');
  };
  const onWechatShareToFriend = () => {
    isWXAppInstalled
      ? WeChat.shareToSession(shareOptions).catch(error => {
          Alert.alert(error.message);
        })
      : Alert.alert('没有安装微信，请安装之后重试');
  };
  const onWechatShareToMoment = () => {
    isWXAppInstalled
      ? WeChat.shareToTimeline(shareOptions).catch(error => {
          Alert.alert(error.message);
        })
      : Alert.alert('没有安装微信，请安装之后重试');
  };
  const installWechat = url => {
    let WeChatUrl = url;
    Linking.canOpenURL(WeChatUrl)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
          Alert.alert('提示', "Can't handle url: " + url, [
            {text: 'OK', onPress: () => {}},
          ]);
        } else {
          return Linking.openURL(WeChatUrl);
        }
      })
      .catch(err => {
        console.log('An error occurred', err);
        Alert.alert('提示', 'An error occurred: ' + err, [
          {text: 'OK', onPress: () => {}},
        ]);
      });
  };
  //Step1:AccessToken
  const getAccessToken = responseCode => {
    let AccessTokenUrl =
      'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' +
      appid +
      '&secret=' +
      secretID +
      '&code=' +
      responseCode +
      '&grant_type=authorization_code';
    fetch(AccessTokenUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('AccessToken值', responseData);
        getRefreshToken(responseData.refresh_token);
      })
      .catch(error => {
        if (error) {
          console.log('error', error);
        }
      });
  };
  //Step2:RefreshToken
  const getRefreshToken = refreshtoken => {
    let getRefreshTokenUrl =
      'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' +
      appid +
      '&grant_type=refresh_token&refresh_token=' +
      refreshtoken;
    fetch(getRefreshTokenUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('RefreshToken', responseData);
        getUserInfo(responseData);
      })
      .catch(error => {
        if (error) {
          console.log('error', error);
        }
      });
  };
  //Step3:UserInfo
  const getUserInfo = responseData => {
    console.log(responseData);
    var getUserInfoUrl =
      'https://api.weixin.qq.com/sns/userinfo?access_token=' +
      responseData.access_token +
      '&openid=' +
      responseData.openid;
    console.log('getUserInfoUrl=', getUserInfoUrl);
    fetch(getUserInfoUrl, {
      method: 'GET',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('UserInfo', responseData);
      })
      .catch(error => {
        if (error) {
          console.log('error', error);
        }
      });
  };
  //login callBack
  const onWechatLogin = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    WeChat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        WeChat.sendAuthRequest(scope, state)
          .then(responseCode => {
            console.log('code值', responseCode.code);
            getAccessToken(responseCode.code);
          })
          .catch(err => {
            Alert.alert('登录授权发生错误：', err.message, [{text: '确定'}]);
          });
      } else {
        Platform.OS == 'ios'
          ? Alert.alert('没有安装微信', '是否安装微信？', [
              {text: '取消'},
              {
                text: '确定',
                onPress: () =>
                  installWechat(
                    'itms-apps://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8',
                  ),
              },
            ])
          : Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
              {text: '取消'},
              {
                text: '确定',
                onPress: () =>
                  installWechat(
                    'https://dldir1.qq.com/weixin/android/weixin8028android2240.apk',
                  ),
              },
            ]);
      }
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.highlight}>
              {/* ApiVersion: <Text>{apiVersion}</Text> */}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onOpenWechat}>
              <Text>打开微信</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onWechatShareToFriend}>
              <Text>分享至微信好友</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onWechatShareToMoment}>
              <Text>分享至朋友圈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onWechatLogin}>
              <Text>微信登陆</Text>
            </TouchableOpacity>
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
