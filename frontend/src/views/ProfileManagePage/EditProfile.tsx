import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { IAppState } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'views/components/Modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { MeApi } from 'apis';
import { updateAvatar } from 'stores/auth/actions';
import { toast } from 'react-toastify';



const EditProfile = function() {
  const { user } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 50, x: 25, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);


  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setShowModal(true);
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;

    const aspect = 1;
    const width = (img.width / aspect < img.height * aspect ? 100 : ((img.height * aspect) / img.width) * 100) * 0.6;
    const height = (img.width / aspect > img.height * aspect ? 100 : (img.width / aspect / img.height) * 100) * 0.6;
    const y = (100 - height) / 2;
    const x = (100 - width) / 2;

    setCrop({ unit: '%', width, height, x, y, aspect, });

    return false
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image?.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);
  
  async function handleSubmit() {
    let canvas = previewCanvasRef.current;
    let crop = completedCrop;
    if (!crop || !canvas) {
      return;
    }
    setShowModal(false);
    toast.info('Đang tải ảnh lên');
  
    canvas.toBlob((blob: Blob) => {
      let file = new File([blob], "avatar-"+Date.now()+'.webp', { type: 'image/webp' });
      MeApi.updateAvatar(file)
        .then(res => {
          dispatch(updateAvatar(res.data.avatar||''));
          toast.success('Đổi ảnh đại diện thành công');
        })
        .catch(err => toast.success('Đổi ảnh đại diện không thành công'))
      
    }, 'image/webp', 1);
    
  }

  return(
    <section>
      <h1 className="text-4xl font-bold mt-4 mb-8">
        Quản lý hồ sơ
      </h1>
      <div className="my-4 space-y-8 md:space-y-4 lg:w-4/5">
        <div className="md:flex items-center">
          <div className="md:w-2/5 mb-2 md:mb-0">Tên đăng nhập</div>
          <TextField className="w-full" value={user?.username || ''} size='small' disabled />
        </div>
        <div className="md:flex items-center">
          <div className="md:w-2/5 mb-2 md:mb-0">Email</div>
          <TextField className="w-full" value={user?.email || ''} size='small' disabled />
        </div>
        <div className="md:flex items-center">
          <div className="md:w-2/5 mb-2 md:mb-0">Ảnh đại diện</div>
          <div className="w-full">
            <input id='upload-avatar' type='file' className="hidden" onChange={onSelectFile} />
            <img src={user?.avatar} className="w-24" alt=" " />
            <label 
              className="inline-block px-3 py-1 mt-1 rounded-md text-white bg-primary-500 hover:bg-primary-600 transition-colors cursor-pointer" 
              htmlFor="upload-avatar"
            >
              Chọn Ảnh
            </label>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        handleOutsideClick={() => setShowModal(false)}
      >
        <div className="overflow-hidden p-4 bg-white rounded">
          <p className="text-xl font-semibold mb-4">
            Chọn vùng để cập nhật
          </p>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            keepSelection 
            circularCrop 
          />
          <div>
          <canvas
            ref={previewCanvasRef}
            className="hidden"
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0)
            }}
          />
        </div>
        <div className="text-right text-lg mt-4">
          <button 
            className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer mr-4"
            onClick={() => setShowModal(false)}
          >
            Hủy
          </button>
          <button  
            className="px-3 py-1 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" 
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </div>

        </div>
      </Modal>
    </section>
  );
}

export default EditProfile;
