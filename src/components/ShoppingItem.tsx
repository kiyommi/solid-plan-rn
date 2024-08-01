import { StyleSheet, Text, TextInput, View } from "react-native";
import Input from "./controlls/Input";
import { AmountType } from "../types/enums";

const shiftAmountType = (currentAmountType: AmountType) => {
    const newType = (currentAmountType + 1) % (Object.keys(AmountType).length/2);
    return newType;
};

const ShoppingItem = ({item, onItemUpdate}: {item: PopulatedShoppingItem, onItemUpdate: (p: ItemPropToUpdate) => void}) => {
    console.log('itemAmount: ', item.amount);

    return (
        <View key={item.id} style={styles.item} >
            <Text style={styles.itemText}>{item.name}</Text>
            <Input keyboardType={"number-pad"} onUpdateValue={(val) => onItemUpdate({amount: val})}
                value={item.amount}
            />
            <View>
                <Text
                    style={styles.itemText}
                    onPress={() => onItemUpdate({amountType: shiftAmountType(item.amountType)})}>
                        {item.amountType}
                </Text>
            </View>
        </View>);
}

export default ShoppingItem;

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
  });
  