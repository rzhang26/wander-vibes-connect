import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { SmartSearch } from "@/components/SmartSearch";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const trendingPlaces = [
    {
      id: 1,
      name: "Santorini Sunset Cliffs",
      location: "Greece",
      image: "🌅",
      tags: ["🔥", "📸", "🌈"],
      viralScore: 95,
      budget: "$150/day",
      description: "Viral sunset spots with 2M+ posts"
    },
    {
      id: 2,
      name: "Tokyo Neon Districts",
      location: "Japan",
      image: "🏙️",
      tags: ["🔥", "🎵", "✨"],
      viralScore: 89,
      budget: "$120/day",
      description: "Cyberpunk aesthetics trending on TikTok"
    },
    {
      id: 3,
      name: "Bali Rice Terraces",
      location: "Indonesia",
      image: "🌾",
      tags: ["📸", "🌱", "💚"],
      viralScore: 87,
      budget: "$80/day",
      description: "Sustainable travel hotspot"
    },
    {
      id: 4,
      name: "Morocco Desert Glamps",
      location: "Morocco",
      image: "🏜️",
      tags: ["⭐", "🐪", "🔥"],
      viralScore: 82,
      budget: "$90/day",
      description: "Luxury desert experiences"
    }
  ];

  const quickActions = [
    { icon: "✈️", label: "Plan Solo Trip", action: () => navigate("/trip-planner?type=solo") },
    { icon: "👥", label: "Start Group Getaway", action: () => navigate("/trip-planner?type=group") },
    { icon: "🎯", label: "Viral Challenges", action: () => navigate("/challenges") },
    { icon: "💚", label: "Eco Routes", action: () => navigate("/eco-routes") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold wandr-gradient bg-clip-text text-transparent">
              Wandr
            </h1>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="wandr-gradient text-white text-sm">W</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Smart Search */}
        <SmartSearch 
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex-col space-y-2 border-2 border-purple-200 hover:border-purple-400 card-hover"
              onClick={action.action}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Trending Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <span>🔥</span>
              <span>Trending Now</span>
            </h2>
            <Badge variant="secondary" className="animate-pulse-slow">
              Live Updates
            </Badge>
          </div>

          <div className="space-y-4">
            {trendingPlaces.map((place) => (
              <Card key={place.id} className="p-4 card-hover cursor-pointer" onClick={() => navigate(`/place/${place.id}`)}>
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{place.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">{place.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">{place.description}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-medium">Viral Score</span>
                          <Badge variant="secondary" className="text-xs">{place.viralScore}</Badge>
                        </div>
                        <p className="text-xs font-medium text-green-600">{place.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <div className="flex space-x-1">
                        {place.tags.map((tag, i) => (
                          <span key={i} className="text-sm">{tag}</span>
                        ))}
                      </div>
                      <div className="flex-1"></div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Add to Trip ➕
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <Card className="p-6 wandr-gradient-sunset text-white">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">🎯 Today's Challenge</h3>
            <p className="text-lg">"Find the Hidden Gem of Your City"</p>
            <p className="text-sm opacity-90">
              Share a photo of an undiscovered spot in your area with #WandrHiddenGem
            </p>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30">
              Accept Challenge 🚀
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around">
            {[
              { icon: "📍", label: "Plan", active: true },
              { icon: "🗺️", label: "Map", active: false },
              { icon: "📸", label: "Gallery", active: false },
              { icon: "🔍", label: "Explore", active: false },
              { icon: "👤", label: "Profile", active: false },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  item.active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;