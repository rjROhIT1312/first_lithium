
const getInfo ={
    name : "Lithium",
    week : "W3D5",
    topic : "the topic for today is Nodejs module system"
}
let getBatchInfo = function getBatchInfo(){
    let date = new Date()
    let todayDate = date.getDate()
    let month = date.getMonth()
    console.log("Today\'s date is-",todayDate)
    console.log("The current month is-",month)
    console.log(`${getInfo.name}, ${getInfo.week}, ${getInfo.topic}`)
    return " "
}




module.exports.info = getBatchInfo