import { loadFont as loadInterFont, fontFamily as interFontFamily } from '@remotion/google-fonts/Inter';
import { loadFont as loadRobotoFont, fontFamily as robotoFontFamily } from '@remotion/google-fonts/Roboto';
import { loadFont as loadPoppinsFont, fontFamily as poppinsFontFamily } from '@remotion/google-fonts/Poppins';
import { useCurrentFrame, useVideoConfig } from 'remotion';
// Load fonts
loadInterFont();
loadRobotoFont();
loadPoppinsFont();

const SubtitleOverlay = ({ subtitles, styleType }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Group words into pairs
  const wordPairs = [];
  if (subtitles.length > 0) {
    for (let i = 0; i < subtitles.length; i += 2) {
      const pair = {
        words: [
          subtitles[i],
          subtitles[i + 1] ? subtitles[i + 1] : null,
        ].filter(Boolean),
        start: subtitles[i].start,
        end: subtitles[i + 1] ? subtitles[i + 1].end : subtitles[i].end,
      };
      wordPairs.push(pair);
    }
  }

  // Find the active word pair
  const activePair = wordPairs.find(
    (pair) => {
      const startFrame = Math.floor(pair.start * fps);
      const endFrame = Math.floor(pair.end * fps);
      return frame >= startFrame && frame <= endFrame;
    }
  );

  // Get font family based on styleType
  const getFontFamily = (style) => {
    switch (style) {
      case 'hormozi':
      case 'neonGlow':
        return interFontFamily;
      case 'abdaal':
      case 'none':
        return robotoFontFamily;
      case 'retroWave':
        return '"VCR OSD Mono", monospace';
      case 'minimalPop':
        return poppinsFontFamily;
      default:
        return 'Arial, sans-serif';
    }
  };

  // Base subtitle word style
  const getSubtitleWordStyle = (isHighlighted, styleType) => {
    const baseStyle = {
      fontFamily: getFontFamily(styleType),
      fontSize: styleType === 'hormozi' ? '36px' :
               styleType === 'abdaal' ? '28px' :
               styleType === 'neonGlow' ? '32px' :
               styleType === 'retroWave' ? '30px' :
               styleType === 'minimalPop' ? '28px' : '24px',
      fontWeight: styleType === 'hormozi' ? '900' :
                 styleType === 'abdaal' ? '600' :
                 styleType === 'neonGlow' ? '700' :
                 styleType === 'retroWave' ? '400' :
                 styleType === 'minimalPop' ? '500' : 'bold',
      padding: styleType === 'hormozi' ? '5px 10px' :
              styleType === 'abdaal' ? '5px 8px' :
              styleType === 'neonGlow' ? '6px 9px' :
              styleType === 'retroWave' ? '5px 8px' :
              styleType === 'minimalPop' ? '4px 6px' : '5px',
      textTransform: styleType === 'hormozi' ? 'uppercase' : 'none',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      margin: '0 2px',
    };

    const styleConfig = {
      hormozi: {
        color: isHighlighted ? '#FFD700' : 'white',
        backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        borderRadius: isHighlighted ? '9px' : '0',
        textShadow: isHighlighted ? '0 4px 6px rgba(0, 0, 0, 0.8)' : 'none',
      },
      abdaal: {
        color: isHighlighted ? '#191717' : '#bcbcbc',
        backgroundColor: isHighlighted ? 'rgba(255, 240, 240, 0.99)' : 'transparent',
        borderRadius: isHighlighted ? '6px' : '0',
        textShadow: isHighlighted ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none',
      },
      neonGlow: {
        color: isHighlighted ? '#00FFDD' : '#FF69B4',
        textShadow: isHighlighted
          ? '0 0 8px #00FFDD, 0 0 16px #00FFDD, 0 0 24px #FF00FF'
          : '0 0 4px #FF69B4',
        background: isHighlighted
          ? 'linear-gradient(45deg, rgba(255, 0, 255, 0.2), rgba(0, 255, 221, 0.2))'
          : 'transparent',
        borderRadius: isHighlighted ? '6px' : '0',
      },
      retroWave: {
        color: isHighlighted ? '#FF1493' : '#FF69B4',
        textShadow: isHighlighted
          ? '0 0 10px #FF1493, 0 0 20px #9400D3'
          : '0 0 5px #FF69B4',
        backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
        borderRadius: isHighlighted ? '5px' : '0',
        letterSpacing: isHighlighted ? '2px' : '1px',
      },
      minimalPop: {
        color: isHighlighted ? '#FF6B6B' : '#FFFFFF',
        background: isHighlighted
          ? 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)'
          : 'transparent',
        borderRadius: isHighlighted ? '6px' : '0',
        transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
        textShadow: isHighlighted ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
      },
      none: {
        color: isHighlighted ? '#FF4500' : 'white',
        backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        borderRadius: isHighlighted ? '5px' : '0',
        textShadow: isHighlighted ? '0 2px 4px rgba(0, 0, 0, 0.8)' : 'none',
      },
    };

    return { ...baseStyle, ...styleConfig[styleType] };
  };

  // Container styles
  const styles = {
    hormozi: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      padding: '15px 20px',
      borderRadius: '12px',
      border: '4px solid #FFD700',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.2s ease-in-out',
    },
    abdaal: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      backgroundColor: 'rgb(235, 232, 232)',
      padding: '10px 15px',
      borderRadius: '10px',
      border: '2px solid #FFFFFF',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.2s ease-in-out',
    },
    neonGlow: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.2), rgba(0, 255, 221, 0.2))',
      padding: '12px 18px',
      borderRadius: '10px',
      border: '2px solid #FF00FF',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
      animation: activePair ? 'neonFlicker 1.5s infinite alternate' : 'none',
    },
    retroWave: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '10px 15px',
      borderRadius: '8px',
      border: '3px double #00FFFF',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.2s ease-in-out',
      filter: 'contrast(1.2)',
    },
    minimalPop: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
      padding: '8px 12px',
      borderRadius: '12px',
      border: 'none',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
      transform: activePair ? 'scale(1)' : 'scale(0.95)',
    },
    none: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      bottom: '10%',
      textAlign: 'center',
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '10px',
      borderRadius: '8px',
      opacity: activePair ? 1 : 0,
      transition: 'opacity 0.2s ease-in-out',
    },
  };

  // Render subtitle words
  const renderSubtitle = () => {
    if (!activePair) return null;

    return activePair.words.map((word, index) => {
      const isHighlighted = word && (
        frame >= Math.floor(word.start * fps) &&
        frame <= Math.floor(word.end * fps)
      );
      return (
        <span
          key={index}
          style={getSubtitleWordStyle(isHighlighted, styleType)}
        >
          {word.text}{' '}
        </span>
      );
    });
  };

  return (
    <div style={styles[styleType] || styles.none}>
      {renderSubtitle()}
    </div>
  );
};

export default SubtitleOverlay;
