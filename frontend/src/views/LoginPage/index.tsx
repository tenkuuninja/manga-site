import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
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
        { passwordIsMasked ? <MdVisibility /> : <MdVisibilityOff /> }
      </IconButton>
    </InputAdornment>

  return(
    <div className="w-96 mx-auto mt-4">
      <div className="p-6 border-b border-black border-opacity-20 font-semibold text-lg">Đăng nhập</div>
      <form className="p-6" onSubmit={onRegister}>
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
        
        <Button type="submit" variant="contained" color="primary" fullWidth className="rounded-none shadow-none text-semibold text-lg py-3 mt-6">
          Đăng nhập
        </Button>
        <div className="border-b border-black border-opacity-20 text-center text-sm py-4">
          <Link to="reset-password.html">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
      <div className="text-center">
        Bạn chưa có tài khoản? 
        <Link to="/dang-ky-tai-khoan.html" className="font-semibold text-blue-500 ml-2">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default LoginPage
