import Vue from 'vue'

/**
 * Converts a string to camel case.
 * Example: fucking_string => fuckingString
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter('removeHyphen', function (str) {
  if (!str) return
  return str.toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\b[a-z]/g, function ($1) {
      return $1.toUpperCase()
    })
})
