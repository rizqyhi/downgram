import React, { Component } from 'react'
import './MediaGetter.css'
import { TextField } from 'rmwc/TextField'
import { Button } from 'rmwc/Button'
import { LinearProgress } from 'rmwc/LinearProgress'
import { Snackbar } from 'rmwc/Snackbar'
import { Theme } from 'rmwc/Theme'
import axios from 'axios'
import PubSub from 'pubsub-js'

class MediaGetter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      isLoading: false,
      isError: false,
      errorMessage: '',
      media: {}
    }

    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.getMedia = this.getMedia.bind(this)
  }

  componentDidMount() {
    this.downloadToggleSubscriber = PubSub.subscribe('downloadToggle', (msg, closed) => {
      if (!closed) {
        this.setState({url: '', media: {}})
      }
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.downloadToggleSubscriber)
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value})
  }

  getMedia(e) {
    this.setState({isLoading: true})

    axios.get('http://sadarkawasan.rizqy.me/igdown.php?id=' + this.state.url)
      .then(response => {
        this.setState({isLoading: false, media: response.data})
        PubSub.publish('media.added', response.data)

        let posts = JSON.parse(window.localStorage.getItem('posts')) || []
        window.localStorage.setItem('posts', JSON.stringify([...posts, response.data]))

        let p = document.querySelector('.PopupPage'),
            s = document.querySelector('.MediaGetter__submit'),
            r = document.querySelector('.MediaGetter__result'),
            ratio = r.offsetWidth/r.offsetHeight

        r.style.width = ratio*(p.offsetHeight-s.scrollHeight-96)+'px'
      })
      .catch(error => {
        this.setState({isLoading: false})

        if (error.response.status === 404) {
          this.setState({isError: true, errorMessage: 'Media not found'})
        } else {
          this.setState({isError: true, errorMessage: 'Sorry, there\'s something wrong with our server'})
        }
      })
  }

  render() {
    return (
      <Theme use="" className="MediaGetter" tag="div">
        <TextField theme="text-primary-on-dark" placeholder="Paste URL here" fullwidth value={this.state.url} onChange={this.handleUrlChange} />
        <Button raised theme="secondary-bg text-primary-on-secondary" className="MediaGetter__submit" onClick={this.getMedia}>Get Media</Button>
        <div className="MediaGetter__result" ref={el => this.$result = el}>
          {this.state.isLoading && <LinearProgress determinate={false} />}
          {this.state.media.display_url && <img src={this.state.media.display_url} alt={this.state.media.caption} className="MediaGetter__image" />}
          {this.state.media.display_url && <Button tag="a" className="MediaGetter__download-btn" raised href={this.state.media.display_url} download>Download</Button>}
        </div>

        <Snackbar
          show={this.state.isError}
          message={this.state.errorMessage}
          timeout={2000}
        />
      </Theme>
    )
  }
}

export default MediaGetter
