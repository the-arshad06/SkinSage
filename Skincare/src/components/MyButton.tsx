import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MyButton = ({ title, onPress, disabled = false }) => { // ✅ added disabled prop
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled} // ✅ disable button when needed
      style={[styles.container, disabled && styles.disabled]} // optional greyed-out style
    >
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
      backgroundColor: 'skyblue',
      paddingVertical: 20,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
  },
  disabled: { 
    backgroundColor: '#aaa', // ✅ optional visual cue when disabled
  },
  Text:{
      fontSize: 16,
      fontWeight: '500',
  }
});

export default MyButton;
