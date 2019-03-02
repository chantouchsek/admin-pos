import Proxy from './BaseProxy'

class PurchaseProxy extends Proxy {
  /**
   * The constructor for the PurchaseProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('purchases', parameters)
  }

}

export default PurchaseProxy
