/* ============
 * Purchase Transformer
 * ============
 *
 * The transformer for a purchase.
 */

import Transformer from './BaseTransformer'
import Purchase from '@/models/Purchase'

class PurchaseTransformer extends Transformer {
  /**
   * Method used to transform a fetched purchase.
   *
   * @returns {Purchase} A purchase model.
   */
  static fetch (purchase) {
    return new Purchase({
      id: purchase.id,
      uuid: purchase.uuid,
      reference: purchase.reference,
      supplierId: purchase.supplier_id,
      supplier: purchase.supplier,
      notes: purchase.notes,
      user: purchase.user,
      date: purchase.date,
      received: purchase.received,
      products: purchase.products,
      subTotal: purchase.sub_total
    })
  }

  /**
   * Method used to transform a send purchase.
   *
   * @returns {Object} The transformed purchase.
   */
  static send (purchase) {
    return {
      id: purchase.id,
      uuid: purchase.uuid,
      reference: purchase.reference,
      supplier_id: purchase.supplierId,
      notes: purchase.notes,
      user: purchase.user,
      date: purchase.date,
      received: purchase.received,
      products: purchase.products,
      sub_total: purchase.subTotal
    }
  }
}

export default PurchaseTransformer
