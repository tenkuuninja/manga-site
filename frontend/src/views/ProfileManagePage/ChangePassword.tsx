import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { MeApi } from 'apis';
import { useDispatch } from 'react-redux';
import { logout } from 'stores/auth/actions';
import { useHistory } from 'react-router';

const ChangePassword = function() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isMaskCurrentPassword, setMaskCurrentPassword] = useState<boolean>(true);
  const [isMaskNewPassword, setMaskNewPassword] = useState<boolean>(true);
  const [isMaskConfirmPassword, setMaskConfirmPassword] = useState<boolean>(true);

  function handleSubmit() {
    let currentLength = currentPassword.length;
    let newLength     = newPassword.length;
    let confirmLength = confirmPassword.length;
    if (currentLength === 0 || newLength === 0 || confirmLength === 0) {
      toast.warn('Các trường không được để trống');
      return;
    }
    if (newLength < 8 || newLength > 32) {
      toast.warn('Mật khẩu phải có độ dài từ 8-32 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warn('Nhập lại mật khẩu không khớp');
      return;
    }
    MeApi.updatePassword(currentPassword, newPassword)
      .then(res => {
        toast.success('Đổi mật khẩu thành công, tiến hành đăng nhập lại');
        history.push('/dang-nhap.html');
        dispatch(logout());
      })
      .catch(er => {
        toast.error('Đổi mật khẩu thất bại');
      });
  }

  const curentPasswordMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setMaskCurrentPassword(!isMaskCurrentPassword)}>
        { isMaskCurrentPassword ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  const newPasswordMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setMaskNewPassword(!isMaskNewPassword)}>
        { isMaskNewPassword ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  const confirmPasswordMaskedIcon = <InputAdornment position="end">
      <IconButton size="small" onClick={() => setMaskConfirmPassword(!isMaskConfirmPassword)}>
        { isMaskConfirmPassword ? <Icon icon="ic:round-visibility" /> : <Icon icon="ic:round-visibility-off" /> }
      </IconButton>
    </InputAdornment>

  return(
    <section>
      <h1 className="text-4xl font-bold mt-4 mb-8">
        Đổi mật khẩu
      </h1>
      <div className="my-4 space-y-8 md:space-y-4 lg:w-4/5">
        <div className="md:flex items-center">
          <div className="md:w-3/5 mb-2 md:mb-0">
            Nhập mật khẩu cũ
            <span className="text-red-600"> *</span>
          </div>
          <TextField 
            className="w-full" 
            value={currentPassword} 
            size='small'
            onChange={(e) => setCurrentPassword(e.target.value)}
            type={isMaskCurrentPassword ? "password" : "text"}
            InputProps={{
              endAdornment: curentPasswordMaskedIcon
            }}
          />
        </div>
        <div className="md:flex items-center">
          <div className="md:w-3/5 mb-2 md:mb-0">
            Nhập mật khẩu mới
            <span className="text-red-600"> *</span>
          </div>
          <TextField 
            className="w-full" 
            value={newPassword} 
            size='small' 
            onChange={(e) => setNewPassword(e.target.value)}
            type={isMaskNewPassword ? "password" : "text"}
            InputProps={{
              endAdornment: newPasswordMaskedIcon
            }}
          />
        </div>
        <div className="md:flex items-center">
          <div className="md:w-3/5 mb-2 md:mb-0">
            Xác nhận mật Khẩu
            <span className="text-red-600"> *</span>
          </div>
          <TextField 
            className="w-full" 
            value={confirmPassword} 
            size='small' 
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={isMaskConfirmPassword ? "password" : "text"}
            InputProps={{
              endAdornment: confirmPasswordMaskedIcon
            }}
          />
        </div>
      </div>
      <div className="mt-8 text-center lg:w-4/5">
        <div 
          className="inline-block text-white font-semibold px-6 py-2 mx-auto bg-black opacity-80 hover:opacity-100 cursor-pointer"
          onClick={handleSubmit}
        >
          Đổi mật khẩu
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;

