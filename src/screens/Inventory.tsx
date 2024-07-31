import { View } from "react-native";
import { Text } from "@rneui/themed";
import { InventoryList } from "../components/InventoryList";
import { INVENTORY_DATA } from "../dummyData/inventory";

export const Inventory = ({user}: any) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View>
                <Text>Freezer Stash</Text>
                <InventoryList data={INVENTORY_DATA} isEditMode />
            </View>
        </View>
    )
};