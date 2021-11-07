import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { UserApi } from 'apis';
import { register } from 'stores/auth/actions';
import { IAppState } from 'interfaces';
import axios, { CancelToken } from 'axios';
import { debounce } from 'utils/helper';

interface InputState {
  data: string,
  focus: boolean,
  error: boolean,
  message: string
}

const initState: InputState = {
  data: '',
  focus: false,
  error: false,
  message: ''
}

const strengthMessage = [ '', 'Yếu', 'Khá mạnh', 'Mạnh', 'Rất mạnh' ]

const RegisterPage = function() {
  const { isLoggedIn } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState<InputState>(initState);
  const [email, setEmail] = useState<InputState>(initState);
  const [password, setPassword] = useState<InputState>(initState);
  const [passwordConfirm, setPasswordConfirm] = useState<InputState>(initState);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordIsMasked, setPasswordMasked] = useState<boolean>(true);
  const [passwordConfirmIsMasked, setPasswordConfirmMasked] = useState<boolean>(true);

  const reUsername = /^[a-zA-Z0-9_]{6,14}$/g;
  // eslint-disable-next-line
  const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const rePassword = /^[a-zA-Z0-9_\-+=!@#$%^&*]{8,32}$/g;

  if (isLoggedIn) {
    setTimeout(() => history.push('/'), 0);
  }

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (reUsername.test(username.data) && reEmail.test(email.data) && rePassword.test(password.data)) {
      Promise.all([
        UserApi.isExist({ username: username.data }),
        UserApi.isExist({ email: email.data })
      ]).then(res => {
        if (res[0].data || res[1].data) {
          
        } else {
          dispatch(register({
            username: username.data,
            email: email.data,
            password: password.data
          }));
        }
      })
    }

  }

  const checkUsernameExist = debounce(function(cancelToken: CancelToken) {
    if (reUsername.test(username.data)) {
      UserApi.isExist({ username: username.data }, { cancelToken }).then(res => {
        if (res.data) setUsername({...username, error: true, message: 'Tên đăng nhập đã tồn tại, hãy đổi tên đăng nhập khác.'})
      }).catch(err => {})
    } 
  }, 800);

  const checkEmailExist = debounce(function(cancelToken: CancelToken) {
    if (reEmail.test(email.data)) {
      UserApi.isExist({ email: email.data }, { cancelToken }).then(res => {
        if (res.data) setEmail({...email, error: true, message: 'Email đã tồn tại, hãy đổi địa chỉ email khác.'})
      }).catch(error => {});
    } 
  }, 800);

  useEffect(function() {
    let myRequest = axios.CancelToken.source();
    const rg = /^[a-zA-Z0-9_]{6,14}$/g;
    const rg2 = /[^a-zA-Z0-9_]/g;
    checkUsernameExist(myRequest.token);
    if (username.focus) {
      if (username.data === '') {
        setUsername({...username, error: true, message: 'Không được để trống tên đăng nhập.'});
      } else if (rg2.test(username.data)) {
        setUsername({...username, error: true, message: 'Tên đăng nhập chỉ cho phép chữ cái không dấu, số và dấu _ có độ dài từ 6-14 ký tự.'});
      } else if (username.data.length < 6) {
        setUsername({...username, error: false, message: 'Tên đăng nhập có độ dài tối thiểu 6-14 ký tự.'});
      } else if (!rg.test(username.data)) {
        setUsername({...username, error: true, message: 'Tên đăng nhập chỉ cho phép chữ cái không dấu, số và dấu _ có độ dài từ 6-14 ký tự.'});
      } else {
        setUsername({...username, error: false, message: '' });
      }
    } else {
      setUsername({...username, focus: true});
    }
    
    return () => {
      myRequest.cancel();
    }
    // eslint-disable-next-line
  }, [username.data]);

  useEffect(function() {
    let myRequest = axios.CancelToken.source();
    checkEmailExist(myRequest.token);
    if (email.focus) {
      if (email.data === '') {
        setEmail({...email, error: true, message: 'Không được để trống email'});
      } else if (!reEmail.test(email.data)) {
        setEmail({...email, error: true, message: 'Email không đúng định dạng.'});
      } else {
        setEmail({...email, error: false, message: ''});
      }
    } else {
      setEmail({...email, focus: true, message: ''});
    }
    
    return () => {
      myRequest.cancel();
    }
    // eslint-disable-next-line
  }, [email.data]);

  useEffect(function() {
    const rg = /^[a-zA-Z0-9_\-+=!@#$%^&*]{8,32}$/g;
    const rg2 = /^[^a-zA-Z0-9_\-+=!@#$%^&*]$/g;
    if (password.focus) {
      if (password.data === '') {
        setPassword({...password, error: true, message: 'Không được để trống mật khẩu.'});
      } else if (rg2.test(password.data)) {
        setPassword({...password, error: true, message: 'Mật khẩu chỉ được phép chứ chữ thường, chữ hoa, số và 1 số ký tự đặc biệt _\\+=!@#$%^&* có độ dài tối thiểu 8 ký tự.'});
      } else if (password.data.length < 8) {
        setPassword({...password, error: false, message: 'Mật khẩu cần có độ dài tối thiểu 8 ký tự.'});
      } else if (!rg.test(password.data)) {
        setPassword({...password, error: true, message: 'Mật khẩu chỉ được phép chứ chữ thường, chữ hoa, số và 1 số ký tự đặc biệt _\\+=!@#$%^&* có độ dài tối thiểu 8 ký tự và tối đa 32 ký tự.'});
      } else {
        setPassword({...password, error: false, message: ''});
      }
    } else {
      setPassword({...password, focus: true});
    }

    let strength = 0;
    if (password.data.length >= 8) {
      if (/[a-z]/g.test(password.data)) strength++;
      if (/[A-Z]/g.test(password.data)) strength++;
      if (/[0-9]/g.test(password.data)) strength++;
      if (/[_\-+=!@#$%^&*]/g.test(password.data)) strength++;
    }
    setPasswordStrength(strength);
    // eslint-disable-next-line
  }, [password.data]);

  useEffect(function() {
    if (passwordConfirm.focus) {
      if (passwordConfirm.data !== password.data) {
        setPasswordConfirm({...passwordConfirm, error: true, message: 'Mật khẩu không khớp.'});
      } else {
        setPasswordConfirm({...passwordConfirm, error: false, message: ''});
      }
    } else {
      setPasswordConfirm({...passwordConfirm, focus: true});
    }
    // eslint-disable-next-line
  }, [passwordConfirm.data]);


  const passwordMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setPasswordMasked(!passwordIsMasked)}>
        { passwordIsMasked ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  const passwordConfirmMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setPasswordConfirmMasked(!passwordConfirmIsMasked)}>
        { passwordConfirmIsMasked ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  return(
    <div className="w-96 mx-auto mt-4">
      <div className="p-6 border-b border-black border-opacity-20 font-semibold text-lg">Đăng ký</div>
      <form className="p-6" onSubmit={onRegister}>
        <TextField 
          variant="outlined" 
          size="small" 
          label="Tên đăng nhập" 
          error={username.error} 
          value={username.data} 
          onChange={e => setUsername({...username, data: e.target.value})}
          className="w-full mt-4" 
          helperText={username.message}
        />
        <TextField 
          variant="outlined" 
          size="small" 
          label="Email" 
          error={email.error}
          value={email.data} 
          onChange={e => setEmail({...email, data: e.target.value})}
          className="w-full mt-4"
          helperText={email.message}
        />
        <TextField 
          variant="outlined" 
          size="small" 
          type={passwordIsMasked ? "password" : "text"}
          label="Mật khẩu"
          error={password.error}
          value={password.data} 
          onChange={e => setPassword({...password, data: e.target.value})}
          className="w-full mt-4" 
          InputProps={{
            endAdornment: passwordMaskedIcon
          }}
          helperText={password.message}
        />
        <div className="-mt-1">
          <div className="inline-block space-x-1">
            <span className={`inline-block w-10 h-1 rounded-full ${passwordStrength > 0 ? "bg-primary-500" : "bg-gray-300"}`}></span>
            <span className={`inline-block w-10 h-1 rounded-full ${passwordStrength > 1 ? "bg-primary-500" : "bg-gray-300"}`}></span>
            <span className={`inline-block w-10 h-1 rounded-full ${passwordStrength > 2 ? "bg-primary-500" : "bg-gray-300"}`}></span>
            <span className={`inline-block w-10 h-1 rounded-full ${passwordStrength > 3 ? "bg-primary-500" : "bg-gray-300"}`}></span>
          </div>
          <span className="inline-block text-xs pt-1 leading-none ml-2">{strengthMessage[passwordStrength]}</span>
        </div>
        <TextField 
          variant="outlined" 
          size="small" 
          type={passwordConfirmIsMasked ? "password" : "text"}
          label="Xác nhận mật khẩu" 
          error={passwordConfirm.error}
          value={passwordConfirm.data} 
          onChange={e => setPasswordConfirm({...passwordConfirm, data: e.target.value})}
          className="w-full mt-4" 
          InputProps={{
            endAdornment: passwordConfirmMaskedIcon
          }}
          helperText={passwordConfirm.message}
        />
        
        <Button type="submit" variant="contained" fullWidth className="rounded-none shadow-none text-semibold text-lg text-white bg-primary-500 hover:bg-primary-600 py-3 mt-6">
          Đăng ký
        </Button>
        <div className="border-b border-black border-opacity-20 text-center text-sm py-4"> </div>
      </form>
      <div className="text-center">
        Bạn đã có tài khoản? 
        <Link to="/dang-nhap.html" className="font-semibold text-primary-500 hover:text-primary-600 ml-2">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage
