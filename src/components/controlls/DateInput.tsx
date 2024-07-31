import { useState } from 'react'
import { Text, TextProps } from 'react-native';
import DatePicker from 'react-native-date-picker'

interface DateInputProps extends TextProps {
  date: Date;
}

export const DateInput =  ({date, ...props}: DateInputProps) => {
    const [pickerDate, setPickerDate] = useState(new Date(date));
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
       <Text {...props} onPress={() => setIsOpen(true)}>{pickerDate.toLocaleDateString('en-GB')}</Text>
       <DatePicker
          modal
          mode="date"
          open={isOpen}
          date={pickerDate}
          onConfirm={(date) => {
            setIsOpen(false)
            setPickerDate(date)
          }}
          onCancel={() => {
            setIsOpen(false)
          }}
        /> 
      </>
    )
  }