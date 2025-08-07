import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Edit, 
  Save, 
  X, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  Camera,
  Globe,
  Calendar,
  Star,
  Share2
} from "lucide-react";

interface SavedLocation {
  id: string;
  name: string;
  location: string;
  image: string;
  category: string;
  savedAt: string;
  notes?: string;
}

interface TravelPreference {
  id: string;
  category: string;
  enabled: boolean;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "Alex Wanderer",
    bio: "Passionate traveler exploring the world one adventure at a time ✈️",
    email: "alex@example.com",
    location: "New York, NY",
    website: "https://alexwanderer.com",
    interests: ["Adventure", "Food", "Culture", "Nature"],
    travelStyle: "Budget-friendly explorer"
  });
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [travelPreferences, setTravelPreferences] = useState<TravelPreference[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock saved locations
  const mockSavedLocations: SavedLocation[] = [
    {
      id: "1",
      name: "Bali Rice Terraces",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      category: "Nature",
      savedAt: "2024-01-15",
      notes: "Must visit during sunrise for best photos"
    },
    {
      id: "2",
      name: "Santorini Sunset",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      category: "Beach",
      savedAt: "2024-01-10"
    },
    {
      id: "3",
      name: "Tokyo Street Food",
      location: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      category: "Food",
      savedAt: "2024-01-05",
      notes: "Try the ramen at Ichiran"
    }
  ];

  // Mock travel preferences
  const mockTravelPreferences: TravelPreference[] = [
    { id: "1", category: "Adventure Sports", enabled: true },
    { id: "2", category: "Cultural Experiences", enabled: true },
    { id: "3", category: "Food & Dining", enabled: true },
    { id: "4", category: "Nature & Outdoors", enabled: true },
    { id: "5", category: "Nightlife", enabled: false },
    { id: "6", category: "Shopping", enabled: false },
    { id: "7", category: "Historical Sites", enabled: true },
    { id: "8", category: "Beach Activities", enabled: true }
  ];

  useEffect(() => {
    setSavedLocations(mockSavedLocations);
    setTravelPreferences(mockTravelPreferences);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
      toast({
        title: "Logged out successfully",
        description: "Come back soon! 👋",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreferenceToggle = (id: string) => {
    setTravelPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const removeSavedLocation = (id: string) => {
    setSavedLocations(prev => prev.filter(location => location.id !== id));
    toast({
      title: "Location removed",
      description: "Location has been removed from your saved list.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold wandr-gradient bg-clip-text text-transparent">
              Profile
            </h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-purple-400 to-pink-400">
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <AvatarImage src={currentUser?.photoURL || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"} />
                  <AvatarFallback className="text-2xl">
                    {profileData.displayName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="pt-16 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{profileData.displayName}</h2>
                <p className="text-muted-foreground">{profileData.travelStyle}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{profileData.website}</span>
                  </div>
                </div>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Saved Locations ({savedLocations.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4 pr-4">
                    {savedLocations.map((location) => (
                      <Card key={location.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="w-24 h-24 flex-shrink-0">
                              <img
                                src={location.image}
                                alt={location.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold">{location.name}</h3>
                                  <p className="text-sm text-muted-foreground">{location.location}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Saved on {new Date(location.savedAt).toLocaleDateString()}
                                  </p>
                                  {location.notes && (
                                    <p className="text-sm mt-2 italic">"{location.notes}"</p>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeSavedLocation(location.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline">{location.category}</Badge>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Travel Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {travelPreferences.map((preference) => (
                    <div key={preference.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">{preference.category}</span>
                      </div>
                      <Switch
                        checked={preference.enabled}
                        onCheckedChange={() => handlePreferenceToggle(preference.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Saved Bali Rice Terraces</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Star className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Rated Tokyo Street Food 5 stars</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Visited Santorini Sunset</p>
                      <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
