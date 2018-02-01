import React, { Component } from 'react'
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon } from 'rmwc/Toolbar'
import { Ripple } from 'rmwc/Ripple'
import PubSub from 'pubsub-js'
import AppMenu from './AppMenu'
import PopupPage from '../PopupPage'
import MediaGetter from '../MediaGetter'
import './AppHeader.css'

class AppHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {isDownloadPage: false, toolbarHeight: 0}
    this.toggleDownloadPage = this.toggleDownloadPage.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({toolbarHeight: this.$toolbar.mdcRootElement.offsetHeight})
    })
    window.dispatchEvent(new Event('resize'))
  }

  toggleDownloadPage() {
    PubSub.publish('downloadToggle', this.state.isDownloadPage)
    this.setState({isDownloadPage: !this.state.isDownloadPage})
  }

  render() {
    return (
      <Toolbar fixed theme="secondary-light-bg" ref={el => this.$toolbar = el}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle className="AppHeader__title">downgram</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <Ripple>
              <ToolbarIcon use={this.state.isDownloadPage ? 'close' : 'add'} style={{padding: 16}} onClick={this.toggleDownloadPage} />
            </Ripple>
            <AppMenu />
          </ToolbarSection>
        </ToolbarRow>
        <PopupPage open={this.state.isDownloadPage} top={this.state.toolbarHeight}>
          <MediaGetter open={this.state.isDownloadPage} />
        </PopupPage>
      </Toolbar>
    )
  }
}

export default AppHeader
