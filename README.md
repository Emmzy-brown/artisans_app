# Artisans Mobile App

A comprehensive social platform for artisans that combines the best features of LinkedIn, Instagram, and WhatsApp with status updates. Built with React Native and Expo.

## 🎨 Features

### Core Functionality
- **Professional Networking** - LinkedIn-style profiles with skills, experience, and reviews
- **Visual Portfolio** - Instagram-like feed for showcasing artisan work
- **Real-time Messaging** - WhatsApp-style chat with artisans and clients
- **Status Stories** - 24-hour disappearing status updates
- **Service Marketplace** - Browse and book artisan services
- **Advanced Search** - Find artisans by skills, location, and categories

### Key Screens
1. **Home Feed** - Discover amazing artisan work and status stories
2. **Search** - Find artisans with advanced filtering options
3. **Create** - Post portfolio items, services, or status updates
4. **Messages** - Real-time conversations with other users
5. **Profile** - Professional profiles with portfolio, services, and reviews

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator (or Expo Go app on your device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd artisans-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your API keys and configuration in the `.env` file.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 🔧 API Integration Guide

### Step 1: Backend Setup

Your backend should provide these endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user profile

#### Users
- `GET /users/search` - Search users with filters
- `PUT /users/update` - Update user profile
- `POST /users/follow` - Follow/unfollow users

#### Posts & Portfolio
- `GET /posts/feed` - Get portfolio feed
- `POST /posts/create` - Create new post
- `POST /posts/like` - Like/unlike posts

#### Status Updates
- `POST /status/create` - Create status update
- `GET /status/list` - Get status updates
- `POST /status/view` - Mark status as viewed

#### Messages
- `GET /messages/conversations` - Get user conversations
- `POST /messages/send` - Send message
- `GET /messages/history/:id` - Get conversation history

#### Services
- `GET /services/list` - Get services with filters
- `POST /services/create` - Create new service
- `POST /services/book` - Book a service

### Step 2: Environment Variables

Create a `.env` file with the following variables:

```env
# Your API base URL
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com/api

# Third-party service keys
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
EXPO_PUBLIC_PUSHER_APP_KEY=your_pusher_key
EXPO_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Step 3: Required Third-Party Services

#### Image Storage (Cloudinary)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name and create an upload preset
3. Configure unsigned uploads for mobile app usage

#### Maps (Google Maps)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps SDK for iOS/Android
3. Create API key with proper restrictions

#### Real-time Chat (Pusher)
1. Sign up at [pusher.com](https://pusher.com)
2. Create a new app
3. Get your app key and cluster information

#### Payments (Stripe)
1. Create account at [stripe.com](https://stripe.com)
2. Get your publishable key for client-side
3. Keep secret key secure on your backend

### Step 4: Authentication Flow

The app uses JWT tokens stored securely with Expo SecureStore:

```javascript
// Login flow
const loginResponse = await apiService.login(email, password);
await saveAuthToken(loginResponse.token);
await saveUserData(loginResponse.user);

// API requests automatically include the token
const response = await apiService.getFeed();
```

## 🎨 Design System

### Color Palette
- **Primary**: #007AFF (Blue)
- **Secondary**: #FF6B35 (Orange)
- **Background**: #FFFFFF (White)
- **Text**: #000000 (Black)
- **Surface**: #F8F9FA (Light Gray)

### Typography
- **Headers**: Bold, 24-28px
- **Body**: Regular, 14-16px
- **Captions**: 12px

### Components
- Reusable UI components in `/components/ui/`
- Feature-specific components in `/components/[feature]/`
- Consistent styling with theme colors

## 📱 App Architecture

### File Structure
```
app/
├── (tabs)/           # Tab navigation screens
├── _layout.jsx       # Root layout
└── +not-found.jsx    # 404 screen

components/
├── ui/               # Reusable UI components
├── feed/             # Feed-related components
├── status/           # Status story components
├── messages/         # Chat components
└── search/           # Search components

services/
├── api.js            # API service layer
├── auth.js           # Authentication utilities
└── imageUpload.js    # Image upload utilities

constants/
├── Colors.js         # Color theme
└── Config.js         # API configuration

data/
└── mockData.js       # Mock data for development
```

### State Management
- React hooks for local state
- Secure storage for authentication
- API service layer for data fetching

## 🔒 Security Best Practices

### API Security
- JWT tokens for authentication
- Secure token storage with Expo SecureStore
- Request timeout and error handling
- Input validation on all forms

### Image Upload Security
- Client-side image compression
- Secure upload to Cloudinary
- Image validation and size limits

### Data Protection
- No sensitive data in AsyncStorage
- Encrypted secure storage for tokens
- Proper error handling without exposing internals

## 🚀 Deployment

### Building for Production

1. **Update app configuration**
   ```bash
   # Update app.json with production settings
   ```

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Android**
   ```bash
   expo build:android
   ```

### Environment-Specific Builds
- Use different `.env` files for staging/production
- Configure different API endpoints
- Update app identifiers and names

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API integration guide

---

Built with ❤️ for the artisan community