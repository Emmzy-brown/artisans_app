import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { mockConversations } from '../data/mockData';
import { Conversation } from '../types';

const MessagesScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const [conversations] = useState(mockConversations);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return 'now';
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      return `${Math.floor(hours / 24)}d`;
    }
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => {
    const otherParticipant = item.participants[0]; // Assuming current user is not first

    return (
      <TouchableOpacity style={styles.conversationItem}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: otherParticipant.avatar }} style={styles.avatar} />
          {item.unreadCount > 0 && (
            <View style={styles.onlineIndicator} />
          )}
        </View>
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.participantName}>{otherParticipant.name}</Text>
            <Text style={styles.timestamp}>
              {formatTime(item.lastMessage.createdAt)}
            </Text>
          </View>
          
          <View style={styles.messagePreview}>
            <Text
              style={[
                styles.lastMessage,
                item.unreadCount > 0 && styles.unreadMessage,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage.content}
            </Text>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>
                  {item.unreadCount > 9 ? '9+' : item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray[200],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
    },
    conversationItem: {
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.gray[100],
    },
    avatarContainer: {
      position: 'relative',
      marginRight: spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.success,
      borderWidth: 2,
      borderColor: colors.white,
    },
    conversationContent: {
      flex: 1,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    participantName: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
    },
    timestamp: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
    },
    messagePreview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      flex: 1,
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
    },
    unreadMessage: {
      color: colors.text.primary,
      fontWeight: typography.weights.medium,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
    unreadCount: {
      color: colors.white,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.bold,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;