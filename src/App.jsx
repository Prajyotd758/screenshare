import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import "./app.css";

function ScreenShare() {
  const videoRef = useRef();
  const [startStream, setStream] = useState(true);
  const [peerid, setPeerid] = useState("");
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer("fusion_131120");
    peer.on("open", (id) => {
      setPeerid(id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        window.electronAPI.executeCmd();
      });
    });

    peer.on("call", (call) => {
      setStream(!startStream);
      call.answer();
      call.on("stream", (remoteStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = remoteStream;
          videoRef.current.play();
        }
      });
    });
    peerInstance.current = peer;
  }, []);

  return (
    <div className="container">
      {/* <button
        onClick={() => {
          window.electronAPI.setScreen(true);
        }}
      >click me</button> */}
      <video style={{ width: "100%", height: "auto" }} ref={videoRef}></video>
    </div>
  );
}

export default ScreenShare;
