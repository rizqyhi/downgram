import React, { Component } from 'react'
import { GridList, GridTile, GridTilePrimary, GridTilePrimaryContent } from 'rmwc/GridList'
import './Gallery.css'
import PubSub from 'pubsub-js'

// const GalleryItem = function(props) {
//   return (
//     <div className={props.className}>
//       <img src={logo} alt="" />
//     </div>
//   )
// }

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {posts: []}
  }

  componentDidMount() {
    this.setState({
      posts: JSON.parse(window.localStorage.getItem('posts')) || []
    })

    this.mediaAddedSubscriber = PubSub.subscribe('media.added', (msg, data) => {
      this.setState((prevState, state) => ({
        posts: [...prevState.posts, data]
      }))
    })

    PubSub.subscribe('posts.deleted', (msg, deleted) => {
      if (deleted) this.setState({posts: []})
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.mediaAddedSubscriber)
  }

  render() {
    return (
      <div className="Gallery">
        <GridList>
          {this.state.posts.map((post, i) => (
            <GridTile key={i} onClick={e => console.log(post)}>
              <GridTilePrimary>
                <GridTilePrimaryContent>
                  <img src={post.display_url} alt={post.caption} />
                </GridTilePrimaryContent>
              </GridTilePrimary>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default Gallery
