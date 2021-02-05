import React, { FC, useRef } from "react";

interface props {
  children: any;
}

export const AudioContext = React.createContext<Partial<any>>({});

export const AudioProvider: FC<props> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return <AudioContext.Provider value={audioRef}>{children}</AudioContext.Provider>;
};
