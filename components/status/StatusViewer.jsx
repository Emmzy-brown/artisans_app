import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { X, Eye } from 'lucide-react-native';
import { Colors } from '../../constants/Colors.js';
import { Avatar } from '../ui/Avatar.jsx';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const StatusViewer = ({ status, visible, onClose, onNext, onPrevious }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    if (!visible || isPaused) return;

    const duration = 5000; // 5 seconds
    const interval = 50;
    const increment = interval / duration;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          onNext?.();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [visible, isPaused, onNext]);

  useEffect(() => {
    if (visible) {
      setProgress(0);
    }
  }, [visible, status?.id]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  if (!status) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar 
              source={status.user.avatar} 
              size={32} 
              name={status.user.name}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{status.user.name}</Text>
              <Text style={styles.timestamp}>{formatTimeAgo(status.timestamp)}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={Colors.background} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <TouchableOpacity 
          style={styles.content}
          activeOpacity={1}
          onPressIn={() => setPaused(true)}
          onPressOut={() => setPaused(false)}
        >
          {status.type === 'image' ? (
            <Image 
              source={{ uri: status.content }} 
              style={styles.statusImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.textContent}>
              <Text style={styles.statusText}>{status.content}</Text>
            </View>
          )}
          
          {status.caption && (
            <View style={styles.captionContainer}>
              <Text style={styles.caption}>{status.caption}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.viewsContainer}>
            <Eye size={16} color={Colors.background} />
            <Text style={styles.viewsText}>{status.views} views</Text>
          </View>
        </View>

        {/* Navigation areas */}
        <TouchableOpacity 
          style={styles.leftArea} 
          onPress={onPrevious}
          activeOpacity={1}
        />
        <TouchableOpacity 
          style={styles.rightArea} 
          onPress={onNext}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.background,
    borderRadius: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.background,
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statusImage: {
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  textContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.background,
    textAlign: 'center',
    lineHeight: 32,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
  },
  caption: {
    fontSize: 16,
    color: Colors.background,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    color: Colors.background,
    marginLeft: 4,
  },
  leftArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.3,
  },
  rightArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.3,
  },
});