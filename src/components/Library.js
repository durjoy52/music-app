import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({setSongs, songs, setCurrentSong,audioRef,isPlaying,libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h1>Library</h1>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
          set
            key={song.id}
            setSongs={setSongs}
            songs={songs}
            song={song}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
