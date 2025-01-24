import React, { useEffect, useState } from 'react';
import { Portal } from '@gorhom/portal';
import { DeviceEventEmitter, Dimensions, Platform, StyleSheet, View } from 'react-native';
import VoxImplantCallScreenRoot from "./VoxImplantCallScreenRoot";



const GlobalModal = () => {
    const [isCallModalVisible, setIsCallModalVisible] = useState(false);
    const [isPermissionsModalVisible, setIsPermissionsModalVisible] = useState(false);
    const [PIPPlaceholder, setPIPPlaceholder] = useState(false);


    useEffect(() => {
        if (Platform.OS === 'ios') {
            return;
        }
        const onEnterPiP = DeviceEventEmitter.addListener('onEnterPiP', () => {
            setPIPPlaceholder(true);
        });

        const onExitPiP = DeviceEventEmitter.addListener('onExitPiP', () => {
            setPIPPlaceholder(false);
        });

        return () => {
            onEnterPiP.remove();
            onExitPiP.remove();
        };
    }, []);



    return (
        <Portal>
            <View style={styles.modalOverlay} pointerEvents="box-none">
                <VoxImplantCallScreenRoot />
            </View>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    PIPPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#333',
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoConfIcon: {
        width: 50,
        height: 50,
    },
});

export default GlobalModal;
