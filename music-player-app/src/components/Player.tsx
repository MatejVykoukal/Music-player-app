import React, { FC, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import songModel from "../interfaces/songModel";
import { AudioContext } from "../AudioContext";

interface Props {
  currentSong: songModel;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SongInfo {
  currentTime: number;
  duration: number;
}

const Player: FC<Props> = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useContext<any | null>(AudioContext);

  const [songInfo, setSongInfo] = useState<SongInfo>({ currentTime: 0, duration: 0 });

  const formatTime = (t: number) => ("0" + Math.floor(t / 60)).slice(-2) + ":" + ("0" + Math.floor(t % 60)).slice(-2);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current!.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current!.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e: React.ChangeEvent<HTMLAudioElement>) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const dragHandler = ({ target: { value: currentTime } }: React.ChangeEvent<HTMLInputElement>) => {
    setSongInfo({ ...songInfo, currentTime: +currentTime });
    audioRef.current!.currentTime = +currentTime;
  };

  return (
    <div className="player">
      <div className="timeControl">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input type="range" min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} />
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
