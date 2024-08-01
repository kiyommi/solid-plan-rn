import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SwipeableItem from "../components/controlls/SwipeableItem";
import ShoppingItem from "../components/ShoppingItem";
import { SHOPPING_ITEMS } from "../dummyData/shoppingList";

import { Colors } from "../constants/styles";
import { PRODUCTS } from "../dummyData/products";

const shoppingItems: PopulatedShoppingItem[] = [];

const populateShoppingList = () => {
    SHOPPING_ITEMS.forEach((item) => {
        const productData = PRODUCTS.find((product) => product.id === item.id);
        productData && shoppingItems.push({...item, name: productData!.name, type: productData!.type}); 
    });
};

populateShoppingList();

export const ShoppingList = () => {
    
    const [shoppingList, setShoppingList] = useState(shoppingItems);

    const deleteItem = (id: string) => {
        const itemToDelete = shoppingList.find((item) => item.id === id);
        if (!itemToDelete) {
            return;
        }
        const removeIndex = shoppingList.indexOf(itemToDelete);
        setShoppingList((lastItems) => {
            const newItems = [...lastItems];
            newItems.splice(removeIndex, 1);
            return newItems;
        });
    }

    const shoppingListUpdate = (item: PopulatedShoppingItem, propsToUpdate: ItemPropToUpdate) => {
        console.log('itemToUpdate before: ', item, ', propsToUpdate: ', propsToUpdate);

        setShoppingList((shoppingList) => {
            const listItem = shoppingList.find((listItem => listItem.id === item.id));
            if (!listItem) {
                return shoppingList;
            }
            const updatedItemIndex = shoppingList.indexOf(listItem);
            const newList = [...shoppingList];
            const updatedItem = {...item, ...propsToUpdate};
            newList[updatedItemIndex] = updatedItem;
            console.log('itemToUpdate: ', updatedItem);
            return newList;
        });
    }

    const renderItem = ({item}: {item: PopulatedShoppingItem}) => {
        return <SwipeableItem onDeleteApproved={deleteItem} item={item}>
            <ShoppingItem item={item} onItemUpdate={(propsToUpdate) => shoppingListUpdate(item, propsToUpdate)}/>
        </SwipeableItem>; 
    };
    return (
        <>
        <View style={styles.item}>
            <Text style={[styles.itemText, styles.itemHeader]}>Product Name</Text>
            <Text style={[styles.itemText, styles.itemHeader]}>Amount</Text>
        </View>
        <FlatList
            data={shoppingList}
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
  