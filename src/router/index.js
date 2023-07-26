import IncidentDescScreen from 'src/screens/home/IncidentDescScreen';
import TheoryDescScreen from 'src/screens/home/TheoryDescScreen';
import ImageSaveScreen from 'src/screens/home/ImageSaveScreen';
import ImagePicker from 'src/screens/home/ImagePicker';
import AudioScreen from 'src/screens/home/AudioScreen';
import Error from 'src/screens/error/Error';
import StackScreen from 'src/screens/storage/StackScreen';
import InfoScreen from 'src/screens/wechat/InfoScreen';
import CameraTest from 'src/screens/eventStack/CameraTest';
const StorageStackRoutes = [
  {
    name: 'StackScreen',
    component: StackScreen,
    option: {title: 'StackPages'},
  }
];
const HomeStackRoutes = [
  {
    name: 'TheoryDescScreen',
    component: TheoryDescScreen,
    option: {title: 'WebView网页'},
  },
  {
    name: 'IncidentDescScreen',
    component: IncidentDescScreen,
    option: {title: '视频集成'},
  },
  {
    name: 'AudioScreen',
    component: AudioScreen,
    option: {title: '音频集成'},
  },
  {
    name: 'ImagePicker',
    component: ImagePicker,
    option: {title: '访问相机集成'},
  },

  {
    name: 'ImageSaveScreen',
    component: ImageSaveScreen,
    option: {title: '图片保存'},
  }
];
const CameraStackRoutes = [];
const WechatStackRoutes = [
  {
    name: 'InfoScreen',
    component: InfoScreen,
    option: {title: 'InfoScreen'},
  }
];
const ErrorStackRoutes = [
  {
    name: 'Error',
    component: Error,
    option: {title: '错误页面'},
  }
];
const EventStackRoutes = [
  {
    name: 'CameraTest',
    component: CameraTest,
    option: {title: 'CameraTest'},
  }
];
export const containStackRoutes = [
  ...HomeStackRoutes,
  ...StorageStackRoutes,
  ...WechatStackRoutes,
  ...CameraStackRoutes,
  ...ErrorStackRoutes,
  ...EventStackRoutes,
];
