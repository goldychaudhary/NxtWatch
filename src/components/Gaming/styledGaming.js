import styled from 'styled-components'

export const GamingMainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.mode === 'false' ? '#181818' : '#f9f9f9'};

  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  @media screen and (min-width: 768px) {
    left: 200px;
  }
`

export const GamingContainer = styled.div`
  height: 90vh;
  overflow-x: auto;
  flex-grow: 1;
  padding: 15px;
  @media screen and (max-width: 768px) {
    min-height: 90vh;
  }
`

export const GamingMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px;
  @media screen and (min-width: 768px) {
    padding-left: 20px;
  }
  background-color: ${props =>
    props.theme === 'dark' ? '#424242' : '#f8fafc'};
`

export const IconContainer = styled.div`
  padding: 10px;
  border-radius: 40px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#e2e8f0'};
`

export const MenuHeading = styled.h1`
  color: ${props => (props.theme === 'dark' ? '#f9f9f9' : '#0f0f0f')};
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

export const VideosList = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
