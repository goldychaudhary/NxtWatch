import NavBar from '../NavBar'

import ThemeContext from '../../context/ThemeContext'

import {NotFoundImage, NotFoundContainer, NotFoundText} from './styledNotFound'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const theme = isDarkTheme ? 'dark' : 'light'

      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div>
          <NavBar />

          <NotFoundContainer theme={theme}>
            <NotFoundImage src={imgUrl} alt="not found" />
            <NotFoundText theme={theme}>Page Not Found</NotFoundText>
            <NotFoundText as="p" theme={theme}>
              we are sorry, the page you requested could not be found.
            </NotFoundText>
          </NotFoundContainer>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
