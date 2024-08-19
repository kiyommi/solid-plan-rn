import { View, Text, FlatList, TextInputProps, TextInput, StyleSheet, Pressable, Modal } from "react-native";
import React, { useRef, useState } from "react";

import debounce from "lodash/debounce";

type SuggestionInputItem = {
    id: string,
    name: string,
}

interface SuggestionInputProps extends TextInputProps {
    selected: SuggestionInputItem,
    label?: string,
    textStyle: any,
    onSetSelection: ({id, name}: SuggestionInputItem) => void,
    getSuggestions: (searchTerm: string) => SuggestionInputItem[],
}

const SuggestionInput = ({
    selected: originalValue, getSuggestions, textStyle, onSetSelection
}: SuggestionInputProps) => {
  const [value, setValue] = useState(originalValue.name);
  const [searchValue, setSearchValue] = useState(originalValue.name);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionInputItem[]>([]);

  const updateSuggestions = async (searchTerm: string) => {
    console.log('searching: ', searchTerm);
    const newSuggestions  = await getSuggestions(searchTerm);
    console.log('results: ', newSuggestions);

    if (!newSuggestions || !newSuggestions.length) {
        setSuggestions([]);
        return;
    }
    setSuggestions(newSuggestions);
  };

  const searchRef = useRef<TextInput>(null);
  const debouncedUpdateSuggestions = debounce(updateSuggestions, 2000);

    const onUpdateSearchTerm = async (searchTerm: string) => {
        setSearchValue(searchTerm);
        debouncedUpdateSuggestions(searchTerm);
    };

    const onSuggestionSelected = (item: SuggestionInputItem) => {
        setIsSuggestionVisible(false);
        onSetSelection(item);
    };

    const onSuggestionCanceled = () => {
        setIsSuggestionVisible(false);
        setSearchValue(value);
    }

  const renderItem = ({item}: {item: SuggestionInputItem}) => {
    return <View>
        <Pressable onPress={()=> onSuggestionSelected(item)}>
            <Text>{item.name}</Text>
        </Pressable>
    </View>
  }

  return (
    <View style={textStyle}>
            <Pressable onPress={() => setIsSuggestionVisible(true)}>
                <Text style={styles.textStyle}>{value}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSuggestionVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={{backgroundColor: 'orange', width: '100%', }} onChangeText={onUpdateSearchTerm} value={searchValue} ref={searchRef}></TextInput>
                        <View style={{backgroundColor: 'red', width: '100%'}}>
                            <FlatList
                                data={suggestions}
                                renderItem={renderItem}
                            />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose, {position: 'absolute', bottom: 0}]}
                            onPress={onSuggestionCanceled}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      width: '80%',
      height: '80%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  

export default SuggestionInput;