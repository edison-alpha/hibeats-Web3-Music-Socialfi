import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AudioProvider } from "@/contexts/AudioContext";
import AudioPlayer from "@/components/AudioPlayer";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import Beats from "./pages/Beats";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MyPlaylist from "./pages/MyPlaylist";
import ArtistProfile from "./pages/ArtistProfile";
import DetailAlbum from "./pages/DetailAlbum";
import FeaturedArtists from "./pages/FeaturedArtists";
import LinerNotes from "./pages/LinerNotes";
import LinerNoteDetail from "./pages/LinerNoteDetail";
import NotFound from "./pages/NotFound";
import LoginModal from "./components/LoginModal";
import ProfileCreation from "./components/ProfileCreation";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  const {
    isAuthenticated,
    userProfile,
    login,
    updateProfile,
    showLoginModal,
    setShowLoginModal,
    showProfileCreation,
    setShowProfileCreation
  } = useAuth();

  const handleWalletConnect = () => {
    login();
  };

  const handleGmailLogin = () => {
    login();
  };

  const handleProfileSave = (profileData: any) => {
    updateProfile(profileData);
  };

  const handleProfileBack = () => {
    setShowProfileCreation(false);
    setShowLoginModal(true);
  };

  return (
    <AudioProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/beats" element={<Beats />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/myplaylist" element={<MyPlaylist />} />
        <Route path="/featured-artists" element={<FeaturedArtists />} />
        <Route path="/liner-notes" element={<LinerNotes />} />
        <Route path="/liner-note-detail/:id" element={<LinerNoteDetail />} />
        <Route path="/artist/:artistId" element={<ArtistProfile />} />
        <Route path="/album/:albumId" element={<DetailAlbum />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Authentication Modals - Only show when not on landing page */}
      {!isLandingPage && (
        <>
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onWalletConnect={handleWalletConnect}
            onGmailLogin={handleGmailLogin}
          />

          <ProfileCreation
            isOpen={showProfileCreation}
            onClose={() => setShowProfileCreation(false)}
            onSave={handleProfileSave}
            onBack={handleProfileBack}
          />
        </>
      )}

      {/* Audio Player */}
      <AudioPlayer />
    </AudioProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
