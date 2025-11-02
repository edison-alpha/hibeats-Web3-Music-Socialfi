import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  Music,
  Wand2,
  Play,
  Pause,
  Volume2,
  RotateCcw,
  Download,
  Share2,
  Heart,
  MessageCircle,
  MoreHorizontal,
  X,
  Mic,
  Zap
} from "lucide-react";

interface CreateSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareToFeed?: (post: any) => void;
}

const CreateSongModal = ({ isOpen, onClose, onShareToFeed }: CreateSongModalProps) => {
  const [step, setStep] = useState<'prompt' | 'generating' | 'result'>('prompt');
  const [prompt, setPrompt] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [vocalType, setVocalType] = useState<'male' | 'female' | 'auto' | 'none'>('auto');
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const genres = [
    'Electronic', 'Hip Hop', 'Jazz', 'Ambient', 'Rock', 'Pop',
    'R&B', 'Classical', 'Folk', 'Reggae', 'Blues', 'Country'
  ];

  const moods = [
    'Energetic', 'Chill', 'Melancholic', 'Happy', 'Dark', 'Uplifting',
    'Romantic', 'Aggressive', 'Peaceful', 'Epic', 'Dreamy', 'Intense'
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setStep('generating');

    // Simulate AI generation
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  const handleReset = () => {
    setStep('prompt');
    setPrompt('');
    setIsInstrumental(false);
    setVocalType('auto');
    setIsPlaying(null);
  };

  const handleShareToFeed = () => {
    if (!onShareToFeed) return;

    // Create a post for the feed
    const newPost = {
      id: Date.now(), // Use timestamp as unique ID
      title: generatedSongs[0].title, // Use first song as main title
      artist: "You", // Current user
      avatar: "U",
      cover: "/api/placeholder/300/300", // Placeholder cover
      genre: generatedSongs[0].genre,
      likes: 0,
      comments: 0,
      shares: 0,
      duration: generatedSongs[0].duration,
      isLiked: false,
      isPlaying: false,
      timestamp: "now",
      description: `Just created 2 amazing tracks with HiBeats AI! 🎵✨ "${prompt}" #AI #Music #HiBeats`,
      commentsList: []
    };

    onShareToFeed(newPost);
    onClose(); // Close the modal after sharing
  };

  const generatedSongs = [
    {
      id: 1,
      title: "AI Generated Track 1",
      artist: "HiBeats AI",
      genre: isInstrumental ? "Instrumental" : vocalType === 'male' ? "Male Vocal" : vocalType === 'female' ? "Female Vocal" : "AI Vocal",
      duration: "30s",
      cover: "/api/placeholder/300/300",
      likes: 0,
      plays: 0,
      type: isInstrumental ? "Instrumental" : vocalType === 'male' ? "Male Vocal" : vocalType === 'female' ? "Female Vocal" : "AI Vocal"
    },
    {
      id: 2,
      title: "AI Generated Track 2",
      artist: "HiBeats AI",
      genre: isInstrumental ? "Instrumental" : vocalType === 'male' ? "Male Vocal" : vocalType === 'female' ? "Female Vocal" : "AI Vocal",
      duration: "28s",
      cover: "/api/placeholder/300/300",
      likes: 0,
      plays: 0,
      type: isInstrumental ? "Instrumental" : vocalType === 'male' ? "Male Vocal" : vocalType === 'female' ? "Female Vocal" : "AI Vocal"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Create Song
          </DialogTitle>
        </DialogHeader>

        {step === 'prompt' && (
          <div className="space-y-6">
            {/* Description Input */}
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe your song</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., A chill electronic track with deep bass and atmospheric synths, perfect for late night coding sessions..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Instrumental Option */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="instrumental"
                checked={isInstrumental}
                onCheckedChange={(checked) => {
                  const isChecked = checked as boolean;
                  setIsInstrumental(isChecked);
                  if (isChecked) {
                    setVocalType('none');
                  } else {
                    setVocalType('auto');
                  }
                }}
              />
              <Label htmlFor="instrumental" className="flex items-center gap-2 cursor-pointer">
                <Mic className="w-4 h-4" />
                +instrumental
              </Label>
            </div>

            {/* Vocal Type Selection */}
            {!isInstrumental && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Vocal Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      vocalType === 'auto'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setVocalType('auto')}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Auto</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">AI chooses best vocal style</p>
                  </div>

                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      vocalType === 'male'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setVocalType('male')}
                  >
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Male</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Deep male vocals</p>
                  </div>

                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      vocalType === 'female'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setVocalType('female')}
                  >
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-medium">Female</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Melodic female vocals</p>
                  </div>

                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      vocalType === 'none'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setVocalType('none')}
                  >
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Instrumental</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">No vocals</p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Text */}
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              {isInstrumental ? (
                <p>✓ Instrumental track only (no vocals) will be generated</p>
              ) : vocalType === 'auto' ? (
                <p>✓ Full song with AI-selected vocals will be generated</p>
              ) : vocalType === 'male' ? (
                <p>✓ Full song with deep male vocals will be generated</p>
              ) : vocalType === 'female' ? (
                <p>✓ Full song with melodic female vocals will be generated</p>
              ) : (
                <p>✓ Full song with vocals will be generated</p>
              )}
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              size="lg"
            >
              <Wand2 className="w-4 h-4" />
              Generate Song with AI
            </Button>
          </div>
        )}

        {step === 'generating' && (
          <div className="text-center py-12">
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Music className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 w-16 h-16 mx-auto border-2 border-primary/20 rounded-full animate-spin border-t-primary"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Creating your song...</h3>
            <p className="text-muted-foreground">
              Our AI is composing a unique track just for you
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-6">
            {/* Generated Songs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Choose your favorite!</h3>
              {generatedSongs.map((song, index) => (
                <Card key={song.id} className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Music className="w-8 h-8 text-primary" />
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                          onClick={() => setIsPlaying(isPlaying === song.id ? null : song.id)}
                        >
                          {isPlaying === song.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                        </Button>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{song.title}</h3>
                        <p className="text-muted-foreground">{song.artist}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {song.genre}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{song.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0:00</span>
                        <span>{song.duration}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`bg-primary h-2 rounded-full transition-all duration-300 ${isPlaying === song.id ? 'w-1/3' : 'w-0'}`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1 gap-2">
                <RotateCcw className="w-4 h-4" />
                Generate Again
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download All
              </Button>
              <Button className="flex-1 gap-2" onClick={handleShareToFeed}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Social Preview */}
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="font-semibold text-sm">You</span>
                    <span className="text-xs text-muted-foreground ml-2">@username</span>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  Just created 2 amazing tracks with HiBeats AI! 🎵✨
                  <br />
                  <span className="text-primary">#{generatedSongs[0].type.replace(' ', '')}</span>
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">0</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">0</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs">0</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSongModal;