import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors.js';
import { Avatar } from '../ui/Avatar.jsx';

export const StatusRing = ({ user, hasStatus, isViewed, onPress, size = 60 }) => {
  const ringSize = size + 8;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[
        styles.ring,
        { 
          width: ringSize, 
          height: ringSize, 
          borderRadius: ringSize / 2,
          borderColor: hasStatus 
            ? (isViewed ? Colors.textSecondary : Colors.secondary)
            : 'transparent'
        }
      ]}>
        <Avatar 
          source={user.avatar} 
          size={size} 
          name={user.name}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
  },
  ring: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});