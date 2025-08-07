import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Search, MapPin, Heart, Share2, MessageCircle } from "lucide-react";

interface SocialPost {
  id: string;
  platform: 'tiktok' | 'instagram' | 'pinterest';
  username: string;
  userAvatar: string;
  content: string;
  image: string;
  location: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
}

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  category: string;
  viralScore: number;
  description: string;
  tags: string[];
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All", icon: "🌍" },
    { id: "nature", name: "Nature", icon: "🌲" },
    { id: "food", name: "Food", icon: "🍕" },
    { id: "adventure", name: "Adventure", icon: "🏔️" },
    { id: "nightlife", name: "Nightlife", icon: "🌙" },
    { id: "culture", name: "Culture", icon: "🏛️" },
    { id: "beach", name: "Beach", icon: "🏖️" },
    { id: "city", name: "City", icon: "🏙️" },
  ];

  // Mock data for social posts
  const mockPosts: SocialPost[] = [
    {
      id: "1",
      platform: "tiktok",
      username: "travel_vibes",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Just discovered this hidden gem in Bali! 🌴✨ #BaliVibes #HiddenGem",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      location: "Bali, Indonesia",
      likes: 15420,
      comments: 892,
      shares: 2341,
      timestamp: "2 hours ago",
      tags: ["#BaliVibes", "#HiddenGem", "#Travel"]
    },
    {
      id: "2",
      platform: "instagram",
      username: "wanderlust_soul",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Sunset views that will take your breath away 🌅 #Santorini #Sunset",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      location: "Santorini, Greece",
      likes: 8920,
      comments: 456,
      shares: 1234,
      timestamp: "4 hours ago",
      tags: ["#Santorini", "#Sunset", "#Greece"]
    },
    {
      id: "3",
      platform: "pinterest",
      username: "foodie_explorer",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Best street food spots in Tokyo! 🍜 #TokyoFood #StreetFood",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      location: "Tokyo, Japan",
      likes: 5670,
      comments: 234,
      shares: 890,
      timestamp: "6 hours ago",
      tags: ["#TokyoFood", "#StreetFood", "#Japan"]
    }
  ];

  // Mock destinations data
  const mockDestinations: Destination[] = [
    {
      id: "1",
      name: "Bali Rice Terraces",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      category: "nature",
      viralScore: 95,
      description: "Stunning rice terraces with breathtaking views",
      tags: ["Nature", "Peaceful", "Photography"]
    },
    {
      id: "2",
      name: "Santorini Sunset",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      category: "beach",
      viralScore: 98,
      description: "Iconic sunset views over the Aegean Sea",
      tags: ["Sunset", "Romantic", "Views"]
    },
    {
      id: "3",
      name: "Tokyo Street Food",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      category: "food",
      viralScore: 87,
      description: "Authentic Japanese street food experience",
      tags: ["Food", "Culture", "Authentic"]
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
    setDestinations(mockDestinations);
  }, []);

  const fetchMoreData = () => {
    // Simulate loading more data
    setTimeout(() => {
      setHasMore(false);
    }, 1000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok': return '🎵';
      case 'instagram': return '📸';
      case 'pinterest': return '📌';
      default: return '📱';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold wandr-gradient bg-clip-text text-transparent">
              Explore
            </h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/search")}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Categories */}
        <ScrollArea className="w-full">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trending">Trending Posts</TabsTrigger>
            <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-4">
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<div className="text-center py-4">Loading more posts...</div>}
              endMessage={<div className="text-center py-4 text-muted-foreground">No more posts to load</div>}
            >
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback>{post.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{post.username}</span>
                            <span className="text-sm text-muted-foreground">
                              {getPlatformIcon(post.platform)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{post.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <p className="mb-3">{post.content}</p>

                      <div className="mb-3">
                        <img
                          src={post.image}
                          alt={post.content}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <Share2 className="h-4 w-4" />
                            <span>{formatNumber(post.shares)}</span>
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </InfiniteScroll>
          </TabsContent>

          <TabsContent value="destinations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90">
                          {destination.viralScore}% viral
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{destination.location}</p>
                      <p className="text-sm mb-3">{destination.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;
