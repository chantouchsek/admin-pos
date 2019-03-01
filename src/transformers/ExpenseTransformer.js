/* ============
 * Expense Transformer
 * ============
 *
 * The transformer for a expense.
 */

import Transformer from './BaseTransformer'
import Expense from '@/models/Expense'

class ExpenseTransformer extends Transformer {
  /**
   * Method used to transform a fetched expense.
   *
   * @returns {Expense} A expense model.
   */
  static fetch (expense) {
    return new Expense({
      id: expense.id,
      uuid: expense.uuid,
      amount: expense.amount,
      notes: expense.notes,
      date: expense.date,
      user: expense.user,
      attachments: expense.attachments,
      reference: expense.reference,
      createdAt: expense.created_at
    })
  }

  /**
   * Method used to transform a send expense.
   *
   * @returns {Object} The transformed expense.
   */
  static send (expense) {
    return {
      id: expense.id,
      amount: expense.amount,
      notes: expense.notes,
      date: expense.date,
      attachments: expense.attachments,
      reference: expense.reference
    }
  }
}

export default ExpenseTransformer
