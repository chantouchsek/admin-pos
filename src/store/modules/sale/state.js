/* ============
 * Sale State
 * ============
 *
 * The state of the sale module.
 */

export default {
  all: [],
  pagination: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5
  },
  cart: {
    customerId: 1,
    applyTo: 'orderTotal',
    discount: 10,
    products: [],
    tax: 0.065,
    grandTotal: 0,
    total: 0,
    paid: 0,
    discountToAllItem: 0,
    payment: {
      paid_by: 1,
      amount: 0
    }
  },
  checkoutBool: false,
  show: {}
}
