import React, { FC } from "react";
import songModel from "../interfaces/songModel";
import LibrarySong from "./LibrarySong";

interface Props {
  currentSong: songModel;
  setCurrentSong: React.Dispatch<React.SetStateAction<songModel>>;
  songs: songModel[];
  isPlaying: boolean;
  setSongs: React.Dispatch<React.SetStateAction<songModel[]>>;
  isOpened: boolean;
}

const Library: FC<Props> = ({ currentSong, setCurrentSong, songs, isPlaying, setSongs, isOpened }) => {
  return (
    <div className={`library ${isOpened ? "opened" : ""}`}>
      <h2>Library</h2>
      <div className="librarySongs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            songs={songs}
            currentSong={currentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
