import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Pause,
  MoreHorizontal,
  Music,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  ShoppingCart,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import bgprofile from "@/assets/bgprofile.jpg";
import avatar8 from "@/assets/8.png";
import artistAvatar from "@/assets/8.png";
import { useAudio } from "@/contexts/AudioContext";

const DetailAlbum = () => {
  const { albumId } = useParams();
  const { currentTrack, isPlaying, playTrack, isAudioReady, resumeTrack } = useAudio();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock album data - in real app this would come from API based on albumId
  const album = {
    id: 1,
    title: "Anagrams",
    artist: "Maodea",
    cover: album1,
    releaseDate: "Dec 20, 2016",
    genre: "beats",
    label: "Visions",
    type: "Album",
    totalLength: "33:25",
    format: "WAV",
    description: "A mesmerizing collection of electronic beats that explores the boundaries of sound design and rhythm. Each track tells a story through intricate soundscapes and innovative production techniques.",
    stats: {
      totalPlays: "1.2M",
      totalLikes: 45678,
      totalTracks: 8
    }
  };

  const albumTracks = [
    {
      id: 1,
      title: "Opening Sequence",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "4:12",
      likes: 2341,
      plays: 156000
    },
    {
      id: 2,
      title: "Digital Dreams",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "3:45",
      likes: 1987,
      plays: 134000
    },
    {
      id: 3,
      title: "Neon Nights",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "4:23",
      likes: 3124,
      plays: 189000
    },
    {
      id: 4,
      title: "Binary Sunset",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "3:18",
      likes: 2234,
      plays: 145000
    },
    {
      id: 5,
      title: "Code Breaker",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "5:02",
      likes: 2876,
      plays: 167000
    },
    {
      id: 6,
      title: "Matrix Reloaded",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "3:56",
      likes: 2987,
      plays: 178000
    },
    {
      id: 7,
      title: "Final Transmission",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "4:34",
      likes: 2654,
      plays: 156000
    },
    {
      id: 8,
      title: "System Shutdown",
      artist: album.artist,
      avatar: album.cover,
      cover: album.cover,
      genre: album.genre,
      duration: "4:15",
      likes: 2345,
      plays: 143000
    }
  ];

  const togglePlay = (trackId: number) => {
    const track = albumTracks.find(t => t.id === trackId);
    if (track) {
      if (currentTrack?.id === trackId && (isPlaying || isAudioReady)) {
        if (isPlaying) {
          // If currently playing this track, pause it
          // Note: We don't have direct pause access here, but playTrack will handle it
          return;
        } else if (isAudioReady) {
          // If audio is ready but not playing, resume it
          resumeTrack();
          return;
        }
      } else {
        // Play the selected track
        playTrack(track);
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back Button */}
      <div className="pt-16 pb-4">
        <div className="container mx-auto px-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/feed">
              <ChevronLeft className="w-4 h-4" />
              Back to Feed
            </Link>
          </Button>
        </div>
      </div>

      {/* Album Header */}
      <div className="relative border-b border-border/20 overflow-hidden min-h-[400px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgprofile})` }}
        ></div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/80 to-secondary/5 backdrop-blur-sm"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 py-8 min-h-[400px] flex items-center">
          <div className="flex flex-col md:flex-row gap-8 items-start w-full">
            {/* Album Cover */}
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden ring-4 ring-background/50 shadow-2xl">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Album Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-clash font-semibold text-3xl md:text-4xl text-foreground">{album.title}</h1>
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                    {album.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">by {album.artist}</p>
              </div>

              {/* Album Stats */}
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-xl text-foreground">{album.stats.totalPlays}</p>
                  <p className="text-muted-foreground">Plays</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl text-foreground">{formatNumber(album.stats.totalLikes)}</p>
                  <p className="text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl text-foreground">{album.stats.totalTracks}</p>
                  <p className="text-muted-foreground">Tracks</p>
                </div>
              </div>

              {/* Album Description */}
              <div className="space-y-2">
                <p className="text-sm leading-relaxed max-w-2xl text-muted-foreground">{album.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {album.releaseDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    {album.genre}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {album.label}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-8 shadow-lg ${isFollowing ? 'bg-muted text-muted-foreground hover:bg-muted' : 'bg-primary hover:bg-primary/90 shadow-primary/25'}`}
                >
                  {isFollowing ? 'Following' : 'Follow Album'}
                </Button>
                <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:bg-muted/50">
                  <Heart className="w-4 h-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Tracks List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-clash font-semibold text-2xl">Tracks</h2>
              <Badge variant="outline" className="text-sm">
                {album.stats.totalTracks} tracks • {album.totalLength}
              </Badge>
            </div>

            {/* Track List */}
            <div className="space-y-2">
              {albumTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="group flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer border border-transparent hover:border-border/50"
                >
                  {/* Track Number */}
                  <div className="w-8 h-8 flex items-center justify-center text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {index + 1}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-muted/20 flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(track.id);
                      }}
                    >
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </Button>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{track.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{track.duration}</span>
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {track.plays}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(track.likes)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Album Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Buy Album */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-primary mb-1">2.5 ETH</p>
                    <p className="text-sm text-muted-foreground">Complete Album</p>
                  </div>
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90" size="lg">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Album
                  </Button>
                  <div className="text-center text-xs text-muted-foreground">
                    Includes all 8 tracks in high-quality WAV format
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Album Details */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-clash font-semibold text-lg mb-4">Album Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-sm text-muted-foreground">Release date</span>
                    <span className="text-sm font-medium">{album.releaseDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-sm text-muted-foreground">Genre</span>
                    <span className="text-sm font-medium">{album.genre}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-sm text-muted-foreground">Label</span>
                    <span className="text-sm font-medium">{album.label}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium">{album.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-sm text-muted-foreground">Total length</span>
                    <span className="text-sm font-medium">{album.totalLength}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Format</span>
                    <span className="text-sm font-medium">{album.format}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supporters */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-clash font-semibold text-lg mb-4">Supporters</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: "MusicLover123", amount: "2.5 ETH", avatar: "ML", bio: "Passionate music collector and synthwave enthusiast", followers: 1240, following: 89 },
                    { name: "BeatProducer", amount: "1.8 ETH", avatar: "BP", bio: "Professional beat maker and sound designer", followers: 2156, following: 234 },
                    { name: "SynthFan", amount: "1.2 ETH", avatar: "SF", bio: "Retro synthwave and electronic music lover", followers: 892, following: 156 },
                    { name: "AudioWizard", amount: "0.9 ETH", avatar: "AW", bio: "Audio engineer and music producer", followers: 634, following: 78 },
                    { name: "SoundDesigner", amount: "0.7 ETH", avatar: "SD", bio: "Creating unique soundscapes and audio experiences", followers: 445, following: 92 },
                    { name: "RhythmMaster", amount: "0.6 ETH", avatar: "RM", bio: "Rhythm specialist and beat creator", followers: 321, following: 67 },
                    { name: "BassLord", amount: "0.5 ETH", avatar: "BL", bio: "Bass music producer and DJ", followers: 298, following: 45 },
                    { name: "MelodyQueen", amount: "0.4 ETH", avatar: "MQ", bio: "Melodic composer and vocalist", followers: 567, following: 123 },
                    { name: "DJ Electron", amount: "0.3 ETH", avatar: "DE", bio: "Electronic music DJ and producer", followers: 389, following: 98, avatarImage: avatar8 }
                  ].map((supporter, index) => (
                    <div key={index} className="relative group">
                      {/* Profile Preview Card */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <Card className="w-64 border-border/50 shadow-xl bg-background/95 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                                <AvatarImage src={supporter.avatarImage || ""} />
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold text-sm">
                                  {supporter.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm truncate">{supporter.name}</h4>
                                  {index < 3 && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                      Top {index + 1}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{supporter.bio}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                  <span>{supporter.followers} followers</span>
                                  <span>{supporter.following} following</span>
                                </div>
                                <Button size="sm" className="w-full text-xs h-7">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        {/* Arrow pointer */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background/95"></div>
                      </div>

                      {/* Avatar */}
                      <div className="flex flex-col items-center gap-2 group/avatar">
                        <div className="relative">
                          <Avatar className="w-12 h-12 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200 group-hover:scale-105">
                            <AvatarImage src={supporter.avatarImage || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold text-sm hover:from-primary/30 hover:to-secondary/30 transition-all duration-200">
                              {supporter.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-xs font-semibold text-primary-foreground">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200">
                          <p className="text-xs font-medium truncate max-w-[60px]">{supporter.name}</p>
                          <p className="text-xs text-muted-foreground">{supporter.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-clash font-semibold text-lg mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #beats
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #electronic
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #ambient
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #experimental
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #producer
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #visions
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #maodea
                  </Badge>
                  <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    #album
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAlbum;