import { View, Text } from 'react-native'
import React from 'react'

export default function Chlid() {
    function showAlert() {
        // alert("Hello from Child Component")
        console.log('child');
      }
  return (
    <View>
      <Text>chlid</Text>
    </View>
  )
}
