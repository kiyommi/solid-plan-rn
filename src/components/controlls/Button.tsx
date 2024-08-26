import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ children, onPress, isFlat, style }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [style, styles.button,!isFlat && styles.regButton, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={isFlat? styles.flatButtonText : styles.regButtonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

type ButtonProps = {
    children: React.ReactNode,
    onPress: (() => void) | null | undefined,
    isFlat?: boolean,
    style?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  }, 
  regButton: {
    borderRadius: 6,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  regButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  flatButtonText: {
    color: Colors.primary500
  }
});