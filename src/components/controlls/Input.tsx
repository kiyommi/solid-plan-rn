import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  isSecure,
  onUpdateValue,
  value,
  isInvalid,
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

type InputProps = {
    label: string,
    keyboardType?: KeyboardTypeOptions,
    isSecure?: boolean,
    onUpdateValue: (value: string) => void,
    value: string,
    isInvalid?: boolean,
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});