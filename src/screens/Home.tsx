import { View } from "react-native";
import { Text } from "@rneui/themed";
import { InventoryList } from "../components/InventoryList";
import { INVENTORY_DATA } from "../dummyData/inventory";
import { closeExpiryFilter } from "../helpers/inventoryHelper";


export const Home = ({navigation, route}: any) => {
    const closeExpiryItems = INVENTORY_DATA.filter((item) => closeExpiryFilter(item.expiryDate));

    const goToInventory = () => {
        navigation.navigate('Inventory')
    }

    const goToShoppingList = () => {
        navigation.navigate('ShoppingList')
    }

    const goToProducts = () => {
        navigation.navigate('Products')
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
            }}>
            <View style={{height: 200}}>
                <Text onPress={goToInventory}>Freezer Stash - Close expiry date</Text>
                <InventoryList data={closeExpiryItems} />
            </View>

            <View>
                <Text onPress={goToProducts}>Create new products</Text>
            </View>

            <View>
                <Text onPress={goToShoppingList}>Shopping List</Text>
            </View>
        </View>
    )
};