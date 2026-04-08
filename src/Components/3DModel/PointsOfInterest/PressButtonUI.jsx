import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";

export default function PressButtonUI({ element }) {
  const elementContacted = useGameStore((state) => state.elementContacted);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready && (
        <Html>
          <div
            style={{
              color: "White",
              backgroundColor: "rgba(0, 0, 0)",
              height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              fontSize: "16px",

              transition: "all 0.5s",
              opacity: elementContacted !== element ? 0 : 0.5,
              transform: `scale(${elementContacted !== element ? 0.5 : 1})`,
            }}
          >
            A
          </div>
        </Html>
      )}
    </>
  );
}
