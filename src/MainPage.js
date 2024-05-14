import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Photos from "./components/Photos";
import GroupForm from "./components/GroupForm";
import { useParams } from "react-router-dom";
import MusicList from "./components/MusicList";
import Playlists from "./components/playlists/Playlists";
import Calculator from "./components/Calculator";

const MainPage = (props) => {
  const params = useParams()
  const [activeComponent, setActiveComponent] = useState(params["*"].split('/')[0])
  const [groups, setGroups] = useState([])
  const [musicData, setMusicData] = useState()
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    let user_data = props.user_data

    user_data.then((val) => {
    setGroups(val.groups)
    setMusicData(val.musics)
    setPlaylists(val.playlists)

    if(typeof(val) !== 'object') {
      window.location.href = '/login'
    }
    })
  })

  return(
    <div className="flex">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>

      <div className="ml-3 mt-3 w-3/4">
        { ( activeComponent === 'photo' &&
            <Photos groups={groups} />
          ) || (activeComponent === 'group' &&
            <GroupForm />
          ) || (activeComponent === 'music' &&
            <MusicList musicData={musicData} playlists={playlists}/>
          ) || (activeComponent === 'playlists' &&
            <Playlists musicData={musicData} playlists={playlists}/>
          ) || (activeComponent === 'calculator' &&
            <Calculator />
          )
        }
      </div>
    </div>
  )
}

export default MainPage
