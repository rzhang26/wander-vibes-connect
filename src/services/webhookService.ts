import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';

export interface SocialMediaPost {
  id: string;
  platform: 'tiktok' | 'instagram' | 'pinterest';
  username: string;
  userAvatar?: string;
  content: string;
  mediaUrl: string;
  location?: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  hashtags: string[];
  timestamp: Date;
  viralScore?: number;
  category?: string;
  webhookId: string;
}

export interface WebhookPayload {
  platform: 'tiktok' | 'instagram' | 'pinterest';
  data: {
    id: string;
    username: string;
    userAvatar?: string;
    content: string;
    mediaUrl: string;
    location?: {
      name: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
    engagement: {
      likes: number;
      comments: number;
      shares: number;
      views?: number;
    };
    hashtags: string[];
    timestamp: string;
    viralScore?: number;
    category?: string;
  };
  webhookId: string;
}

class WebhookService {
  private webhookEndpoints = {
    tiktok: '/api/webhooks/tiktok',
    instagram: '/api/webhooks/instagram',
    pinterest: '/api/webhooks/pinterest'
  };

  // Process incoming webhook data
  async processWebhook(payload: WebhookPayload): Promise<void> {
    try {
      const post: SocialMediaPost = {
        id: payload.data.id,
        platform: payload.platform,
        username: payload.data.username,
        userAvatar: payload.data.userAvatar,
        content: payload.data.content,
        mediaUrl: payload.data.mediaUrl,
        location: payload.data.location,
        engagement: payload.data.engagement,
        hashtags: payload.data.hashtags,
        timestamp: new Date(payload.data.timestamp),
        viralScore: payload.data.viralScore,
        category: payload.data.category,
        webhookId: payload.webhookId
      };

      // Store in Firestore
      await this.storePost(post);

      // Analyze and categorize the post
      await this.analyzePost(post);

      console.log(`Processed ${payload.platform} webhook for post ${payload.data.id}`);
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  // Store post in Firestore
  private async storePost(post: SocialMediaPost): Promise<void> {
    try {
      const postsRef = collection(db, 'social_posts');
      await addDoc(postsRef, {
        ...post,
        timestamp: Timestamp.fromDate(post.timestamp),
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error storing post:', error);
      throw error;
    }
  }

  // Analyze post for categorization and viral score
  private async analyzePost(post: SocialMediaPost): Promise<void> {
    try {
      // Calculate viral score based on engagement
      const viralScore = this.calculateViralScore(post.engagement);
      
      // Categorize based on hashtags and content
      const category = this.categorizePost(post.content, post.hashtags);
      
      // Update post with analysis results
      const postsRef = collection(db, 'social_posts');
      const q = query(postsRef, where('id', '==', post.id), where('platform', '==', post.platform));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Update the document with analysis results
        // Note: In a real implementation, you'd use updateDoc here
        console.log(`Analyzed post ${post.id}: Category=${category}, ViralScore=${viralScore}`);
      }
    } catch (error) {
      console.error('Error analyzing post:', error);
    }
  }

  // Calculate viral score based on engagement metrics
  private calculateViralScore(engagement: SocialMediaPost['engagement']): number {
    const { likes, comments, shares, views = 0 } = engagement;
    
    // Weighted scoring algorithm
    const likeScore = likes * 1;
    const commentScore = comments * 3;
    const shareScore = shares * 5;
    const viewScore = views * 0.1;
    
    const totalScore = likeScore + commentScore + shareScore + viewScore;
    
    // Normalize to 0-100 scale
    const normalizedScore = Math.min(100, Math.max(0, (totalScore / 1000) * 100));
    
    return Math.round(normalizedScore);
  }

  // Categorize post based on content and hashtags
  private categorizePost(content: string, hashtags: string[]): string {
    const text = (content + ' ' + hashtags.join(' ')).toLowerCase();
    
    const categories = {
      nature: ['nature', 'outdoors', 'hiking', 'mountain', 'forest', 'beach', 'ocean', 'landscape'],
      food: ['food', 'restaurant', 'cafe', 'dining', 'cuisine', 'chef', 'delicious', 'tasty'],
      adventure: ['adventure', 'travel', 'explore', 'journey', 'trip', 'backpacking', 'trekking'],
      nightlife: ['nightlife', 'club', 'bar', 'party', 'music', 'dance', 'entertainment'],
      culture: ['culture', 'museum', 'art', 'history', 'heritage', 'tradition', 'local'],
      city: ['city', 'urban', 'architecture', 'skyscraper', 'street', 'downtown'],
      beach: ['beach', 'coast', 'seaside', 'ocean', 'sand', 'sunset', 'tropical']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }

    return 'general';
  }

  // Get posts by platform
  async getPostsByPlatform(platform: 'tiktok' | 'instagram' | 'pinterest', limit = 20): Promise<SocialMediaPost[]> {
    try {
      const postsRef = collection(db, 'social_posts');
      const q = query(
        postsRef,
        where('platform', '==', platform),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: SocialMediaPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          ...data,
          timestamp: data.timestamp.toDate()
        } as SocialMediaPost);
      });

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  // Get trending posts across all platforms
  async getTrendingPosts(limit = 20): Promise<SocialMediaPost[]> {
    try {
      const postsRef = collection(db, 'social_posts');
      const q = query(
        postsRef,
        where('viralScore', '>=', 70),
        orderBy('viralScore', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: SocialMediaPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          ...data,
          timestamp: data.timestamp.toDate()
        } as SocialMediaPost);
      });

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      return [];
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string, limit = 20): Promise<SocialMediaPost[]> {
    try {
      const postsRef = collection(db, 'social_posts');
      const q = query(
        postsRef,
        where('category', '==', category),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: SocialMediaPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          ...data,
          timestamp: data.timestamp.toDate()
        } as SocialMediaPost);
      });

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  }

  // Get posts by location
  async getPostsByLocation(locationName: string, limit = 20): Promise<SocialMediaPost[]> {
    try {
      const postsRef = collection(db, 'social_posts');
      const q = query(
        postsRef,
        where('location.name', '==', locationName),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const posts: SocialMediaPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          ...data,
          timestamp: data.timestamp.toDate()
        } as SocialMediaPost);
      });

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching posts by location:', error);
      return [];
    }
  }

  // Get webhook endpoints for n8n configuration
  getWebhookEndpoints() {
    return this.webhookEndpoints;
  }
}

export const webhookService = new WebhookService();
