import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
  const activeLibraryHandler = (nextPrev) =>{
    
    const newSongs = songs.map(state=>{
      if(state.id ===nextPrev.id){
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
  }
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async(direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if(direction === "skip-back"){
      if((currentIndex - 1) % songs.length === -1){
      await setCurrentSong(songs[songs.length -1])
        if(isPlaying) audioRef.current.play()
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        return
      }
     await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
    }
    if(isPlaying)audioRef.current.play()
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  
  // add the styles 
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration || ""}
          value={songInfo.currentTime || 0}
          type="range"
        />
        <div style={trackAnim} className="animate-track"></div>
        </div>
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
