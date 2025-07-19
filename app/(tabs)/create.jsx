import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, X, Plus } from 'lucide-react-native';
import { Colors } from '../../constants/Colors.js';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';

export default function CreateScreen() {
  const [activeTab, setActiveTab] = useState('post'); // 'post', 'service', 'status'
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Service form state
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');

  const categories = ['Ceramics', 'Woodworking', 'Jewelry', 'Textiles', 'Metalwork', 'Glass', 'Other'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to add images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please add some content to your post.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Your post has been created!');
      
      // Reset form
      setPostContent('');
      setSelectedImages([]);
      setTags('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateService = async () => {
    if (!serviceTitle.trim() || !serviceDescription.trim() || !servicePrice.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Your service has been created!');
      
      // Reset form
      setServiceTitle('');
      setServiceDescription('');
      setServicePrice('');
      setServiceDuration('');
      setServiceCategory('');
      setSelectedImages([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStatus = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please add an image for your status.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Your status has been created!');
      
      // Reset form
      setSelectedImages([]);
      setPostContent('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderImagePicker = () => (
    <View style={styles.imageSection}>
      <Text style={styles.sectionTitle}>Images</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {selectedImages.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <X size={16} color={Colors.background} />
              </TouchableOpacity>
            </View>
          ))}
          
          {selectedImages.length < 5 && (
            <View style={styles.addImageButtons}>
              <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                <ImageIcon size={24} color={Colors.textSecondary} />
                <Text style={styles.addImageText}>Gallery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addImageButton} onPress={takePhoto}>
                <Camera size={24} color={Colors.textSecondary} />
                <Text style={styles.addImageText}>Camera</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );

  const renderPostForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <Text style={styles.formTitle}>Create Post</Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>What's on your mind?</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Share your latest work, process, or inspiration..."
            placeholderTextColor={Colors.textSecondary}
            value={postContent}
            onChangeText={setPostContent}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {renderImagePicker()}

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Tags (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="ceramics, handmade, pottery"
            placeholderTextColor={Colors.textSecondary}
            value={tags}
            onChangeText={setTags}
          />
        </View>

        <Button
          title="Create Post"
          onPress={handleCreatePost}
          loading={isLoading}
          style={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );

  const renderServiceForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <Text style={styles.formTitle}>Create Service</Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Service Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Custom Ceramic Dinnerware Set"
            placeholderTextColor={Colors.textSecondary}
            value={serviceTitle}
            onChangeText={setServiceTitle}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Description *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your service in detail..."
            placeholderTextColor={Colors.textSecondary}
            value={serviceDescription}
            onChangeText={setServiceDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.rowInputs}>
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>Price *</Text>
            <TextInput
              style={styles.input}
              placeholder="250"
              placeholderTextColor={Colors.textSecondary}
              value={servicePrice}
              onChangeText={setServicePrice}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.halfInput}>
            <Text style={styles.inputLabel}>Duration</Text>
            <TextInput
              style={styles.input}
              placeholder="2-3 weeks"
              placeholderTextColor={Colors.textSecondary}
              value={serviceDuration}
              onChangeText={setServiceDuration}
            />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    serviceCategory === category && styles.activeCategoryChip
                  ]}
                  onPress={() => setServiceCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    serviceCategory === category && styles.activeCategoryText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {renderImagePicker()}

        <Button
          title="Create Service"
          onPress={handleCreateService}
          loading={isLoading}
          style={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );

  const renderStatusForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <Text style={styles.formTitle}>Create Status</Text>
        <Text style={styles.formSubtitle}>Share a moment that disappears in 24 hours</Text>
        
        {renderImagePicker()}

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Caption (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a caption to your status..."
            placeholderTextColor={Colors.textSecondary}
            value={postContent}
            onChangeText={setPostContent}
          />
        </View>

        <Button
          title="Create Status"
          onPress={handleCreateStatus}
          loading={isLoading}
          style={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'post' && styles.activeTab]}
          onPress={() => setActiveTab('post')}
        >
          <Text style={[styles.tabText, activeTab === 'post' && styles.activeTabText]}>
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'service' && styles.activeTab]}
          onPress={() => setActiveTab('service')}
        >
          <Text style={[styles.tabText, activeTab === 'service' && styles.activeTabText]}>
            Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'status' && styles.activeTab]}
          onPress={() => setActiveTab('status')}
        >
          <Text style={[styles.tabText, activeTab === 'status' && styles.activeTabText]}>
            Status
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'post' && renderPostForm()}
      {activeTab === 'service' && renderServiceForm()}
      {activeTab === 'status' && renderStatusForm()}
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
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.background,
    minHeight: 100,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
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
  imageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 12,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  addImageText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 20,
  },
});