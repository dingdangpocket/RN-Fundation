import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useEffect} from 'react';
const ContentCard = props => {
  useEffect(() => {
    console.log('props', props);
  }, [props]);
  return (
    <View style={styles.cardContainer} key={props.item.id}>
      <View style={styles.titleArea}>
        <Text>{props.item.title}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.leftArea}>
          <View style={styles.authorArea}>
            <Text>{props.item.publisher}&nbsp;&nbsp;</Text>
            <Text>{props.item.createTime}</Text>
          </View>
          <View style={styles.contentArea}>
            <Text>{props.item.content}</Text>
          </View>
        </View>
        <View style={styles.rightArea}>
          <View style={styles.imageArea} />
        </View>
      </View>
      <View style={styles.iconArea}>
        <Text>浏览:{props.item.recordNum}&nbsp;</Text>
        <Text>solve:{props.item.solveNum}&nbsp;</Text>
        <Text>spot:{props.item.spotNum}&nbsp;</Text>
      </View>
    </View>
  );
};
let MainHeight = Dimensions.get('window').height;
let MainWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  cardContainer: {
    width: MainWidth * 0.9,
    height: 155,
    // backgroundColor: 'red',
    marginTop: 10,
  },
  titleArea: {
    width: MainWidth * 0.9,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    width: MainWidth * 0.9,
    height: 90,
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
  },
  iconArea: {
    width: MainWidth * 0.9,
    height: 30,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArea: {
    width: MainWidth * 0.65,
    height: 100,
    backgroundColor: 'yellow',
  },
  authorArea: {
    height: 20,
    width: '100%',
    backgroundColor: 'red',
    flexDirection: 'row',
    alignContent: 'center',
  },
  contentArea: {
    height: 69,
    width: '100%',
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  rightArea: {
    width: MainWidth * 0.25,
    height: 100,
    backgroundColor: 'gray',
  },
});

export default ContentCard;
