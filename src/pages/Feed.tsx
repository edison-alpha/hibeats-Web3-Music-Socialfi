import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Pause,
  MoreHorizontal,
  Music,
  TrendingUp,
  ShoppingCart,
  Send,
  X,
  Plus,
  Reply,
  Repeat2,
  DollarSign,
  Copy,
  Flag,
  UserX,
  VolumeX,
  Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PostComposer from "@/components/PostComposer";
import Navbar from "@/components/Navbar";
import PlaylistModal from "@/components/PlaylistModal";
import { useAudio } from "@/contexts/AudioContext";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import BuyModal from "@/components/BuyModal";
import TipModal from "@/components/TipModal";

const Feed = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack, addToPlaylist, isAudioReady, resumeTrack } = useAudio();
  const [commentsOpen, setCommentsOpen] = useState<{ [key: number]: boolean }>({});
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<{ trackId: number; commentId: number } | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof tracks[0] | null>(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedTrackForPurchase, setSelectedTrackForPurchase] = useState<typeof tracks[0] | null>(null);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [selectedTrackForTip, setSelectedTrackForTip] = useState<typeof tracks[0] | null>(null);

  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Neon Dreams",
      artist: "Synthwave Collective",
      avatar: "SC",
      cover: album1,
      genre: "Synthwave",
      likes: 1247,
      comments: 89,
      shares: 23,
      duration: "3:42",
      isLiked: false,
      isPlaying: false,
      timestamp: "2h ago",
      description: "A journey through cyberpunk nights and electric dreams 🎵 #Synthwave #Electronic",
      commentsList: [
        { 
          id: 1, 
          user: "MusicLover123", 
          text: "This track is absolutely fire! 🔥", 
          timestamp: "1h ago",
          replies: [
            { id: 101, user: "Synthwave Collective", text: "Thanks! Glad you like it! 🎵", timestamp: "45m ago" }
          ]
        },
        { id: 2, user: "BeatProducer", text: "Love the synth work here!", timestamp: "45m ago", replies: [] },
        { id: 3, user: "SynthFan", text: "Reminds me of classic vaporwave vibes", timestamp: "30m ago", replies: [] }
      ],
      isRepost: false
    },
    {
      id: 2,
      title: "Digital Horizon",
      artist: "Cyber Punk",
      avatar: "CP",
      cover: album2,
      genre: "Electronic",
      likes: 2156,
      comments: 156,
      shares: 78,
      duration: "4:15",
      isLiked: true,
      isPlaying: false,
      timestamp: "3h ago",
      description: "Lost in the digital realm where reality meets fantasy � #Cyberpunk #Electronic",
      commentsList: [
        { id: 1, user: "FutureSound", text: "This track takes me to another dimension!", timestamp: "2h ago" },
        { id: 2, user: "SynthMaster", text: "Incredible production quality", timestamp: "1h ago" },
        { id: 3, user: "NightOwl", text: "Perfect for late night coding sessions", timestamp: "45m ago" }
      ],
      isRepost: false
    },
    {
      id: 3,
      title: "Midnight Groove",
      artist: "Jazz Fusion",
      avatar: "JF",
      cover: album3,
      genre: "Jazz",
      likes: 892,
      comments: 45,
      shares: 12,
      duration: "4:15",
      isLiked: true,
      isPlaying: false,
      timestamp: "4h ago",
      description: "Smooth jazz vibes for your late night sessions 🌙 #Jazz #Fusion",
      commentsList: [
        { id: 1, user: "JazzHead", text: "The fusion elements are perfect!", timestamp: "2h ago" },
        { id: 2, user: "SmoothTunes", text: "This is my new favorite track", timestamp: "1h ago" }
      ],
      isRepost: false
    },
    {
      id: 4,
      title: "Urban Pulse",
      artist: "Beat Masters",
      avatar: "BM",
      cover: album4,
      genre: "Hip Hop",
      likes: 2156,
      comments: 156,
      shares: 78,
      duration: "2:58",
      isLiked: false,
      isPlaying: false,
      timestamp: "6h ago",
      description: "City beats that make you move 🏙️ #HipHop #Urban",
      commentsList: [
        { id: 1, user: "HipHopFan", text: "The beat is insane! Production quality is top tier", timestamp: "3h ago" },
        { id: 2, user: "ProducerLife", text: "Clean mixing and mastering", timestamp: "2h ago" },
        { id: 3, user: "BeatLover", text: "This slaps harder than my ex 😂", timestamp: "1h ago" },
        { id: 4, user: "MusicCritic", text: "Outstanding work on the drums", timestamp: "45m ago" }
      ],
      isRepost: false
    },
    {
      id: 5,
      title: "Ocean Waves",
      artist: "Ambient Sounds",
      avatar: "AS",
      cover: album1,
      genre: "Ambient",
      likes: 634,
      comments: 23,
      shares: 8,
      duration: "5:20",
      isLiked: true,
      isPlaying: false,
      timestamp: "8h ago",
      description: "Relaxing ambient tracks for meditation and focus 🧘‍♀️ #Ambient #Chill",
      commentsList: [
        { id: 1, user: "MeditationMaster", text: "Perfect for my yoga sessions", timestamp: "4h ago" },
        { id: 2, user: "ChillVibes", text: "This helps me focus while coding", timestamp: "2h ago" }
      ],
      isRepost: false
    },
  ]);

  const toggleComments = (trackId: number) => {
    setCommentsOpen(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  const handleCommentChange = (trackId: number, text: string) => {
    setCommentTexts(prev => ({
      ...prev,
      [trackId]: text
    }));
  };

  const addComment = (trackId: number) => {
    const text = commentTexts[trackId]?.trim();
    if (!text) return;

    // In a real app, this would make an API call
    console.log(`Adding comment to track ${trackId}:`, text);

    // Clear the input
    setCommentTexts(prev => ({
      ...prev,
      [trackId]: ''
    }));
  };

  const handleReplyChange = (key: string, text: string) => {
    setReplyTexts(prev => ({
      ...prev,
      [key]: text
    }));
  };

  const addReply = (trackId: number, commentId: number) => {
    const text = replyTexts[`${trackId}-${commentId}`]?.trim();
    if (!text) return;

    // In a real app, this would make an API call
    console.log(`Adding reply to track ${trackId}, comment ${commentId}:`, text);

    // Clear the input
    setReplyTexts(prev => ({
      ...prev,
      [`${trackId}-${commentId}`]: ''
    }));
    setReplyingTo(null);
  };

  const handleRepost = (track: typeof tracks[0]) => {
    // Create a new repost track
    const newRepostId = Math.max(...tracks.map(t => t.id)) + 1;
    const repostTrack = {
      ...track,
      id: newRepostId,
      artist: "You", // Current user
      avatar: "U",
      description: `Recasted: ${track.description}`,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isPlaying: false,
      commentsList: [],
      isRepost: true,
      originalTrack: track
    };

    // Add the repost to the beginning of the tracks array
    setTracks(prevTracks => [repostTrack, ...prevTracks]);

    // In a real app, this would make an API call to repost
    console.log(`Reposting track:`, track.title);
  };

  const openPostDetail = (track: typeof tracks[0]) => {
    setSelectedPost(track);
  };

  const closePostDetail = () => {
    setSelectedPost(null);
  };

  const openBuyModal = (track: typeof tracks[0]) => {
    setSelectedTrackForPurchase(track);
    setIsBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
    setSelectedTrackForPurchase(null);
  };

  const openTipModal = (track: typeof tracks[0]) => {
    setSelectedTrackForTip(track);
    setIsTipModalOpen(true);
  };

  const closeTipModal = () => {
    setIsTipModalOpen(false);
    setSelectedTrackForTip(null);
  };

  const handleTip = (track: typeof tracks[0], amount: number) => {
    // In a real app, this would make an API call to send the tip
    console.log(`Tipping ${amount} SOMI to ${track.artist} for track: ${track.title}`);
    // You could show a success message or update the artist's earnings
    closeTipModal();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-4">
              {/* Post Composer */}
              <PostComposer
                onPost={(content, attachments) => {
                  console.log("Posting:", { content, attachments });
                  // Handle post submission here
                }}
              />

              {/* Feed Posts */}
              {tracks.map((track) => (
                <Card
                  key={track.id}
                  className="border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => openPostDetail(track)}
                >
                  <CardContent className="p-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <Link to={`/artist/${track.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                            {track.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{track.artist}</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {track.genre}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{track.timestamp}</span>
                        </div>
                      </Link>
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Track Description */}
                    {track.isRepost && (
                      <div className="flex items-center gap-2 mb-2">
                        <Repeat2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Recasted</span>
                      </div>
                    )}
                    <p className="text-sm mb-3 leading-relaxed">{track.description}</p>

                    {/* Music Player Card */}
                    <Card className="mb-3 border-border/30 bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={track.cover}
                            alt={track.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{track.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{track.duration}</span>
                              <div className="flex-1 bg-muted rounded-full h-1">
                                <div className="bg-primary h-1 rounded-full w-1/3"></div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-8 h-8 p-0 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentTrack?.id === track.id && (isPlaying || isAudioReady)) {
                                if (isPlaying) {
                                  pauseTrack();
                                } else if (isAudioReady) {
                                  resumeTrack();
                                }
                              } else {
                                playTrack(track);
                              }
                            }}
                          >
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1.5 ${track.isLiked ? 'text-red-500' : 'text-white hover:text-white'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-xs">{track.likes.toLocaleString()}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComments(track.id);
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{track.comments}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-green-500 hover:text-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            openTipModal(track);
                          }}
                        >
                          <DollarSign className="w-4 h-4" />
                          <span className="text-xs">Tip</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRepost(track);
                          }}
                        >
                          <Repeat2 className="w-4 h-4" />
                          <span className="text-xs">Recast</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                              <Share2 className="w-4 h-4" />
                              <span className="text-xs">{track.shares}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleRepost(track);
                            }} className="cursor-pointer">
                              <Repeat2 className="w-4 h-4 mr-2" />
                              Repost
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                              <Share2 className="w-4 h-4 mr-2" />
                              Share Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5 text-sm font-medium" onClick={(e) => {
                          e.stopPropagation();
                          openBuyModal(track);
                        }}>
                          <ShoppingCart className="w-4 h-4" />
                          Buy
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground w-6 h-6 p-0" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(`${window.location.origin}/track/${track.id}`);
                              // You could show a toast notification here
                            }} className="cursor-pointer">
                              <LinkIcon className="w-4 h-4 mr-2" />
                              Copy link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                              <Copy className="w-4 h-4 mr-2" />
                              Embed post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer text-orange-600">
                              <VolumeX className="w-4 h-4 mr-2" />
                              Mute {track.artist}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer text-red-600">
                              <UserX className="w-4 h-4 mr-2" />
                              Block {track.artist}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer text-red-600">
                              <Flag className="w-4 h-4 mr-2" />
                              Report post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {commentsOpen[track.id] && (
                      <div className="mt-4 pt-4 border-t border-border/20">
                        {/* Existing Comments */}
                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                          {track.commentsList.map((comment) => (
                            <div key={comment.id} className="space-y-2">
                              <div className="flex gap-3">
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                  <AvatarImage src="" />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                                    {comment.user.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="bg-muted/50 rounded-lg px-3 py-2">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm">{comment.user}</span>
                                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm">{comment.text}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setReplyingTo({ trackId: track.id, commentId: comment.id });
                                        }}
                                      >
                                        <Reply className="w-3 h-3 mr-1" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="ml-9 space-y-2">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-3">
                                      <Avatar className="w-5 h-5 flex-shrink-0">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                                          {reply.user.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <div className="bg-muted/30 rounded-lg px-3 py-2">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm">{reply.user}</span>
                                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                          </div>
                                          <p className="text-sm">{reply.text}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Reply Input */}
                              {replyingTo?.trackId === track.id && replyingTo?.commentId === comment.id && (
                                <div className="ml-9 flex gap-3">
                                  <Avatar className="w-6 h-6 flex-shrink-0">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                                      U
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 flex gap-2">
                                    <input
                                      type="text"
                                      placeholder={`Reply to ${comment.user}...`}
                                      value={replyTexts[`${track.id}-${comment.id}`] || ''}
                                      onChange={(e) => handleReplyChange(`${track.id}-${comment.id}`, e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                          e.preventDefault();
                                          addReply(track.id, comment.id);
                                        }
                                      }}
                                      className="flex-1 px-3 py-2 bg-muted/50 border border-border/20 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => addReply(track.id, comment.id)}
                                      disabled={!replyTexts[`${track.id}-${comment.id}`]?.trim()}
                                      className="px-3"
                                    >
                                      <Send className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setReplyingTo(null)}
                                      className="px-3"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              U
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={commentTexts[track.id] || ''}
                              onChange={(e) => handleCommentChange(track.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  addComment(track.id);
                                }
                              }}
                              className="flex-1 px-3 py-2 bg-muted/50 border border-border/20 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addComment(track.id)}
                              disabled={!commentTexts[track.id]?.trim()}
                              className="px-3"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
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

      {/* Post Detail Modal */}
      <Dialog open={!!selectedPost} onOpenChange={closePostDetail}>
        <DialogContent className="max-w-5xl w-full max-h-[95vh] p-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
            {/* Left Side - Artwork and Player */}
            <div className="lg:w-1/2 p-6 flex flex-col">
              <div className="relative flex-1 mb-6">
                <img
                  src={selectedPost?.cover}
                  alt={selectedPost?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                      onClick={() => {
                        if (currentTrack?.id === selectedPost?.id && (isPlaying || isAudioReady)) {
                          if (isPlaying) {
                            pauseTrack();
                          } else if (isAudioReady) {
                            resumeTrack();
                          }
                        } else {
                          selectedPost && playTrack(selectedPost);
                        }
                      }}
                    >
                      {currentTrack?.id === selectedPost?.id && isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-0.5" />
                      )}
                    </Button>
                  </div>
              </div>

              {/* Track Info */}
              <div className="space-y-4">
                  <div>
                    <h2 className="font-clash font-semibold text-2xl mb-2">{selectedPost?.title}</h2>
                    <div className="flex items-center gap-3 mb-3">
                      <Link to={`/artist/${selectedPost?.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            {selectedPost?.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-muted-foreground font-medium">{selectedPost?.artist}</p>
                          <p className="text-xs text-muted-foreground">{selectedPost?.timestamp}</p>
                        </div>
                      </Link>
                    </div>
                  </div>                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-sm">
                    {selectedPost?.genre}
                  </Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedPost?.duration}</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{selectedPost?.description}</p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 ${selectedPost?.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className={`w-5 h-5 ${selectedPost?.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{selectedPost?.likes.toLocaleString()}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{selectedPost?.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-green-500 hover:text-green-600"
                      onClick={() => selectedPost && openTipModal(selectedPost)}
                    >
                      <DollarSign className="w-5 h-5" />
                      <span className="font-medium">Tip</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                          <Share2 className="w-5 h-5" />
                          <span className="font-medium">{selectedPost?.shares}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          selectedPost && handleRepost(selectedPost);
                        }} className="cursor-pointer">
                          <Repeat2 className="w-4 h-4 mr-2" />
                          Repost
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6" onClick={() => openBuyModal(selectedPost!)}>
                    <ShoppingCart className="w-4 h-4" />
                    <span className="font-medium">Buy Now - 299 SOMI</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Comments */}
            <div className="lg:w-1/2 border-l border-border/20 flex flex-col">
              <div className="p-6 border-b border-border/20">
                <h3 className="font-clash font-semibold text-xl">Comments ({selectedPost?.commentsList.length})</h3>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedPost?.commentsList.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {comment.user.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="bg-muted/30 rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm">{comment.user}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{comment.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => setReplyingTo({ trackId: selectedPost.id, commentId: comment.id })}
                            >
                              <Reply className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-13 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                                {reply.user.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="bg-muted/20 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-sm">{reply.user}</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm leading-relaxed">{reply.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingTo?.trackId === selectedPost?.id && replyingTo?.commentId === comment.id && (
                      <div className="ml-13 flex gap-3">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            U
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder={`Reply to ${comment.user}...`}
                            value={replyTexts[`${selectedPost.id}-${comment.id}`] || ''}
                            onChange={(e) => handleReplyChange(`${selectedPost.id}-${comment.id}`, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                addReply(selectedPost!.id, comment.id);
                              }
                            }}
                            className="flex-1 px-4 py-3 bg-muted/50 border border-border/20 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => addReply(selectedPost!.id, comment.id)}
                            disabled={!replyTexts[`${selectedPost.id}-${comment.id}`]?.trim()}
                            className="px-4 rounded-full"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setReplyingTo(null)}
                            className="px-4 rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="p-6 border-t border-border/20">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentTexts[selectedPost?.id || 0] || ''}
                      onChange={(e) => handleCommentChange(selectedPost!.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          addComment(selectedPost!.id);
                        }
                      }}
                      className="flex-1 px-4 py-3 bg-muted/50 border border-border/20 rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addComment(selectedPost!.id)}
                      disabled={!commentTexts[selectedPost?.id || 0]?.trim()}
                      className="px-4 rounded-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
      />

      {/* Buy Modal */}
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={closeBuyModal}
        track={selectedTrackForPurchase}
      />

      {/* Tip Modal */}
      <TipModal
        isOpen={isTipModalOpen}
        onClose={closeTipModal}
        track={selectedTrackForTip}
        onTip={handleTip}
      />
    </div>
  );
};

export default Feed;