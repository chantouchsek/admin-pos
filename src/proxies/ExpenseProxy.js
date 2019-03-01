import Proxy from './BaseProxy'

class ExpenseProxy extends Proxy {
  /**
   * The constructor for the ExpenseProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('expenses', parameters)
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create (item) {
    let form = new FormData()
    for (let key in item) {
      form.append(key, item[key])
    }
    if (Array.isArray(item.attachments)) {
      for (let i = 0; i < item.attachments.length; i++) {
        form.append('attachments[' + i + ']', item.attachments[i])
      }
    }
    return this.submit('post', `/${this.endpoint}`, form)
  }

  /**
   * Method used to update a given item.
   *
   * @param {int} id The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  updated (id, item) {
    let form = new FormData()
    for (let key in item) {
      form.append(key, item[key])
    }
    if (Array.isArray(item.attachments)) {
      for (let i = 0; i < item.attachments.length; i++) {
        form.append('attachments[' + i + ']', item.attachments[i])
      }
    }
    return this.submit('put', `/${this.endpoint}/${id}`, form)
  }

}

export default ExpenseProxy
