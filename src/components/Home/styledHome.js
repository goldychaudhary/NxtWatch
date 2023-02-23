import styled from 'styled-components'

export const HomeMainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.mode === 'false' ? '#f9f9f9' : '#181818'};

  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  @media screen and (min-width: 768px) {
    left: 200px;
  }
`

export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 400px;
  padding: 15px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  padding: 8px 0px 8px 0px;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`
export const SearchButton = styled.button`
  background-color: transparent;
  height: 30px;
  width: 70px;
  padding-top: 4px;
  border: 1px solid ${props => (props.mode === 'false' ? '#181818' : '#f9f9f9')};
  color: ${props => (props.mode === 'false' ? '#181818' : '#f9f9f9')};
`

export const SearchInput = styled.input`
  height: 30px;
  flex-grow: 1;
  border: 1px solid ${props => (props.mode === 'false' ? '#181818' : '#f9f9f9')};
  color: ${props => (props.mode === 'dark' ? '#f9f9f9' : '#181818')};
  padding-left: 10px;
  background-color: transparent;
  outline: none;
`

export const HomeListContainer = styled.ul`
  //   background-color: lightgray;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`

export const HomeListCard = styled.li`
  height: 250px;
  width: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
`
export const LoaderContainer = styled.div`
  text-align: center;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 10px;
`

export const FailureImg = styled.img`
  width: 80%;
  padding-top: 15px;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`

export const FailureText = styled.h1`
  margin: 0px;
  padding: 5px;
  color: ${props => (props.theme === 'dark' ? '#f9f9f9' : '#181818')};
`
export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  border-radius: 5px;
`
export const NoVideosContainer = styled(FailureContainer)``

export const NoVideosImg = styled(FailureImg)``
