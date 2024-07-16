import { Header } from '@rneui/themed';

import { useAuth } from '../context/Auth.context';
export const AppHeader = ({ pageName }: {pageName: string}) => {
    const { user } = useAuth();
    return (
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: pageName, style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            backgroundColor="red"
        />
    );
}

