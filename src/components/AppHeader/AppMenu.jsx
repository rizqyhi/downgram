import React, { Component } from 'react'
import { SimpleMenu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import { ToolbarIcon } from 'rmwc/Toolbar'
import { Ripple } from 'rmwc/Ripple'
import { Snackbar } from 'rmwc/Snackbar'
import PubSub from 'pubsub-js'

class AppMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {isMenuOpened: false, isHistoryDeleted: false}
    this.deleteHistory = this.deleteHistory.bind(this)
  }

  deleteHistory() {
    window.localStorage.removeItem('posts')
    this.setState({isHistoryDeleted: true})
    PubSub.publish('posts.deleted', true)
  }

  render() {
    return (
      <MenuAnchor>
        <SimpleMenu anchorCorner="topStart" open={this.state.isMenuOpened} onClose={e => this.setState({isMenuOpened: false})}>
          <MenuItem>About this app</MenuItem>
          <MenuItem onClick={this.deleteHistory}>Delete history</MenuItem>
        </SimpleMenu>

        <Ripple>
          <ToolbarIcon use="more_vert" onClick={e => this.setState({isMenuOpened: !this.state.isMenuOpened})} />
        </Ripple>

        <Snackbar show={this.state.isHistoryDeleted} message="Posts history deleted" timeomout={2000} />
      </MenuAnchor>
    )
  }
}

export default AppMenu
