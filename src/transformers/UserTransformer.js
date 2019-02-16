/* ============
 * User Transformer
 * ============
 *
 * The transformer for a user.
 */

import Transformer from './BaseTransformer'
import User from '@/models/User'

class CategoryTransformer extends Transformer {
  /**
   * Method used to transform a fetched user.
   *
   * @returns {User} A user model.
   */
  static fetch (user) {
    return new User({
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      staffId: user.staff_id,
      active: user.active,
      emailVerifiedAt: user.email_verified_at,
      phoneNumber: user.phone_number,
      username: user.username,
      gender: user.gender,
      dateOfBirth: user.date_of_birth,
      birthPlace: user.birth_place,
      startWorkingDate: user.start_working_date,
      address: user.address,
      roles: user.roles,
      permissions: user.permissions
    })
  }

  /**
   * Method used to transform a send user.
   *
   * @returns {Object} The transformed user.
   */
  static send (user) {
    return {
      id: user.id,
      uuid: user.uuid,
      staff_id: user.staffId,
      name: user.name,
      email: user.email,
      active: user.active,
      email_verified_at: user.emailVerifiedAt,
      phone_number: user.phoneNumber,
      username: user.username,
      gender: user.gender,
      date_of_birth: user.dateOfBirth,
      birth_place: user.birthPlace,
      start_working_date: user.startWorkingDate,
      address: user.address,
      roles: user.roles,
      permissions: user.permissions
    }
  }
}

export default CategoryTransformer
