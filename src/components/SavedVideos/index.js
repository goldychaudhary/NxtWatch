import {RiMenuAddLine} from 'react-icons/ri'

import NavBar from '../NavBar'

import {
  SavedVideosMainContainer,
  SavedVideosContainer,
  SavedMenuContainer,
  IconContainer,
  MenuHeading,
  VideosList,
  NoVideosContainer,
  NoVideosImg,
  FailureText,
} from './styledSaved'

import TrendingCardItem from '../TrendingCardItem'
import SavedVideosContext from '../../context/SavedVideosContext'
import ThemeContext from '../../context/ThemeContext'

const SavedVideos = () => {
  const savedList = themeValue => {
    const {isDarkTheme} = themeValue

    const theme = isDarkTheme ? 'dark' : 'light'

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideosList} = value
          if (savedVideosList.length === 0) {
            return (
              <NoVideosContainer>
                <NoVideosImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                  alt="no saved videos"
                />

                <FailureText theme={theme} as="h1">
                  No saved videos found
                </FailureText>
                <FailureText theme={theme} as="p">
                  You can save your videos while watching them
                </FailureText>
              </NoVideosContainer>
            )
          }
          return (
            <VideosList>
              {savedVideosList.map(each => (
                <TrendingCardItem videoDetails={each} key={each.id} />
              ))}
            </VideosList>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const theme = isDarkTheme ? 'dark' : 'light'
        return (
          <>
            <NavBar />
            <SavedVideosMainContainer data-testid="savedVideos" theme={theme}>
              <SavedVideosContainer>
                <SavedMenuContainer theme={theme}>
                  <IconContainer theme={theme}>
                    <RiMenuAddLine size={40} color="#ff0b37" />
                  </IconContainer>
                  <MenuHeading theme={theme}>Saved Videos</MenuHeading>
                </SavedMenuContainer>
                {savedList(value)}
              </SavedVideosContainer>
            </SavedVideosMainContainer>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
