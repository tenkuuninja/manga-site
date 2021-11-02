export const changeToSlug = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  str = str.replace(/đ/gi, 'd');
  str = str.replace(/[\W]/gi, ' ');
  str = str.trim();
  str = str.replace(/\s+/gi, '-');
  return str;
}

export const caesarCipher = () => {

  function encode(str: string) {
    str = Buffer.from(str).toString('base64');
    str = str.replace(/[a-zA-Z0-9]{3}/g, function(s) {
      let arr: string[] = s.split('')
      let t = arr[0];
      arr[0] = arr[2];
      arr[2] = t
      return arr.join('');
    });
    str = str.replace(/[a-zA-Z0-9]/g, function(s, i) {
      let code = s.charCodeAt(0)
      if (code >= 48 && code <= 57) {
        let step = i+1;
        code = 48 + (code+step-48) % (57-48+1);
      } else if (code >= 65 && code <= 90) {
        let step = i+1;
        code = 65 + (code+step-65) % (90-65+1);
      } else if (code >= 97 && code <= 122) {
        let step = i+1;
        code = 97 + (code+step-97) % (122-97+1);
      } else {
        return s;
      }
      return String.fromCharCode(code);
    });
    return str;
  }

  function decode(str: string) {
    str = str.replace(/[a-zA-Z0-9]/g, function(s, i) {
      let code = s.charCodeAt(0)
      if (code >= 48 && code <= 57) {
        let step = 10 -((i+1)%10)
       code = 48 + (code+step-48) % (57-48+1);
      } else if (code >= 65 && code <= 90) {
        let step = 26 -((i+1)%26)
        code = 65 + (code+step-65) % (90-65+1);
      } else if (code >= 97 && code <= 122) {
        let step = 26 -((i+1)%26)
        code = 97 + (code+step-97) % (122-97+1);
      } else {
        return s;
      }
      return String.fromCharCode(code);
    });
    str = str.replace(/[a-zA-Z0-9]{3}/g, function(s) {
      let arr: string[] = s.split('')
      let t = arr[0];
      arr[0] = arr[2];
      arr[2] = t
      return arr.join('');
    });
    str = Buffer.from(str, 'base64').toString('ascii');
    return str;
  }

  return { encode, decode };
}
