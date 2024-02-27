import React, { useEffect, useRef, useState } from "react";
import { useUser } from '../helpers/UserProvider';
import axios from 'axios';

export const MusicPlayer = (selectedMusic) => {

  const audioRef = useRef();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  debugger;
  const {getUser} = useUser();
  const { thumbnail, title, artist, audio_url,songId,heart } = selectedMusic;

  const artistList = artist && artist.map((item) => item.name).join(" & ");

  useEffect(() => {
    setAddedToWatchlist(heart);
    audioRef.current.play();
  }, [selectedMusic])

  const AddFavorite = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { "songId": songId }, {
      headers: {
        Authorization: `Bearer ${getUser.token}`
      }
    }).then((response) => {
      setAddedToWatchlist(true);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <section className="music-player">
      <img src={thumbnail} alt={title} height="50" width="50" />
      <>
        <div className="song-info">
          <div>{title}</div>
          <div title={artistList} className="artist-list">
            {artistList}
          </div>
        </div>
        <audio controls ref={audioRef} src={audio_url} />

        <div className="heart-icon">
          {getUser && (addedToWatchlist ? <i class="fa-solid fa-heart"></i> : <i  onClick={() => AddFavorite(songId)} class="fa-regular fa-heart"></i>)}
        </div>
      </>
    </section>
  );
};

export default MusicPlayer;