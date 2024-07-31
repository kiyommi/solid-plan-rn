import { View } from "react-native";
import { Text } from "@rneui/themed";
import { InventoryList } from "../components/InventoryList";
import { INVENTORY_DATA } from "../dummyData/inventory";
import { closeExpiryFilter } from "../helpers/inventoryHelper";


export const Home = ({navigation}: any) => {
    const closeExpiryItems = INVENTORY_DATA.filter((item) => closeExpiryFilter(item.expiryDate));

    const goToInventory = () => {
        navigation.navigate('Inventory')
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View>
                <Text onPress={goToInventory}>Freezer Stash - Close expiry date</Text>
                <InventoryList data={closeExpiryItems} />
            </View>
        </View>
    )
};