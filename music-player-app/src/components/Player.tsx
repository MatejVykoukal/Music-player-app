import React, { FC, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import songModel from "../interfaces/songModel";

interface Props {
  currentSong: songModel;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player: FC<Props> = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef: any = useRef(null);

  let playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!setIsPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!setIsPlaying);
    }
  };

  return (
    <div className="player">
      <div className="timeControl">
        <p>Start time</p>
        <input type="range" />
        <p>End time</p>
      </div>
      <div className="playControl">
        <FontAwesomeIcon className="skipBack" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" size="2x" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skipForward" size="2x" icon={faAngleRight} />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
