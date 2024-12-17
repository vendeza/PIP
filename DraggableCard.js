import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';

const DragAndDropCard = ({heading, paragraph}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(1);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => scale !== 1 || dragging,
    onMoveShouldSetPanResponder: () => scale !== 1 || dragging,
    onPanResponderGrant: () => {
      setDragging(true);
      position.setOffset({x: position.x._value, y: position.y._value});
      position.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: position.x,
          dy: position.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      setDragging(false);
      position.flattenOffset();
    },
  });

  const reduceScale = () => {
    setScale(prevScale => Math.max(prevScale / 5, 0.1)); // Минимальный масштаб 0.1
  };

  const resetScale = () => {
    setScale(1); // Возвращает масштаб в исходное состояние
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [...position.getTranslateTransform(), {scale}],
            opacity: dragging ? 0.8 : 1,
          },
        ]}
        {...panResponder.panHandlers}
        onPress={scale !== 1 ? resetScale : null}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
        <TouchableOpacity style={styles.button} onPress={reduceScale}>
          <Text style={styles.buttonText}>Reduce Scale</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default DragAndDropCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef9393',
  },
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    position: 'absolute',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
