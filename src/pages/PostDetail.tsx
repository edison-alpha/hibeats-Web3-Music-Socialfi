import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  ChevronRight,
  ArrowLeft,
  Image as ImageIcon,
  Check
} from "lucide-react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import verifiedIcon from "@/assets/image.png";

const samplePost = {
  id: "1",
  author: {
    name: "Synthwave Collective",
    handle: "synthwave",
    avatar: "SC",
    verified: true
  },
  time: "2h",
  content:
    "Just dropped a new track! Check it out @BeatMasters #synthwave 🎹🔥 — loving the collab with @JazzFusion. Listen, react, and share!",
  images: [album1, album2, album3],
  stats: { replies: 12, reposts: 34, likes: 1247 }
};

const renderContent = (text: string) => {
  // Replace mentions (@username) and tags (#tag) with styled spans/links
  // This is a simple parser for display purposes.
  const parts: Array<{ type: string; text: string }> = [];
  const regex = /(@[\w-]+|#[\w-]+|https?:\/\/[^\s]+)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ type: "text", text: text.slice(lastIndex, m.index) });
    }
    parts.push({ type: m[0].startsWith("@") ? "mention" : m[0].startsWith("#") ? "tag" : "link", text: m[0] });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", text: text.slice(lastIndex) });
  }

  return (
    <p className="whitespace-pre-wrap text-lg leading-relaxed">
      {parts.map((p, idx) => {
        if (p.type === "mention") {
          const handle = p.text.replace("@", "");
          return (
            <Link key={idx} to={`/profile/${handle}`} className="text-primary font-medium hover:underline">
              {p.text}
            </Link>
          );
        }
        if (p.type === "tag") {
          const tag = p.text.replace("#", "");
          return (
            <Link key={idx} to={`/explore?tag=${encodeURIComponent(tag)}`} className="text-secondary font-medium hover:underline">
              {p.text}
            </Link>
          );
        }
        if (p.type === "link") {
          return (
            <a key={idx} href={p.text} target="_blank" rel="noreferrer" className="text-primary underline">
              {p.text}
            </a>
          );
        }
        return <span key={idx}>{p.text}</span>;
      })}
    </p>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app you'd fetch the post by id. We'll use the samplePost for now.
  const post = id === samplePost.id ? samplePost : samplePost;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h2 className="font-clash font-semibold text-lg">Post</h2>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left nav (keeps menu like notifications) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-2">
                <Link to="/feed" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full text-left transition-colors">Feed</Link>
                <Link to="/explore" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full text-left transition-colors">Explore</Link>
                <Link to="/notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full text-left transition-colors">Notifications</Link>
              </div>
            </div>

            {/* Post content */}
            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">{post.author.avatar}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        {post.author.verified && (
                          <img src={verifiedIcon} alt="Verified" className="w-4 h-4" />
                        )}
                        <span className="text-xs text-muted-foreground">@{post.author.handle} · {post.time} ago</span>
                      </div>

                      <div className="mt-3">
                        {renderContent(post.content)}
                      </div>

                      {/* Images */}
                      {post.images && post.images.length > 0 && (
                        <div className={`mt-4 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                          {post.images.map((src: string, idx: number) => (
                            <div key={idx} className="rounded overflow-hidden bg-muted/5">
                              {/* Use native img src; Vite will serve from public or src if imported — paths here assume public for quick demo */}
                              <img src={src} alt={`post-${idx}`} className="w-full h-48 object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          {post.stats.replies}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="w-4 h-4" />
                          {post.stats.reposts}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Heart className="w-4 h-4" />
                          {post.stats.likes.toLocaleString()}
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reply box + example replies */}
              <div className="mt-6">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input placeholder="Reply publicly" className="mb-3" />
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-xs">You can add images, emoji, mentions (@), and tags (#)</span>
                          </div>
                          <Button size="sm">Reply</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Example replies */}
                <div className="mt-4 space-y-3">
                  {[1, 2].map((r) => (
                    <Card key={r} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">JF</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Jazz Fusion</span>
                              <span className="text-xs text-muted-foreground">@jazzfusion · 1h</span>
                            </div>
                            <p className="text-sm mt-2">Nice track! <span className="text-lg">🔥</span> @synthwave</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <Card className="p-4 border-border/50">
                  <h4 className="font-semibold">Related</h4>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <Link to="/explore" className="block hover:underline">More synthwave tracks</Link>
                    <Link to="/profile/synthwave" className="block hover:underline">Synthwave Collective profile</Link>
                    <Link to="/feed" className="block hover:underline">See conversation</Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
