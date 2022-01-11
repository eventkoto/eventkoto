
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const wkDay = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

export function parseDate(date){
    let d = new Date(date)
    return (<div className="">{months[d.getMonth()]} {d.getDate()}, {d.getFullYear()} - {wkDay[d.getDay()]} <br/> {String(d.getHours() == 0 ? 12 : d.getHours() < 13 ? d.getHours() : d.getHours()-12).padStart(2, "0")} : {String(d.getMinutes()).padStart(2, "0")} {d.getHours() > 12 ? "PM" : "AM"}</div>)
}