export interface IAudioPlayerProps {
  activeId: string;
  audioFile: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}
