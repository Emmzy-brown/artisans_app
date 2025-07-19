import { THIRD_PARTY_KEYS } from '../constants/Config.js';

export const uploadImageToCloudinary = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    formData.append('upload_preset', THIRD_PARTY_KEYS.CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', THIRD_PARTY_KEYS.CLOUDINARY_CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${THIRD_PARTY_KEYS.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data = await response.json();
    
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    // This would typically be done on the backend for security
    // Frontend should call your API to delete the image
    console.log('Delete image:', publicId);
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
};