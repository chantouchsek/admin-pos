import Vue from 'vue'

/**
 * Converts a string to camel case.
 * Example: fucking_string => fuckingString
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter('camelCase', function (str) {
  return str.toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase()
    })
    .replace(/ /g, '')
})
