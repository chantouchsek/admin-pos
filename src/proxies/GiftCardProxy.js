import Proxy from './BaseProxy'

class GiftCardProxy extends Proxy {
  /**
   * The constructor for the GiftCardProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('gift-cards', parameters)
  }

}

export default GiftCardProxy
