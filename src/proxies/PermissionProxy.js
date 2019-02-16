import Proxy from './BaseProxy'

class PermissionProxy extends Proxy {
  /**
   * The constructor for the PermissionProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('permissions', parameters)
  }
}

export default PermissionProxy
