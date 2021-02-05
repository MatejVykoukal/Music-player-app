import React, { FC, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import songModel from "../interfaces/songModel";
import { time } from "console";

interface Props {
  currentSong: songModel;
  isPlaying: boolean;
  setIsPlaying: any;
  // React.Dispatch<React.SetStateAction<boolean>>;
}

interface SongInfo {
  currentTime: number;
  duration: number;
}

const Player: FC<Props> = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef: any = useRef();
  const [songInfo, setSongInfo] = useState<SongInfo>({ currentTime: 0, duration: 0 });

  const formatTime = (t: number) => ("0" + Math.floor(t / 60)).slice(-2) + ":" + ("0" + Math.floor(t % 60)).slice(-2);

  const playSongHandler = () => {
    if (isPlaying) {
      console.log();

      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e: React.ChangeEvent<HTMLAudioElement>) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <div className="player">
      <div className="timeControl">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input type="range" />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="playControl">
        <FontAwesomeIcon className="skipBack" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" size="2x" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skipForward" size="2x" icon={faAngleRight} />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
};

export default Player;
