import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors.js';
import { PostCard } from '../../components/feed/PostCard.jsx';
import { StatusRing } from '../../components/status/StatusRing.jsx';
import { StatusViewer } from '../../components/status/StatusViewer.jsx';
import { mockPosts, mockStatuses, mockUsers } from '../../data/mockData.js';

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);
  const [statuses, setStatuses] = useState(mockStatuses);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusViewerVisible, setStatusViewerVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleStatusPress = (status) => {
    setSelectedStatus(status);
    setStatusViewerVisible(true);
  };

  const handleStatusNext = () => {
    const currentIndex = statuses.findIndex(s => s.id === selectedStatus?.id);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setSelectedStatus(statuses[nextIndex]);
  };

  const handleStatusPrevious = () => {
    const currentIndex = statuses.findIndex(s => s.id === selectedStatus?.id);
    const prevIndex = currentIndex === 0 ? statuses.length - 1 : currentIndex - 1;
    setSelectedStatus(statuses[prevIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Artisans</Text>
        <Text style={styles.subtitle}>Discover Amazing Craftsmanship</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Status Stories */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statusContainer}
          >
            {/* Add Status Button */}
            <TouchableOpacity style={styles.addStatusContainer}>
              <View style={styles.addStatusButton}>
                <Text style={styles.addStatusText}>+</Text>
              </View>
              <Text style={styles.addStatusLabel}>Your Story</Text>
            </TouchableOpacity>

            {/* Status Rings */}
            {statuses.map((status) => (
              <View key={status.id} style={styles.statusItem}>
                <StatusRing
                  user={status.user}
                  hasStatus={true}
                  isViewed={status.isViewed}
                  onPress={() => handleStatusPress(status)}
                />
                <Text style={styles.statusName} numberOfLines={1}>
                  {status.user.name.split(' ')[0]}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Feed */}
        <View style={styles.feedSection}>
          <Text style={styles.sectionTitle}>Feed</Text>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={(postId) => console.log('Comment on:', postId)}
              onShare={(postId) => console.log('Share:', postId)}
              onUserPress={(user) => console.log('User pressed:', user.name)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Status Viewer */}
      <StatusViewer
        status={selectedStatus}
        visible={statusViewerVisible}
        onClose={() => setStatusViewerVisible(false)}
        onNext={handleStatusNext}
        onPrevious={handleStatusPrevious}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
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
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  statusSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statusContainer: {
    paddingHorizontal: 20,
  },
  addStatusContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  addStatusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addStatusText: {
    fontSize: 24,
    color: Colors.textSecondary,
    fontWeight: '300',
  },
  addStatusLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  statusItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  statusName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 60,
  },
  feedSection: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
});