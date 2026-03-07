import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, User, Settings, Globe, Loader2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Types & Constants ---

const INTERESTS_LIST = [
  "Technology", "Business", "Marketing", "Design", "Finance", 
  "Healthcare", "Education", "Engineering", "Research", "Sales", 
  "HR", "Legal", "Consulting", "Real Estate", "Media", "Arts",
  "Science", "Entertainment", "Sports", "Travel", "Food", "Fashion"
];

interface UserProfile {
  name: string;
  profession: string;
  location: string;
  interests: string[];
  bio: string;
  locationSharing: boolean;
  notifications: boolean;
  discoverRadius: number;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  profession: '',
  location: '',
  interests: [],
  bio: '',
  locationSharing: true,
  notifications: true,
  discoverRadius: 10
};

// --- Custom Hooks ---

// 1. Manage Profile Data & Persistence
const useProfileData = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    const username = localStorage.getItem('username');
    
    if (saved) {
      setProfile(JSON.parse(saved));
    } else if (username) {
      setProfile(p => ({ ...p, name: username }));
      setIsEditing(true);
    } else {
      setIsEditing(true);
    }
    setLoading(false);
  }, []);

  const saveProfile = () => {
    if (!profile.name.trim()) {
      toast({ title: "Name Required", description: "Please enter your name", variant: "destructive" });
      return;
    }
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('username', profile.name);
    setIsEditing(false);
    toast({ title: "Success", description: "Profile updated successfully" });
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return { profile, isEditing, setIsEditing, saveProfile, updateField, toggleInterest, loading };
};

