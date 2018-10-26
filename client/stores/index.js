import userStore from 'client/stores/userStore'
import blogStore from 'client/stores/blogStore'

import mergeObservables from 'utils/mobxMergeObservables'

const stores = {
  userStore,
  blogStore
}

export const createServerState = stores

let source

if (typeof window === 'undefined') {
  source = null
} else {
  source = window.__INITIAL_STATE__
}
export const createClientState = mergeObservables(stores, source)
