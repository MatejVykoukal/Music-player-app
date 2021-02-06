import React, { FC, useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import songModel from "../interfaces/songModel";
import { AudioContext } from "../AudioContext";

interface Props {
  currentSong: songModel;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  songs: songModel[];
  setCurrentSong: React.Dispatch<React.SetStateAction<songModel>>;
  setSongs: React.Dispatch<React.SetStateAction<songModel[]>>;
}

interface SongInfo {
  currentTime: number;
  duration: number;
}

const Player: FC<Props> = ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs }) => {
  const audioRef = useContext<any | null>(AudioContext);

  const [songInfo, setSongInfo] = useState<SongInfo>({ currentTime: 0, duration: 0 });

  const formatTime = (t: number) => ("0" + Math.floor(t / 60)).slice(-2) + ":" + ("0" + Math.floor(t % 60)).slice(-2);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
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
  }, [currentSong]);

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

  const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

  const SkipSongHandler = (direction: "skipBackward" | "skipForward") => {
    if (direction === "skipBackward") {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentIndex - 1]);
      }
    }
    if (direction === "skipForward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
  };

  return (
    <div className="player">
      <div className="timeControl">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={isNaN(songInfo.duration) ? 0 : songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{formatTime(isNaN(songInfo.duration) ? 0 : songInfo.duration)}</p>
      </div>
      <div className="playControl">
        <FontAwesomeIcon
          className="skipBackward"
          onClick={() => SkipSongHandler("skipBackward")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon className="play" size="2x" onClick={playSongHandler} icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon
          className="skipForward"
          onClick={() => SkipSongHandler("skipForward")}
          size="2x"
          icon={faAngleRight}
        />
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
