export function toMonthDayFormat(date: string) {
  let dArray = new Date(date).toDateString().split(' ')
  const dFormat = dArray.slice(1, 3)
  return dFormat.join("'")
}
