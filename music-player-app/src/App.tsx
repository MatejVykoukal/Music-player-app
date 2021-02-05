import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import { AudioProvider } from "./AudioContext";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioProvider>
      <div className="App">
        <Song currentSong={currentSong} />
        <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
        <Library
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
    </AudioProvider>
  );
}

export default App;
