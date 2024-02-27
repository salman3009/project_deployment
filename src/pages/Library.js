import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicCard from '../components/MusicCard';
import MusicPlayer from '../components/MusicPlayer';
import Sidebar from '../pages/Sidebar';
import { useUser } from '../helpers/UserProvider';

function Library() {

  const [isLoading, setIsLoading] = useState(false);
  const [musicsList, setMusicList] = useState([]);
  const [selectedMusic, setMusic] = useState(null);
  const { getUser } = useUser();

  const fetchMusics = async () => {
    try {
      setIsLoading(true);
      const musics = await axios.get('https://academics.newtonschool.co/api/v1/music/favorites/like', {
        headers: {
          Authorization: `Bearer ${getUser.token}`
        }
      })
      console.log("musics", musics.data.data);
      const musicListData = musics.data.data.songs;
      setMusicList(musicListData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusics();
  }, []);

  const setMusicHandler = (id) => {
    let selectedMusic = musicsList[id];
    setMusic(selectedMusic);
  }

  const removeFavorite = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { "songId": songId }, {
      headers: {
        Authorization: `Bearer ${getUser.token}`
      }
    }).then((response) => {
      console.log(response);
      fetchMusics();
    }).catch((error) => {
      console.log(error);
    })
  }

  if(!musicsList.length){
    return <div style={{textAlign:'center'}}>No music found</div>
  }

  return (<>
    <div className="global-container">
      <div className="left-bar">
        <Sidebar />
      </div>
      <div className="right-bar">
        <section className="musicList-container">
          {musicsList.map((music, i) => {
            return (<>
              <MusicCard key={i}
                title={music.title}
                thumbnail={music.thumbnail}
                artist={[]}
                library={true}
                id={music._id}
                setSelectedMusic={setMusicHandler}
                removeFavorite={removeFavorite}
              />
             
            </>)

          })}

        </section>

      </div>
    </div>
    {selectedMusic && <section>
      <MusicPlayer thumbnail={selectedMusic.thumbnail}
        heart={true}
        title={selectedMusic.title}
        artist={selectedMusic.artist}
        audio_url={selectedMusic.audio_url}
      />
    </section>}
  </>)
}

export default Library;
