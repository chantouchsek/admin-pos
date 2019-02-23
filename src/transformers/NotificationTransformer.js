/* ============
 * Notification Transformer
 * ============
 *
 * The transformer for a notification.
 */

import Transformer from './BaseTransformer'
import Notification from '@/models/Notification'

class NotificationTransformer extends Transformer {
  /**
   * Method used to transform a fetched notification.
   *
   * @returns {Notification} a notification model.
   */
  static fetch (notification) {
    return new Notification({
      id: notification.id,
      notifyId: notification.notify_id,
      body: notification.body,
      notifyType: notification.notify_type,
      createdAt: notification.created_at,
      type: notification.type
    })
  }

  /**
   * Method used to transform a send notification.
   *
   * @returns {Object} The transformed notification.
   */
  static send (notification) {
    return {
      id: notification.id
    }
  }
}

export default NotificationTransformer
