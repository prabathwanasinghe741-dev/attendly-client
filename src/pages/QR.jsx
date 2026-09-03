import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import '../styles/components/qr-code.css';
import { aboutMe, enterClass } from '../services/routes';

const QR = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const scannerRef = useRef(null);
  const hasScannedRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const status = await aboutMe();
        if (mounted) setUser(status.data);
      } catch (err) {
        console.error("aboutMe failed", err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // hard kill - this is instant
  const forceStop = () => {
    try {
      const readerEl = document.getElementById("reader");
      if (!readerEl) return;
      // html5-qrcode renders a <video> inside #reader
      const video = readerEl.querySelector("video");
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
        video.srcObject = null;
      }
    } catch { }
  };

  const cleanup = async () => {
    const s = scannerRef.current;
    if (!s) return;
    try {
      const state = s.getState();
      // 2 = SCANNING
      if (state === 2) {
        forceStop(); // instant black screen
        await s.stop();
      }
      s.clear();
    } catch { }
    scannerRef.current = null;
  };

  useEffect(() => {
    if (!user) return;
    if (hasScannedRef.current) return;

    const scanner = new Html5Qrcode("reader", false);
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
      async (text) => {
        if (hasScannedRef.current) return;
        hasScannedRef.current = true;

        try {
          // keep camera on while API calls
          await enterClass({
            firstname: user.firstname,
            lastname: user.lastname,
            classID: text
          });
        } catch (err) {
          console.error("enterClass failed", err);
          hasScannedRef.current = false;
          return;
        }
        await cleanup();
        navigate('/educator', { replace: true, state: { classID: text } });
      },
      () => { }
    ).catch(err => console.error("Scanner start failed", err));

    return () => {
      cleanup();
    };
  }, [user, navigate]);

  return (
    <div className="qr-root">
      <div id="reader" />
    </div>
  );
};

export default QR;