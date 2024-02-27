import React from "react";

function MusicCard(props) {
    
  const { library,title, thumbnail, artist,id,setSelectedMusic,removeFavorite} = props;
  const artistList = artist.map((item) => item.name).join(" & ");
  return (
    <section
      className="musicCard"
    >
      <img
        src={thumbnail}
        alt={title}
        height="150"
        width="150"
        onClick={()=>setSelectedMusic(id)}
        className="bannerImg"
      />
      <div>{title} {library && <i class="fa-solid fa-trash" onClick={() => { removeFavorite(id) }}></i> }</div>
      {library &&<div className="artist" title="artistList">
        {artistList}
      </div>}
    </section>
  );
};

export default MusicCard;