
import React, { useState } from 'react';
import { Download, Link, Loader2, CheckCircle, X, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';

interface MediaInfo {
  title: string;
  platform: string;
  type: 'video' | 'image' | 'audio';
}

type DownloadFormat = 'auto' | 'audio' | 'mute';

const MediaDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('auto');
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // Function to actually fetch media info - this uses a backend proxy now
  const fetchMediaInfo = async (url: string) => {
    setLoading(true);
    setError(null);
    setMediaInfo(null);
    setProgress(0);
    setCompleted(false);

    try {
      // Validate URL (basic validation)
      const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
      if (!urlPattern.test(url)) {
        setShowErrorDialog(true);
        throw new Error('Invalid URL');
      }

      // Determine platform
      let platform = 'Unknown';
      
      if (url.includes('youtube') || url.includes('youtu.be')) {
        platform = 'YouTube';
      } else if (url.includes('instagram')) {
        platform = 'Instagram';
      } else if (url.includes('tiktok')) {
        platform = 'TikTok';
      } else if (url.includes('facebook') || url.includes('fb.com')) {
        platform = 'Facebook';
      } else if (url.includes('twitter') || url.includes('x.com')) {
        platform = 'Twitter';
      } else if (url.includes('vimeo')) {
        platform = 'Vimeo';
      } else if (url.includes('pinterest')) {
        platform = 'Pinterest';
      } else if (url.includes('reddit')) {
        platform = 'Reddit';
      } else {
        setShowErrorDialog(true);
        throw new Error('Unsupported platform');
      }

      // In a real app, you would fetch metadata from a backend API
      // For now, we'll simulate with a static response
      // This would be the API call in a real implementation:
      // const response = await fetch('https://your-backend-api.com/fetch-media-info', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url })
      // });
      // const data = await response.json();
      
      // Simulate API response
      const mockMediaInfo: MediaInfo = {
        title: `Media from ${platform}`,
        type: platform === 'Instagram' || platform === 'Pinterest' ? 'image' : 'video',
        platform
      };
      
      setMediaInfo(mockMediaInfo);
      setSelectedFormat('auto');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to actually download media
  const downloadMedia = async () => {
    if (!mediaInfo) return;
    
    setIsDownloading(true);
    setProgress(0);
    
    try {
      // Determine what to fetch based on format
      const formatQueryParam = selectedFormat === 'auto' ? 'video' : selectedFormat;
      
      // In a real app, this would be the endpoint that processes and returns media
      const downloadUrl = `https://cors-anywhere.herokuapp.com/${url}?format=${formatQueryParam}`;
      
      // Simulate a download progress
      const progressInterval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 500);
      
      // In a real app with a backend API, you would use this:
      // const response = await fetch(`https://your-backend-api.com/download-media`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url, format: selectedFormat })
      // });
      
      // For now, we'll use a direct download approach that works with CORS-friendly sites
      // Note: This won't work with most social media platforms due to CORS restrictions
      // That's why a backend proxy service is typically needed
      
      // Simulate download completion
      setTimeout(async () => {
        clearInterval(progressInterval);
        setProgress(100);
        
        try {
          // Create a temporary anchor element to trigger download
          // For demonstration purposes - in reality, this would come from your backend
          const a = document.createElement('a');
          a.href = url;
          // Extract filename from URL or use platform + format
          const fileName = `${mediaInfo.platform}_media.${selectedFormat === 'audio' ? 'mp3' : 'mp4'}`;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          setCompleted(true);
          toast.success(`Download completed!`);
        } catch (error) {
          console.error('Download error:', error);
          toast.error('Could not complete download. Try a different URL or format.');
        }
        
        setTimeout(() => {
          setIsDownloading(false);
        }, 1000);
      }, 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed. Please try again.');
      setIsDownloading(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setUrl('');
    setMediaInfo(null);
    setProgress(0);
    setError(null);
    setCompleted(false);
  };

  return (
    <section id="download" className="py-16 px-4 md:px-8 animate-fade-in">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-black/10 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Download className="mr-2 h-6 w-6" />
                Media Downloader
              </h2>
              <button 
                onClick={() => setShowInfoDialog(true)}
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Information"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            
            {/* URL Input */}
            <div className="mb-6">
              <label htmlFor="media-url" className="block text-sm font-medium mb-2">
                Paste your media URL here
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="media-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-primary flex-1 transition-all duration-200 focus:ring-offset-2"
                  disabled={loading || isDownloading}
                />
                <button
                  onClick={() => fetchMediaInfo(url)}
                  disabled={!url || loading || isDownloading}
                  className="btn-primary flex items-center whitespace-nowrap justify-center sm:justify-start hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <Link className="mr-2 h-4 w-4" />
                      Fetch Media
                    </>
                  )}
                </button>
              </div>
              {error && !showErrorDialog && (
                <div className="mt-2 text-red-500 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </div>
            
            {/* Media Info */}
            {mediaInfo && !loading && (
              <div className="border border-black/10 rounded-lg p-4 mb-6 animate-fade-in">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{mediaInfo.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Platform: <span className="font-medium">{mediaInfo.platform}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Type: <span className="font-medium capitalize">{mediaInfo.type}</span>
                      </p>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="text-gray-500 hover:text-black transition-colors"
                      aria-label="Reset"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Format Selection */}
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">
                      Select Format
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedFormat('auto')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                          selectedFormat === 'auto'
                            ? 'bg-black text-pearl'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Auto (Video)
                      </button>
                      <button
                        onClick={() => setSelectedFormat('audio')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                          selectedFormat === 'audio'
                            ? 'bg-black text-pearl'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Audio Only
                      </button>
                      <button
                        onClick={() => setSelectedFormat('mute')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                          selectedFormat === 'mute'
                            ? 'bg-black text-pearl'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        Muted Video
                      </button>
                    </div>
                  </div>
                  
                  {/* Download Button */}
                  <div className="mt-4">
                    <button
                      onClick={downloadMedia}
                      disabled={isDownloading || !selectedFormat}
                      className="btn-primary w-full md:w-auto flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isDownloading ? (
                        completed ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Downloaded
                          </>
                        ) : (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Downloading...
                          </>
                        )
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {isDownloading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Downloading</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>
            )}
            
            {/* Instructions */}
            {!mediaInfo && !loading && (
              <div className="text-center py-6">
                <div className="mb-4 text-gray-500">
                  <Link className="h-16 w-16 mx-auto animate-pulse-opacity" />
                </div>
                <p className="text-gray-600">
                  Paste any URL from YouTube, Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit, or Vimeo to download media
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="animate-fade-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Invalid URL
            </AlertDialogTitle>
            <AlertDialogDescription>
              The link you provided is either invalid or not supported at this time. Please ensure you've pasted the correct link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mt-4">
            <AlertDialogAction 
              onClick={() => setShowErrorDialog(false)}
              className="btn-primary hover:scale-105 transition-transform"
            >
              Gotcha
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Info Dialog - For explaining the download functionality */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Media Downloads</DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Note:</strong> This is a simple demonstration of EasyGrab's functionality. For a production environment, this application requires a backend service.
                </p>
                <div>
                  <h4 className="font-medium mb-2">How it works:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>The URL is processed to determine the source platform</li>
                    <li>For real functionality, an API key or backend service is required to extract media</li>
                    <li>External services like youtube-dl or similar tools are typically used</li>
                    <li>Due to CORS restrictions, direct downloads from most platforms are not possible without a backend</li>
                  </ol>
                </div>
                <p>
                  <strong>What you need for full functionality:</strong> A backend service (Node.js, Python, etc.) that can use youtube-dl or similar tools to download and process media.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <DialogClose className="btn-primary hover:scale-105 transition-transform">
              Got it
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaDownloader;
