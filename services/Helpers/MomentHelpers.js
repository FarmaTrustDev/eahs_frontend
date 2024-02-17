import moment from 'moment'
import { STANDARD_FORMAT, DATE_FORMAT } from '~/services/Constant/DateTime'

//  using in query params return as string
export const getFormattedMoment = (moment) => moment.format(STANDARD_FORMAT)

export const getMomentByStandardFormat = (string) =>
  moment(string, STANDARD_FORMAT)

// return moment object
export const _getTodayMoment = () => moment()

export const _getFormatMoment = (dt) => moment(dt)

// return today DateTime in standard format  as a string type
export const _getTodayMomentStandardFormatted = () =>
  getFormattedMoment(_getTodayMoment())

// return 2021-07-05T16:12:17 as a string  type
export const _getPastMomentStandardFormatted = (value, unit) =>
  getFormattedMoment(_getTodayMoment().subtract(value, unit))

// return 2021-07-05T16:12:17 as a string
export const _getFutureMomentStandardFormatted = (value, unit) =>
  getFormattedMoment(_getTodayMoment().add(value, unit))

export const _getDefaultDateFormate = (date = _getTodayMoment()) =>
  moment(date, DATE_FORMAT)

export const _disabledPreviousDate = (current) => {
  return current < moment().add( -1 ,'day')
  // return current < moment().endOf('day')
}

export const _disablePrevDateFromYesterday = (current) => {
  return current <= moment().endOf('day')
}

export const _disabledFutureDate = (current) => {
  return current > moment().endOf('day')
}
