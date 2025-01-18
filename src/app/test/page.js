"use client";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Page() {
 const playerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  

  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Max zoom level = 3
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom level = 1
  };

  const playerStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: 'center center',
    transition: 'transform 0.2s ease-in-out',
    width: '100%',
    height: '100%',
  };

  // Add event listener to detect fullscreen change
  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="player-wrapper" style={{ position: 'relative', }}>
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Example video URL
        width="400px"
        height="400px"
        style={playerStyle}
        playing
      />
      {isFullscreen && (
        <div className="zoom-controls" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
      )}
    </div>
  );
};