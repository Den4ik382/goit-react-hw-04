import css from "./ImageCard.module.css";
export default function ImageCard({ imgUrl, imgAlt }) {
  return (
    <div>
      <img src={imgUrl} alt={imgAlt} className={css.img} />
    </div>
  );
}
