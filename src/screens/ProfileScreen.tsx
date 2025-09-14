import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const { user, logout } = useAuth();

  if (!user) return null;

  const portfolioImages = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1094768/pexels-photo-1094768.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1094770/pexels-photo-1094770.jpeg?auto=compress&cs=tinysrgb&w=300',
  ];

  const renderPortfolioItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity style={styles.portfolioItem}>
      <Image source={{ uri: item }} style={styles.portfolioImage} />
    </TouchableOpacity>
  );

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
    profileHeader: {
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
    },
    profileInfo: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: spacing.md,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: colors.primary,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.white,
    },
    name: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    profession: {
      fontSize: typography.sizes.md,
      color: colors.primary,
      fontWeight: typography.weights.medium,
      marginBottom: spacing.xs,
    },
    location: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
      marginBottom: spacing.md,
    },
    bio: {
      fontSize: typography.sizes.sm,
      color: colors.text.primary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: spacing.lg,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: spacing.lg,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
    },
    statLabel: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
      marginTop: spacing.xs,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginRight: spacing.sm,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: colors.gray[100],
      borderRadius: 8,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginLeft: spacing.sm,
    },
    buttonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
    secondaryButtonText: {
      color: colors.text.primary,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
    skillsContainer: {
      marginBottom: spacing.lg,
    },
    skillsTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
    skillsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skillTag: {
      backgroundColor: colors.gray[100],
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 16,
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    skillText: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
    },
    portfolioContainer: {
      backgroundColor: colors.white,
      paddingTop: spacing.md,
    },
    portfolioTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    portfolioGrid: {
      paddingHorizontal: spacing.md,
    },
    portfolioItem: {
      width: '31%',
      aspectRatio: 1,
      marginRight: '3.5%',
      marginBottom: spacing.sm,
      borderRadius: 8,
      overflow: 'hidden',
    },
    portfolioImage: {
      width: '100%',
      height: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="settings" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              {user.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={12} color={colors.white} />
                </View>
              )}
            </View>
            
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.profession}>{user.profession}</Text>
            <Text style={styles.location}>{user.location}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.reviewCount}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {user.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.portfolioContainer}>
          <Text style={styles.portfolioTitle}>Portfolio</Text>
          <FlatList
            data={portfolioImages}
            renderItem={renderPortfolioItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.portfolioGrid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;