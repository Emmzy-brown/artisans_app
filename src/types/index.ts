export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  profession: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  joinedDate: string;
  portfolioImages: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
  };
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  tags: string[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Service {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  category: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'service_inquiry';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedId?: string;
}

export type RootStackParamList = {
  Main: undefined;
  Profile: { userId: string };
  PostDetail: { postId: string };
  ServiceDetail: { serviceId: string };
  Chat: { conversationId: string };
  CreatePost: undefined;
  CreateService: undefined;
  EditProfile: undefined;
  Search: undefined;
  Notifications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Create: undefined;
  Messages: undefined;
  Profile: undefined;
};