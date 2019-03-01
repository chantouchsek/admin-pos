/* ============
 * Revision Transformer
 * ============
 *
 * The transformer for a revision.
 */

import Transformer from './BaseTransformer'
import Revision from '@/models/Revision'

class RevisionTransformer extends Transformer {
  /**
   * Method used to transform a fetched revision.
   *
   * @returns {Revision} A revision model.
   */
  static fetch (sale) {
    return new Revision({
      'id': sale.id,
      'key': sale.key,
      'oldValue': sale.old_value,
      'newValue': sale.new_value,
      'user': sale.user,
      'fieldName': sale.field_name,
      'dateUpdated': sale.date_updated
    })
  }
}

export default RevisionTransformer
