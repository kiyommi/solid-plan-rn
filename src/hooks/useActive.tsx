import { useEffect, useState } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

export const useActive = () => {
    const [isActive, setIsActive] = useState(true);
    useEffect(() => {
        const onAppStateChange = (status: AppStateStatus) => {
            if (Platform.OS !== 'web') {
                console.log('the status is: ', status);
                setIsActive(status === 'active');
            }
        }
      const subscription = AppState.addEventListener('change', onAppStateChange);
      return () => subscription.remove();
    }, []);
    return isActive;
}