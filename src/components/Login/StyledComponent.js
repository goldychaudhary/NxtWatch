import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${props => (props.isDarkTheme ? '#313131' : 'white')};
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')}
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#f9f9f9')};
  width: 40%;
  margin: auto;
  margin-top: 200px;
  padding: 50px;
  box-shadow: ${props => (props.isDarkTheme ? '' : '1px 2px 2px 1px #f1f5f9')} ;
`

export const Label = styled.label`
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${props => (props.isDarkTheme ? 'white' : '#475569')};
`

export const InputField = styled.input`
  font-size: 14px;
  height: 40px;
  border: 1px solid #d7dfe9;
  background-color: ${props => (props.isDarkTheme ? 'transparent' : '#e2e8f0')};
  color: #64748b;
  border-radius: 2px;
  margin-top: 5px;
  padding: 8px 16px 8px 16px;
  outline: none;
`
