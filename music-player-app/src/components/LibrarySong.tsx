import React, { FC } from "react";
import songModel from "../interfaces/songModel";

interface Props {
  song: songModel;
}

const LibrarySong: FC<Props> = ({ song }) => {
  return (
    <div className="librarySong">
      <img src={song.cover} alt={song.name} />
      <div className="description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
