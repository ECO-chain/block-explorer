import Vue from 'vue'
import moment from 'moment'

export function initFilters() {
  Vue.filter('timeFromNow', timeFromNow)
  Vue.filter('numberWithCommas', numberWithCommas)
}

export function timeFromNow(now: number) {
  return moment(now).fromNow()
}

export function numberWithCommas(num: number, decimal?: number) {
  if (decimal) {
    num = num / Math.pow(10, decimal)
  }
  return num.toLocaleString()
}
