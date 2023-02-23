import {Component} from 'react'
import {IoLogoGameControllerB} from 'react-icons/io'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'

import {
  GamingMenuContainer,
  IconContainer,
  MenuHeading,
  GamingContainer,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
  VideosList,
  GamingMainContainer,
} from './styledGaming'

import GamingBody from '../GamingBody'

import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {videosList} = this.state

    return (
      <VideosList>
        {videosList.map(each => (
          <GamingBody key={each.id} videoDetails={each} />
        ))}
      </VideosList>
    )
  }

  loader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </LoaderContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  failureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const theme = isDarkTheme ? 'dark' : 'light'
        const imgUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />

            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme} as="p">
              We are having some trouble to complete your request. Please try
              again
            </FailureText>
            <RetryButton type="button" onClick={this.getVideos}>
              Retry
            </RetryButton>
          </FailureContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const mode = isDarkTheme ? 'dark' : 'light'
          return (
            <>
              <NavBar />
              <GamingMainContainer data-testid="gaming" mode={mode}>
                <GamingContainer>
                  <GamingMenuContainer mode={mode}>
                    <IconContainer mode={mode}>
                      <IoLogoGameControllerB size={40} color="#ff0b37" />
                    </IconContainer>
                    <MenuHeading mode={mode}>Gaming</MenuHeading>
                  </GamingMenuContainer>
                  {this.checkApiStatus()}
                </GamingContainer>
              </GamingMainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Gaming
