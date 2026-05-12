"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!glow || !dot || !ring) return;

    const move = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
    };

    // hover pe ring bari ho
    const addHover = () => ring.classList.add("hovered");
    const removeHover = () => ring.classList.remove("hovered");

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Big glow */}
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{
          position: "fixed",
          pointerEvents: "none",
          borderRadius: "50%",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.18) 0%, rgba(244,63,94,0.06) 50%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.1s ease, top 0.1s ease",
          zIndex: 9997,
          top: "-100px",
          left: "-100px",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          pointerEvents: "none",
          borderRadius: "50%",
          border: "1.5px solid rgba(244,63,94,0.5)",
          width: "36px",
          height: "36px",
          transform: "translate(-50%, -50%)",
          transition: "left 0.13s ease, top 0.13s ease, width 0.2s ease, height 0.2s ease",
          zIndex: 9998,
          top: "-100px",
          left: "-100px",
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          borderRadius: "50%",
          background: "#f43f5e",
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          transition: "left 0.04s ease, top 0.04s ease",
          zIndex: 9999,
          boxShadow: "0 0 10px 3px rgba(244,63,94,0.6)",
          top: "-100px",
          left: "-100px",
        }}
      />

      <style>{`
        * { cursor: none !important; }
        .cursor-ring.hovered {
          width: 52px !important;
          height: 52px !important;
          border-color: rgba(244,63,94,0.8) !important;
        }
      `}</style>
    </>
  );
}