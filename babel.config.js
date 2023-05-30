// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
