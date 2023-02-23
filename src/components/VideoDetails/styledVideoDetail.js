import styled from 'styled-components'

export const VedioDetailMainBg = styled.div`
  background-color: ${props => (props.mode === 'true' ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.mode === 'true' ? 'gray' : 'black')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  padding: 15px;
  @media screen and (min-width: 768px) {
    left: 200px;
    padding: 15px;
  }
`

export const ReactPlayerContainer = styled.div`
  height: 50vh;
`

export const DetailsTitle = styled.p`
  font-size: 15px;
`

export const HrLine = styled.hr`
  width: 100%;
  height: 1px;
  color: gray;
`

export const LikeBtn = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px;
  width: 40px;
  height: 20px;
  font-size: 10px;
  border: none;
  background-color: transparent;
  color: ${props => (props.isSelected === 'true' ? '#2563eb' : '#64748b')};
  @media screen and (min-width: 768px) {
    width: 50px;
    height: 20px;
    font-size: 12px;
  }
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

export const SaveBtn = styled(LikeBtn)`
  color: ${props => (props.isSaved === 'Saved' ? '#2563eb' : '#64748b')};
`
