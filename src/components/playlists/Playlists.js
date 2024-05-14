import sortByPlaylist from '../../helpers/musicData/sortByPlaylist'
import PlaylistCard from './PlaylistCard'
import { BsPlusLg } from 'react-icons/bs'
import { useState } from 'react'
import PlaylistForm from './PlaylistForm'
import Modal from '../Modal'

const Playlists = (props) => {
  const {playlists, musicData} = props
  const sortedPlaylists = sortByPlaylist(musicData, playlists)
  const [addButtonColor, setAddButtonColor] = useState("rgba(10,10,10,0.2)")
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  return(
    <div>
      { showPlaylistModal && <Modal form={true} setShowModal={setShowPlaylistModal} element={<PlaylistForm modal={true}/>}/> }

      <div className='flex flex-wrap'>
        {playlists.map((playlist, index) => {
          return(<PlaylistCard name={playlist} playlist={sortedPlaylists[playlist]} key={index} />)
        })}

        <button className="hover:text-indigo-400 flex m-5" style={{flexDirection: 'column'}}>
          <div className="transition-all duration-200 border border-gray-200 shadow-xl hover:shadow-2xl hover:shadow-indigo-200" style={{overflow: 'hidden', height: 400, width: 400}}>
            <div className="flex">

              <BsPlusLg size='25em' color={addButtonColor} className="transition-all duration-100"
                onMouseEnter={() => {setAddButtonColor("rgba(10,10,10,0.4)")}}
                onMouseLeave={() => {setAddButtonColor("rgba(10,10,10,0.2)")}}
                onClick={() => {setShowPlaylistModal(true)}}
              />
            </div>
          </div>

        <span className="transition-all duration-200 text-xl" style={{alignSelf: 'center'}}>Add new Playlist</span>
        </button>
      </div>
    </div>
  )
}

export default Playlists
