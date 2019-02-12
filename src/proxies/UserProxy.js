import Proxy from './BaseProxy'

class UserProxy extends Proxy {
  /**
   * The constructor for the UserProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('users', parameters)
  }

}

export default UserProxy
