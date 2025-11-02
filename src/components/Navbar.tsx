import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Search,
  Headphones,
  Mail,
  Plus,
  User,
  Settings,
  LogOut,
  HelpCircle,
  MessageSquare,
  Music,
  ListMusic
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "@/components/NotificationDropdown";
import CreateSongModal from "@/components/CreateSongModal";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import hibeatsLogo from "@/assets/hibeats.png";
import beatsIcon from "@/assets/beats.png";

interface NavbarProps {
  showCreateSongButton?: boolean;
}

const Navbar = ({ showCreateSongButton = true }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreateSongModalOpen, setIsCreateSongModalOpen] = useState(false);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
  const { isAuthenticated, userProfile, setShowLoginModal, logout } = useAuth();

  const handleCreatePlaylist = () => {
    navigate('/myplaylist?create=playlist');
  };

  const navItems = [
    { path: "/feed", label: "Feed", icon: Home },
    { path: "/explore", label: "Explore", icon: Search },
    { path: "/beats", label: "Beats", icon: Headphones },
    { path: "/myplaylist", label: "My Playlist", icon: ListMusic },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center">
                <img
                  src={hibeatsLogo}
                  alt="HiBeats"
                  className="h-8 w-auto"
                />
              </Link>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`transition-colors ${
                        isActive
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 flex items-center justify-center mx-8">
              {/* Search Bar */}
              <div className="hidden md:flex max-w-md flex-1">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tracks, artists, or albums..."
                    className="pl-10 pr-4 py-2 w-full rounded-full border-border/50 focus:border-primary bg-background/50"
                  />
                </div>
              </div>
            </div>

            {/* Profile & Post Button */}
            <div className="flex items-center gap-3">
              {/* Balance Display */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mr-4">
                <img
                  src={beatsIcon}
                  alt="Beats"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-primary">1,250</span>
              </div>

              {showCreateSongButton && isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <Plus className="w-4 h-4" />
                      Create
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsCreateSongModalOpen(true)} className="cursor-pointer">
                      <Music className="w-4 h-4 mr-2" />
                      Create Song
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCreatePlaylist} className="cursor-pointer">
                      <ListMusic className="w-4 h-4 mr-2" />
                      Create Playlist
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {isAuthenticated ? (
                <>
                  <Link to="/messages" className="hidden md:block">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </Link>
                  <NotificationDropdown />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage src={userProfile?.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {userProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={userProfile?.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            {userProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{userProfile?.name || "Username"}</p>
                          <p className="text-xs text-muted-foreground">View profile</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/dashboard">
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/settings">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Feedback
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={logout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/20 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
          {showCreateSongButton && isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center gap-1 p-2 text-muted-foreground">
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">Create</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top">
                <DropdownMenuItem onClick={() => setIsCreateSongModalOpen(true)} className="cursor-pointer">
                  <Music className="w-4 h-4 mr-2" />
                  Create Song
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCreatePlaylist} className="cursor-pointer">
                  <ListMusic className="w-4 h-4 mr-2" />
                  Create Playlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Create Song Modal */}
      <CreateSongModal
        isOpen={isCreateSongModalOpen}
        onClose={() => setIsCreateSongModalOpen(false)}
      />

      {/* Create Playlist Modal - placeholder, actual usage in MyPlaylist page */}
      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onCreate={() => {}}
      />
    </>
  );
};

export default Navbar;