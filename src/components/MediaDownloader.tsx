
import React, { useState } from 'react';
import { Download, Link, Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';
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

interface MediaInfo {
  title: string;
  thumbnail: string;
  type: 'video' | 'image' | 'audio';
  platform: string;
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

  // Function to simulate fetching media info
  const fetchMediaInfo = async (url: string) => {
    setLoading(true);
    setError(null);
    setMediaInfo(null);
    setProgress(0);
    setCompleted(false);

    try {
      // This is a mock implementation
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate URL (basic validation for demonstration)
      const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
      if (!urlPattern.test(url)) {
        setShowErrorDialog(true);
        throw new Error('Invalid URL');
      }

      // Mock detection of platforms
      let platform = '';
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
      } else {
        setShowErrorDialog(true);
        throw new Error('Unsupported platform');
      }

      // Mock media info based on URL
      const mockMediaInfo: MediaInfo = {
        title: `Sample ${platform} Media`,
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D',
        type: platform === 'Instagram' ? 'image' : 'video',
        platform
      };
      
      setMediaInfo(mockMediaInfo);
      setSelectedFormat('auto');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      // We're now using the dialog instead of toast for errors
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate downloading media
  const downloadMedia = async () => {
    if (!mediaInfo) return;
    
    setIsDownloading(true);
    setProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setCompleted(true);
          setTimeout(() => setIsDownloading(false), 1000);
          
          // Show success toast with format info
          let formatMessage = '';
          switch(selectedFormat) {
            case 'auto':
              formatMessage = 'Video with audio';
              break;
            case 'audio':
              formatMessage = 'Audio only';
              break;
            case 'mute':
              formatMessage = 'Video without audio';
              break;
          }
          
          toast.success(`Download completed: ${formatMessage}!`);
          return 100;
        }
        return newProgress;
      });
    }, 300);
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
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Download className="mr-2 h-6 w-6" />
              Media Downloader
            </h2>
            
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
            
            {/* Media Preview */}
            {mediaInfo && !loading && (
              <div className="border border-black/10 rounded-lg p-4 mb-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-full md:w-1/3">
                    <img 
                      src={mediaInfo.thumbnail} 
                      alt={mediaInfo.title}
                      className="w-full h-auto rounded-md object-cover aspect-video"
                    />
                  </div>
                  <div className="flex-1">
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
                    <div className="mt-4">
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
                    <div className="mt-6">
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
                  Paste any URL from YouTube, Instagram, TikTok, Facebook, Twitter, or Vimeo to download media
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
    </section>
  );
};

export default MediaDownloader;
