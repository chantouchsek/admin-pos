/* ============
 * UserDevice Transformer
 * ============
 *
 * The transformer for a device.
 */

import Transformer from './BaseTransformer'
import UserDevice from '@/models/UserDevice'

class DeviceTransformer extends Transformer {
  /**
   * Method used to transform a fetched device.
   *
   * @returns {UserDevice} a device model.
   */
  static fetch (device) {
    return new UserDevice({
      id: device.id,
      playerId: device.player_id,
      pushToken: device.push_token,
      subscribed: device.subscribed
    })
  }

  /**
   * Method used to transform a send device.
   *
   * @returns {Object} The transformed device.
   */
  static send (device) {
    return {
      id: device.id,
      player_id: device.playerId,
      push_token: device.pushToken,
      subscribed: device.subscribed
    }
  }
}

export default DeviceTransformer
