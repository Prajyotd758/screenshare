import React, { useEffect, useRef, useState } from "react";

function ScreenShare() {
  const videeoRef = useRef();

  useEffect(() => {
    const startStream = async () => {
      window.electronAPI.getScreenSources().then(async (sources) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: sources[0].id,
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              },
            },
          });
          if (videeoRef.current) {
            videeoRef.current.srcObject = stream;
            videeoRef.current.play();
          }
        } catch (e) {
          console.error("Failed to get user media", e);
        }
      });
    };

    startStream();
  }, []);

  return (
    <div>
      <video style={{ width: "100%", height: "auto" }} ref={videeoRef}></video>
    </div>
  );
}

export default ScreenShare;
