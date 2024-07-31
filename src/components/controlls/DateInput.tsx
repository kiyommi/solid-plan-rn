import { useState } from 'react'
import { Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker'

export const DateInput =  ({date, ...props}: {date: Date}) => {
    const [pickerDate, setPickerDate] = useState(new Date(date));
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
       <Text {...props} onPress={() => setIsOpen(true)}>{pickerDate.toLocaleDateString('en-GB')}</Text>
       <DatePicker {...props}
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