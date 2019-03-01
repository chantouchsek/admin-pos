/* ============
 * GiftCard Transformer
 * ============
 *
 * The transformer for a giftCard.
 */

import Transformer from './BaseTransformer'
import GiftCard from '@/models/GiftCard'

class GiftCardTransformer extends Transformer {
  /**
   * Method used to transform a fetched giftCard.
   *
   * @returns {GiftCard} A giftCard model.
   */
  static fetch (giftCard) {
    return new GiftCard({
      id: giftCard.id,
      uuid: giftCard.uuid,
      value: giftCard.value,
      balance: giftCard.balance,
      active: giftCard.active,
      expiryDate: giftCard.expiry_date,
      user: giftCard.user,
      cardNumber: giftCard.card_number
    })
  }

  /**
   * Method used to transform a send giftCard.
   *
   * @returns {Object} The transformed giftCard.
   */
  static send (giftCard) {
    return {
      id: giftCard.id,
      value: giftCard.value,
      balance: giftCard.balance,
      active: giftCard.active,
      expiry_date: giftCard.expiryDate,
      card_number: giftCard.cardNumber
    }
  }
}

export default GiftCardTransformer
