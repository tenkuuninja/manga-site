import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { login } from 'stores/auth/actions';
import { IAppState } from 'interfaces';


const LoginPage = function() {
  const { isLoggedIn } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordIsMasked, setPasswordMasked] = useState<boolean>(true);
  if (isLoggedIn) {
    setTimeout(() => history.push('/'), 0);
  }

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameOrEmail.length > 0 && password.length > 0) {
      dispatch(login({
        username: usernameOrEmail,
        password: password
      }))
    }

  }

  const passwordMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setPasswordMasked(!passwordIsMasked)}>
        { passwordIsMasked ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  return(
    <div className="w-96 mx-auto mt-4">
      <div className="p-6 border-b border-gray-200 font-semibold text-lg">Đăng nhập</div>
      <form className="p-6 space-y-4" onSubmit={onRegister}>
        <TextField 
          variant="outlined" 
          size="small" 
          label="Tên đăng nhập hoặc email"
          value={usernameOrEmail} 
          onChange={e => setUsernameOrEmail(e.target.value)}
          className="w-full mt-4" 
        />
        <TextField 
          variant="outlined" 
          size="small" 
          type={passwordIsMasked ? "password" : "text"}
          label="Mật khẩu"
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className="w-full mt-4" 
          InputProps={{
            endAdornment: passwordMaskedIcon
          }}
        />
        
        <button type="submit" className="text-semibold text-lg text-white bg-primary-500 hover:bg-primary-600 transition-colors w-full py-2 mt-6">
          Đăng nhập
        </button>
        <div className="border-b border-gray-200 text-center text-sm pb-4">
          <Link to="reset-password.html">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
      <div className="text-center mb-4">
        Bạn chưa có tài khoản? 
        <Link to="/dang-ky-tai-khoan.html" className="font-semibold text-primary-500 hover:text-primary-600 transition ml-2">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default LoginPage
