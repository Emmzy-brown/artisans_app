import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { User } from '../types';

interface UserCardProps {
  user: User;
  style?: any;
}

const UserCard: React.FC<UserCardProps> = ({ user, style }) => {
  const { colors, spacing, typography, shadows } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: spacing.md,
      ...shadows.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: spacing.sm,
    },
    userInfo: {
      flex: 1,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
    },
    verifiedIcon: {
      marginLeft: spacing.xs,
    },
    profession: {
      fontSize: typography.sizes.sm,
      color: colors.primary,
      fontWeight: typography.weights.medium,
    },
    location: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
    },
    bio: {
      fontSize: typography.sizes.sm,
      color: colors.text.primary,
      lineHeight: 18,
      marginBottom: spacing.sm,
    },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    statText: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
      marginLeft: spacing.xs,
    },
    skills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing.sm,
    },
    skillTag: {
      backgroundColor: colors.gray[100],
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 12,
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    skillText: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    followButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginRight: spacing.sm,
    },
    messageButton: {
      flex: 1,
      backgroundColor: colors.gray[100],
      borderRadius: 8,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
    followButtonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
    messageButtonText: {
      color: colors.text.primary,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.isVerified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary}
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <Text style={styles.profession}>{user.profession}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>
      </View>

      <Text style={styles.bio} numberOfLines={2}>
        {user.bio}
      </Text>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="star" size={14} color={colors.secondary} />
          <Text style={styles.statText}>{user.rating}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubbles" size={14} color={colors.text.secondary} />
          <Text style={styles.statText}>{user.reviewCount} reviews</Text>
        </View>
      </View>

      <View style={styles.skills}>
        {user.skills.slice(0, 3).map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
        {user.skills.length > 3 && (
          <View style={styles.skillTag}>
            <Text style={styles.skillText}>+{user.skills.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;