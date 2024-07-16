
import { Icon } from '@rneui/themed';

import { useAuth } from '../context/Auth.context';
import { View } from 'react-native';
import { serverUrl } from '../../consts';
export const SettingButton = () => {
    const { user, setUser } = useAuth();
    const logout = async () => {
        await fetch(`${serverUrl}/logout`);
        setUser(undefined);
    };
    return (
        <View>
            <Icon name="logout" onPress={logout} />
        </View>
    );
}