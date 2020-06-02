import Vue from 'vue'
import moment from 'moment'

export function initFilters() {
  Vue.filter('timeFromNow', timeFromNow)
}

export function timeFromNow(now: number) {
  return moment(now).fromNow()
}
