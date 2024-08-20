import { View, Text, FlatList, TextInputProps, TextInput, StyleSheet, Pressable, Modal } from "react-native";
import React, { useRef, useState, useEffect } from "react";

import debounce from "lodash/debounce";
import { Colors } from "../../constants/styles";
import Button from "./Button";

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
    isEditable?: boolean,
}

const SuggestionInput = ({
    selected: originalValue, getSuggestions, textStyle, onSetSelection, isEditable = false
}: SuggestionInputProps) => {
  const [value] = useState(originalValue.name);
  const [searchValue, setSearchValue] = useState(originalValue.name);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionInputItem[]>([]);
  const shouldShowAddButton = isEditable && searchValue && !suggestions?.length;

  useEffect(() => {
    if (isSuggestionVisible) {
        updateSuggestions(searchValue);
    }
  }, [isSuggestionVisible]);

  const updateSuggestions = async (searchTerm: string) => {
    const newSuggestions  = await getSuggestions(searchTerm);

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

    const onAddNewSuggestion = () => {
        const newItem = { id: `temp-${searchValue}`, name: searchValue};
        onSuggestionSelected(newItem);
    }

  const renderItem = ({item}: {item: SuggestionInputItem}) => {
    return <View>
                <Pressable onPress={()=> onSuggestionSelected(item)}>
                    <Text style={styles.suggestionItem}>{item.name}</Text>
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
                        <TextInput style={styles.searchBox} onChangeText={onUpdateSearchTerm} value={searchValue} ref={searchRef}></TextInput>
                        <View style={styles.suggestionsContainer}>
                            <FlatList
                                data={suggestions}
                                renderItem={renderItem}
                            />
                        </View>
                        {shouldShowAddButton &&
                            <Button isFlat
                                onPress={onAddNewSuggestion}>
                                Add new
                            </Button>
                        }
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
    searchBox: {
        borderRadius: 3,
        borderWidth: 2,
        borderColor: Colors.primary800,
        width: '100%',
        padding: 10,
    },
    suggestionItem: {
        padding: 12,
        fontSize: 16, 
        borderBottomColor: Colors.primary100,
        borderBottomWidth: 1
    },
    suggestionsContainer: {
        backgroundColor: Colors.primary100,
        width: '100%',
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