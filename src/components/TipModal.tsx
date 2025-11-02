import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Wallet,
  CheckCircle,
  Heart,
  Gift,
  X
} from "lucide-react";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: {
    id: number;
    title: string;
    artist: string;
    avatar: string;
    cover: string;
    genre: string;
    duration: string;
  } | null;
  onTip: (track: any, amount: number) => void;
}

const TipModal = ({ isOpen, onClose, track, onTip }: TipModalProps) => {
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number>(1);
  const [customAmount, setCustomAmount] = useState<string>('');

  const presetAmounts = [1, 5, 10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value) || 0;
    setSelectedAmount(Math.max(0, numValue)); // Ensure non-negative
  };

  const handleContinue = () => {
    if (selectedAmount > 0) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    if (track && selectedAmount > 0) {
      onTip(track, selectedAmount);
      setStep('success');
    }
  };

  const handleClose = () => {
    setStep('amount');
    setSelectedAmount(1);
    setCustomAmount('');
    onClose();
  };

  if (!track) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4">
        {step === 'amount' && (
          <>
            <DialogHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <DialogTitle className="text-xl font-clash font-semibold">
                Support the Artist
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Show appreciation for {track.artist}
              </p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Track Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{track.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {track.genre}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="font-medium text-sm mb-1">Choose tip amount</h4>
                  <p className="text-xs text-muted-foreground">Your support goes directly to the artist</p>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`h-12 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                        selectedAmount === amount && customAmount === amount.toString()
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'bg-background hover:bg-muted/50 border-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {amount} SOMI
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Or enter custom amount</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="pr-16 h-12 text-center font-semibold border-2 border-border focus:border-primary transition-colors rounded-xl"
                      min="1"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="text-sm font-medium text-muted-foreground">SOMI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleClose} className="flex-1 h-11 rounded-xl border-2">
                  Cancel
                </Button>
                <Button
                  onClick={handleContinue}
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700 rounded-xl gap-2 font-semibold"
                  disabled={selectedAmount <= 0}
                >
                  <Gift className="w-4 h-4" />
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <DialogHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-xl font-clash font-semibold">
                Confirm Tip
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Review your tip before sending
              </p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Tip Summary */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {track.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Tipping {track.artist}</p>
                    <p className="text-sm text-muted-foreground">For "{track.title}"</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border-2 border-primary/20 dark:border-primary/30">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-primary">Tip Amount</span>
                    <span className="font-bold text-2xl text-primary">
                      {selectedAmount} SOMI
                    </span>
                  </div>
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Your Balance</span>
                </div>
                <span className="font-bold text-lg">1,250 SOMI</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep('amount')} className="flex-1 h-11 rounded-xl border-2">
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700 rounded-xl gap-2 font-semibold"
                >
                  <Heart className="w-4 h-4" />
                  Send Tip
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <DialogTitle className="text-xl font-clash font-semibold text-center">
                Tip Sent Successfully!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4 text-center">
              {/* Success Message */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Thank you for supporting {track.artist}!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your tip of {selectedAmount} SOMI has been sent successfully.
                </p>
                <div className="flex justify-center items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Heart className="w-4 h-4" />
                  <span>Artist earnings increased by {selectedAmount} SOMI</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleClose} className="flex-1 h-11 rounded-xl border-2">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                    // Could navigate to artist's profile or show more tracks
                  }}
                  className="flex-1 h-11 rounded-xl gap-2 font-semibold"
                >
                  <Gift className="w-4 h-4" />
                  Support More
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TipModal;