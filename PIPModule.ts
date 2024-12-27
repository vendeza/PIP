import { NativeModules } from 'react-native';

const { PIPModule } = NativeModules;

const setModalActive = (isActive) => {
    if (PIPModule && typeof PIPModule.setModalActive === 'function') {
        console.log(`setModalActive called with value: ${isActive}`);
        PIPModule.setModalActive(isActive);
    } else {
        console.error('PipModule is not available.');
    }
};

export default { setModalActive };
