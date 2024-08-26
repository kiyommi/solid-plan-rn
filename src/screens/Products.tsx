import { StyleSheet, Text, View } from "react-native";
import Input from "../components/controlls/Input";
import { useState } from "react";

import { ProductType } from "../types/enums";
import { ButtonGroup } from "@rneui/themed";

import { post } from "../helpers/httpHelper";

import Button from "../components/controlls/Button";
import { serverUrl } from "../../consts";

const buttons = Object.values(ProductType).filter(value => typeof value === 'string') as string[];


export const Products = ({user}: any) => {
    const [name, setName] = useState('');
    const [type, setType] = useState(ProductType.OTHER);
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleMessage = (message: string) => {
        setMessage(message);
        setTimeout(() => setMessage(''), 3000);
    }

    const onCreateProduct = async () => {
        const newProduct = {name, type, imageUrl};
        const response = await post(`${serverUrl}/product/create`, newProduct);
        if (response.error) {
            handleMessage(response.error);
        } else {
            handleMessage('save succeeded');
        }
    };


    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', width: '100%',
                backgroundColor: 'gray',
            }}>
                <Input style={styles.input} value={name} label={'Product name'} onUpdateValue={setName} />
                <ButtonGroup onPress={setType}
      selectedIndex={type}
      buttons={buttons}
      containerStyle={{height: 100}}/>
                <Input style={styles.input} value={imageUrl} label={'Image url'} onUpdateValue={setImageUrl}/>
            <Button onPress={onCreateProduct}>
                                Create
                            </Button>
            <Text>{message}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
  });
  