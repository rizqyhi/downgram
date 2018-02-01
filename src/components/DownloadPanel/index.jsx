import React, { Component } from 'react'
import './DownloadPanel.css'

class DownloadPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      resultOpened: false
    }

    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.getMedia = this.getMedia.bind(this)
    this.closeResult = this.closeResult.bind(this)
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value})
  }

  getMedia(e) {
    this.setState({resultOpened: true})
  }

  closeResult() {
    this.setState({resultOpened: false})
  }

  render() {
    return (
      <div className="download-panel">
        <div className="container">
          <input type="text" placeholder="Paste URL here" className="download-panel__input" value={this.state.url} onChange={this.handleUrlChange} />
          <button className="button" onClick={this.getMedia}>Get Media</button>
        </div>
        <div className="download-panel__result" style={{
          transform: this.state.resultOpened ? 'translateY(157px)' : '',
          opacity: 1
        }}>
          <div className="container">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <button onClick={this.closeResult}>&times;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default DownloadPanel
