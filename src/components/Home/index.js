import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

import NavBar from '../NavBar'

import {
  HomeMainContainer,
  BannerContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  HomeListContainer,
  HomeListCard,
  FailureContainer,
  FailureImg,
  FailureText,
  LoaderContainer,
  RetryButton,
  NoVideosContainer,
  NoVideosImg,
} from './styledHome'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    showBanner: true,
    searchInput: '',
    videoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log('data', data)
      const updatedData = data.videos.map(each => ({
        id: each.id,
        channelName: each.channel.name,
        channelProfile: each.channel.profile_image_url,

        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,

        title: each.title,
        viewCount: each.view_count,
      }))
      //   console.log('data', updatedData)

      this.setState({
        videoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

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

  updateSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onCloseBanner = () => {
    this.setState({showBanner: false})
  }

  renderSearchContainer = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchInput} = this.state
        return (
          <SearchContainer>
            <SearchInput
              mode={`${isDarkTheme}`}
              type="search"
              placeholder="Search"
              onChange={this.updateSearchInput}
              value={searchInput}
            />
            <SearchButton
              type="button"
              mode={`${isDarkTheme}`}
              onClick={this.getHomeVideos}
              data-testid="searchButton"
            >
              <BsSearch />
            </SearchButton>
          </SearchContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderBanner = () => (
    <BannerContainer data-testid="banner">
      <div className="banner-content-container">
        <img
          className="banner-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="buy-now-btn">
          GET IT NOW
        </button>
      </div>
      <button
        data-testid="close"
        type="button"
        onClick={this.onCloseBanner}
        className="banner-close-btn"
      >
        <AiOutlineClose />
      </button>
    </BannerContainer>
  )

  noVideosView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const theme = isDarkTheme ? 'dark' : 'light'
        return (
          <NoVideosContainer>
            <NoVideosImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <FailureText theme={theme}>No search results found</FailureText>
            <FailureText theme={theme} as="p">
              Try different key words or remove search filter
            </FailureText>
            <RetryButton type="button" onClick={this.getHomeVideos}>
              Retry
            </RetryButton>
          </NoVideosContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSuccessView = () => {
    const {videoList} = this.state

    if (videoList.length === 0) {
      return this.noVideosView()
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <HomeListContainer mode={`${isDarkTheme}`}>
              {videoList.map(each => {
                let timePosted = ''
                if (each.publishedAt) {
                  const newDate = formatDistanceToNow(
                    new Date(Date.parse(each.publishedAt)),
                  )

                  const dateList = newDate.split(' ')
                  const timePeriod = dateList
                    .slice(1, dateList.length)
                    .join(' ')
                  timePosted = timePeriod
                }

                return (
                  <Link
                    className="link"
                    to={`/videos/${each.id}`}
                    key={each.id}
                  >
                    <HomeListCard>
                      <img src={each.thumbnailUrl} alt="video thumbnail" />
                      <div className="channel-info-bg">
                        <img
                          className="channel-logo"
                          src={each.channelProfile}
                          alt="channel logo"
                        />
                        <div className="video-details">
                          <p className="title">{each.title}</p>
                          <p className="channel-name">{each.channelName}</p>
                          <p className="view-count">
                            {each.viewCount} views . {timePosted} ago
                          </p>
                        </div>
                      </div>
                    </HomeListCard>
                  </Link>
                )
              })}
            </HomeListContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  checkApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    const {showBanner} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div>
              <NavBar />
              <HomeMainContainer data-testid="home" mode={`${isDarkTheme}`}>
                {showBanner && this.renderBanner()}
                {this.renderSearchContainer()}
                {this.checkApiStatus()}
              </HomeMainContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
