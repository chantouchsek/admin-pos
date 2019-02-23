/* ============
 * Role Transformer
 * ============
 *
 * The transformer for a role.
 */

import Transformer from './BaseTransformer'
import Role from '@/models/Role'

class RoleTransformer extends Transformer {
  /**
   * Method used to transform a fetched role.
   *
   * @returns {Role} A role model.
   */
  static fetch (role) {
    return new Role({
      id: role.id,
      name: role.name,
      permissions: role.permissions,
      users: role.users,
      guardName: role.guard_name
    })
  }

  /**
   * Method used to transform a send role.
   *
   * @returns {Object} The transformed role.
   */
  static send (role) {
    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions
    }
  }
}

export default RoleTransformer
