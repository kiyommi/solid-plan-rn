import { StyleSheet, Text, View } from "react-native";
import Input from "./controlls/Input";
import { AmountType } from "../types/enums";
import SuggestionInput from "./controlls/SuggestionInput";

import { PRODUCTS } from "../dummyData/products";


const shiftAmountType = (currentAmountType: AmountType) => {
    const newType = (currentAmountType + 1) % (Object.keys(AmountType).length/2);
    return newType;
};

const AMOUNT_TYPES = [
    {name: 'PIECE', color: '#fcf69d'},
    {name: 'KG', color: '#fc9d9d'},
    {name: 'GR', color: '#fc9dec'},
    {name: 'LT', color: '#9ddcfc'},
    {name: 'ML', color: '#bff5e6'},
];

const listColors = ['white', 'ivory'];

const ShoppingItem = ({item, index, onItemUpdate}: {item: PopulatedShoppingItem, index: number, onItemUpdate: (p: ItemPropToUpdate) => void}) => {

    const getFilteredGroceries = (searchParam: string) => {
        //TODO: replace with server request
        const lowerSearch = searchParam.toLowerCase();
        return PRODUCTS.filter((product)=> product.name.toLowerCase().includes(lowerSearch));
    };

    const updateItemNameInList = ({name, id}: {name: string, id: string}) => {
        onItemUpdate({name, id})
    }

    return (
        <View key={item.id} style={[styles.item, {backgroundColor: listColors[index % 2]}]} >
            <SuggestionInput textStyle={[styles.itemName]} getSuggestions={getFilteredGroceries}
                selected={{id: item.id, name: item.name}} onSetSelection={updateItemNameInList}
            />
            <Input maxLength={6} style={[styles.itemText, styles.itemAmount]} keyboardType="decimal-pad" selectTextOnFocus={true} onUpdateValue={(val) => onItemUpdate({amount: val})}
                value={item.amount}
            />
            <View style={[styles.itemText, styles.amountType, {backgroundColor: AMOUNT_TYPES[Number(item.amountType)].color}]}>
                <Text    
                    onPress={() => onItemUpdate({amountType: shiftAmountType(item.amountType)})}>
                        {AMOUNT_TYPES[Number(item.amountType)].name}
                </Text>
            </View>
        </View>);
}

export default ShoppingItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    itemText: {
        fontSize: 16,
        height: 24,
    },
    itemName: {  
      flex: 5,
      width: '60%',
    },
    itemAmount: {
        flex: 2,
        paddingLeft: 10,
        paddingRight: 10,
        width: 80,
        textAlign: 'right',
    },
    amountType: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderCurve: 'circular',
        borderRadius: 5,
        paddingTop: 3,
    }
  });
  