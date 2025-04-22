"use client";

import { useState, useRef, useEffect } from "react";
import { BiPlay, BiPause } from "react-icons/bi";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { IAudioPlayerProps } from "./audio-player/audio-player.props";

const AudioPlayer = ({
  audioFile,
  isPlaying,
  onPlayPause,
}: IAudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `${process.env.NEXT_PUBLIC_API_URL}/files/${audioFile}`;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTime === audioRef.current.duration) {
      setCurrentTime(0);
      onPlayPause();
    }
  }, [currentTime, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="w-full bg-secondary/10 p-4 rounded-lg mt-4 ">
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />

      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPause}
          className="p-2 rounded-full hover:bg-secondary/20"
        >
          {isPlaying ? (
            <BiPause className="w-6 h-6" />
          ) : (
            <BiPlay className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration}
            step={1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full cursor-pointer mt-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-secondary/20"
          >
            {isMuted ? (
              <BsVolumeMute className="w-4 h-4" />
            ) : (
              <BsVolumeUp className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
