/* ============
 * Sale Transformer
 * ============
 *
 * The transformer for a sale.
 */

import Transformer from './BaseTransformer'
import Sale from '@/models/Sale'

class SaleTransformer extends Transformer {
  /**
   * Method used to transform a fetched sale.
   *
   * @returns {Sale} A sale model.
   */
  static fetch (sale) {
    return new Sale({
      id: sale.id,
      uuid: sale.uuid,
      customerId: sale.customer_id,
      notes: sale.notes,
      payment: sale.payment,
      total: sale.total,
      grandTotal: sale.grand_total,
      paid: sale.paid,
      tax: sale.tax,
      discount: sale.discount,
      status: sale.status,
      products: sale.products
    })
  }

  /**
   * Method used to transform a send sale.
   *
   * @returns {Object} The transformed sale.
   */
  static send (sale) {
    return {
      id: sale.id,
      customer_id: sale.customerId,
      notes: sale.notes,
      payment: sale.payment,
      total: sale.total,
      grand_total: sale.grandTotal,
      paid: sale.paid,
      tax: sale.tax,
      discount: sale.discount,
      status: sale.status,
      products: sale.products
    }
  }
}

export default SaleTransformer
