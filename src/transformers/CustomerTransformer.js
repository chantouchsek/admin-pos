/* ============
 * Customer Transformer
 * ============
 *
 * The transformer for a customer.
 */

import Transformer from './BaseTransformer'
import Customer from '@/models/Customer'

class CustomerTransformer extends Transformer {
  /**
   * Method used to transform a fetched customer.
   *
   * @returns {Customer} A customer model.
   */
  static fetch (customer) {
    return new Customer({
      id: customer.id,
      uuid: customer.uuid,
      name: customer.name,
      address: customer.address,
      email: customer.email,
      phoneNumber: customer.phone_number,
      user: customer.user
    })
  }

  /**
   * Method used to transform a send customer.
   *
   * @returns {Object} The transformed customer.
   */
  static send (customer) {
    return {
      id: customer.id,
      name: customer.name,
      address: customer.address,
      email: customer.email,
      phone_number: customer.phoneNumber
    }
  }
}

export default CustomerTransformer
