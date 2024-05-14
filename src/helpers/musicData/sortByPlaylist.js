const sortByPlaylist = (musicData, playlistsNameArray) => {
  let sortedHash = {}

  playlistsNameArray.forEach((playlistName) => {
    sortedHash[playlistName] = []

    musicData.forEach((music) => {
      if (music.playlists.includes(playlistName)) {
        sortedHash[playlistName].push(music)
      }
    })
  })

  return sortedHash
}

export default sortByPlaylist