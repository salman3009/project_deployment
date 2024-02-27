import { useState, useEffect } from 'react';
import axios from 'axios';
import MusicCard from '../components/MusicCard';
import MusicPlayer from '../components/MusicPlayer';
import Sidebar from '../pages/Sidebar';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicsList, setMusicList] = useState([]);
  const [selectedMusic, setMusic] = useState(null);

  const fetchMusics = async () => {
    try {
      setIsLoading(true);
      const musics = await axios.get(
        "https://academics.newtonschool.co/api/v1/music/song",
        { 'headers': { projectId: 'f104bi07c490' } }
      );
      console.log("musics", musics);
      const musicListData = musics.data.data;
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

  return (<>
    <div className="global-container">
      <div className="left-bar">
        <Sidebar />
      </div>
      <div className="right-bar">
        <section className="musicList-container">
          {musicsList.map((music, i) => (
            <MusicCard key={i}
              title={music.title}
              thumbnail={music.thumbnail}
              artist={music.artist}
              id={i}
              library={false}
              setSelectedMusic={setMusicHandler}
            />
          ))}
        </section>
      </div>
    </div>
    {selectedMusic && <section>
      <MusicPlayer thumbnail={selectedMusic.thumbnail}
        songId={selectedMusic._id}
        heart={false}
        title={selectedMusic.title}
        artist={selectedMusic.artist}
        audio_url={selectedMusic.audio_url}
      />
    </section>}
  </>)
}

export default Home;
