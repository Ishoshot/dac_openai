var date = new Date()

module.exports = {
  getDate: () => {
    return date
  },

  getDateAndTime: () => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let dateAndTime =
      day +
      '-' +
      month +
      '-' +
      year +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second
    return dateAndTime
  },


  getFileDate: () => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fileDate = day + '-' + month + '-' + year
    return fileDate
  },

  isWeekend: () => {
    if (date.getDay() == 6 || date.getDay() == 0) alert('Weekend!')
  },
}
