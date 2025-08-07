import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [platforms, setPlatforms] = useState({
    tiktok: false,
    instagram: false,
    pinterest: false,
  });
  const [preferences, setPreferences] = useState({
    budgetPerDay: [100],
    groupSize: [2],
    ageRange: [25],
    travelType: "solo",
    safetyLevel: [7],
    destinationMood: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const payload = {
      userId: "user123", // replace this with the actual user ID if available
      platforms: ["TikTok", "Instagram", "Pinterest"], // replace with dynamic selections if needed
      consentGiven: true,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch("https://tianchen.app.n8n.cloud/webhook-test/5ba67ece-3d1d-470a-9b67-1f9cd5315deb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("✅ Webhook sent");
        toast({
          title: "🎉 Welcome to Wandr!",
          description: "Your journey begins now!",
        });
      } else {
        console.error("❌ Webhook error:", response.status);
        toast({
          title: "Welcome to Wandr!",
          description: "Let's start exploring!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Welcome to Wandr!",
        description: "Let's start exploring!",
      });
    }
    
    // Continue to next step regardless of webhook success/failure
    setStep(step + 1);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
      navigate("/dashboard");
    }
  };

  const togglePlatform = (platform: keyof typeof platforms) => {
    setPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const moodOptions = [
    { id: "tropical", label: "🏝️ Tropical Hiking", color: "bg-green-500" },
    { id: "urban", label: "🏙️ Urban Explorer", color: "bg-purple-500" },
    { id: "ocean", label: "🌊 Ocean Vibes", color: "bg-blue-500" },
    { id: "desert", label: "🏜️ Desert Adventure", color: "bg-orange-500" },
    { id: "mountain", label: "⛰️ Mountain Escape", color: "bg-gray-500" },
    { id: "cultural", label: "🎭 Cultural Deep Dive", color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 card-hover">
        {step === 1 && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold wandr-gradient bg-clip-text text-transparent">
                Wandr
              </h1>
              <p className="text-xl text-muted-foreground">Plan less. Live more.</p>
            </div>
            <div className="animate-float">
              <div className="text-6xl">✈️</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover viral destinations, plan with friends, and share your journey with the world.
            </p>
            <Button onClick={handleGetStarted} className="w-full wandr-gradient">
              Get Started 🚀
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Connect Your Vibes ✨</h2>
              <p className="text-sm text-muted-foreground">
                Want personalized suggestions from your favorite social platforms?
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: "tiktok", label: "TikTok", icon: "🎵", desc: "Trending travel spots" },
                { key: "instagram", label: "Instagram", icon: "📸", desc: "Photo-worthy locations" },
                { key: "pinterest", label: "Pinterest", icon: "📌", desc: "Aesthetic inspiration" },
              ].map(({ key, label, icon, desc }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={platforms[key as keyof typeof platforms]}
                    onCheckedChange={() => togglePlatform(key as keyof typeof platforms)}
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleNext} className="w-full">
              Agree & Connect Feeds 🌟
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Your Travel Style 🎯</h2>
              <p className="text-sm text-muted-foreground">
                Tell us what makes the perfect trip for you
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget per day 💸</label>
                <div className="px-3">
                  <Slider
                    value={preferences.budgetPerDay}
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, budgetPerDay: value }))}
                    max={500}
                    min={20}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$20</span>
                    <span className="font-medium">${preferences.budgetPerDay[0]}</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Group size 👥</label>
                <div className="px-3">
                  <Slider
                    value={preferences.groupSize}
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, groupSize: value }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Solo</span>
                    <span className="font-medium">{preferences.groupSize[0]} people</span>
                    <span>Large group</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Safety level ⚠️</label>
                <div className="px-3">
                  <Slider
                    value={preferences.safetyLevel}
                    onValueChange={(value) => setPreferences(prev => ({ ...prev, safetyLevel: value }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Adventure</span>
                    <span className="font-medium">{preferences.safetyLevel[0]}/10</span>
                    <span>Super safe</span>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full">
              Continue ➡️
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Pick Your Vibe 🌈</h2>
              <p className="text-sm text-muted-foreground">
                What kind of destination speaks to your soul?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setPreferences(prev => ({ ...prev, destinationMood: mood.id }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    preferences.destinationMood === mood.id
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <p className="text-sm font-medium">{mood.label}</p>
                </button>
              ))}
            </div>

            <Button onClick={handleNext} className="w-full wandr-gradient">
              Let's Wandr! 🌟
            </Button>
          </div>
        )}

        <div className="mt-6 flex justify-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;