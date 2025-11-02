import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Instagram,
  Twitter,
  Music,
  Apple,
  ExternalLink,
  Upload,
  ArrowLeft,
  Save
} from "lucide-react";

interface ProfileCreationProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: ProfileData) => void;
  onBack: () => void;
}

interface ProfileData {
  name: string;
  avatar: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    bandcamp: string;
    soundcloud: string;
    appleMusic: string;
    spotify: string;
    other: string;
  };
}

const ProfileCreation = ({ isOpen, onClose, onSave, onBack }: ProfileCreationProps) => {
  const [step, setStep] = useState<'name' | 'profile'>('name');
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    twitter: "",
    bandcamp: "",
    soundcloud: "",
    appleMusic: "",
    spotify: "",
    other: ""
  });

  const handleContinue = () => {
    if (name.trim()) {
      setStep('profile');
    }
  };

  const handleBackToName = () => {
    setStep('name');
  };

  const handleBackToLogin = () => {
    onBack();
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const profileData: ProfileData = {
      name: name.trim(),
      avatar,
      socialLinks
    };

    onSave(profileData);
  };

  const updateSocialLink = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const socialPlatforms = [
    {
      key: "instagram" as const,
      label: "INSTAGRAM",
      placeholder: "instagram.com/you",
      icon: Instagram,
      prefix: "instagram.com/"
    },
    {
      key: "twitter" as const,
      label: "TWITTER",
      placeholder: "x.com/you",
      icon: Twitter,
      prefix: "x.com/"
    },
    {
      key: "bandcamp" as const,
      label: "BANDCAMP",
      placeholder: "you.bandcamp.com",
      icon: Music,
      prefix: ""
    },
    {
      key: "soundcloud" as const,
      label: "SOUNDCLOUD",
      placeholder: "soundcloud.com/you",
      icon: Music,
      prefix: "soundcloud.com/"
    },
    {
      key: "appleMusic" as const,
      label: "APPLE MUSIC",
      placeholder: "music.apple.com/us/artist/you/id",
      icon: Apple,
      prefix: ""
    },
    {
      key: "spotify" as const,
      label: "SPOTIFY",
      placeholder: "open.spotify.com/artist/you",
      icon: Music,
      prefix: "open.spotify.com/artist/"
    },
    {
      key: "other" as const,
      label: "OTHER",
      placeholder: "you.com",
      icon: ExternalLink,
      prefix: ""
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-clash font-bold">
            Create your profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {step === 'name' ? (
            /* Name Step */
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl font-clash font-bold mb-2">What's your name?</h2>
                <p className="text-muted-foreground">Let's get to know you better</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl py-4 text-center"
                  autoFocus
                />
              </div>

              <Button
                onClick={handleContinue}
                disabled={!name.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                Continue
              </Button>
            </div>
          ) : (
            /* Profile Step */
            <>
              {/* Avatar Upload */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Profile Picture</Label>
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      {name.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label
                      htmlFor="avatar-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Avatar
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Connect your profiles</Label>
                <div className="space-y-3">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <div key={platform.key} className="flex items-center gap-3">
                        <div className="w-32 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Icon className="w-4 h-4" />
                          {platform.label}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder={platform.placeholder}
                            value={socialLinks[platform.key]}
                            onChange={(e) => updateSocialLink(platform.key, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBackToLogin}
                  className="flex-1 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                >
                  <Save className="w-4 h-4" />
                  Save Profile
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCreation;