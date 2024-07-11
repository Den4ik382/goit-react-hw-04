import css from "./LoadMoreBtn.module.css";
export default function LoadMoreBtn({ handlePage }) {
  return (
    <div>
      <button
        onClick={() => {
          handlePage();
        }}
        className={css.btnLoad}
      >
        Load more
      </button>
    </div>
  );
}
