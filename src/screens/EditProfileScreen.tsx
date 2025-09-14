import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const EditProfileScreen = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile Screen</Text>
    </View>
  );
};

export default EditProfileScreen;