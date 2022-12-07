import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({setSongs,songs, song, setCurrentSong,audioRef,isPlaying }) => {
  const songSelectHandler = () => {
    const newSongs = songs.map(state=>{
      if(state.id ===song.id){
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
    setCurrentSong(song);
    playAudio(isPlaying,audioRef)
  };
  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
