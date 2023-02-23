import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import NavBar from '../NavBar'
import './index.css'

import ThemeContext from '../../context/ThemeContext'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  VedioDetailMainBg,
  ReactPlayerContainer,
  DetailsTitle,
  HrLine,
  LikeBtn,
  FailureContainer,
  FailureImg,
  FailureText,
  LoaderContainer,
  RetryButton,
  SaveBtn,
} from './styledVideoDetail'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    videoDetails: {},
    liked: false,
    disliked: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        videoDetails: data.video_details,
      }
      const {videoDetails} = updatedData
      const updatedDetails = {
        id: videoDetails.id,
        description: videoDetails.description,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,

        channelName: videoDetails.channel.name,
        profileImageUrl: videoDetails.channel.profile_image_url,
        subscriberCount: videoDetails.channel.subscriber_count,
      }
      //   console.log('updatedDetails', updatedDetails)
      this.setState({
        videoDetails: updatedDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onLikeVideo = () => {
    this.setState(prevState => ({liked: !prevState.liked, disliked: false}))
  }

  onDisLikeVideo = () => {
    this.setState(prevState => ({liked: false, disliked: !prevState.disliked}))
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
            <RetryButton type="button" onClick={this.getVideoDetails}>
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

  renderSuccessView = () => {
    const {videoDetails} = this.state
    const {
      id,
      videoUrl,
      title,
      channelName,
      profileImageUrl,
      subscriberCount,
      description,
      publishedAt,
      viewCount,
    } = videoDetails

    let timePosted = ''

    if (publishedAt) {
      const newDate = formatDistanceToNow(new Date(Date.parse(publishedAt)))

      const dateList = newDate.split(' ')
      const timePeriod = dateList.slice(1, dateList.length).join(' ')
      timePosted = timePeriod
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const {liked, disliked} = this.state
          return (
            <>
              <ReactPlayerContainer>
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </ReactPlayerContainer>
              <DetailsTitle>{title}</DetailsTitle>
              <div className="vedio-details-timeline-container">
                <p>
                  {viewCount} views . {timePosted} ago
                </p>
                <div className="butons-container">
                  <LikeBtn isSelected={`${liked}`} onClick={this.onLikeVideo}>
                    <BiLike />
                    <p>Like</p>
                  </LikeBtn>
                  <LikeBtn
                    isSelected={`${disliked}`}
                    onClick={this.onDisLikeVideo}
                  >
                    <BiDislike />
                    <p>Dislike</p>
                  </LikeBtn>
                  <SavedVideosContext>
                    {values => {
                      const {updateSave, savedVideosList} = values
                      const findSaved = savedVideosList.find(
                        each => each.id === id,
                      )

                      const onSaveVideo = () => {
                        updateSave(videoDetails)
                      }

                      const savedText = findSaved ? 'Saved' : 'Save'

                      return (
                        <SaveBtn isSaved={`${savedText}`} onClick={onSaveVideo}>
                          <MdPlaylistAdd />
                          <p>{savedText}</p>
                        </SaveBtn>
                      )
                    }}
                  </SavedVideosContext>
                </div>
              </div>
              <HrLine mode={`${isDarkTheme}`} />

              <div className="channel-info-bg">
                <img className="channel-logo" src={profileImageUrl} alt="" />
                <div className="video-details">
                  <p className="channel-name">{channelName}</p>
                  <p className="view-count">{subscriberCount} subscribers</p>
                  <p className="view-count">{description}</p>
                </div>
              </div>
            </>
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
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <NavBar />
              <VedioDetailMainBg
                mode={`${isDarkTheme}`}
                data-testid="videoItemDetails"
              >
                {this.checkApiStatus()}
              </VedioDetailMainBg>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetails
