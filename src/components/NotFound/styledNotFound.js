import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#f9f9f9'};
  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  @media screen and (min-width: 768px) {
    left: 200px;
  }
`

// export const NotFoundContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   align-items: center;
//   padding: 10px;
//   width: 100%;
//   background-color: ${props =>
//     props.theme === 'dark' ? '#181818' : '#f9f9f9'};
// `

export const NotFoundImage = styled.img`
  width: 80%;
  padding-top: 15px;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`
export const NotFoundText = styled.h1`
  margin: 0px;
  padding: 5px;
  color: ${props => (props.theme === 'dark' ? '#f9f9f9' : '#181818')};
`
