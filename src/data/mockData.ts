import { User, Post, Service, Conversation, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Master carpenter with 15+ years of experience creating custom furniture and home renovations.',
    location: 'Portland, OR',
    profession: 'Carpenter',
    skills: ['Custom Furniture', 'Home Renovation', 'Woodworking', 'Cabinet Making'],
    rating: 4.9,
    reviewCount: 127,
    isVerified: true,
    joinedDate: '2022-01-15',
    portfolioImages: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    socialLinks: {
      website: 'https://sarahwoodworks.com',
      instagram: '@sarahwoodworks'
    },
    followers: 1250,
    following: 340,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Professional photographer specializing in portraits and event photography.',
    location: 'San Francisco, CA',
    profession: 'Photographer',
    skills: ['Portrait Photography', 'Event Photography', 'Photo Editing', 'Studio Lighting'],
    rating: 4.8,
    reviewCount: 89,
    isVerified: true,
    joinedDate: '2021-08-20',
    portfolioImages: [
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    socialLinks: {
      website: 'https://marcuschen.photography',
      instagram: '@marcuschen_photo'
    },
    followers: 890,
    following: 245,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Ceramic artist creating unique pottery and home decor pieces.',
    location: 'Austin, TX',
    profession: 'Ceramic Artist',
    skills: ['Pottery', 'Ceramic Glazing', 'Sculpture', 'Home Decor'],
    rating: 4.7,
    reviewCount: 56,
    isVerified: false,
    joinedDate: '2023-03-10',
    portfolioImages: [
      'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1094768/pexels-photo-1094768.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1094770/pexels-photo-1094770.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    socialLinks: {
      instagram: '@elena_ceramics'
    },
    followers: 567,
    following: 123,
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    content: 'Just finished this custom dining table for a client! Made from reclaimed oak with a live edge. The grain pattern is absolutely stunning. What do you think? 🪵✨',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 234,
    comments: [],
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['woodworking', 'custom furniture', 'dining table'],
    isLiked: false,
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    content: 'Behind the scenes from yesterday\'s wedding shoot. The golden hour lighting was perfect! Here are some of my favorite candid moments. 📸💫',
    images: [
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 189,
    comments: [],
    createdAt: '2024-01-14T16:45:00Z',
    tags: ['wedding photography', 'golden hour', 'candid'],
    isLiked: true,
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    content: 'New ceramic collection is ready! These pieces were inspired by the desert landscapes of the Southwest. Each one is hand-thrown and glazed with my signature earth tones. 🏺',
    images: [
      'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 156,
    comments: [],
    createdAt: '2024-01-13T14:20:00Z',
    tags: ['ceramics', 'pottery', 'handmade'],
    isLiked: false,
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    title: 'Custom Furniture Design & Build',
    description: 'I create bespoke furniture pieces tailored to your space and style. From dining tables to built-in cabinets, every piece is crafted with attention to detail.',
    category: 'Woodworking',
    price: {
      min: 500,
      max: 5000,
      currency: 'USD'
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['furniture', 'custom', 'woodworking'],
    rating: 4.9,
    reviewCount: 45,
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    title: 'Professional Photography Services',
    description: 'Capturing your special moments with artistic vision. Specializing in portraits, events, and commercial photography.',
    category: 'Photography',
    price: {
      min: 200,
      max: 2000,
      currency: 'USD'
    },
    images: [
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['photography', 'portraits', 'events'],
    rating: 4.8,
    reviewCount: 32,
    createdAt: '2024-01-08T11:30:00Z'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hi! I saw your custom furniture work and I\'m interested in commissioning a dining table.',
    createdAt: '2024-01-15T14:30:00Z',
    isRead: false,
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '1',
    content: 'Your pottery pieces are beautiful! Do you take custom orders?',
    createdAt: '2024-01-14T16:45:00Z',
    isRead: true,
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[1]],
    lastMessage: mockMessages[0],
    unreadCount: 2,
  },
  {
    id: '2',
    participants: [mockUsers[2]],
    lastMessage: mockMessages[1],
    unreadCount: 0,
  }
];