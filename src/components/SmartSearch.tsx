import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  country: string;
  type: string;
  coordinates: [number, number];
  weather: string;
  localTime: string;
  description: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  name: string;
  category: string;
  budget: string;
  rating: number;
  tags: string[];
  description: string;
}

// Mock destination data
const destinations: SearchResult[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    type: "Urban Cultural Hub",
    coordinates: [2.3522, 48.8566],
    weather: "17°C Partly Cloudy",
    localTime: "2:45 PM CET",
    description: "City of Light with endless cultural treasures",
    activities: [
      {
        id: "eiffel",
        name: "Eiffel Tower Sunset Views",
        category: "Iconic",
        budget: "€25-35",
        rating: 4.8,
        tags: ["📸", "🌅", "🔥"],
        description: "Perfect golden hour shots and romantic vibes"
      },
      {
        id: "louvre",
        name: "Louvre After Hours",
        category: "Culture",
        budget: "€17",
        rating: 4.9,
        tags: ["🎨", "✨", "📱"],
        description: "Smaller crowds, better photos of Mona Lisa"
      },
      {
        id: "food-tour",
        name: "Hidden Food Markets",
        category: "Local",
        budget: "€30-50",
        rating: 4.7,
        tags: ["🥐", "💚", "👥"],
        description: "Instagram-worthy pastries & local secrets"
      }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    type: "Neon Metropolis",
    coordinates: [139.6917, 35.6895],
    weather: "24°C Clear",
    localTime: "10:45 PM JST",
    description: "Where tradition meets viral TikTok trends",
    activities: [
      {
        id: "shibuya",
        name: "Shibuya Crossing Night",
        category: "Viral",
        budget: "Free",
        rating: 4.9,
        tags: ["🔥", "🏙️", "📱"],
        description: "Most filmed intersection in the world"
      },
      {
        id: "harajuku",
        name: "Harajuku Fashion Hunt",
        category: "Culture",
        budget: "¥2000-5000",
        rating: 4.6,
        tags: ["🌈", "👘", "✨"],
        description: "Kawaii culture and street fashion paradise"
      },
      {
        id: "ramen",
        name: "2AM Ramen Adventures",
        category: "Local",
        budget: "¥800-1500",
        rating: 4.8,
        tags: ["🍜", "🌙", "💚"],
        description: "Authentic late-night eats locals love"
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    type: "Tropical Paradise",
    coordinates: [115.0920, -8.4095],
    weather: "28°C Tropical",
    localTime: "9:45 PM WITA",
    description: "Rice terraces, beach vibes, and digital nomad haven",
    activities: [
      {
        id: "rice-terraces",
        name: "Jatiluwih Rice Terraces",
        category: "Nature",
        budget: "$5-10",
        rating: 4.7,
        tags: ["🌾", "📸", "💚"],
        description: "UNESCO heritage with drone-worthy views"
      },
      {
        id: "beach-clubs",
        name: "Sustainable Beach Clubs",
        category: "Social",
        budget: "$25-40",
        rating: 4.5,
        tags: ["🏖️", "🌱", "🍹"],
        description: "Eco-conscious party spots with ocean views"
      },
      {
        id: "temples",
        name: "Temple Hopping at Dawn",
        category: "Spiritual",
        budget: "$15-25",
        rating: 4.8,
        tags: ["🛕", "🌅", "✨"],
        description: "Peaceful mornings before crowds arrive"
      }
    ]
  }
];

interface SmartSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SmartSearch = ({ value, onChange, className }: SmartSearchProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (value.trim().length < 2) {
        setSearchResults([]);
        setSelectedResult(null);
        return;
      }

      setIsSearching(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(value.toLowerCase()) ||
        dest.country.toLowerCase().includes(value.toLowerCase())
      );
      
      setSearchResults(filtered);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(handleSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleDestinationSelect = (destination: SearchResult) => {
    setSelectedResult(destination);
    onChange(destination.name);
    setSearchResults([]);
  };

  return (
    <div ref={searchRef} className="relative space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Input
          placeholder="Search destinations, vibes, or challenges... 🔍"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "pl-4 pr-12 py-3 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary bg-card",
            "transition-all duration-300 focus:shadow-lg focus:shadow-primary/20",
            className
          )}
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 p-2 bg-card/95 backdrop-blur-md shadow-xl border-primary/20">
          {searchResults.map((result) => (
            <button
              key={result.id}
              onClick={() => handleDestinationSelect(result)}
              className="w-full p-3 text-left hover:bg-primary/10 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <p className="font-semibold">{result.name}</p>
                  <p className="text-sm text-muted-foreground">{result.country} • {result.type}</p>
                </div>
              </div>
            </button>
          ))}
        </Card>
      )}

      {/* Selected Destination Details */}
      {selectedResult && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Destination Overview */}
          <Card className="p-6 wandr-gradient text-white">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedResult.name}</h2>
                  <p className="text-white/90">{selectedResult.country} • {selectedResult.type}</p>
                  <p className="text-sm text-white/80 mt-2">{selectedResult.description}</p>
                </div>
                <div className="text-4xl">📍</div>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span>🌤️</span>
                  <span>{selectedResult.weather}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🕐</span>
                  <span>{selectedResult.localTime}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Map Placeholder */}
          <Card className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 border-dashed border-2 border-primary/30">
            <div className="h-full flex items-center justify-center text-center">
              <div className="space-y-2">
                <div className="text-4xl">🗺️</div>
                <p className="text-sm text-muted-foreground">Interactive map would load here</p>
                <p className="text-xs text-muted-foreground">
                  Coordinates: {selectedResult.coordinates[1]}, {selectedResult.coordinates[0]}
                </p>
              </div>
            </div>
          </Card>

          {/* Activities & Experiences */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <span>✨</span>
                <span>Things to Do</span>
              </h3>
              <Badge variant="secondary" className="animate-pulse-slow">
                AI Curated
              </Badge>
            </div>

            <div className="space-y-3">
              {selectedResult.activities.map((activity) => (
                <Card key={activity.id} className="p-4 card-hover cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">
                      {activity.category === 'Viral' ? '🔥' : 
                       activity.category === 'Culture' ? '🎨' :
                       activity.category === 'Nature' ? '🌿' :
                       activity.category === 'Local' ? '🏠' :
                       activity.category === 'Social' ? '👥' : '⭐'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold">{activity.name}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">{activity.category}</Badge>
                            <span className="text-xs text-muted-foreground">⭐ {activity.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-accent">{activity.budget}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-1">
                          {activity.tags.map((tag, i) => (
                            <span key={i} className="text-sm">{tag}</span>
                          ))}
                        </div>
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

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-12 flex items-center space-x-2">
              <span>🗓️</span>
              <span>Plan Itinerary</span>
            </Button>
            <Button variant="outline" className="h-12 flex items-center space-x-2">
              <span>👥</span>
              <span>Start Group Trip</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};