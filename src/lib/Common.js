////////////////////////////////////////////////////////////////////////////////

import { StyleSheet } from 'react-native'
import Moment from 'moment-timezone';

////////////////////////////////////////////////////////////////////////////////

export const listItemStyles = StyleSheet.create({
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 4,
  paddingRight:4,
  marginTop: 3,
  marginBottom: 3,
  marginLeft: 4,
  marginRight:4,
})

////////////////////////////////////////////////////////////////////////////////
// brand colors taken from
//https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/variables/commonColor.js
export const brandColors = {
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#a9a9a9',
}

////////////////////////////////////////////////////////////////////////////////
// taken from 2nn.jp
export const categoryColors = {
  newsplus: '#0E6FB9',
  mnewsplus: '#E98514',
  bizplus: '#0DA95C',
  news4plus: '#E83E2F',
  news5plus: '#00A1E9',
  seijinewsplus: '#0E6FB9',
  moeplus: '#DB0D75', // same
  idolplus: '#DB0D75', // same
  scienceplus: '#D0C7B8',
  femnewsplus: '#D6AE59',
  dqnplus: '#947EB8',
}

////////////////////////////////////////////////////////////////////////////////
// Format iso8601 date in localtime
// TODO: rewrite by Moment

export function formatDate(date_iso8601, format) {
  var date = new Date(Date.parse(date_iso8601));
  //if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  if (!format) format = 'YYYY-MM-DD hh:mm:ss';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};

export function formatEpoch(epoch) {
  var t = Moment.unix(epoch)
  return Moment.tz(t,'Asia/Tokyo').format('MM/DD HH:mm')
}

////////////////////////////////////////////////////////////////////////////////