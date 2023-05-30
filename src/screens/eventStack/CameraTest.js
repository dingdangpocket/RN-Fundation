import React from 'react';
import {Text} from 'react-native';

export default function CameraTest() {
  return <Text>请确认您是否开启相机访问权限</Text>;
}

// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// const CameraTest = () => {
//   const refCamera = useRef(null);
//   const devices = useCameraDevices('wide-angle-camera');
//   const device = devices.back;
//   const [showCamera, setShowCamera] = useState(null);
//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       const newCameraPermission = await Camera.requestCameraPermission();
//       if (newCameraPermission === 'authorized') {
//         setShowCamera(true);
//       } else {
//         setShowCamera(false);
//       }
//       console.log('newCameraPermission', newCameraPermission);
//     };
//     requestCameraPermission();
//   }, []);
//   return (
//     <View style={styles.container}>
//       {showCamera && device ? (
//         <Camera
//           style={styles.container}
//           ref={refCamera}
//           device={device}
//           isActive={true}
//         />
//       ) : showCamera == false ? (
//         <Text>请确认您是否开启相机访问权限</Text>
//       ) : (
//         <Text>loading...</Text>
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   topButtons: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     alignItems: 'flex-start',
//   },
//   bottomButtons: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   flipButton: {
//     flex: 1,
//     marginTop: 20,
//     right: 20,
//     backgroundColor: 'red',
//     alignSelf: 'flex-end',
//   },
//   recordingButton: {
//     backgroundColor: 'red',
//     marginBottom: 10,
//   },
// });

// export default CameraTest;
