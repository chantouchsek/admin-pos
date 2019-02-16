/* ============
 * Device Actions
 * ============
 *
 * The actions available for the device module.
 */

import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/UserProxy'
import DeviceTransformer from '@/transformers/UserDeviceTransformer'

const proxy = new Proxy()

/**
 * Action fired when an device will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   device  The device that will be created.
 */
const create = async ({ commit }, device) => {
  const transformedDevice = DeviceTransformer.send(device)

  await proxy.setPlayerId(transformedDevice)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.success.message
      })
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action fired when an device has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   device  The device that has been created.
 */
const created = ({ commit }, device) => {
  commit(types.CREATED, DeviceTransformer.fetch(device))
}

/**
 * Action fired when an device will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   device  The device that will be updated.
 */
const update = ({ commit }, device) => {
  const transformedDevice = DeviceTransformer.send(device)

  proxy.updatePlayerId(device.userId, transformedDevice)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Device never get notification again.'
      })
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action fired when an device has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   device  The device that has been updated.
 */
const updated = ({ commit }, device) => {
  commit(types.UPDATED, DeviceTransformer.fetch(device))
}

/**
 * Action fired when an device will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   deviceId  The device that will be destroyed.
 */
const destroy = ({ commit }, deviceId) => {
  proxy.destroy(deviceId)
    .then((response) => {
      console.log(response.success.message)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'Failed to deleted player id.'
      })
    })
}

/**
 * Action fired when an device has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   device  The device that has been destroyed.
 */
const destroyed = ({ commit }, device) => {
  commit(types.DESTROYED, DeviceTransformer.fetch(device))
}

export default {
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
