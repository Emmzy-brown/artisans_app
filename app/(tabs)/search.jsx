import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, MapPin, Star } from 'lucide-react-native';
import { Colors } from '../../constants/Colors.js';
import { SearchBar } from '../../components/search/SearchBar.jsx';
import { Avatar } from '../../components/ui/Avatar.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { mockUsers, mockServices } from '../../data/mockData.js';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('artisans'); // 'artisans' or 'services'
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['All', 'Ceramics', 'Woodworking', 'Jewelry', 'Textiles', 'Metalwork', 'Glass'];

  const filteredArtisans = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const renderArtisanCard = (artisan) => (
    <Card key={artisan.id} style={styles.artisanCard}>
      <View style={styles.artisanHeader}>
        <Avatar 
          source={artisan.avatar} 
          size={50} 
          name={artisan.name}
          showOnlineStatus={true}
          isOnline={artisan.isOnline}
        />
        <View style={styles.artisanInfo}>
          <Text style={styles.artisanName}>{artisan.name}</Text>
          <Text style={styles.artisanProfession}>{artisan.profession}</Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={Colors.textSecondary} />
            <Text style={styles.location}>{artisan.location}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={14} color={Colors.secondary} fill={Colors.secondary} />
          <Text style={styles.rating}>{artisan.rating}</Text>
        </View>
      </View>
      
      <Text style={styles.bio} numberOfLines={2}>{artisan.bio}</Text>
      
      <View style={styles.skillsContainer}>
        {artisan.skills.slice(0, 3).map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
        {artisan.skills.length > 3 && (
          <Text style={styles.moreSkills}>+{artisan.skills.length - 3} more</Text>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <Button title="View Profile" variant="outline" size="small" style={styles.actionButton} />
        <Button title="Message" variant="primary" size="small" style={styles.actionButton} />
      </View>
    </Card>
  );

  const renderServiceCard = (service) => (
    <Card key={service.id} style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Avatar 
          source={service.user.avatar} 
          size={40} 
          name={service.user.name}
        />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.user.name}</Text>
          <Text style={styles.serviceCategory}>{service.category}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${service.price}</Text>
        </View>
      </View>
      
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceDescription} numberOfLines={2}>
        {service.description}
      </Text>
      
      <View style={styles.serviceFooter}>
        <View style={styles.serviceRating}>
          <Star size={12} color={Colors.secondary} fill={Colors.secondary} />
          <Text style={styles.ratingText}>{service.rating} ({service.reviewCount})</Text>
        </View>
        <Text style={styles.duration}>{service.duration}</Text>
      </View>
      
      <Button title="Book Service" variant="primary" size="small" style={styles.bookButton} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search artisans, services, skills..."
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'artisans' && styles.activeTab]}
          onPress={() => setActiveTab('artisans')}
        >
          <Text style={[styles.tabText, activeTab === 'artisans' && styles.activeTabText]}>
            Artisans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' && styles.activeTab]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
            Services
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              (selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)) && styles.activeCategoryChip
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              (selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)) && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'artisans' ? (
          <View style={styles.results}>
            <Text style={styles.resultsCount}>
              {filteredArtisans.length} artisans found
            </Text>
            {filteredArtisans.map(renderArtisanCard)}
          </View>
        ) : (
          <View style={styles.results}>
            <Text style={styles.resultsCount}>
              {filteredServices.length} services found
            </Text>
            {filteredServices.map(renderServiceCard)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeCategoryChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeCategoryText: {
    color: Colors.background,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
  },
  results: {
    paddingHorizontal: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  artisanCard: {
    marginBottom: 16,
  },
  artisanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  artisanInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  artisanProfession: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    color: Colors.text,
  },
  moreSkills: {
    fontSize: 12,
    color: Colors.textSecondary,
    alignSelf: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  duration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bookButton: {
    alignSelf: 'stretch',
  },
});