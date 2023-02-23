import React from 'react'

const SavedVideosContext = React.createContext({
  save: false,
  savedVideosList: [],

  updateSave: () => {},
})

export default SavedVideosContext
