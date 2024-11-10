import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function ScreenShare() {
  const videeoRef = useRef();
  const [peerid, setPeerid] = useState("");
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerid(id);
    });

    peer.on("call", (call) => {
      window.electronAPI.getScreenSources().then(async (sources) => {
        try {
          navigator.mediaDevices
            .getUserMedia({
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: sources[0].id,
                  width: { ideal: 1920 },
                  height: { ideal: 1080 },
                },
              },
            })
            .then((stream) => {
              call.answer(stream);
              call.on("stream", (remoteStream) => {
                if (videeoRef.current) {
                  videeoRef.current.srcObject = stream;
                  videeoRef.current.play();
                }
              });
            });
        } catch (e) {
          console.error("Failed to get user media", e);
        }
      });
    });
    peerInstance.current = peer;
  }, []);

  return (
    <div>
      <h1>{peerid}</h1>
      <video style={{ width: "100%", height: "auto" }} ref={videeoRef}></video>
    </div>
  );
}

export default ScreenShare;
