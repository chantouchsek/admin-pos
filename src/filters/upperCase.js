import Vue from 'vue'

/**
 * Converts a string to upper case.
 * Example: fucking string => Fucking String
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter('upperCase', function (str) {
  return str.toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase()
    })
})
