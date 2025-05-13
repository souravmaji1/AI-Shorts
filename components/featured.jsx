'use client'
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

const FeaturedContentSection = () => {
  const [selectedFeaturedVideo, setSelectedFeaturedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const featuredContent = [
    {
      title: 'Viral Dance Reel',
      description: 'AI-enhanced transitions and neon subtitles for a trending dance video.',
      thumbnail: 'frame.png',
      videoUrl: 'boy.mp4',
      platform: 'Instagram Reels',
      style: 'Neon Glow',
      styleType: 'neonGlow',
      duration: 30,
      subtitles: [
        { text: 'Check out this move!', start: 2, end: 4 },
        { text: 'The hottest dance trend', start: 8, end: 11 },
        { text: 'Try it yourself!', start: 18, end: 21 },
      ],
    },
    {
      title: 'Travel Vlog Teaser',
      description: 'Cinematic cuts and minimal pop subtitles for a stunning travel clip.',
    thumbnail: 'clip.png',
      videoUrl: 'boy.mp4',
      platform: 'TikTok',
      style: 'Minimal Pop',
      styleType: 'minimalPop',
      duration: 25,
      subtitles: [
        { text: 'Exploring Bali', start: 1, end: 3 },
        { text: 'The most beautiful beaches', start: 7, end: 10 },
        { text: "Don't miss this place", start: 15, end: 18 },
      ],
    },
    {
      title: 'Product Launch Ad',
      description: 'Bold Hormozi-style captions for a high-energy product reveal.',
     thumbnail: 'prof.jpg',
      videoUrl: 'boy.mp4',
      platform: 'YouTube Shorts',
      style: 'Hormozi',
      styleType: 'hormozi',
      duration: 28,
      subtitles: [
        { text: 'GAME CHANGING PRODUCT', start: 2, end: 5 },
        { text: 'LIMITED TIME OFFER', start: 10, end: 13 },
        { text: 'GET YOURS TODAY', start: 20, end: 23 },
      ],
    },
  ];

  const openModal = (creation) => {
    setSelectedFeaturedVideo(creation);
    setIsVideoModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFeaturedVideo(null);
    setIsVideoModalOpen(false);
  };

   

  return (
    <div className="py-8">
      {/* Grid of Video Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto px-4"
      >
        {featuredContent.map((creation, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -5 }}
            className="relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/70 transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-900/30 group"
          >
            {/* Thumbnail with 9:16 Aspect Ratio */}
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              <img
                src={creation.thumbnail}
                alt={creation.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  onClick={() => openModal(creation)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-purple-600/80 text-white py-2 px-4 rounded-lg flex items-center backdrop-blur-sm shadow-lg shadow-purple-900/50"
                  aria-label={`Preview ${creation.title}`}
                >
                  <Play size={18} className="mr-2" />
                  Preview
                </motion.button>
              </div>
              <div className="absolute top-3 right-3 bg-gray-900/80 rounded-md px-2 py-1 text-xs text-gray-300 backdrop-blur-sm">
                {creation.platform}
              </div>
            </div>
            {/* Card Content */}
            <div className="p-4">
              <h4 className="font-medium text-white mb-1 text-sm">{creation.title}</h4>
              <p className="text-xs text-gray-400 mb-2 line-clamp-2">{creation.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center">
                  <Sparkles size={12} className="mr-1 text-purple-400" />
                  {creation.style}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-purple-400 hover:text-purple-300 flex items-center"
                  aria-label={`Create similar to ${creation.title}`}
                >
                  Create Similar <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-xl transition-all duration-300"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Preview Modal */}
      {isVideoModalOpen && selectedFeaturedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-900 rounded-xl max-w-md w-full sm:max-w-lg z-60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="w-full aspect-[9/16] overflow-hidden rounded-t-xl">
              <video
                src={selectedFeaturedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover z-70"
                aria-label={`Video preview for ${selectedFeaturedVideo.title}`}
              />
            </div>
            {/* Modal Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{selectedFeaturedVideo.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{selectedFeaturedVideo.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{selectedFeaturedVideo.platform}</span>
                <span>{selectedFeaturedVideo.duration}s</span>
              </div>
            </div>
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              className="absolute top-3 right-3 bg-gray-800/80 text-white p-2 rounded-full z-80"
              aria-label="Close video preview"
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FeaturedContentSection; 