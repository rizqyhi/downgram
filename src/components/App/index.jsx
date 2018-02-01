import React, { Component } from 'react'
import AppHeader from '../AppHeader'
import Gallery from '../Gallery'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="mdc-toolbar-fixed-adjust App__main">
          <Gallery />
        </div>
      </div>
    )
  }
}

export default App
