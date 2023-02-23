import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  MainContainer,
  FormContainer,
  Label,
  InputField,
} from './StyledComponent'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = isDarkTheme => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <>
        <Label isDarkTheme={isDarkTheme} htmlFor="password">
          PASSWORD
        </Label>
        <InputField
          isDarkTheme={isDarkTheme}
          type={passwordType}
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = isDarkTheme => {
    const {username} = this.state

    return (
      <>
        <Label isDarkTheme={isDarkTheme} htmlFor="username">
          USERNAME
        </Label>
        <InputField
          isDarkTheme={isDarkTheme}
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <MainContainer isDarkTheme={isDarkTheme}>
                <FormContainer
                  isDarkTheme={isDarkTheme}
                  onSubmit={this.submitForm}
                >
                  {isDarkTheme ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      className="login-website-logo"
                      alt="website logo"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="login-website-logo"
                      alt="website logo"
                    />
                  )}
                  <div className="input-container">
                    {this.renderUsernameField(isDarkTheme)}
                  </div>
                  <div className="input-container">
                    {this.renderPasswordField(isDarkTheme)}
                  </div>
                  <div className="checkbox-container">
                    <input
                      onChange={this.onShowPassword}
                      className="checkbox-input"
                      type="checkbox"
                      id="checkbox"
                    />
                    <Label isDarkTheme={isDarkTheme} htmlFor="checkbox">
                      Show Password
                    </Label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {errorMsg && <p className="error-message">*{errorMsg}</p>}
                </FormContainer>
              </MainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
