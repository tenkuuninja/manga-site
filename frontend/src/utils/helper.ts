import moment from 'moment';
import 'moment/locale/vi';

export function debounce(func: Function, wait: number = 100) {
  let timeout: NodeJS.Timeout;
  return function(...args: any) {
    const executeFunction = function() {
      func(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(executeFunction, wait);
  }
}

export const getRelativeTimeFromNow = (date: Date) => {
  return moment(date).locale('vi').startOf('seconds').fromNow();
}

