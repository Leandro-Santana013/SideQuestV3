import React, { useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "./ImageCropper.css"
import 'react-image-crop/dist/ReactCrop.css'

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 250;

export const ImageCropper = () => {
  const [ImgSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [error, setError] = useState(null);

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image()
      const ImageUrl = reader.result?.toString() || "";
      imageElement.src = ImageUrl
      
      imageElement.addEventListener("load", (e) =>{
        if(error) setError(null)
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if(naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION ){
          setError("A imagem é muito pequena")
          setImageSrc(null)
          return
        }
      })

      setImageSrc(ImageUrl);
    });
    reader.readAsDataURL(file);
  };
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
  const croparcomlimit = (MIN_DIMENSION / width ) * 100
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: croparcomlimit,
       
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop);
  };
  

  return (
    <>
      <label>
        <span className="span-img-picker">escolha sua foto</span>
        <input type="file" accept="image/*" onChange={onSelectFile}></input>
      </label>
      {error && <p>{error}</p>}
      {ImgSrc && (
        <div className="Content-display-cropper">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          ><img src={ImgSrc} alt="Uploaded" style={{maxHeight:"70vh"}} onLoad={onImageLoad}/></ReactCrop>
        </div>
      )}
    </>
  );
};
