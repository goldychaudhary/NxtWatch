import React from 'react'

const ActiveRouteContext = React.createContext({
  activeMenu: 'INITIAL',
  changeActiveMenu: () => {},
})

export default ActiveRouteContext
