import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from '@rneui/themed';

import SwipeableItem from "../components/controlls/SwipeableItem";
import ShoppingItem from "../components/ShoppingItem";
import { SHOPPING_ITEMS } from "../dummyData/shoppingList";

import { Colors } from "../constants/styles";
import { AmountType } from "../types/enums";
import { useProducts } from "../context/Product.context";

export const ShoppingList = () => {
    
    const [shoppingList, setShoppingList] = useState(SHOPPING_ITEMS);
    const {products} = useProducts();


    const populateShoppingList = () => {
        const populatedList = [] as PopulatedShoppingItem[];
        SHOPPING_ITEMS.forEach((item) => {
            const productData = products.find((product) => product._id === item.id);
            productData && populatedList.push({...item, name: productData!.name, type: productData!.type}); 
        });
        setShoppingList(populatedList);
    };

    useMemo(populateShoppingList, []);

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

        setShoppingList((shoppingList) => {
            const listItem = shoppingList.find((listItem => listItem.id === item.id));
            if (!listItem) {
                return shoppingList;
            }
            const updatedItemIndex = shoppingList.indexOf(listItem);
            const newList = [...shoppingList];
            const updatedItem = {...item, ...propsToUpdate};
            newList[updatedItemIndex] = updatedItem;
            return newList;
        });
    }

    const addItem = () => {
        setShoppingList((lastItems) => {
            const newItems = [...lastItems];
            newItems.push({
                id: 'temp',
                name: '',
                type: undefined,
                amount: '1',
                amountType: AmountType.PIECE,
            });
            return newItems;
        });
        //TODO: when saving totaly new grocery item, server should notify admin to add it to the grocery bank.
    };

    const renderItem = ({item, index}: {item: PopulatedShoppingItem, index: number}) => {
        return <SwipeableItem onDeleteApproved={deleteItem} item={item}>
            <ShoppingItem  index={index} item={item} onItemUpdate={(propsToUpdate) => shoppingListUpdate(item, propsToUpdate)}/>
        </SwipeableItem>; 
    };
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={[styles.itemText, styles.itemHeader, styles.itemName]}>Product Name</Text>
                <Text style={[styles.itemText, styles.itemHeader, styles.itemAmount]}>Amount</Text>
            </View>
            <FlatList
                data={shoppingList}
                renderItem={renderItem}
            />
            <TouchableOpacity onPress={addItem} style={styles.addButton}>
                <Icon id="AddItem" name="add" type='ionicon' color='white' size={40}/>
            </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
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
    itemName: {
        flex: 2,
    },
    itemAmount: {
    },
    listHeaders: {
        fontSize: 18,
        fontWeight: '800',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.primary800,
        borderRadius: 40,
        padding: 10
    }
  });
  