// 2. Manage Location Logic
const useLocationFetcher = (updateLocation: (loc: string) => void) => {
  const { toast } = useToast();
  const [detecting, setDetecting] = useState(false);

  const detect = useCallback(() => {
    if (!('geolocation' in navigator)) {
      toast({ title: "Not Supported", description: "Geolocation is not supported by your browser.", variant: "destructive" });
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Add timeout and proper error handling
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          
          const apiKey = 'demo'; 
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&limit=1`,
            { signal: controller.signal }
          );

          clearTimeout(timeoutId);

          // Check response status
          if (!res.ok) {
            throw new Error(`API returned ${res.status}: ${res.statusText}`);
          }

          // Validate content type
          const contentType = res.headers.get('content-type');
          if (!contentType?.includes('application/json')) {
            throw new Error('Invalid response format from API');
          }

          const data = await res.json();
          
          if (data.results?.[0]?.components) {
            const c = data.results[0].components;
            const locString = `${c.city || c.town || c.village || 'Unknown'}, ${c.country || ''}`;
            updateLocation(locString);
            toast({ title: "✓ Location Set", description: `Updated to ${locString}` });
          } else {
            throw new Error('No location data found in response');
          }
        } catch (e) {
          const error = e instanceof Error ? e : new Error(String(e));
          console.error("Location detection error:", error);
          
          let errorMsg = "Failed to fetch address details";
          
          if (error.name === 'AbortError') {
            errorMsg = "Location request timed out. Please try again.";
          } else if (error.message.includes('API returned')) {
            errorMsg = error.message;
          } else if (error instanceof TypeError) {
            errorMsg = "Network error. Please check your connection.";
          }
          
          toast({ 
            title: "⚠️ Error", 
            description: errorMsg, 
            variant: "destructive" 
          });
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        let errorMsg = "Please allow location access to use this feature";
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please enable it in settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Location request timed out.";
        }
        
        toast({ 
          title: "⚠️ Permission Denied", 
          description: errorMsg, 
          variant: "destructive" 
        });
        setDetecting(false);
      }
    );
  }, [updateLocation, toast]);

  return { detect, detecting };
};

// --- Sub-Components ---

const ProfileHeader = ({ profile, isEditing, onToggleEdit }: { profile: UserProfile, isEditing: boolean, onToggleEdit: () => void }) => (
  <Card className="mb-6">
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Avatar className="h-16 w-16 mx-auto sm:mx-0">
          <AvatarFallback className="text-xl font-bold bg-blue-600 text-white">
            {profile.name.charAt(0).toUpperCase() || <User />}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold">{profile.name || 'Anonymous User'}</h1>
          <p className="text-gray-600">{profile.profession || 'No profession set'}</p>
          {profile.location && (
            <div className="flex items-center justify-center sm:justify-start mt-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" /> {profile.location}
            </div>
          )}
        </div>
        <Button onClick={onToggleEdit} variant={isEditing ? "outline" : "default"} className={!isEditing ? "bg-blue-600 hover:bg-blue-700" : ""}>
          {isEditing ? <X className="h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const PersonalInfo = ({ profile, isEditing, onChange, onDetectLocation, isDetecting }: any) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center text-lg"><User className="h-5 w-5 mr-2" /> Personal Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={profile.name} onChange={(e) => onChange('name', e.target.value)} disabled={!isEditing} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input id="profession" value={profile.profession} onChange={(e) => onChange('profession', e.target.value)} disabled={!isEditing} placeholder="Software Engineer" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="flex gap-2">
          <Input id="location" value={profile.location} onChange={(e) => onChange('location', e.target.value)} disabled={!isEditing} placeholder="City, Country" />
          {isEditing && (
            <Button variant="outline" onClick={onDetectLocation} disabled={isDetecting}>
              {isDetecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          className="w-full p-3 border rounded-md h-24 text-sm disabled:bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={profile.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          disabled={!isEditing}
          placeholder="Tell us a bit about yourself..."
        />
      </div>
    </CardContent>
  </Card>
);

const InterestsSection = ({ selected, isEditing, onToggle }: { selected: string[], isEditing: boolean, onToggle: (i: string) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Interests</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {INTERESTS_LIST.map(interest => {
           const isActive = selected.includes(interest);
           return (
            <Badge
              key={interest}
              variant={isActive ? "default" : "outline"}
              onClick={() => isEditing && onToggle(interest)}
              className={`cursor-pointer px-3 py-1 text-sm transition-all ${
                isActive ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200" : "hover:bg-gray-100"
              } ${!isEditing ? 'pointer-events-none opacity-80' : ''}`}
            >
              {interest}
            </Badge>
           );
        })}
      </div>
    </CardContent>
  </Card>
);

const SettingsCard = ({ profile, isEditing, onChange }: any) => (
  <Card>
    <CardHeader><CardTitle className="flex items-center text-lg"><Settings className="h-5 w-5 mr-2" /> Settings</CardTitle></CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div><Label>Location Sharing</Label><p className="text-xs text-gray-500">Visible to others</p></div>
        <Switch checked={profile.locationSharing} onCheckedChange={(c) => onChange('locationSharing', c)} disabled={!isEditing} />
      </div>
      <div className="flex items-center justify-between">
        <div><Label>Notifications</Label><p className="text-xs text-gray-500">Enable alerts</p></div>
        <Switch checked={profile.notifications} onCheckedChange={(c) => onChange('notifications', c)} disabled={!isEditing} />
      </div>
      <div>
        <Label>Discovery Radius (km)</Label>
        <Input type="number" min="1" max="100" value={profile.discoverRadius} onChange={(e) => onChange('discoverRadius', Number(e.target.value))} disabled={!isEditing} className="mt-1" />
      </div>
    </CardContent>
  </Card>
);

const StatsCard = () => (
  <Card>
    <CardHeader><CardTitle className="flex items-center text-lg"><Globe className="h-5 w-5 mr-2" /> Activity</CardTitle></CardHeader>
    <CardContent className="space-y-3">
      {[
        { label: 'Rooms Joined', value: 3 },
        { label: 'Messages Sent', value: 47 },
        { label: 'Connections', value: 12 }
      ].map(stat => (
        <div key={stat.label} className="flex justify-between text-sm">
          <span>{stat.label}</span>
          <Badge variant="secondary">{stat.value}</Badge>
        </div>
      ))}
    </CardContent>
  </Card>
);

// --- Main Component ---

export default function Profile() {
  const { 
    profile, isEditing, setIsEditing, saveProfile, updateField, toggleInterest, loading 
  } = useProfileData();
  
  const { detect, detecting } = useLocationFetcher((loc) => updateField('location', loc));

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <ProfileHeader profile={profile} isEditing={isEditing} onToggleEdit={() => isEditing ? setIsEditing(false) : setIsEditing(true)} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfo 
              profile={profile} 
              isEditing={isEditing} 
              onChange={updateField} 
              onDetectLocation={detect} 
              isDetecting={detecting}
            />
            <InterestsSection 
              selected={profile.interests} 
              isEditing={isEditing} 
              onToggle={toggleInterest} 
            />
          </div>

          <div className="space-y-6">
            <SettingsCard profile={profile} isEditing={isEditing} onChange={updateField} />
            <StatsCard />
          </div>
        </div>

        {isEditing && (
          <div className="sticky bottom-4 flex justify-center animate-in slide-in-from-bottom-5">
            <Button onClick={saveProfile} size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}