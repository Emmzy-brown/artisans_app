import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors.js';

export const Avatar = ({ 
  source, 
  size = 40, 
  name, 
  showOnlineStatus = false, 
  isOnline = false,
  style 
}) => {
  const avatarSize = { width: size, height: size, borderRadius: size / 2 };
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.avatar, avatarSize]}>
        {source ? (
          <Image source={{ uri: source }} style={[styles.image, avatarSize]} />
        ) : (
          <View style={[styles.placeholder, avatarSize]}>
            <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
              {getInitials(name)}
            </Text>
          </View>
        )}
      </View>
      
      {showOnlineStatus && (
        <View style={[
          styles.onlineIndicator,
          { 
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: size * 0.125,
            backgroundColor: isOnline ? Colors.online : Colors.offline,
            right: size * 0.05,
            bottom: size * 0.05
          }
        ]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.background,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.background,
  },
});