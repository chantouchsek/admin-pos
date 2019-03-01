/* ============
 * Supplier Transformer
 * ============
 *
 * The transformer for a supplier.
 */

import Transformer from './BaseTransformer'
import Supplier from '@/models/Supplier'

class SupplierTransformer extends Transformer {
  /**
   * Method used to transform a fetched supplier.
   *
   * @returns {Supplier} A supplier model.
   */
  static fetch (supplier) {
    return new Supplier({
      id: supplier.id,
      uuid: supplier.uuid,
      name: supplier.name,
      address: supplier.address,
      email: supplier.email,
      phoneNumber: supplier.phone_number,
      user: supplier.user
    })
  }

  /**
   * Method used to transform a send supplier.
   *
   * @returns {Object} The transformed supplier.
   */
  static send (supplier) {
    return {
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      email: supplier.email,
      phone_number: supplier.phoneNumber
    }
  }
}

export default SupplierTransformer
