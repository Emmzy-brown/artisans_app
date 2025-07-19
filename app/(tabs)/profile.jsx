import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, MapPin, Star, Users, Calendar, Edit, Share, MoreHorizontal } from 'lucide-react-native';
import { Colors } from '../../constants/Colors.js';
import { Avatar } from '../../components/ui/Avatar.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { mockUsers, mockPosts } from '../../data/mockData.js';

const { width: screenWidth } = Dimensions.get('window');

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio', 'services', 'reviews'
  const [user] = useState(mockUsers[0]); // Current user
  const userPosts = mockPosts.filter(post => post.userId === user.id);

  const stats = [
    { label: 'Posts', value: '127' },
    { label: 'Followers', value: '2.3K' },
    { label: 'Following', value: '890' },
    { label: 'Reviews', value: '4.9★' },
  ];

  const skills = [
    { name: 'Pottery', level: 95 },
    { name: 'Glazing', level: 88 },
    { name: 'Wheel Throwing', level: 92 },
    { name: 'Kiln Firing', level: 85 },
  ];

  const reviews = [
    {
      id: '1',
      user: { name: 'John Smith', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
      rating: 5,
      comment: 'Amazing work! The ceramic vase exceeded my expectations.',
      date: '2 weeks ago'
    },
    {
      id: '2',
      user: { name: 'Emma Wilson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
      rating: 5,
      comment: 'Professional service and beautiful craftsmanship.',
      date: '1 month ago'
    }
  ];

  const renderPortfolioTab = () => (
    <View style={styles.portfolioGrid}>
      {userPosts.map((post) => (
        <TouchableOpacity key={post.id} style={styles.portfolioItem}>
          <Image 
            source={{ uri: post.images[0] }} 
            style={styles.portfolioImage}
            resizeMode="cover"
          />
          <View style={styles.portfolioOverlay}>
            <View style={styles.portfolioStats}>
              <Text style={styles.portfolioStat}>❤️ {post.likes}</Text>
              <Text style={styles.portfolioStat}>💬 {post.comments}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderServicesTab = () => (
    <View style={styles.servicesContainer}>
      <Card style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Custom Ceramic Dinnerware Set</Text>
        <Text style={styles.serviceDescription}>
          Handcrafted ceramic dinnerware sets made to order. Choose your colors, patterns, and size.
        </Text>
        <View style={styles.serviceDetails}>
          <Text style={styles.servicePrice}>$250</Text>
          <Text style={styles.serviceDuration}>2-3 weeks</Text>
        </View>
        <View style={styles.serviceRating}>
          <Star size={16} color={Colors.secondary} fill={Colors.secondary} />
          <Text style={styles.ratingText}>4.9 (45 reviews)</Text>
        </View>
      </Card>
    </View>
  );

  const renderReviewsTab = () => (
    <View style={styles.reviewsContainer}>
      {reviews.map((review) => (
        <Card key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Avatar source={review.user.avatar} size={40} name={review.user.name} />
            <View style={styles.reviewUserInfo}>
              <Text style={styles.reviewUserName}>{review.user.name}</Text>
              <View style={styles.reviewRating}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} color={Colors.secondary} fill={Colors.secondary} />
                ))}
              </View>
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </Card>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share size={20} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image 
            source={{ uri: user.coverImage }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.coverOverlay} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Avatar 
              source={user.avatar} 
              size={100} 
              name={user.name}
              style={styles.profileAvatar}
            />
            {user.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileProfession}>{user.profession}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.textSecondary} />
              <Text style={styles.location}>{user.location}</Text>
            </View>

            <Text style={styles.bio}>{user.bio}</Text>

            <View style={styles.profileActions}>
              <Button title="Edit Profile" variant="outline" size="small" style={styles.editButton} />
              <Button title="Share Profile" variant="primary" size="small" style={styles.shareButton} />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <Card style={styles.skillsCard}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{skill.level}%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillProgress, { width: `${skill.level}%` }]} />
              </View>
            </View>
          ))}
        </Card>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'portfolio' && styles.activeTab]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabText, activeTab === 'portfolio' && styles.activeTabText]}>
              Portfolio
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
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'portfolio' && renderPortfolioTab()}
        {activeTab === 'services' && renderServicesTab()}
        {activeTab === 'reviews' && renderReviewsTab()}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    height: 200,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 16,
  },
  profileAvatar: {
    borderWidth: 4,
    borderColor: Colors.background,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  verifiedText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  profileProfession: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
  },
  shareButton: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  skillsCard: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  skillLevel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  skillBar: {
    height: 6,
    backgroundColor: Colors.surface,
    borderRadius: 3,
  },
  skillProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
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
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  portfolioItem: {
    width: (screenWidth - 60) / 3,
    height: (screenWidth - 60) / 3,
    marginRight: 10,
    marginBottom: 10,
    position: 'relative',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  portfolioOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    justifyContent: 'flex-end',
    padding: 8,
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: 8,
  },
  portfolioStat: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: '500',
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    marginBottom: 16,
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
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  serviceDuration: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  reviewsContainer: {
    padding: 20,
  },
  reviewCard: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});