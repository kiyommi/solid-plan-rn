import { Alert } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

const SwipeableItem = ({children, item, onDeleteApproved}: SwipeableItemProps<T>) => {
    const promptDeleteAlert = (item:T) => {
        Alert.alert('Remove item', `Do you want to remove ${item.name} from the stock?`, [
            {
              text: 'Cancel',
            },
            {text: 'OK', onPress: () => onDeleteApproved(item.id)},
          ]);
    }

    return (<GestureRecognizer onSwipeRight={() => promptDeleteAlert(item)}>
        {children}
    </GestureRecognizer>); 
};

type T = {
    id: string,
    name: string,
}

type SwipeableItemProps<T> = {
    children: React.ReactNode,
    item: T,
    onDeleteApproved: (id: string)=>void,
}

export default SwipeableItem;