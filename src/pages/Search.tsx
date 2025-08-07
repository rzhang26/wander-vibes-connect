import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Clock, Phone, Globe, Heart, Share2 } from "lucide-react";

interface Place {
  id: string;
  name: string;
  type: 'restaurant' | 'club' | 'event' | 'attraction';
  address: string;
  rating: number;
  price: string;
  image: string;
  description: string;
  tags: string[];
  distance: string;
  openNow: boolean;
  phone?: string;
  website?: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const navigate = useNavigate();

  // Mock places data
  const mockPlaces: Place[] = [
    {
      id: "1",
      name: "The Blue Note Jazz Club",
      type: "club",
      address: "131 W 3rd St, New York, NY 10012",
      rating: 4.8,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Iconic jazz venue featuring world-class musicians in an intimate setting.",
      tags: ["Jazz", "Live Music", "Nightlife"],
      distance: "0.2 mi",
      openNow: true,
      phone: "+1 (212) 475-8592",
      website: "https://www.bluenotenyc.com"
    },
    {
      id: "2",
      name: "Joe's Pizza",
      type: "restaurant",
      address: "123 Carmine St, New York, NY 10014",
      rating: 4.6,
      price: "$",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      description: "Authentic New York style pizza with fresh ingredients and crispy crust.",
      tags: ["Pizza", "Italian", "Casual"],
      distance: "0.5 mi",
      openNow: true,
      phone: "+1 (212) 555-0123"
    },
    {
      id: "3",
      name: "Central Park SummerStage",
      type: "event",
      address: "Central Park, New York, NY 10024",
      rating: 4.7,
      price: "Free",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Outdoor concert venue hosting free performances throughout the summer.",
      tags: ["Music", "Outdoor", "Free"],
      distance: "1.2 mi",
      openNow: false
    },
    {
      id: "4",
      name: "Empire State Building",
      type: "attraction",
      address: "20 W 34th St, New York, NY 10001",
      rating: 4.5,
      price: "$$",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
      description: "Iconic skyscraper with observation deck offering stunning city views.",
      tags: ["Landmark", "Views", "Tourist"],
      distance: "2.1 mi",
      openNow: true,
      phone: "+1 (212) 736-3100",
      website: "https://www.esbnyc.com"
    }
  ];

  useEffect(() => {
    setPlaces(mockPlaces);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSelectedLocation(searchQuery);
      setLoading(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️';
      case 'club': return '🎵';
      case 'event': return '🎪';
      case 'attraction': return '🏛️';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-100 text-orange-800';
      case 'club': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'attraction': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterPlaces = (type: string) => {
    if (type === 'all') return places;
    return places.filter(place => place.type === type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold wandr-gradient bg-clip-text text-transparent">
              Search
            </h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/explore")}>
              Explore
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for destinations, places, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 py-3 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-400"
            />
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="sm"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {selectedLocation && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Searching near: <strong>{selectedLocation}</strong></span>
            </div>
          )}
        </div>

        {/* Map Placeholder */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Map View</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl">🗺️</div>
                <p className="text-muted-foreground">Interactive map will be displayed here</p>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation ? `Showing places near ${selectedLocation}` : "Enter a location to see the map"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Places Results */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="restaurant">Food</TabsTrigger>
            <TabsTrigger value="club">Nightlife</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="attraction">Attractions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                {filterPlaces('all').map((place) => (
                  <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg">{getTypeIcon(place.type)}</span>
                                <h3 className="font-semibold">{place.name}</h3>
                                <Badge className={getTypeColor(place.type)}>
                                  {place.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{place.address}</p>
                              <p className="text-sm mb-2">{place.description}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{place.rating}</span>
                              </div>
                              <p className="text-sm font-medium text-green-600">{place.price}</p>
                              <p className="text-xs text-muted-foreground">{place.distance}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1 text-sm">
                                <Clock className="h-3 w-3" />
                                <span className={place.openNow ? "text-green-600" : "text-red-600"}>
                                  {place.openNow ? "Open" : "Closed"}
                                </span>
                              </div>
                              {place.phone && (
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <Phone className="h-3 w-3" />
                                </Button>
                              )}
                              {place.website && (
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <Globe className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button size="sm">View Details</Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {place.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {['restaurant', 'club', 'event', 'attraction'].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <ScrollArea className="h-96">
                <div className="space-y-4 pr-4">
                  {filterPlaces(type).map((place) => (
                    <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-lg">{getTypeIcon(place.type)}</span>
                                  <h3 className="font-semibold">{place.name}</h3>
                                  <Badge className={getTypeColor(place.type)}>
                                    {place.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">{place.address}</p>
                                <p className="text-sm mb-2">{place.description}</p>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{place.rating}</span>
                                </div>
                                <p className="text-sm font-medium text-green-600">{place.price}</p>
                                <p className="text-xs text-muted-foreground">{place.distance}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Clock className="h-3 w-3" />
                                  <span className={place.openNow ? "text-green-600" : "text-red-600"}>
                                    {place.openNow ? "Open" : "Closed"}
                                  </span>
                                </div>
                                {place.phone && (
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Phone className="h-3 w-3" />
                                  </Button>
                                )}
                                {place.website && (
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Globe className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {place.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
