import { observable, computed, flow } from 'mobx'
import Service from 'client/services'

class UserStore {
  nowYear = new Date().getFullYear()

  @observable
  userData = {}

  @observable
  state = 'pending'

  @computed
  get username() {
    return this.userData.firstName + this.userData.lastName || ''
  }

  @computed
  get age() {
    if (this.userData.birthDate) {
      return this.nowYear - new Date(this.userData.birthDate).getFullYear()
    } else {
      return 0
    }
  }

  @computed
  get workYears() {
    if (this.userData.workDate) {
      return this.nowYear - new Date(this.userData.workDate).getFullYear()
    } else {
      return 0
    }
  }

  fetchUserData = flow(function *() {
    try {
      this.userData = yield Service.fetchServUserData()
      this.state = 'done'
    } catch (error) {
      this.state = 'error'
    }
  })
}

export default new UserStore()
