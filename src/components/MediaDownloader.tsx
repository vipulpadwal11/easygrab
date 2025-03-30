
import React, { useState } from 'react';
import { Download, Link, Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface MediaInfo {
  title: string;
  thumbnail: string;
  formats: string[];
  type: 'video' | 'image' | 'audio';
  platform: string;
}

const MediaDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);

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
        throw new Error('Please enter a valid URL');
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
        platform = 'Unknown';
      }

      // Mock media info based on URL
      const mockMediaInfo: MediaInfo = {
        title: `Sample ${platform} Media`,
        thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D',
        formats: platform === 'YouTube' ? ['mp4', 'mp3', 'webm'] : ['mp4', 'jpg'],
        type: platform === 'Instagram' ? 'image' : 'video',
        platform
      };
      
      setMediaInfo(mockMediaInfo);
      if (mockMediaInfo.formats.length > 0) {
        setSelectedFormat(mockMediaInfo.formats[0]);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
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
          toast.success('Download completed successfully!');
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
    <section id="download" className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-black/10">
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
              <div className="flex gap-2">
                <input
                  id="media-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="input-primary flex-1"
                  disabled={loading || isDownloading}
                />
                <button
                  onClick={() => fetchMediaInfo(url)}
                  disabled={!url || loading || isDownloading}
                  className="btn-primary flex items-center whitespace-nowrap"
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
              {error && (
                <div className="mt-2 text-red-500 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </div>
            
            {/* Media Preview */}
            {mediaInfo && !loading && (
              <div className="border border-black/10 rounded-lg p-4 mb-6">
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
                        className="text-gray-500 hover:text-black"
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
                        {mediaInfo.formats.map((format) => (
                          <button
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedFormat === format
                                ? 'bg-black text-pearl'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            .{format}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <div className="mt-6">
                      <button
                        onClick={downloadMedia}
                        disabled={isDownloading || !selectedFormat}
                        className="btn-primary w-full md:w-auto flex items-center justify-center"
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
                            Download .{selectedFormat}
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
    </section>
  );
};

export default MediaDownloader;
