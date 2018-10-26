import { observable, computed } from 'mobx'
import _ from 'lodash'

class BlogStore {
  @observable
  blogList = []

  @computed
  get blogTitleList() {
    return _.map(this.blogList, 'title')
  }
}

export default new BlogStore()
