import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';

const CreateScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();

  const createOptions = [
    {
      id: 'post',
      title: 'Create Post',
      description: 'Share your latest work or project',
      icon: 'camera',
      color: colors.primary,
      onPress: () => navigation.navigate('CreatePost' as never),
    },
    {
      id: 'service',
      title: 'Add Service',
      description: 'List a new service you offer',
      icon: 'briefcase',
      color: colors.secondary,
      onPress: () => navigation.navigate('CreateService' as never),
    },
    {
      id: 'story',
      title: 'Share Story',
      description: 'Add to your story timeline',
      icon: 'add-circle',
      color: colors.success,
      onPress: () => console.log('Create story'),
    },
  ];

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
    },
    headerTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: colors.text.primary,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl,
    },
    optionCard: {
      backgroundColor: colors.white,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    optionDescription: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
    },
    arrow: {
      marginLeft: spacing.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create</Text>
      </View>

      <View style={styles.content}>
        {createOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={option.onPress}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${option.color}20` },
              ]}
            >
              <Ionicons name={option.icon as any} size={28} color={option.color} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.gray[400]}
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;