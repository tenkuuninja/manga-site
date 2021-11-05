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

export const getRelativeTimeFromNow = (dateStr?: string, sec?: number) => {
  if (dateStr === undefined) {
    dateStr = Date.toString();
  }
  if (sec !== undefined && Date.now() - Date.parse(dateStr) > sec*100 ) {
    return moment(dateStr).format('DD/MM/YYYY');
  }
  return moment(dateStr).locale('vi').startOf('seconds').fromNow();
}

export const convertNumberToHumanRead = (num: number, fixed: number = 2) => {
  let units = ['','K','M','B','T','Q'];
	let count = 0
  while (num >=1000) {
		num /= 1000
		count++
	}
  for (let i=0; i<fixed; i++) {
    if (num === +num.toFixed(i)) return num.toFixed(i)+units[count]
  }
	return num.toFixed(2)+units[count]
}

