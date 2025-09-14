import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const { width } = Dimensions.get('window');

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { colors, spacing, typography } = useTheme();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      marginBottom: spacing.sm,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: spacing.sm,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
    },
    userMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profession: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
      marginRight: spacing.xs,
    },
    timestamp: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
    },
    verifiedIcon: {
      marginLeft: spacing.xs,
    },
    moreButton: {
      padding: spacing.xs,
    },
    content: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
    },
    contentText: {
      fontSize: typography.sizes.md,
      color: colors.text.primary,
      lineHeight: 20,
    },
    imageContainer: {
      marginBottom: spacing.sm,
    },
    image: {
      width: width,
      height: width * 0.75,
      resizeMode: 'cover',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: spacing.lg,
    },
    actionText: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
      marginLeft: spacing.xs,
    },
    likedText: {
      color: colors.error,
    },
    tags: {
      flexDirection: 'row',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
    tag: {
      backgroundColor: colors.gray[100],
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 12,
      marginRight: spacing.xs,
    },
    tagText: {
      fontSize: typography.sizes.xs,
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.isVerified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary}
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <View style={styles.userMeta}>
            <Text style={styles.profession}>{post.user.profession}</Text>
            <Text style={styles.timestamp}>• {formatTime(post.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>
      </View>

      {post.images.length > 0 && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.images[0] }} style={styles.image} />
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? colors.error : colors.text.secondary}
          />
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likesCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.text.secondary} />
          <Text style={styles.actionText}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={22} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {post.tags.length > 0 && (
        <View style={styles.tags}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PostCard;