import React, { useState } from "react";
import Home from "../icons/Home";
import ArrowRight from "../icons/ArrowRight";
import ArrowDown from "../icons/ArrowDown";
import Photo from "../icons/Photos";
import PlusCircle from "../icons/PlusCircle";
import Tag from "../icons/Tag";
import { useParams } from "react-router-dom";
import Music from "../icons/Music";
import {BsCassette} from "react-icons/bs"
import { BsCalculator } from "react-icons/bs";
import Consts from "../consts.json"

const Sidebar = (props) => {
  const params = useParams()
  const generalOptions = ['photo', 'music', 'playlists']
  const addOptions = ['group']
  const [generalDropdown, setGeneralDropdown] = useState(generalOptions.includes(params["*"]))
  const [addDropdown, setAddDropdown] = useState(addOptions.includes(params["*"]))

  const handleGeneralDropdown = () => {
    if (!generalDropdown) {
      setActive('general')
    }

    setGeneralDropdown(!generalDropdown)
  }

  const handleAddDropdown = () => {
    if (!addDropdown) {
      setActive('add')
    }

    setAddDropdown(!addDropdown)
  }

  const isActive = (name) => {
    if (name === props.activeComponent) {
      return("text-gray-900")
    } else {
      return("text-gray-500")
    }
  }

  const setActive = (name) => {
    if (props.activeComponent !== name) {
      props.setActiveComponent(name)
    } else {
      props.setActiveComponent('')
    }
  }

  return(
    <aside id="default-sidebar" className="mt-0.5 top-0 left-0 z-40 w-64 min-h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                <button onClick={handleGeneralDropdown} className={`flex items-center p-2 ${isActive('general')} rounded-lg dark:text-white group`}>
                  <Home w='6' h ='6'/>
                  <span className="ms-3">General</span>
                  <span className="ml-20 transition-all" style={generalDropdown ? {transform: "rotate(90deg)"} : {} } > <ArrowRight w='6' h='6'/> </span>
                </button>
              { generalDropdown &&
                <div>
                  <button onClick={() => setActive('photo')}>
                    <div className={`ml-11 ${isActive('photo')}`}>
                      <div className="flex hover:text-gray-900">
                        <Photo w='6' h='6' />

                        <span className="ml-2">Photos</span>
                      </div>
                    </div>
                  </button>

                  <button onClick={() => setActive('music')}>
                    <div className={`ml-11 ${isActive('music')}`}>
                      <div className="flex hover:text-gray-900">
                        <Music w='6' h='6' />
                        <span className="ml-2">Music</span>
                      </div>
                    </div>
                  </button>

                  <button onClick={() => setActive('playlists')}>
                    <div className={`ml-11 ${isActive('playlists')}`}>
                      <div className="flex hover:text-gray-900">
                        <BsCassette size='1.5em' />
                        <span className="ml-2">Playlists</span>
                      </div>
                    </div>
                  </button>
                </div>
              }
            </li>
            <li className="hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
              <button onClick={() => {setActive('calculator')}} className={`flex items-center p-2 ${isActive('calculator')} rounded-lg dark:text-white group`}>
                <BsCalculator size="1.5em"/>
                <span className="ms-3">Funds Calculator</span>
              </button>
            </li>
            <li className="hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                <button onClick={handleAddDropdown} className={`flex items-center p-2 ${isActive('add')} rounded-lg dark:text-white group`}>
                  <PlusCircle w='6' h ='6'/>
                  <span className="ms-3">Add</span>
                  <span className="ml-24 transition-all" style={addDropdown ? {transform: "rotate(90deg)"} : {} } > <ArrowRight w='6' h='6'/> </span>
                </button>
                { addDropdown &&
                  <button onClick={() => setActive('group')}>
                    <ul className={`ml-11 ${isActive('group')}`}>
                      <li className="flex hover:text-gray-900">
                        <Tag w='6' h='6' />

                        <span className="ml-2">Group</span>
                      </li>
                    </ul>
                  </button>
                }
            </li>
          </ul>
      </div>
    </aside>
  )
}

export default Sidebar
