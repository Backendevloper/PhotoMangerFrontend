import { useEffect, useState } from "react"
import Play from "../icons/Play"
import PlusCircle from "../icons/PlusCircle"
import Modal from "./Modal"
import MusicForm from "./MusicForm"
import Trash from "../icons/Trash"
import Consts from "../consts.json"
import Cookies from "js-cookie"
import ArrowRightCircle from "../icons/ArrowRightCircle"
import ArrowUpDown from "../icons/ArrowUpDown"
import ArrowLeft from "../icons/ArrowLeft"
import ArrowRight from "../icons/ArrowRight"
import Pencil from "../icons/Pencil"
import sortByPlaylist from '../helpers/musicData/sortByPlaylist'
import { useParams } from "react-router-dom"

const MusicList = (props) => {
  const {musicData, playlists} = props
  const sortedPlaylists = sortByPlaylist(musicData, playlists)
  const params = useParams()
  const playlistParam = params["*"].split('/')[1]

  const [activePlaylist, setActivePlaylist] = useState('all')
  const [songsList, setSongsList] = useState([])
  const [activeSong, setActiveSong] = useState(false)
  const [audioDisplay, setAudioDisplay] = useState(0)
  const [showAudio, setShowAudio] = useState(false)
  const [showMusicModal, setShowMusicModal] = useState(false)
  const [showDestroyMusicModal, setShowDestroyMusicModal] = useState(false)
  const [showDestroyPlaylistModal, setShowDestroyPlaylistModal] = useState(false)
  const [showEditMusicModal, setShowEditMusicModal] = useState(false)
  const [autoPlaySongs, setAutoPlaySongs] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [playHistory, setPlayHistory] = useState([])
  const [shuffleOffset, setShuffleOffset] = useState(0)
  const [PlaylistDropdown, setPlaylistDropDown] = useState(false)

  useEffect(() => {
    if (musicData === undefined) {
      return
    }

    if (playlists.includes(playlistParam)) {
      setActivePlaylist(playlistParam)
    }

    if (activePlaylist === 'all') {
      setSongsList(musicData)
    } else {
      setSongsList(sortedPlaylists[activePlaylist])
    }

    if (activeSong) {
      return
    }

    setActiveSong(musicData[0])
  }, [musicData])

  useEffect(() => {
    if (songsList === undefined) {
      return
    }

    let audioPlayer = document.getElementById('audio-player')
    audioPlayer.volume = 0

    setPlayHistory([...playHistory, songsList.indexOf(activeSong)])
  }, [activeSong])

  useEffect(() => {
    setInterval(() => {
      if(showAudio === true) {
        setShowAudio(false)
        return
      }

      setAudioDisplay(0)
    }, 8000)
  }, [])

  useEffect(() => {
    if (activePlaylist === 'all') {
      setSongsList(musicData)
    } else {
      setSongsList(sortedPlaylists[activePlaylist])
    }
  }, [activePlaylist])

  const nextSong = (next = false) => {
    if (!autoPlaySongs && !next) {
      return
    }

    let currentSongIndex = songsList.indexOf(activeSong)
    let songsCount = songsList.length

    if (shuffle) {
      handleShuffle(songsCount)
      return
    }

    if (currentSongIndex >= songsCount -1) {
      setActiveSong(songsList[0])
    } else {
      setActiveSong(songsList[currentSongIndex +1])
    }
  }

  const handleShuffle = (songsCount) => {
    let alreadyPlayed = playHistory.slice(shuffleOffset)
    let songIndex =  songsList.map((_music, index) => index)
    let playableSongs = songsList.map((_music, index) => index)

    songIndex.forEach((song_index) => {
      if (alreadyPlayed.includes(song_index)) {
        playableSongs.splice(playableSongs.indexOf(song_index), 1)
      }
    })

    if (playableSongs.length > 0) {
      let next_song_index = randomNumberInRange(0, playableSongs.length -1)
      setActiveSong(songsList[playableSongs[next_song_index]])
    } else {
      setShuffleOffset(playHistory.length -1)
      let next_song_index = randomNumberInRange(0, songsCount -1)
      setActiveSong(songsList[next_song_index])
    }
  }

  const removeMusic = () => {
    let user_token = Cookies.get('session_token')
    let url = `${Consts.backend_base}/api/music/destroy?user_token=${user_token}`

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: activeSong.id
      })
    })

    window.location.href = '/music'
  }

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
  }

  const previousSong = () => {
    if (playHistory.length <= 2) {
      return
    }

    let previousSong = playHistory[playHistory.length -2]
    setActiveSong(songsList[previousSong])
    setPlayHistory(playHistory.slice(0, playHistory.length -2))
  }

  const removePlaylist = () => {
    let user_token = Cookies.get('session_token')
    let url = `${Consts.backend_base}/api/playlist/destroy?user_token=${user_token}`

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: activePlaylist
      })
    })

    window.location.href = '/playlist'
  }

  return(
    <div>
      { showDestroyMusicModal ? <Modal performAction={removeMusic} setShowModal={setShowDestroyMusicModal} button_text="Remove" element={<span className="text-red-600">Are you sure you want to remove this Song (from everywhere!)</span>}/> : null }
      { showDestroyPlaylistModal ? <Modal performAction={removePlaylist} setShowModal={setShowDestroyPlaylistModal} button_text="Remove" element={<span className="text-red-600">Are you sure you want to remove this Playlist</span>}/> : null }

      <div style={{padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", width: "90%", height: 800}} className="ml-10 rounded-lg bg-indigo-100 transition ease-in-out delay-500"
        onMouseOver={() => {setShowAudio(true); setAudioDisplay(1)}}>

        <div className="flex" style={{flexDirection: "column"}}>
          <div className="flex" style={{flexDirection: "row-reverse"}}>
            { showEditMusicModal && <Modal form={true} setShowModal={setShowEditMusicModal} element={<MusicForm edit={true} musicId={activeSong.id} modal={true}/>}/> }

            <button title="Edit" className="transition-all duration-200 text-indigo-200 hover:text-yellow-500"
              onClick={() => setShowEditMusicModal(true)}>

              <Pencil w="6" h="6"/>
            </button>

            <button title="Delete" className="transition-all duration-200 text-indigo-200 hover:text-red-500"
              onClick={() => setShowDestroyMusicModal(true)}>

              <Trash w="6" h="6" />
            </button>

            <button title="Autoplay" className={`transition-all duration-200 ${autoPlaySongs ? `text-indigo-500` : `text-indigo-200 hover:text-indigo-400`}`}
              onClick={() => setAutoPlaySongs(!autoPlaySongs)}>

              <ArrowRightCircle w="6" h="6" />
            </button>

            <button title="Shuffle" className={`transition-all duration-200 ${shuffle ? `text-indigo-500` : `text-indigo-200 hover:text-indigo-400`}`}
              onClick={() => setShuffle(!shuffle)}>

              <ArrowUpDown w="6" h="6" />
            </button>
          </div>

          <p className="text-4xl font-bold mb-10">{activeSong ? activeSong.name : null }</p>
        </div>

        <div className="flex" style={{height: 500, justifyContent: "center"}}>
          { activeSong && activeSong.thumbnail ?
            <img src={activeSong.thumbnail} alt="thumbnail" className="mb-5 rounded-md" style={{alignSelf: "center", Width: 500, maxHeight: 500}} 
              onMouseOver={() => {setShowAudio(true); setAudioDisplay(1)}} /> : null
          }
        </div>

          <div className="flex" style={{justifyContent: "center"}}>
            <button title="Previous Song" className={`rounded-lg transition-all duration-200 ${playHistory.length <= 2 ? 'text-gray-500' : `hover:bg-indigo-200`}`} style={{opacity: audioDisplay}}
              onClick={() => {previousSong(true)}}
            >
              <ArrowLeft w="6" h="6" />
            </button>

            <button title="Next Song" className=" rounded-lg transition-all duration-200 hover:bg-indigo-200" style={{opacity: audioDisplay}}
              onClick={() => {nextSong(true)}}
            >
              <ArrowRight w="6" h="6" />
            </button>
          </div>

          <audio id="audio-player" alt="song" style={{opacity: audioDisplay}} className="w-full transition-all duration-200 ease-in-out " src={activeSong ? activeSong.url : '#'} controls autoPlay
            onEnded={() => {nextSong()}}
          />
      </div>

      { showMusicModal && <Modal form={true} setShowModal={setShowMusicModal} element={<MusicForm modal={true}/>}/> }

      <div className="mt-5 flex" style={{justifyContent: "space-between"}}>
        <div
          onMouseEnter={() => {setPlaylistDropDown(true)}}
          onMouseLeave={() => {setPlaylistDropDown(false)}}
        >

          <button className="transition-all duration-200 hover:bg-indigo-100 pl-3 pr-2 rounded-md flex" style={{width: "2.8em", justifyContent: 'center'}}
          >
            <span> {activePlaylist.toUpperCase()} </span>
          </button>
          {PlaylistDropdown &&
          <div className="transition-all duration-200 bg-indigo-100 rounded-lg" style={{display: "flex", flexDirection: 'column',position: 'absolute', top: '910px'}}>
            <a className="p-2 transition-all duration-200 hover:bg-indigo-200" href={`/music`}>
                <span style={{MinWidth: '200px', maxWidth: '600px', overflow: 'hidden'}}>
                  All
                </span>
            </a>
            {playlists.map((playlist) => {
              return(
                <a className="p-2 transition-all duration-200 hover:bg-indigo-200" style={{borderTop: '1px solid black'}} key={playlist} href={`/music/${playlist}`}>
                  <span style={{MinWidth: '200px', maxWidth: '600px', overflow: 'hidden'}}>
                    {playlist.toUpperCase()}
                  </span>
                </a>
              )
            })}
          </div>
          }
        </div>

        <div>
          <button className="transtion-all easee-in-out text-gray-500 hover:text-gray-800"
              onClick={() => setShowDestroyPlaylistModal(true)}
            >
              <Trash w="6" h="6" />
          </button>

          <button className="transtion-all easee-in-out text-gray-500 hover:text-gray-800"
              onClick={() => setShowMusicModal(true)}
            >
              <PlusCircle w="6" h="6" />
          </button>
        </div>
      </div>

      <hr style={{border: ".5px solid"}}/>

      <div style={{padding: 5}}>
        {songsList && songsList.map((music) => {
          return(
            <div key={music.url} className={`${activeSong === music ? "bg-cyan-300 border-4 border-indigo-200" : "bg-cyan-100 hover:bg-cyan-200"} rounded-lg mb-5 mt-2 flex`} style={{justifyContent: "space-between"}}>
                <div className="flex">
                  {music.thumbnail &&
                    <img className="rounded-md mr-5" src={music.thumbnail} style={{height: 50, width: 50}}/>
                  }

                  <span className="mt-2 ml-2" style={{padding: "5px"}}>
                    {music ? music.name : null}
                  </span>
                </div>

                <div>
                  <button className={`transition-all duration-200 hover:text-white bg-cyan-100 hover:bg-cyan-300`} style={{padding: "13px", paddingTop: 12}}
                    onClick={() => {setActiveSong(music)}}
                  >
                    <Play w="6" h="6" />
                  </button>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MusicList
