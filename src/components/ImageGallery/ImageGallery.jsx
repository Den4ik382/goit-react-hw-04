import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ img, handleImageClick }) {
  return (
    <ul className={css.box}>
      {img.map((el) => {
        return (
          <li
            key={el.id}
            onClick={() => {
              handleImageClick(el.urls.full, el.alt_description);
            }}
          >
            <ImageCard imgUrl={el.urls.small} imgAlt={el.alt_description} />
          </li>
        );
      })}
    </ul>
  );
}
