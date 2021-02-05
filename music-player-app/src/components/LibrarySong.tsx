import React, { FC, useContext } from "react";
import songModel from "../interfaces/songModel";
import { AudioContext } from "../AudioContext";

interface Props {
  song: songModel;
  setCurrentSong: React.Dispatch<React.SetStateAction<songModel>>;
  isPlaying: boolean;
}

const LibrarySong: FC<Props> = ({ song, setCurrentSong, isPlaying }) => {
  const audioRef = useContext<any | null>(AudioContext);
  const ChangeSongHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSong(song);
    const playPromise = audioRef.current!.play();
    if (isPlaying) {
      if (playPromise !== undefined) {
        playPromise.then(() => audioRef.current.play());
      }
    }
  };

  return (
    <div className="librarySong" onClick={ChangeSongHandler}>
      <img src={song.cover} alt={song.name} />
      <div className="description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
