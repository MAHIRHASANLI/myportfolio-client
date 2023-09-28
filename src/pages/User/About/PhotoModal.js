import style from "./index.module.css";

const PhotoModal = ({ file, setFile }) => {
  return (
    <div
      className={style.popup_media}
      style={{ display: file ? "block" : "none" }}
    >
      <span onClick={() => setFile(null)} style={{ color: "white" }}>
        &times;
      </span>
      {<img src={file?.image} alt={file?.name} />}
    </div>
  )
}

export default PhotoModal