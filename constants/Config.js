// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-api-domain.com/api',
  TIMEOUT: 10000,
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile'
  },
  
  // User endpoints
  USERS: {
    SEARCH: '/users/search',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    FOLLOW: '/users/follow',
    UNFOLLOW: '/users/unfollow',
    FOLLOWERS: '/users/followers',
    FOLLOWING: '/users/following'
  },
  
  // Posts endpoints
  POSTS: {
    FEED: '/posts/feed',
    CREATE: '/posts/create',
    LIKE: '/posts/like',
    COMMENT: '/posts/comment',
    SHARE: '/posts/share',
    DELETE: '/posts/delete'
  },
  
  // Status endpoints
  STATUS: {
    CREATE: '/status/create',
    VIEW: '/status/view',
    DELETE: '/status/delete',
    LIST: '/status/list'
  },
  
  // Messages endpoints
  MESSAGES: {
    CONVERSATIONS: '/messages/conversations',
    SEND: '/messages/send',
    HISTORY: '/messages/history',
    MARK_READ: '/messages/mark-read'
  },
  
  // Services endpoints
  SERVICES: {
    LIST: '/services/list',
    CREATE: '/services/create',
    BOOK: '/services/book',
    SEARCH: '/services/search'
  }
};

// Third-party API keys (use environment variables)
export const THIRD_PARTY_KEYS = {
  GOOGLE_MAPS: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  PUSHER_APP_KEY: process.env.EXPO_PUBLIC_PUSHER_APP_KEY,
  PUSHER_CLUSTER: process.env.EXPO_PUBLIC_PUSHER_CLUSTER,
  STRIPE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
};