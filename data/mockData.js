export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    profession: 'Ceramic Artist',
    location: 'Portland, OR',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverImage: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Creating beautiful handmade ceramics for 10+ years. Specializing in functional pottery and custom pieces.',
    skills: ['Pottery', 'Glazing', 'Wheel Throwing', 'Kiln Firing'],
    rating: 4.9,
    reviewCount: 127,
    followers: 2340,
    following: 890,
    isOnline: true,
    lastSeen: new Date(),
    verified: true
  },
  {
    id: '2',
    name: 'Marcus Chen',
    username: '@marcuschen',
    profession: 'Woodworker',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Custom furniture maker and wood sculptor. Bringing your vision to life with sustainable materials.',
    skills: ['Furniture Making', 'Wood Carving', 'Restoration', 'Design'],
    rating: 4.8,
    reviewCount: 89,
    followers: 1890,
    following: 456,
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
    verified: true
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    username: '@elenarodriguez',
    profession: 'Jewelry Designer',
    location: 'Miami, FL',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverImage: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Handcrafted jewelry with a modern twist. Each piece tells a unique story.',
    skills: ['Metalworking', 'Stone Setting', 'Design', 'Repair'],
    rating: 4.9,
    reviewCount: 203,
    followers: 3450,
    following: 1200,
    isOnline: true,
    lastSeen: new Date(),
    verified: true
  }
];

export const mockPosts = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    content: 'Just finished this beautiful ceramic vase! The glazing technique took weeks to perfect, but I\'m so happy with the result. 🏺✨',
    images: [
      'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1047538/pexels-photo-1047538.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isLiked: false,
    tags: ['ceramics', 'handmade', 'pottery']
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    content: 'Working on a custom dining table for a client. The wood grain on this walnut is absolutely stunning! 🌳',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 189,
    comments: 23,
    shares: 8,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isLiked: true,
    tags: ['woodworking', 'furniture', 'custom']
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    content: 'New collection dropping next week! These emerald earrings are my favorite piece. What do you think? 💎',
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    likes: 456,
    comments: 78,
    shares: 34,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isLiked: false,
    tags: ['jewelry', 'emerald', 'handcrafted']
  }
];

export const mockStatuses = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    type: 'image',
    content: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Working late in the studio tonight! 🌙',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    expiresAt: new Date(Date.now() + 23.5 * 60 * 60 * 1000),
    views: 45,
    isViewed: false
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    type: 'text',
    content: 'Just got a huge order for custom cabinets! Excited to start this project 🔨',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    views: 23,
    isViewed: true
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    type: 'image',
    content: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Behind the scenes of my jewelry making process ✨',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    views: 67,
    isViewed: false
  }
];

export const mockConversations = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: '1',
      senderId: '2',
      content: 'Thanks for the pottery tips! Really helpful.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: '2',
      senderId: '3',
      content: 'Would love to collaborate on a project!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    unreadCount: 0
  }
];

export const mockServices = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    title: 'Custom Ceramic Dinnerware Set',
    description: 'Handcrafted ceramic dinnerware sets made to order. Choose your colors, patterns, and size.',
    price: 250,
    duration: '2-3 weeks',
    category: 'Ceramics',
    images: [
      'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    rating: 4.9,
    reviewCount: 45,
    isAvailable: true
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    title: 'Custom Furniture Design & Build',
    description: 'From concept to completion, I create custom furniture pieces that fit your space perfectly.',
    price: 800,
    duration: '4-6 weeks',
    category: 'Woodworking',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    rating: 4.8,
    reviewCount: 32,
    isAvailable: true
  }
];