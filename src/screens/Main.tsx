import { useEffect } from "react";
import { ExtendedAuthContext, useAuth } from "../context/Auth.context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Home } from "./Home";
import { SettingButton } from "../components/SettingButton";
import { View} from "react-native";
import { AnimatedSVGPath } from "react-native-svg-animations";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Main = () => {
    const { fetchUser, user, isLoginPending } = useAuth() as ExtendedAuthContext;
    console.log('main screen user: ', user);
    console.log('is pending: ', isLoginPending);

    useEffect(() => {fetchUser()}, []);
    if (isLoginPending) {
      return <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AnimatedSVGPath
          strokeColor={"yellow"}
          duration={2500}
          strokeWidth={5}
          height={400}
          width={400}
          scale={0.5}
          delay={0}
          d={`M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z`}
        />
      </View>
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                  <Stack.Group>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen
                        name="Home"
                        initialParams={{user}}
                        options={{title: 'Welcome',
                        headerRight: (props) => <SettingButton />
                    }}
                    >
                        {() => <Home user={user} />}
                    </Stack.Screen>
                  </Stack.Group>
                )}
              </Stack.Navigator>
        </NavigationContainer>
    )
  }