import React from 'react';

const VideoPlayer = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <video 
        width="100%" 
        controls 
        autoPlay 
        loop 
        muted // Recommended to prevent autoplay issues in browsers
        poster="https://example.com/placeholder.jpg" // Optional placeholder
      >
        <source 
          src="https://stream.media.muscache.com/C02DwHtVZ00bgDkanHW4MbLmQM38qreyDZYJ601ny01I01sQ.mp4?v_q=hig" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

