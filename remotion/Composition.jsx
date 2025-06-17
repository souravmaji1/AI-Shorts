// src/remotion/Composition.jsx

import { Composition, AbsoluteFill, useVideoConfig, Video as RemotionVideo, Img, Sequence, Audio } from 'remotion';
import SubtitleOverlay from '../components/SubtitleOverlay';

// VideoComposition component for rendering video or image slideshow
export const VideoComposition = ({ images, audioUrl,subtitles, subtitleStyle, transitionType = 'crossfade' }) => {
  const frameRate = 30;
  const imageDuration = 3; // Duration per image in seconds
  const transitionDuration = 0.5; // Duration of transition in seconds
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
        {audioUrl && <Audio src={audioUrl} />}
      {images.map((img, index) => {
        const startFrame = index * imageDuration * frameRate;
        const endFrame = startFrame + imageDuration * frameRate;
        const transitionFrames = transitionDuration * frameRate;

        let opacity = 1;
        let transform = 'none';
        let translateX = 0;
        let scale = 1;

        if (transitionType === 'crossfade') {
          opacity = interpolate(
            frame,
            [
              startFrame,
              startFrame + transitionFrames,
              endFrame - transitionFrames,
              endFrame,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
        } else if (transitionType === 'slide') {
          translateX = interpolate(
            frame,
            [startFrame, startFrame + transitionFrames],
            [100, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          opacity = interpolate(
            frame,
            [endFrame - transitionFrames, endFrame],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          transform = `translateX(${translateX}%)`;
        } else if (transitionType === 'zoom') {
          scale = interpolate(
            frame,
            [startFrame, startFrame + transitionFrames],
            [1.2, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          opacity = interpolate(
            frame,
            [endFrame - transitionFrames, endFrame],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          transform = `scale(${scale})`;
        } else if (transitionType === 'fade-to-black') {
          opacity = interpolate(
            frame,
            [
              startFrame,
              startFrame + transitionFrames / 2,
              endFrame - transitionFrames / 2,
              endFrame,
            ],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
        }

        const zoomCycleDuration = 1 * frameRate;
        const relativeFrame = frame - startFrame;
        const zoomScale = interpolate(
          relativeFrame % zoomCycleDuration,
          [0, zoomCycleDuration / 2, zoomCycleDuration],
          [1, 1.1, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const finalTransform = transform === 'none' ? `scale(${zoomScale})` : `${transform} scale(${zoomScale})`;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={imageDuration * frameRate}
          >
            <Img
              src={img}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity,
                transform: finalTransform,
                transformOrigin: 'center center',
              }}
            />
          </Sequence>
        );
      })}
      {subtitles.length > 0 && (
        <Sequence from={0} durationInFrames={Math.max(...subtitles.map(s => s.end * fps))}>
          <SubtitleOverlay subtitles={subtitles} styleType={subtitleStyle} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

// RemotionComposition component for composition setup
export const RemotionComposition = ({
  images,
  audioUrl,
  subtitles,
  styleType,
  transitionType,
  duration,
  imageDuration,
}) => {
  const fps = 30; // Define fps before usage
  const safeDuration = Number(duration) || 30; // Fallback to 30 seconds
  const durationInFrames = Math.ceil(safeDuration * fps);

  // Log props for debugging
  console.log('RemotionComposition props:', {
    images,
    audioUrl,
    subtitles,
    styleType,
    transitionType,
    duration,
    safeDuration,
    durationInFrames,
    imageDuration,
  });

  // Validate durationInFrames
  if (isNaN(durationInFrames) || durationInFrames <= 0) {
    console.error('Invalid durationInFrames:', durationInFrames);
    throw new Error('Duration must be a positive number');
  }

  return (
    <Composition
      id="VideoWithSubtitles"
      component={VideoComposition}
      durationInFrames={durationInFrames}
      fps={fps}
      width={360} // Adjusted to match Main component's player (9:16 aspect ratio)
      height={640}
      defaultProps={{
        images: Array.isArray(images) ? images : [],
        audioUrl: audioUrl || '',
        subtitles: Array.isArray(subtitles) ? subtitles : [],
        styleType: styleType || 'none',
        transitionType: transitionType || 'crossfade',
      }}
    />
  );
};
