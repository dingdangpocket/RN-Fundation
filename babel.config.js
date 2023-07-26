module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-react-jsx'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
        }
      },
    ],
  ]
};
