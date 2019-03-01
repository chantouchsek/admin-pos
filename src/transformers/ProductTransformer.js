/* ============
 * Product Transformer
 * ============
 *
 * The transformer for a product.
 */

import Transformer from './BaseTransformer'
import Product from '@/models/Product'

class ProductTransformer extends Transformer {
  /**
   * Method used to transform a fetched product.
   *
   * @returns {Product} A product model.
   */
  static fetch (product) {
    return new Product({
      id: product.id,
      uuid: product.uuid,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      importedDate: product.imported_date,
      expiredAt: product.expired_at,
      sku: product.sku,
      categoryId: product.category_id,
      category: product.category,
      user: product.user,
      attributes: product.attributes,
      file: product.file,
      taxRate: product.tax_rate,
      taxMethod: product.tax_method,
      qty: product.qty,
      qtyMethod: product.qty_method
    })
  }

  /**
   * Method used to transform a send product.
   *
   * @returns {Object} The transformed product.
   */
  static send (product) {
    return {
      id: product.id,
      uuid: product.uuid,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      cost: product.cost,
      imported_date: product.importedDate,
      expired_at: product.expiredAt,
      category_id: product.categoryId,
      file: product.file,
      tax_rate: product.taxRate,
      tax_method: product.taxMethod,
      qty: product.qty,
      qty_method: product.qtyMethod
    }
  }
}

export default ProductTransformer
