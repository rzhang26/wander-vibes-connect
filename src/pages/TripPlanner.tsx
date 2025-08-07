import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";

const TripPlanner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tripType = searchParams.get("type") || "solo";
  
  const [itinerary, setItinerary] = useState({
    day1: [],
    day2: [],
    day3: [],
  });
  
  const [preferences, setPreferences] = useState({
    budget: [200],
    carbon: [5],
    viralPotential: true,
  });

  const availablePOIs = [
    {
      id: 1,
      name: "Sunset Viewpoint",
      type: "scenic",
      time: "2h",
      cost: "$0",
      carbon: 1,
      viralScore: 95,
      icon: "🌅",
      description: "Perfect golden hour shots"
    },
    {
      id: 2,
      name: "Local Art District",
      type: "culture",
      time: "3h",
      cost: "$25",
      carbon: 2,
      viralScore: 78,
      icon: "🎨",
      description: "Street art & galleries"
    },
    {
      id: 3,
      name: "Organic Market",
      type: "food",
      time: "1h",
      cost: "$15",
      carbon: 1,
      viralScore: 65,
      icon: "🥕",
      description: "Fresh local produce"
    },
    {
      id: 4,
      name: "Beach Cafe",
      type: "food",
      time: "2h",
      cost: "$35",
      carbon: 3,
      viralScore: 89,
      icon: "🏖️",
      description: "Oceanview dining"
    },
    {
      id: 5,
      name: "Historic Temple",
      type: "culture",
      time: "2h",
      cost: "$10",
      carbon: 2,
      viralScore: 72,
      icon: "🏛️",
      description: "Ancient architecture"
    },
    {
      id: 6,
      name: "Night Market",
      type: "food",
      time: "3h",
      cost: "$20",
      carbon: 2,
      viralScore: 85,
      icon: "🌙",
      description: "Street food paradise"
    }
  ];

  const addToItinerary = (poi: any, day: string) => {
    setItinerary(prev => ({
      ...prev,
      [day]: [...prev[day as keyof typeof prev], poi]
    }));
  };

  const calculateTotals = () => {
    const allItems = [...itinerary.day1, ...itinerary.day2, ...itinerary.day3];
    const totalCost = allItems.reduce((sum, item) => sum + parseInt(item.cost.replace('$', '')), 0);
    const totalCarbon = allItems.reduce((sum, item) => sum + item.carbon, 0);
    const avgViralScore = allItems.length > 0 
      ? Math.round(allItems.reduce((sum, item) => sum + item.viralScore, 0) / allItems.length)
      : 0;
    
    return { totalCost, totalCarbon, avgViralScore };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                ← Back
              </Button>
              <h1 className="text-xl font-bold">
                {tripType === "solo" ? "✈️ Solo Adventure" : "👥 Group Getaway"}
              </h1>
            </div>
            <Badge className="wandr-gradient text-white">
              Planning Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 pb-24">
        {/* Trip Controls */}
        <Card className="p-6 mb-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget per day 💸</label>
              <Slider
                value={preferences.budget}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
                max={500}
                min={50}
                step={25}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">${preferences.budget[0]}/day</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Carbon Impact 🌱</label>
              <Slider
                value={preferences.carbon}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, carbon: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Level {preferences.carbon[0]}/10</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">🔥 Viral Potential Mode</label>
            <Switch
              checked={preferences.viralPotential}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, viralPotential: checked }))}
            />
          </div>

          {tripType === "group" && (
            <Button variant="outline" className="w-full">
              🗳️ Make this a group vote
            </Button>
          )}
        </Card>

        {/* Trip Summary */}
        <Card className="p-4 mb-6 wandr-gradient text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">Trip Overview</h3>
              <p className="text-sm opacity-90">{Object.values(itinerary).flat().length} activities planned</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm">💰 ${totals.totalCost}</p>
              <p className="text-sm">🌱 {totals.totalCarbon} carbon</p>
              <p className="text-sm">🔥 {totals.avgViralScore}% viral</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Itinerary Builder */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">📅 Your Itinerary</h2>
            
            <Tabs defaultValue="day1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day1">Day 1</TabsTrigger>
                <TabsTrigger value="day2">Day 2</TabsTrigger>
                <TabsTrigger value="day3">Day 3</TabsTrigger>
              </TabsList>
              
              {(['day1', 'day2', 'day3'] as const).map((day) => (
                <TabsContent key={day} value={day} className="space-y-3">
                  <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {itinerary[day].length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <p>🎯 Drag activities here or</p>
                        <p>tap "+" to add from suggestions</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {itinerary[day].map((item, index) => (
                          <Card key={index} className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.time} • {item.cost} • 🔥{item.viralScore}%
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost">
                                ✕
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Available POIs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">🎯 Suggested Activities</h2>
            
            <div className="space-y-3">
              {availablePOIs.map((poi) => (
                <Card key={poi.id} className="p-4 card-hover cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{poi.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{poi.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{poi.description}</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <span>⏱️ {poi.time}</span>
                          <span>💰 {poi.cost}</span>
                          <span>🌱 {poi.carbon}</span>
                          <Badge variant="secondary" className="text-xs">
                            🔥 {poi.viralScore}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToItinerary(poi, 'day1')}
                        className="text-xs"
                      >
                        + Day 1
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToItinerary(poi, 'day2')}
                        className="text-xs"
                      >
                        + Day 2
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToItinerary(poi, 'day3')}
                        className="text-xs"
                      >
                        + Day 3
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-200">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-medium text-sm">AI Recommendation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                "Too hot at noon for hiking? Try the Beach Cafe + Art District combo for better Instagram lighting! 📸"
              </p>
              <Button size="sm" variant="outline" className="mt-2 text-xs">
                Apply Suggestion ✨
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button className="w-full wandr-gradient">
            Save Trip 💾
          </Button>
          
          {tripType === "group" && (
            <Button variant="outline" className="w-full">
              📤 Share with Group
            </Button>
          )}
          
          <Button variant="outline" className="w-full">
            🚀 Start Trip Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;