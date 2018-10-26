import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from 'client/routes'
import { Provider } from 'mobx-react'
import { createClientState as stores } from 'client/stores'

const Root = () =>
  <div className="container-wrapper">
    <Provider {...stores}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  </div>

export default Root
