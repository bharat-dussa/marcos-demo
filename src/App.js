import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Model from "./Model"
import Overlay from "./Overlay"
import AudioPlayer from "react-audio-player"

import suzume from "./assests/suzume1.mp3"

export default function App() {
  const [audio, setAudio] = useState(null);

  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  // useEffect(() => {
  //   const audio = new Audio(suzume)
  //   audio.loop = true
  //   audio?.play()

  //   // Clean up the audio instance when the component unmounts
  //   return () => {
  //     audio.pause()
  //     audio.currentTime = 0
  //   }
  // }, [])

  

  const playAudio = () => {
    if (audio && !audio.paused) {
      audio.pause();
    } else {
      const newAudio = new Audio(suzume);
      newAudio.loop = true;
      newAudio.play();
      setAudio(newAudio);
    }
  };


  useEffect(() => {
    // Trigger audio playback when the user interacts with the page
    window.addEventListener("click", playAudio)

    return () => {
      window.removeEventListener("click", playAudio);
      if (audio) {
        audio.pause();
      }
    }
  }, [audio])

  return (
    <>
      <Canvas shadows eventSource={document.getElementById("root")} eventPrefix="client">
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  )
}
