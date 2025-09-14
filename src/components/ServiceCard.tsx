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
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  style?: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, style }) => {
  const { colors, spacing, typography, shadows } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 12,
      overflow: 'hidden',
      ...shadows.sm,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    content: {
      padding: spacing.md,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: spacing.sm,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.medium,
      color: colors.text.primary,
    },
    title: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    description: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
      lineHeight: 18,
      marginBottom: spacing.sm,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    price: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: colors.primary,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
      marginLeft: spacing.xs,
    },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing.sm,
    },
    tag: {
      backgroundColor: colors.gray[100],
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 12,
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    tagText: {
      fontSize: typography.sizes.xs,
      color: colors.text.secondary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contactButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      marginRight: spacing.sm,
    },
    saveButton: {
      backgroundColor: colors.gray[100],
      borderRadius: 8,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center',
    },
    contactButtonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: service.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: service.user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{service.user.name}</Text>
          </View>
        </View>

        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${service.price.min} - ${service.price.max}
          </Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color={colors.secondary} />
            <Text style={styles.ratingText}>
              {service.rating} ({service.reviewCount})
            </Text>
          </View>
        </View>

        <View style={styles.tags}>
          {service.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;