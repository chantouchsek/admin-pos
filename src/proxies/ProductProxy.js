import Proxy from './BaseProxy'

class ProductProxy extends Proxy {
  /**
   * The constructor for the ProductProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('products', parameters)
  }

  /**
   * Method used to fetch a given item.
   *
   * @returns {Promise} The result in a promise.
   */
  findBy () {
    return this.submit('get', `/${this.endpoint}/filter`)
  }

  /**
   * Method used to update a given item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  revisions (id) {
    return this.submit('get', `/${this.endpoint}/${id}/revisions`)
  }

  /**
   * Method used to upload the file excel selected.
   *
   * @returns {Promise} The result in a promise.
   */
  imports (file) {
    let form = new FormData()
    form.append('file', file)
    return this.submit('post', `/${this.endpoint}/imports`, form)
  }

  /**
   * Method used to fetch all in stock products.
   *
   * @returns {Promise} The result in a promise.
   */
  inStocks () {
    return this.submit('get', `/${this.endpoint}/in-stocks`)
  }
}

export default ProductProxy
