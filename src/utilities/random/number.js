export default {
  randomNumber (form) {
    let math = Math.floor(Math.random() * 1000)
    form.cardNumber = (math + 1234) + ' ' + (math + 4321) + ' ' + (math + 5678) + ' ' + (math + 1000)
  }
}
