import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockData';

const StoryList = () => {
  const { colors, spacing, typography } = useTheme();
  const { user } = useAuth();

  const stories = [
    { id: 'add', user: user, isAdd: true },
    ...mockUsers.map(u => ({ id: u.id, user: u, isAdd: false }))
  ];

  const styles = StyleSheet.create({
    container: {
      paddingVertical: spacing.md,
    },
    storyItem: {
      alignItems: 'center',
      marginHorizontal: spacing.sm,
      width: 70,
    },
    storyImageContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: spacing.xs,
      position: 'relative',
    },
    addStoryContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.gray[100],
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.gray[200],
      borderStyle: 'dashed',
    },
    storyImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    storyGradient: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addIcon: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      backgroundColor: colors.primary,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.white,
    },
    storyName: {
      fontSize: typography.sizes.xs,
      color: colors.text.primary,
      textAlign: 'center',
      maxWidth: 70,
    },
    addText: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {stories.map((story) => (
        <TouchableOpacity key={story.id} style={styles.storyItem}>
          {story.isAdd ? (
            <View style={styles.storyImageContainer}>
              <View style={styles.addStoryContainer}>
                <Ionicons name="add" size={24} color={colors.gray[500]} />
              </View>
              <View style={styles.addIcon}>
                <Ionicons name="add" size={12} color={colors.white} />
              </View>
            </View>
          ) : (
            <View style={styles.storyImageContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.storyGradient}
              >
                <Image
                  source={{ uri: story.user?.avatar }}
                  style={styles.storyImage}
                />
              </LinearGradient>
            </View>
          )}
          <Text style={story.isAdd ? styles.addText : styles.storyName} numberOfLines={1}>
            {story.isAdd ? 'Your Story' : story.user?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StoryList;