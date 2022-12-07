import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { playAudio } from "../util";

const Player = ({
  isPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  playSongHandler,
  songs,
  setCurrentSong,
  currentSong,
  setSongs
}) => {
  useEffect(()=>{
    const newSongs = songs.map(state=>{
      if(state.id ===currentSong.id){
        return{
          ...state,
          active:true
        }
      }else{
        return{
          ...state,
          active:false
        }
      }
    })
    setSongs(newSongs)
  },[currentSong,songs,setSongs])
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if(direction === "skip-back"){
      if((currentIndex - 1) % songs.length === -1){
        setCurrentSong(songs[songs.length -1])
        playAudio(isPlaying,audioRef)
        return
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(isPlaying,audioRef)
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration || ""}
          value={songInfo.currentTime || 0}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={()=>skipTrackHandler("skip-back")}
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={()=>skipTrackHandler("skip-forward")}
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
