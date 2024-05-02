import React, { useRef, useState, useContext } from "react";
import ReactCrop, {
  centerCrop,
  convertToPercentCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "./ImageCropper.css";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./SetcanvasPreview";
import { FaPen } from "react-icons/fa6";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 250;

export const ImageCropper = ({ updatefoto }) => {
  const [ImgSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [error, setError] = useState(null);

  const imgRef = useRef(null);
  const PreviewCanvasRef = useRef(null);

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const ImageUrl = reader.result?.toString() || "";
      imageElement.src = ImageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError(null);
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setError("A imagem é muito pequena");
          setImageSrc(null);
          return;
        }
      });

      setImageSrc(ImageUrl);
    });
    reader.readAsDataURL(file);
  };
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const croparcomlimit = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: croparcomlimit,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <input id="fotoAvatar" className="input-img-cropper" type="file" accept="image/*" onChange={onSelectFile}></input>
      <label htmlFor="fotoAvatar" className="label-input-img-cropper">
        <FaPen className="icon-label-input-img-cropper" />
      </label>
      {error && <p>{error}</p>}

      {ImgSrc && (
        <div className="content-display-cropper">
          <div className="modal-content-display-cropper">
            <h2> Editando imagem</h2>
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={ImgSrc}
                alt="Uploaded"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            <button
              className="btn-modal-content-display-cropper"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current,
                  PreviewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = PreviewCanvasRef.current.toDataURL()
                updatefoto(dataUrl)
                setImageSrc(null)
              }}
            >Confirmar</button>
            {crop && (
              <canvas
                ref={PreviewCanvasRef}
                style={{
                  display: "none",
                  border: "1px groove black",
                  objectFit: "contain",
                  width: "150px",
                  height: "150px",
                }}
              ></canvas>
            )}
          </div>
        </div>
      )}
    </>
  );
};
