import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Image,
  Smile,
  AtSign,
  Hash,
  Music,
  X,
  Upload,
  Play,
  Pause,
  Volume2,
  Disc,
  ListMusic,
  Music2
} from "lucide-react";
import { useState, useRef } from "react";

interface PostComposerProps {
  onPost: (content: string, attachments: any[]) => void;
  placeholder?: string;
  className?: string;
}

const PostComposer = ({ onPost, placeholder = "What's happening in music?", className }: PostComposerProps) => {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [musicType, setMusicType] = useState<'single' | 'playlist' | 'album'>('single');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sample tracks for music selection
  const sampleTracks = [
    { id: 1, title: "Neon Dreams", artist: "Synthwave Collective", cover: "/assets/album-1.jpg", duration: "3:42", genre: "Synthwave" },
    { id: 2, title: "Midnight Groove", artist: "Jazz Fusion", cover: "/assets/album-2.jpg", duration: "4:15", genre: "Jazz" },
    { id: 3, title: "Urban Pulse", artist: "Beat Masters", cover: "/assets/album-3.jpg", duration: "2:58", genre: "Hip Hop" },
  ];

  // Sample playlists
  const samplePlaylists = [
    {
      id: 1,
      title: "Chill Electronic Vibes",
      creator: "Synthwave Collective",
      cover: "/assets/album-1.jpg",
      trackCount: 12,
      duration: "45:30",
      description: "Perfect for coding sessions and relaxation"
    },
    {
      id: 2,
      title: "Jazz Fusion Essentials",
      creator: "Jazz Masters",
      cover: "/assets/album-2.jpg",
      trackCount: 15,
      duration: "62:15",
      description: "The best of modern jazz fusion"
    },
    {
      id: 3,
      title: "Urban Beats Collection",
      creator: "Beat Masters",
      cover: "/assets/album-3.jpg",
      trackCount: 20,
      duration: "78:45",
      description: "City sounds and hip hop beats"
    },
  ];

  // Sample albums
  const sampleAlbums = [
    {
      id: 1,
      title: "Digital Dreams",
      artist: "Synthwave Collective",
      cover: "/assets/album-1.jpg",
      trackCount: 10,
      duration: "38:22",
      year: "2024",
      genre: "Synthwave"
    },
    {
      id: 2,
      title: "Midnight Sessions",
      artist: "Jazz Fusion",
      cover: "/assets/album-2.jpg",
      trackCount: 12,
      duration: "52:18",
      year: "2024",
      genre: "Jazz"
    },
    {
      id: 3,
      title: "Street Symphony",
      artist: "Beat Masters",
      cover: "/assets/album-3.jpg",
      trackCount: 14,
      duration: "48:55",
      year: "2024",
      genre: "Hip Hop"
    },
  ];

  const emojis = [
    "🎵", "🎶", "🎸", "🎹", "🎤", "🎧", "🎼", "🎷", "🥁", "🎺",
    "🎵", "🎶", "🎸", "🎹", "🎤", "🎧", "🎼", "🎷", "🥁", "🎺",
    "🎵", "🎶", "🎸", "🎹", "🎤", "🎧", "🎼", "🎷", "🥁", "🎺"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setAttachments(prev => [...prev, {
              type: 'image',
              url: result,
              file: file
            }]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleEmojiClick = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + emoji + content.substring(end);
      setContent(newContent);
      setShowEmojiPicker(false);

      // Focus back to textarea and set cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
  };

  const handleMention = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const newContent = content.substring(0, start) + "@" + content.substring(start);
      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  const handleHashtag = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const newContent = content.substring(0, start) + "#" + content.substring(start);
      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  const handleMusicSelect = (item: any, type: 'single' | 'playlist' | 'album') => {
    setSelectedTrack({ ...item, type });
    setAttachments(prev => [...prev, {
      type: 'music',
      musicType: type,
      item: item
    }]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    if (selectedTrack && attachments[index]?.type === 'music') {
      setSelectedTrack(null);
    }
  };

  const handleSubmit = () => {
    if (content.trim() || attachments.length > 0) {
      onPost(content, attachments);
      setContent("");
      setAttachments([]);
      setSelectedTrack(null);
    }
  };

  const canPost = content.trim().length > 0 || attachments.length > 0;

  return (
    <Card className={`border-border/50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-none resize-none focus:ring-0 p-0 text-lg placeholder:text-muted-foreground"
            />

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="relative">
                    {attachment.type === 'image' && (
                      <div className="relative inline-block">
                        <img
                          src={attachment.url}
                          alt="Upload"
                          className="max-w-full h-32 rounded-lg object-cover"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {attachment.type === 'music' && attachment.item && (
                      <Card className="border-border/30 bg-muted/30">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={attachment.item.cover}
                                alt={attachment.item.title}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                                {attachment.musicType === 'single' && <Music2 className="w-3 h-3 text-primary" />}
                                {attachment.musicType === 'playlist' && <ListMusic className="w-3 h-3 text-primary" />}
                                {attachment.musicType === 'album' && <Disc className="w-3 h-3 text-primary" />}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm truncate">{attachment.item.title}</h4>
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  {attachment.musicType === 'single' && 'Single'}
                                  {attachment.musicType === 'playlist' && 'Playlist'}
                                  {attachment.musicType === 'album' && 'Album'}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {attachment.musicType === 'single' && attachment.item.artist}
                                {attachment.musicType === 'playlist' && `by ${attachment.item.creator}`}
                                {attachment.musicType === 'album' && attachment.item.artist}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.musicType === 'single' && attachment.item.duration}
                                {attachment.musicType === 'playlist' && `${attachment.item.trackCount} tracks • ${attachment.item.duration}`}
                                {attachment.musicType === 'album' && `${attachment.item.trackCount} tracks • ${attachment.item.year}`}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-8 h-8 p-0 rounded-full"
                            >
                              <Play className="w-4 h-4 ml-0.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-6 h-6 p-0 rounded-full"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Music Selection Modal */}
            {isRecording && (
              <div className="mt-3 p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Share music content</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsRecording(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Tabs value={musicType} onValueChange={(value: any) => setMusicType(value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="single" className="flex items-center gap-1">
                      <Music2 className="w-3 h-3" />
                      Single
                    </TabsTrigger>
                    <TabsTrigger value="playlist" className="flex items-center gap-1">
                      <ListMusic className="w-3 h-3" />
                      Playlist
                    </TabsTrigger>
                    <TabsTrigger value="album" className="flex items-center gap-1">
                      <Disc className="w-3 h-3" />
                      Album
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="single" className="mt-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {sampleTracks.map((track) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            handleMusicSelect(track, 'single');
                            setIsRecording(false);
                          }}
                        >
                          <img
                            src={track.cover}
                            alt={track.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{track.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {track.genre}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{track.duration}</span>
                            </div>
                          </div>
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="playlist" className="mt-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {samplePlaylists.map((playlist) => (
                        <div
                          key={playlist.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            handleMusicSelect(playlist, 'playlist');
                            setIsRecording(false);
                          }}
                        >
                          <img
                            src={playlist.cover}
                            alt={playlist.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{playlist.title}</p>
                            <p className="text-xs text-muted-foreground truncate">by {playlist.creator}</p>
                            <p className="text-xs text-muted-foreground truncate">{playlist.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{playlist.trackCount} tracks</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{playlist.duration}</span>
                            </div>
                          </div>
                          <ListMusic className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="album" className="mt-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {sampleAlbums.map((album) => (
                        <div
                          key={album.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => {
                            handleMusicSelect(album, 'album');
                            setIsRecording(false);
                          }}
                        >
                          <img
                            src={album.cover}
                            alt={album.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{album.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {album.genre}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{album.year}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{album.trackCount} tracks</span>
                            </div>
                          </div>
                          <Disc className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-3 p-3 border border-border/50 rounded-lg bg-background">
                <div className="grid grid-cols-10 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-lg hover:bg-muted/50 rounded p-1 transition-colors"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={handleMention}
                >
                  <AtSign className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={handleHashtag}
                >
                  <Hash className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Music className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {content.length}/280
                </span>
                <Button
                  onClick={handleSubmit}
                  disabled={!canPost}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostComposer;