import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Wallet, Mail } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnect: () => void;
  onGmailLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onWalletConnect, onGmailLogin }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-clash font-bold">
            Welcome to HiBeats
          </CardTitle>
          <p className="text-muted-foreground">
            Connect your wallet or sign in with Gmail to get started
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            onClick={onWalletConnect}
            className="w-full gap-3 h-12 text-lg bg-primary hover:bg-primary/90"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            onClick={onGmailLogin}
            variant="outline"
            className="w-full gap-3 h-12 text-lg border-2 hover:bg-muted/50"
          >
            <Mail className="w-5 h-5" />
            Continue with Gmail
          </Button>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;