import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from '@rneui/themed';

import SwipeableItem from "../components/controlls/SwipeableItem";
import ShoppingItem from "../components/ShoppingItem";

import { Colors } from "../constants/styles";
import { AmountType } from "../types/enums";
import { useProducts } from "../context/Product.context";

import localStorage from '../storage/localStorage';
import { get, put } from "../helpers/httpHelper";
import { serverUrl } from "../../consts";

localStorage.sync = {
    async shoppingList() {
        console.log('SYNCING LIST');
        const { user, error } = await get(`${serverUrl}/auth/user`);
        if (user) {
            localStorage.save({
            key: 'shoppingList',
            data: user.shoppingList,
            });
            return user.shoppingList;
        } else {
            console.log('error while syncing list');
        }
    }
  };

  const loadLocalShoppingList = async() => {
    return localStorage.load({
        key: 'shoppingList',
      })
      .then(ret => {
        console.log('FROM LOCAL: ', ret);
        return ret.shoppingList;
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
};

const saveLocalShoppingList = async(shoppingList: ShoppingItem[]) => {
    console.log('SAVING TO LOCAL: ', shoppingList);
    localStorage.save({
        key: 'shoppingList',
        data: {
          shoppingList,
          timestamp: new Date(),
        },
        expires: null,
      });
};

const formatShoppingList = (list: PopulatedShoppingItem[]) => {
    console.log('LIST:', "\n");
    list.forEach(item => {
        console.log(item.name,' - ',item.amount, "\n");
    }); 
};

const convertListForServer = (list: PopulatedShoppingItem[]) => {
    const validShoppingList = list.filter(item => item.name && item.amount);
    const mappedList = validShoppingList.map(item => ({id: item.id, amount: Number(item.amount), amountType: item.amountType}) );
    return mappedList;
}

export const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState<PopulatedShoppingItem[]>([{id: '1', type: '1', name: 'lalal', amount: '1', amountType: '1'}]);

    const [message, setMessage] = useState('');
    const {products} = useProducts();

    const saveRemoteShoppingList = async(list = shoppingList) => {
        console.log('saving to server: ');
        formatShoppingList(list);
        const listToSave = convertListForServer(list);
        const response = await put(`${serverUrl}/user/shopping-list`, {shoppingList: listToSave});
        if (response.user){
            setMessage("saved");
        } 

        setMessage(response.message || response.error);
    };

    const convertListForClient = (list: ShoppingItem[]) => {
        const populatedList = [] as PopulatedShoppingItem[];
        list.forEach((item) => {
            const productData = products.find((product) => product.id === item.id);
            productData && populatedList.push({...item, amount: item.amount.toString(), name: productData!.name, type: productData!.type}); 
        });
        return populatedList;
    };

    

    useEffect(()=>{
        loadLocalShoppingList().then((list) => {
            setShoppingList(convertListForClient(list));
        });
        const savingInterval = setInterval(saveRemoteShoppingList, 1000*60*60*24); // 24 hours
        return () => {
            console.log('unmount: []');
            clearInterval(savingInterval);
            loadLocalShoppingList().then((list) => {
                saveRemoteShoppingList(list);
            });
        }
    }, []);


    useEffect(()=> {
        console.log('updated: [shoppingList]');
        formatShoppingList(shoppingList);
    }, [shoppingList]);

    useEffect(()=>{
        if (message) {
            const messageTimer = setTimeout(()=>{setMessage('')}, 3000);
            return () => {
                clearTimeout(messageTimer);
            }
        }
    }, [message]);

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
        console.log('UPDATING!');
        setShoppingList((shoppingList) => {
            const listItem = shoppingList.find((listItem => listItem.id === item.id));
            if (!listItem) {
                return shoppingList;
            }
            const updatedItemIndex = shoppingList.indexOf(listItem);
            const newList = [...shoppingList];
            const updatedItem = {...item, ...propsToUpdate};
            newList[updatedItemIndex] = updatedItem;
            saveLocalShoppingList(newList);
            return newList;
        });
    }

    const addItem = () => {
        setShoppingList((lastItems) => {
            const newItems = [...lastItems];
            newItems.push({
                id: 'temp',
                name: '',
                type: 0,
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
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: Colors.primary800,
        borderRadius: 40,
        padding: 10
    }
  });
  