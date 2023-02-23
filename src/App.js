import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import ActiveRouteContext from './context/ActiveRouteContext'
import SavedVideosContext from './context/SavedVideosContext'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import Login from './components/Login'
import VideoDetails from './components/VideoDetails'

import './App.css'

class App extends Component {
  state = {isDarkTheme: false, activeMenu: '', savedVideosList: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  changeActiveMenu = currentTab => {
    this.setState({activeMenu: currentTab})
  }

  addVideosToSavedVideos = videoDetails => {
    this.setState(prev => ({
      savedVideosList: [...prev.savedVideosList, videoDetails],
    }))
  }

  deleteVideosFromSavedVideos = videoDetails => {
    const {savedVideosList} = this.state
    const updatedList = savedVideosList.filter(
      each => each.id !== videoDetails.id,
    )
    this.setState({savedVideosList: updatedList})
  }

  updateSave = videoDetails => {
    const {savedVideosList} = this.state
    const isPresent = savedVideosList.map(each => each.id === videoDetails.id)
    if (isPresent.length === 0 || isPresent[0] === false) {
      this.addVideosToSavedVideos(videoDetails)
    } else {
      this.deleteVideosFromSavedVideos(videoDetails)
    }
  }

  render() {
    const {isDarkTheme, activeMenu, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{isDarkTheme, toggleTheme: this.toggleTheme}}
      >
        <SavedVideosContext.Provider
          value={{
            savedVideosList,
            updateSave: this.updateSave,
          }}
        >
          <ActiveRouteContext.Provider
            value={{activeMenu, changeActiveMenu: this.changeActiveMenu}}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />

              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute
                exact
                path="/videos/:id"
                component={VideoDetails}
              />
              <ProtectedRoute exact path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </ActiveRouteContext.Provider>
        </SavedVideosContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
