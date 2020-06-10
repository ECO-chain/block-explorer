import Vue from 'vue'
import moment from 'moment'

export function initFilters() {
  Vue.filter('timeFromNow', timeFromNow)
  Vue.filter('numberWithCommas', numberWithCommas)
  Vue.filter('monthDayFormat', toMonthDayFormat)
  Vue.filter('timeFormat', toTimeFormat)
}

export function timeFromNow(now: string | number) {
  return moment(now).fromNow()
}

export function numberWithCommas(num: number, decimal?: number) {
  if (decimal) {
    num = num / Math.pow(10, decimal)
  }
  return num.toLocaleString()
}

export function toMonthDayFormat(date: string) {
  let dArray = new Date(date).toDateString().split(' ')
  const dFormat = dArray.slice(1, 3)
  return dFormat.join(" ")
}

export function toTimeFormat(time: string | number, format: string) {
  if (typeof(time) === 'number') {
    if ((time / Math.pow(10, 12)) < 1) {
      time *= 1000
    }
  }
  return moment(time).format(format)
}
