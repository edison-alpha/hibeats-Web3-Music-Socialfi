import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share2,
  ShoppingCart,
  Music,
  TrendingUp,
  Clock,
  Star,
  Users,
  ChevronRight,
  Filter,
  Headphones,
  Check
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAudio } from "@/contexts/AudioContext";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import verifiedIcon from "@/assets/image.png";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Explore = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const [isCreateSongModalOpen, setIsCreateSongModalOpen] = useState(false);
  const catalogSelects = [
    {
      id: 1,
      title: "Cyber Dreams",
      artist: "Synthwave Collective",
      avatar: "SC",
      cover: album1,
      genre: "Synthwave",
      duration: "3:42",
      price: "0.5 ETH",
      likes: 1247,
      plays: 2100000,
      featured: true
    },
    {
      id: 2,
      title: "Neon Nights",
      artist: "Digital Artists",
      avatar: "DA",
      cover: album2,
      genre: "Electronic",
      duration: "4:15",
      price: "0.3 ETH",
      likes: 892,
      plays: 1800000,
      featured: false
    },
    {
      id: 3,
      title: "Future Bass",
      artist: "Beat Masters",
      avatar: "BM",
      cover: album3,
      genre: "Hip Hop",
      duration: "2:58",
      price: "0.7 ETH",
      likes: 2156,
      plays: 3200000,
      featured: true
    }
  ];

  const linerNotes = [
    {
      id: 1,
      title: "The Making of Cyber Dreams",
      artist: "Synthwave Collective",
      excerpt: "An intimate look into the creative process behind our latest synthwave masterpiece...",
      readTime: "5 min read",
      cover: album1,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Exploring AI Music Generation",
      artist: "HiBeats Team",
      excerpt: "How artificial intelligence is revolutionizing music creation and what it means for artists...",
      readTime: "8 min read",
      cover: album2,
      date: "1 week ago"
    }
  ];

  const recentlySupported = [
    {
      id: 1,
      title: "Midnight Groove",
      artist: "Jazz Fusion",
      cover: album2,
      amount: "0.2 ETH",
      supporter: "MusicLover123",
      time: "2h ago"
    },
    {
      id: 2,
      title: "Urban Pulse",
      artist: "Beat Masters",
      cover: album3,
      amount: "0.5 ETH",
      supporter: "CryptoFan",
      time: "5h ago"
    }
  ];

  const recentlyReleased = [
    {
      id: 1,
      title: "Digital Horizons",
      artist: "Ambient Sounds",
      avatar: "AS",
      cover: album4,
      genre: "Ambient",
      duration: "5:20",
      likes: 634,
      plays: 45200,
      releaseDate: "2 days ago"
    },
    {
      id: 2,
      title: "Electric Dreams",
      artist: "Synthwave Collective",
      avatar: "SC",
      cover: album1,
      genre: "Synthwave",
      duration: "3:15",
      likes: 987,
      plays: 128000,
      releaseDate: "1 week ago"
    },
    {
      id: 3,
      title: "Urban Pulse",
      artist: "Beat Masters",
      avatar: "BM",
      cover: album3,
      genre: "Hip Hop",
      duration: "2:58",
      likes: 2156,
      plays: 320000,
      releaseDate: "3 days ago"
    },
    {
      id: 4,
      title: "Neon Nights",
      artist: "Digital Artists",
      avatar: "DA",
      cover: album2,
      genre: "Electronic",
      duration: "4:15",
      likes: 892,
      plays: 180000,
      releaseDate: "5 days ago"
    },
    {
      id: 5,
      title: "Midnight Groove",
      artist: "Jazz Fusion",
      avatar: "JF",
      cover: album2,
      genre: "Jazz",
      duration: "4:45",
      likes: 1456,
      plays: 118000,
      releaseDate: "1 week ago"
    },
    {
      id: 6,
      title: "Cyber Punk",
      artist: "Neon Collective",
      avatar: "NC",
      cover: album3,
      genre: "Cyberpunk",
      duration: "4:12",
      likes: 1234,
      plays: 134000,
      releaseDate: "4 days ago"
    }
  ];

  const listeningNow = [
    {
      id: 1,
      title: "Ocean Waves",
      artist: "Ambient Sounds",
      avatar: "AS",
      cover: album4,
      genre: "Ambient",
      duration: "5:20",
      likes: 634,
      plays: 12500
    },
    {
      id: 2,
      title: "Neon Dreams",
      artist: "Synthwave Collective",
      avatar: "SC",
      cover: album1,
      genre: "Synthwave",
      duration: "3:15",
      likes: 987,
      plays: 8900
    },
    {
      id: 3,
      title: "Urban Pulse",
      artist: "Beat Masters",
      avatar: "BM",
      cover: album3,
      genre: "Hip Hop",
      duration: "2:58",
      likes: 2156,
      plays: 15200
    },
    {
      id: 4,
      title: "Midnight Groove",
      artist: "Jazz Fusion",
      avatar: "JF",
      cover: album2,
      genre: "Jazz",
      duration: "4:45",
      likes: 1456,
      plays: 11800
    },
    {
      id: 5,
      title: "Digital Horizon",
      artist: "Digital Artists",
      avatar: "DA",
      cover: album1,
      genre: "Electronic",
      duration: "3:30",
      likes: 892,
      plays: 9600
    },
    {
      id: 6,
      title: "Cyber Punk",
      artist: "Neon Collective",
      avatar: "NC",
      cover: album3,
      genre: "Cyberpunk",
      duration: "4:12",
      likes: 1234,
      plays: 13400
    },
    {
      id: 7,
      title: "Tranquil Waters",
      artist: "Ambient Sounds",
      avatar: "AS",
      cover: album4,
      genre: "Ambient",
      duration: "6:15",
      likes: 756,
      plays: 10200
    },
    {
      id: 8,
      title: "Retro Synth",
      artist: "Synthwave Collective",
      avatar: "SC",
      cover: album2,
      genre: "Synthwave",
      duration: "3:45",
      likes: 1102,
      plays: 14200
    },
    {
      id: 9,
      title: "Street Beats",
      artist: "Beat Masters",
      avatar: "BM",
      cover: album1,
      genre: "Hip Hop",
      duration: "2:30",
      likes: 1876,
      plays: 16800
    },
    {
      id: 10,
      title: "Smooth Jazz",
      artist: "Jazz Fusion",
      avatar: "JF",
      cover: album3,
      genre: "Jazz",
      duration: "5:02",
      likes: 1345,
      plays: 11200
    }
  ];

  const artists = [
    {
      name: "Synthwave Collective",
      avatar: "SC",
      followers: "45.2K",
      tracks: 24,
      verified: true,
      bio: "Pioneering the future of synthwave music with AI-enhanced production"
    },
    {
      name: "Jazz Fusion",
      avatar: "JF",
      followers: "32.1K",
      tracks: 18,
      verified: false,
      bio: "Blending traditional jazz with modern electronic elements"
    },
    {
      name: "Beat Masters",
      avatar: "BM",
      followers: "67.8K",
      tracks: 31,
      verified: true,
      bio: "Urban beat creators pushing the boundaries of hip-hop production"
    },
    {
      name: "Ambient Sounds",
      avatar: "AS",
      followers: "23.4K",
      tracks: 15,
      verified: false,
      bio: "Creating immersive soundscapes for meditation and focus"
    },
    {
      name: "Digital Artists",
      avatar: "DA",
      followers: "18.9K",
      tracks: 12,
      verified: false,
      bio: "Exploring the intersection of technology and musical creativity"
    },
    {
      name: "Neon Collective",
      avatar: "NC",
      followers: "41.5K",
      tracks: 22,
      verified: true,
      bio: "Cyberpunk-inspired electronic music for the digital age"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-16">
            {/* Catalog Selects */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-clash font-semibold text-2xl mb-1">Catalog Selects</h2>
                  <p className="text-muted-foreground text-sm">Curated tracks from our featured artists</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catalogSelects.map((track) => (
                  <Card key={track.id} className="group hover:shadow-lg transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm overflow-hidden rounded-2xl">
                    <div className="relative">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentTrack?.id === track.id && isPlaying) {
                              pauseTrack();
                            } else {
                              playTrack(track);
                            }
                          }}
                        >
                          {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </Button>
                      </div>
                      {track.featured && (
                        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground text-xs px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-1 truncate">{track.title}</h3>
                          <p className="text-muted-foreground text-sm truncate">{track.artist}</p>
                          <Badge variant="secondary" className="text-xs mt-2 rounded-full px-2 py-0.5">
                            {track.genre}
                          </Badge>
                        </div>
                        <div className="text-right ml-3">
                          <p className="font-semibold text-primary text-sm">{track.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {track.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          {(track.plays / 1000000).toFixed(1)}M
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 rounded-full text-xs h-8">
                          <Play className="w-3 h-3 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full text-xs h-8 px-3">
                          <ShoppingCart className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Liner Notes */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-clash font-semibold text-2xl mb-1">Liner Notes</h2>
                  <p className="text-muted-foreground text-sm">Stories and insights from artists</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
                  <Link to="/liner-notes">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {linerNotes.map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <img
                          src={note.cover}
                          alt={note.title}
                          className="w-20 h-20 object-cover rounded-l-2xl"
                        />
                        <div className="flex-1 p-4">
                          <h3 className="font-semibold text-base mb-2 line-clamp-2">{note.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {note.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{note.artist}</span>
                              <span>•</span>
                              <span>{note.readTime}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="text-xs h-7 px-3 rounded-full">
                              Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recently Supported */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-clash font-semibold text-2xl mb-1">Recently Supported</h2>
                  <p className="text-muted-foreground text-sm">Tracks that received community support</p>
                </div>
              </div>

              <div className="space-y-3">
                {recentlySupported.map((support) => (
                  <Card key={support.id} className="hover:shadow-sm transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={support.cover}
                          alt={support.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{support.supporter}</span>
                            {" "}supported{" "}
                            <span className="font-medium">{support.title}</span>
                            {" "}by{" "}
                            <span className="text-muted-foreground">{support.artist}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs rounded-full px-2 py-0.5">
                              {support.amount}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{support.time}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-full">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recently Released */}
            <section>
              <div className="mb-8">
                <h2 className="font-clash font-semibold text-2xl mb-1">Recently Released</h2>
                <p className="text-muted-foreground text-sm">Fresh tracks from the HiBeats community</p>
              </div>

              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {recentlyReleased.map((release) => (
                    <CarouselItem key={release.id} className="pl-2 md:pl-4 basis-1/2">
                      <Card className="hover:shadow-md transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm rounded-2xl">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={release.cover}
                              alt={release.title}
                              className="w-14 h-14 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base truncate">{release.title}</h3>
                              <p className="text-muted-foreground text-sm truncate">{release.artist}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs rounded-full px-2 py-0.5">
                                  {release.genre}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {release.releaseDate}
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-xs text-muted-foreground mb-2">
                                {(release.plays / 1000).toFixed(0)}K plays
                              </p>
                              <Button
                                size="sm"
                                className="rounded-full text-xs h-8 px-4 gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (currentTrack?.id === release.id && isPlaying) {
                                    pauseTrack();
                                  } else {
                                    playTrack(release);
                                  }
                                }}
                              >
                                {currentTrack?.id === release.id && isPlaying ? (
                                  <Pause className="w-3 h-3" />
                                ) : (
                                  <Play className="w-3 h-3" />
                                )}
                                Play
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-8" />
                <CarouselNext className="hidden md:flex -right-8" />
              </Carousel>
            </section>

            {/* What People Are Listening To */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-clash font-semibold text-2xl mb-1">Trending Now</h2>
                  <p className="text-muted-foreground text-sm">What people are listening to right now</p>
                </div>
              </div>

              <div className="space-y-3">
                {listeningNow.map((track, index) => (
                  <Card key={track.id} className="hover:shadow-sm transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">{track.title}</h3>
                          <p className="text-muted-foreground text-sm truncate">{track.artist}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs rounded-full px-2 py-0.5">
                              {track.genre}
                            </Badge>
                            <span className="text-xs text-green-600 font-medium">
                              {(track.plays / 1000).toFixed(0)}K listening
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full text-xs h-8 px-4 gap-1 ml-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentTrack?.id === track.id && isPlaying) {
                              pauseTrack();
                            } else {
                              playTrack(track);
                            }
                          }}
                        >
                          {currentTrack?.id === track.id && isPlaying ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Featured Artists */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-clash font-semibold text-2xl mb-1">Featured Artists</h2>
                  <p className="text-muted-foreground text-sm">Discover talented creators in our community</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
                  <Link to="/featured-artists">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artists.map((artist) => (
                  <Card key={artist.name} className="hover:shadow-md transition-all duration-300 border-border/20 bg-card/50 backdrop-blur-sm rounded-2xl">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
                            {artist.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base truncate">{artist.name}</h3>
                            {artist.verified && (
                              <img
                                src={verifiedIcon}
                                alt="Verified"
                                className="w-4 h-4 flex-shrink-0"
                              />
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{artist.followers} followers</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{artist.tracks} tracks</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {artist.bio}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 rounded-full text-xs h-8">
                          Follow
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* User Profile Card */}
                <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          U
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Your Profile</p>
                        <p className="text-sm text-muted-foreground">@username</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm mb-3">
                      <div>
                        <span className="font-semibold">42</span>
                        <span className="text-muted-foreground ml-1">Following</span>
                      </div>
                      <div>
                        <span className="font-semibold">1.2K</span>
                        <span className="text-muted-foreground ml-1">Followers</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="font-clash font-semibold text-lg mb-3">Trending Topics</h3>
                    <div className="space-y-3">
                      {[
                        { tag: '#Synthwave', posts: '1.2K posts' },
                        { tag: '#NewMusic', posts: '856 posts' },
                        { tag: '#Electronic', posts: '643 posts' },
                        { tag: '#IndieArtists', posts: '432 posts' }
                      ].map((topic) => (
                        <div key={topic.tag} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
                            {topic.tag}
                          </span>
                          <span className="text-xs text-muted-foreground">{topic.posts}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Music Genres */}
                <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="font-clash font-semibold text-lg mb-3">Explore Genres</h3>
                    <div className="space-y-2">
                      {['Electronic', 'Hip Hop', 'Jazz', 'Ambient', 'Rock', 'Pop'].map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="mr-2 mb-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Playlists */}
                <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-clash font-semibold text-lg">Featured Playlists</h3>
                      <Link to="/myplaylist" className="text-sm text-primary hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          id: 1,
                          title: "Chill Electronic Vibes",
                          creator: "HiBeats AI",
                          tracks: 24,
                          cover: album1,
                          description: "Perfect for coding sessions"
                        },
                        {
                          id: 2,
                          title: "Hip Hop Essentials",
                          creator: "Beat Masters",
                          tracks: 18,
                          cover: album2,
                          description: "Classic beats and flows"
                        },
                        {
                          id: 3,
                          title: "Jazz Fusion Nights",
                          creator: "Jazz Collective",
                          tracks: 15,
                          cover: album3,
                          description: "Smooth jazz for evenings"
                        },
                        {
                          id: 4,
                          title: "Ambient Focus",
                          creator: "Ambient Sounds",
                          tracks: 12,
                          cover: album4,
                          description: "Concentration music"
                        }
                      ].map((playlist) => (
                        <div key={playlist.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                          <img
                            src={playlist.cover}
                            alt={playlist.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{playlist.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">{playlist.creator}</p>
                            <p className="text-xs text-muted-foreground">{playlist.tracks} tracks</p>
                          </div>
                          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;