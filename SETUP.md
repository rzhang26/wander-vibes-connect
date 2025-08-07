# Wandr - Social Travel Discovery App

A modern travel discovery application that integrates social media content from TikTok, Instagram, and Pinterest to help users discover trending destinations and plan their trips.

## Features

### 🌐 Social Media Integration
- **n8n Webhooks**: Real-time data from TikTok, Instagram, and Pinterest
- **Content Analysis**: Automatic categorization and viral score calculation
- **Trending Discovery**: AI-powered content discovery and recommendations

### 🗺️ Core UX Features
- **Explore Page**: Browse trending posts and popular destinations
- **Search Page**: Location-based search with map integration
- **Profile Page**: Customizable user profiles with saved locations
- **Authentication**: Email/password and Google OAuth support

### 🔐 Authentication System
- Firebase Authentication
- Google OAuth integration
- Protected routes
- User profile management

## Tech Stack

- **Frontend**: React.js + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Maps**: Google Maps API
- **Automation**: n8n + Webhook endpoints
- **State Management**: React Query + Context API

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Social Media API Keys (for n8n webhooks)
VITE_TIKTOK_API_KEY=your_tiktok_api_key_here
VITE_INSTAGRAM_API_KEY=your_instagram_api_key_here
VITE_PINTEREST_API_KEY=your_pinterest_api_key_here

# n8n Webhook URLs
VITE_N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook
VITE_TIKTOK_WEBHOOK_URL=https://your-n8n-instance.com/webhook/tiktok
VITE_INSTAGRAM_WEBHOOK_URL=https://your-n8n-instance.com/webhook/instagram
VITE_PINTEREST_WEBHOOK_URL=https://your-n8n-instance.com/webhook/pinterest

# Google Places API (for search functionality)
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# Yelp API (alternative for places search)
VITE_YELP_API_KEY=your_yelp_api_key_here

# App Configuration
VITE_APP_NAME=Wandr
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Enable Storage for profile pictures
5. Copy the Firebase configuration to your `.env` file

### 3. Google APIs Setup

1. **Google Maps API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API and Places API
   - Create API key and add to `.env`

2. **Google OAuth**:
   - In Firebase Console, add your domain to authorized domains
   - Configure OAuth consent screen in Google Cloud Console

### 4. n8n Setup for Social Media Webhooks

1. **Install n8n**:
   ```bash
   npm install -g n8n
   n8n start
   ```

2. **Create Webhook Workflows**:

   **TikTok Webhook**:
   - Trigger: Webhook
   - Action: HTTP Request to your app's webhook endpoint
   - Data transformation for TikTok API response

   **Instagram Webhook**:
   - Trigger: Webhook
   - Action: HTTP Request to your app's webhook endpoint
   - Data transformation for Instagram API response

   **Pinterest Webhook**:
   - Trigger: Webhook
   - Action: HTTP Request to your app's webhook endpoint
   - Data transformation for Pinterest API response

3. **Webhook Endpoints**:
   - TikTok: `https://your-app.com/api/webhooks/tiktok`
   - Instagram: `https://your-app.com/api/webhooks/instagram`
   - Pinterest: `https://your-app.com/api/webhooks/pinterest`

### 5. Install Dependencies

```bash
npm install
# or
bun install
```

### 6. Run Development Server

```bash
npm run dev
# or
bun dev
```

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/ui components
│   └── ProtectedRoute.tsx  # Authentication wrapper
├── contexts/
│   └── AuthContext.tsx     # Firebase authentication context
├── hooks/
│   └── use-toast.ts        # Toast notifications
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Auth.tsx            # Authentication page
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Explore.tsx         # Social media content discovery
│   ├── Search.tsx          # Location search with maps
│   ├── Profile.tsx         # User profile management
│   └── TripPlanner.tsx     # Trip planning interface
├── services/
│   └── webhookService.ts   # Social media webhook processing
└── App.tsx                 # Main application component
```

## API Integration

### Social Media Webhooks

The application processes webhook data from n8n with the following structure:

```typescript
interface WebhookPayload {
  platform: 'tiktok' | 'instagram' | 'pinterest';
  data: {
    id: string;
    username: string;
    content: string;
    mediaUrl: string;
    location?: {
      name: string;
      coordinates?: { lat: number; lng: number; };
    };
    engagement: {
      likes: number;
      comments: number;
      shares: number;
      views?: number;
    };
    hashtags: string[];
    timestamp: string;
  };
  webhookId: string;
}
```

### Content Analysis

The webhook service automatically:
- Calculates viral scores based on engagement metrics
- Categorizes content (nature, food, adventure, etc.)
- Stores data in Firestore for real-time access
- Provides trending content discovery

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub or contact the development team.
