import React, { Fragment } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { publicRoutes } from './router'

function App () {
  return (
    <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Fragment>
                      <Page />
                    </Fragment>
                  }
                />
              )
            })}
          </Routes>
        </div>
    </Router>
  )
}

export default App
