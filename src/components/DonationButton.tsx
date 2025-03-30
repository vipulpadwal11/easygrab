
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface DonationOption {
  amount: number;
  emoji: string;
  description: string;
}

const DonationButton = () => {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const donationOptions: DonationOption[] = [
    { amount: 5, emoji: '☕', description: 'Coffee to fuel the code!' },
    { amount: 10, emoji: '🍕', description: 'Pizza for the team!' },
    { amount: 20, emoji: '🍔', description: 'Lunch to power the devs!' },
    { amount: 50, emoji: '🍩', description: 'Donuts for the squad!' },
    { amount: 100, emoji: '🎉', description: 'Drinks to celebrate features!' },
  ];

  const handleDonate = async (amount: number) => {
    setProcessing(true);
    
    try {
      // In a real app, this would call a Stripe API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOpen(false);
      toast.success("Thank you for your generous support! Your contribution helps us grow and improve.");
    } catch (error) {
      toast.error("Something went wrong with your donation. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-8 bg-black text-pearl rounded-full p-4 flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform duration-300 group animate-fade-in"
        aria-label="Donate"
      >
        <Heart className="h-5 w-5 text-red-500 group-hover:animate-pulse" />
        <span className="font-medium">Donate</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Donate to Keep Us Running</DialogTitle>
            <DialogDescription className="text-md py-2">
              Your donation helps us maintain and improve the service. Any contribution is greatly appreciated!
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 py-4">
            {donationOptions.map((option) => (
              <button
                key={option.amount}
                onClick={() => handleDonate(option.amount)}
                disabled={processing}
                className="flex items-center justify-between p-4 border border-black/10 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">${option.amount}</span>
                </div>
                <span className="text-sm text-gray-600">{option.description}</span>
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-2">
            Powered by Stripe | Secure Payment
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonationButton;
