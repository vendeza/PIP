import { NativeModules } from 'react-native';

type StartVideoActivityParams = {
    consultationId: string;
    to: string;
    username: string;
};

interface PIPModuleType {
    startVideoActivity(params: StartVideoActivityParams): void;
    enterPIPModeDirectly(): void;
}

const pip: PIPModuleType = NativeModules.PIPModule;

export default pip;
