import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import UserCard from '../components/UserCard';
import ServiceCard from '../components/ServiceCard';
import { mockUsers, mockServices } from '../data/mockData';

const DiscoverScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'artisans' | 'services'>('artisans');
  const [users] = useState(mockUsers);
  const [services] = useState(mockServices);

  const categories = [
    'All',
    'Carpenter',
    'Photographer',
    'Artist',
    'Plumber',
    'Electrician',
    'Designer',
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray[200],
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.gray[100],
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      paddingVertical: spacing.sm,
      fontSize: typography.sizes.md,
      color: colors.text.primary,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: spacing.md,
    },
    tab: {
      flex: 1,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.medium,
      color: colors.text.secondary,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: typography.weights.semibold,
    },
    categoriesContainer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.white,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginRight: spacing.sm,
      backgroundColor: colors.gray[100],
      borderRadius: 20,
    },
    activeCategoryButton: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: typography.sizes.sm,
      color: colors.text.secondary,
    },
    activeCategoryText: {
      color: colors.white,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md,
    },
    gridContainer: {
      paddingVertical: spacing.md,
    },
  });

  const renderUserItem = ({ item }: { item: any }) => (
    <UserCard user={item} style={{ marginBottom: spacing.md }} />
  );

  const renderServiceItem = ({ item }: { item: any }) => (
    <ServiceCard service={item} style={{ marginBottom: spacing.md }} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.gray[500]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search artisans or services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'artisans' && styles.activeTab]}
            onPress={() => setActiveTab('artisans')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'artisans' && styles.activeTabText,
              ]}
            >
              Artisans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'services' && styles.activeTab]}
            onPress={() => setActiveTab('services')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'services' && styles.activeTabText,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                category === 'All' && styles.activeCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === 'All' && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {activeTab === 'artisans' ? (
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
          />
        ) : (
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;