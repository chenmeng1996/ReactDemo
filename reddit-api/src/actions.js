// import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// thunk action creator, it will return a function not a json as action
function fetchPosts(subreddit) {
  // Thunk middleware will call this return function, will pass dispatch as parameter so you can use dispatch in it.
  return dispatch => {
    // update state to indicate API request is starting
    dispatch(requestPosts(subreddit))
    // return a promise to be processed, this step is async, in other words, not block
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      // specify how to process response when get it, here is to get json body from response
      .then(response => response.json())
      // update state with response json body
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}


export function fetchPostsIfNeeded(subreddit) {
  // attension this thunk action creator will return a function which will be passed dispatch and getState method.
  // getState() can get state
  // you can choose whether start an API request based on if cache is expired.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // dispatch another thunk action in a thunk action
      return dispatch(fetchPosts(subreddit))
    }
  }
}