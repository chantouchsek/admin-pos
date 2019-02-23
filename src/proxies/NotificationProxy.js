import Proxy from './BaseProxy'

class NotificationProxy extends Proxy {
  /**
   * The constructor for the AlarmProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('users/notifications', parameters)
  }

  /**
   * Method used to mark the notification as read
   *
   * @returns {Promise} The result in a promise.
   */
  markAsRead () {
    return this.submit('get', `/${this.endpoint}/markAsRead`)
  }

  /**
   * Method used to get the notification as unread
   *
   * @returns {Promise} The result in a promise.
   */
  unReads () {
    return this.submit('get', `/${this.endpoint}/unReads`)
  }
}

export default NotificationProxy
