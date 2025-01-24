import React, { useRef, useCallback, useState } from 'react';
import { Animated, Button, Dimensions, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import {
    PanGestureHandler,
    State,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
    PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

type DraggableBoxProps = {
    minDist?: number;
    boxStyle?: StyleProp<ViewStyle>;
};

const { width, height } = Dimensions.get('window');

const DraggableBox: React.FC<DraggableBoxProps> = ({ minDist, boxStyle }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const lastOffset = useRef({ x: 0, y: 0 }).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [scale, setScale] = useState(1);
    const [isDraggable, setIsDraggable] = useState(false);

    // Обработчик панорамирования
    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: true }
    );

    // Обработчик окончания жеста
    const onHandlerStateChange = useCallback(
        (event: PanGestureHandlerStateChangeEvent) => {
            if (event.nativeEvent.oldState === State.ACTIVE && isDraggable) {
                lastOffset.x += event.nativeEvent.translationX;
                lastOffset.y += event.nativeEvent.translationY;

                translateX.setOffset(lastOffset.x);
                translateX.setValue(0); // Сбрасываем значение
                translateY.setOffset(lastOffset.y);
                translateY.setValue(0); // Сбрасываем значение
            }
        },
        [isDraggable]
    );



    // Сброс масштаба и позиции
    const resetScale = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Обнуляем состояние
            setScale(1);
            setIsDraggable(false);

            // Полностью сбрасываем lastOffset и translate
            lastOffset.x = 0;
            lastOffset.y = 0;
            translateX.setValue(0);
            translateX.setOffset(0);
            translateY.setValue(0);
            translateY.setOffset(0);
        });
    };



    // Уменьшение масштаба
    const reduceScale = () => {
        const targetX = width - 300; // Смещение вправо
        const targetY = height - 700; // Смещение вниз

        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.2,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: targetX,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: targetY,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setScale(0.1);
            setIsDraggable(true);

            // Сохраняем новое положение как offset
            translateX.setValue(0); // Сбрасываем текущие значения
            translateY.setValue(0);
            translateX.setOffset(targetX); // Устанавливаем новое смещение
            translateY.setOffset(targetY);

            // Обновляем lastOffset для последующих действий
            lastOffset.x = targetX;
            lastOffset.y = targetY;
        });
    };


    // Обработка одиночного нажатия
    const handleTap = useCallback(
        (event: TapGestureHandlerStateChangeEvent) => {
            if (event.nativeEvent.state === State.ACTIVE && scale < 1) {
                resetScale();
            }
        },
        [scale]
    );

    return (
        <TapGestureHandler onHandlerStateChange={handleTap}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            { translateX: translateX },
                            { translateY: translateY },
                            { scale: scaleAnim },
                        ],
                    },
                ]}
            >
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                    enabled={isDraggable}
                >
                    <Animated.View style={StyleSheet.absoluteFill}>
                        <Button title="Reset Scale" onPress={resetScale} />
                        <Button title="Reduce Scale" onPress={reduceScale} />
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </TapGestureHandler>
    );
};

const VoxImplantCallScreenRoot: React.FC = () => {
    return <DraggableBox />;
};

export default VoxImplantCallScreenRoot;

const styles = StyleSheet.create({
    box: {
        width: width,
        height: height,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'plum',
        margin: 10,
        zIndex: 200,
    },
});
