import React, { FC, useContext } from "react";
import songModel from "../interfaces/songModel";
import { AudioContext } from "../AudioContext";

interface Props {
  song: songModel;
  setCurrentSong: React.Dispatch<React.SetStateAction<songModel>>;
  isPlaying: boolean;
  setSongs: React.Dispatch<React.SetStateAction<songModel[]>>;
  songs: songModel[];
}

const LibrarySong: FC<Props> = ({ song, setCurrentSong, isPlaying, setSongs, songs }) => {
  const audioRef = useContext<any | null>(AudioContext);

  const ChangeSongHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentSong(song);
    const playPromise = audioRef.current!.play();

    if (isPlaying) {
      if (playPromise !== undefined) {
        playPromise.then(() => audioRef.current.play());
      }
    }
    const newSongs = songs.map((s) => {
      if (s === song) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  return (
    <div className={`librarySong ${song.active ? "selected" : ""}`} onClick={ChangeSongHandler}>
      <img src={song.cover} alt={song.name} />
      <div className="description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
