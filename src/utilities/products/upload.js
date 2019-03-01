export default {

  handleFileUpload (event) {
    /*
      Set the local file variable to what the user has selected.
    */
    let file = event.target.files[0]

    /*
      Initialize a File Reader object
    */
    let reader = new FileReader()

    /*
      Add an event listener to the reader that when the file
      has been loaded, we flag the show preview as true and set the
      image to be what was read from the reader.
    */
    reader.addEventListener("load", function () {
      this.form.file = reader.result
    }.bind(this), false)

    /*
      Check to see if the file is not empty.
    */
    if (file) {
      /*
        Ensure the file is an image file.
      */
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        /*
          Fire the readAsDataURL method which will read the file in and
          upon completion fire a 'load' event which we will listen to and
          display the image in the preview.
        */
        reader.readAsDataURL(file)
      }
    }
  }
}
