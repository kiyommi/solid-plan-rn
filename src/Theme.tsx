import { createTheme } from '@rneui/themed';

export const theme = createTheme({
    lightColors: {
        primary: 'red',
    },
    darkColors: {
        primary: 'blue',
    },
    components: {
        Button: {
            raised: true,
            color: 'secondary',
        },
        Text: {
            style: {
                color: '#ec5990',
                fontWeight: '800',
                fontSize: 17,
            }
        },
    },
});