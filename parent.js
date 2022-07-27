import {View, Text, Button} from 'react-native';
import React, {useRef, forwardRef, useImperativeHandle} from 'react';
const ChildComp = forwardRef(ref => {
  useImperativeHandle(ref, () => ({
    showAlert() {
      console.log('child called');
    },
  }));
  return <View></View>;
});

function Parent() {
  const childCompRef = useRef();
  return (
    <View>
      <Button
        title="Press Me"
        onPress={() => childCompRef.current.showAlert()}></Button>
      <ChildComp ref={childCompRef} />
    </View>
  );
}

export default Parent;
