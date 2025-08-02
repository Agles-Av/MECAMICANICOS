let alertContext = null

export const AlertHelper = {
  initialize(context) {
    alertContext = context
  },

  showAlert(message, type = "info") {
    if (!alertContext) {
      console.error("AlertHelper not initialized. Use AlertHelper.initialize first.")
      return
    }
    alertContext.showAlert(message, type)
  },
}
