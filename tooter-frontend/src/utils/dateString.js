
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export default function dateString(time) {
    const date = new Date(Number(time))
    const monthString = monthNames[date.getMonth()]
    const hours = date.getHours()
    const AmOrPm = hours >= 12 ? 'pm' : 'am';
    const hourTwelve = (hours % 12) || 12;
    let dateS = `${monthString} ${date.getDate()} ${hourTwelve}:${String(date.getMinutes()).padStart(2, '0')} ${AmOrPm}`
    return dateS
}