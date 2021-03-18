// Your code here
const createEmployeeRecord = function(record) {
  return {
      firstName: record[0],
      familyName: record[1],
      title: record[2],
      payPerHour: record[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

const createEmployeeRecords = function(arrOfArrays) {
    return arrOfArrays.map(function(record) {
        return createEmployeeRecord(record)
    })
}

const createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

const createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}


const hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    let wages = hours * employee.payPerHour
    return parseFloat(wages)
}

const allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

const calculatePayroll = function(arr) {
    return arr.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
