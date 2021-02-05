import React, { FC } from "react";
import songModel from "../interfaces/songModel";

interface Props {
  currentSong: songModel;
}

const Song: FC<Props> = ({ currentSong }) => {
  return (
    <div className="songContainer">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
