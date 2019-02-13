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

  /**
   * Method used to update a given item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  setPlayerId (item) {
    return this.submit('post', `/${this.endpoint}/devices`, item)
  }

  /**
   * Method used to update a given item.
   *
   * @param {int} id the given id
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  updatePlayerId (id, item) {
    return this.submit('put', `/${this.endpoint}/devices/${id}`, item)
  }

}

export default UserProxy
