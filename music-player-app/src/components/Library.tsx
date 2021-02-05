import React, { FC } from "react";
import songModel from "../interfaces/songModel";
import LibrarySong from "./LibrarySong";

interface Props {
  currentSong: songModel;
  setCurrentSong: React.Dispatch<React.SetStateAction<songModel>>;
  songs: songModel[];
}

const Library: FC<Props> = ({ currentSong, setCurrentSong, songs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="librarySongs">
        {songs.map((song) => (
          <LibrarySong song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
