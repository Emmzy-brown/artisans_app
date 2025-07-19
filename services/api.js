import { API_CONFIG } from '../constants/Config.js';
import { getAuthToken, removeAuthToken } from './auth.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = await getAuthToken();
    
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (response.status === 401) {
        await removeAuthToken();
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    return this.request(API_CONFIG.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request(API_CONFIG.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request(API_CONFIG.AUTH.PROFILE);
  }

  // User methods
  async searchUsers(query, filters = {}) {
    const params = new URLSearchParams({ query, ...filters });
    return this.request(`${API_CONFIG.USERS.SEARCH}?${params}`);
  }

  async updateProfile(profileData) {
    return this.request(API_CONFIG.USERS.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async followUser(userId) {
    return this.request(API_CONFIG.USERS.FOLLOW, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Posts methods
  async getFeed(page = 1, limit = 20) {
    const params = new URLSearchParams({ page, limit });
    return this.request(`${API_CONFIG.POSTS.FEED}?${params}`);
  }

  async createPost(postData) {
    return this.request(API_CONFIG.POSTS.CREATE, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async likePost(postId) {
    return this.request(API_CONFIG.POSTS.LIKE, {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  }

  // Status methods
  async createStatus(statusData) {
    return this.request(API_CONFIG.STATUS.CREATE, {
      method: 'POST',
      body: JSON.stringify(statusData),
    });
  }

  async getStatuses() {
    return this.request(API_CONFIG.STATUS.LIST);
  }

  async viewStatus(statusId) {
    return this.request(API_CONFIG.STATUS.VIEW, {
      method: 'POST',
      body: JSON.stringify({ statusId }),
    });
  }

  // Messages methods
  async getConversations() {
    return this.request(API_CONFIG.MESSAGES.CONVERSATIONS);
  }

  async sendMessage(conversationId, message) {
    return this.request(API_CONFIG.MESSAGES.SEND, {
      method: 'POST',
      body: JSON.stringify({ conversationId, message }),
    });
  }

  async getMessageHistory(conversationId, page = 1) {
    const params = new URLSearchParams({ page });
    return this.request(`${API_CONFIG.MESSAGES.HISTORY}/${conversationId}?${params}`);
  }

  // Services methods
  async getServices(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`${API_CONFIG.SERVICES.LIST}?${params}`);
  }

  async createService(serviceData) {
    return this.request(API_CONFIG.SERVICES.CREATE, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async bookService(serviceId, bookingData) {
    return this.request(API_CONFIG.SERVICES.BOOK, {
      method: 'POST',
      body: JSON.stringify({ serviceId, ...bookingData }),
    });
  }
}

export const apiService = new ApiService();