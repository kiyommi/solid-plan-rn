import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";

import { Colors } from '../constants/styles';
import { closeExpiryFilter } from '../helpers/inventoryHelper';
import { DateInput } from './controlls/DateInput';

const getDateStyle = (date: Date) => {
    const currentDate = new Date();
    if (date < currentDate) {
        return [styles.itemText, styles.itemExpired];
    }
    if (closeExpiryFilter(date)) {
        return [styles.itemText, styles.itemCloseExpiry];
    }
    return styles.itemText;
}

export const InventoryList = ({data, isEditMode = false}: {data: InventoryItem[], isEditMode?: boolean}) => {
    const [inventoryItems, setInvemtoryItems] = useState(data);

    const renderItem = ({item}: {item: InventoryItem}) => (
        <GestureRecognizer onSwipeRight={() => promptDeleteAlert(item)}>
            <View key={item.id} style={styles.item} >
                <Text style={styles.itemText}>{item.name}</Text>
                <DateInput style={getDateStyle(item.expiryDate)} date={item.expiryDate}></DateInput>
            </View>
        </GestureRecognizer>); 

    const promptDeleteAlert = (item:InventoryItem) => {
        Alert.alert('Remove item', `Do you want to remove ${item.name} from the stock?`, [
            {
              text: 'Cancel',
            },
            {text: 'OK', onPress: () => deleteItem(item.id)},
          ]);
    }    
    
    const deleteItem = (id: string) => {
        const itemToDelete = inventoryItems.find((item) => item.id === id);
        if (!itemToDelete) {
            return;
        }
        const removeIndex = inventoryItems.indexOf(itemToDelete);
        setInvemtoryItems((lastItems) => {
            const newItems = [...lastItems];
            newItems.splice(removeIndex, 1);
            return newItems;
        });
    }

    return (
        <>
        <View style={styles.item}>
            <Text style={[styles.itemText, styles.itemHeader]}>Dish Name</Text>
            <Text style={[styles.itemText, styles.itemHeader]}>Expiry Date</Text>
        </View>
        <FlatList
            data={inventoryItems}
            renderItem={renderItem}
        />
      </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    itemText: {
      fontSize: 16,
      height: 24,
      flex: 1,
    },
    itemHeader: {
        fontWeight: '600',
        color: Colors.primary500
    },
    itemExpired: {
        color: Colors.error800
    },
    itemCloseExpiry: {
        color: Colors.warning100,
    },
    listHeaders: {
        fontSize: 18,
        fontWeight: '800',
    }
  });
  