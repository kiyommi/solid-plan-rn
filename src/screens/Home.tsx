import { View } from "react-native";
import { Text } from "@rneui/themed";


export const Home = ({user}: any) => {
    console.log('home screen user: ', user);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>{`Hello, ${user?.email}!!!!`}</Text>
        </View>
    )
};