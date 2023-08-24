import s from "./style.module.css";
import { SMALL_IMAGE_COVER_BASE_URL } from "../../config";

const MAX_TITLE_CHAR = 20;
export function TVShowListItem({ tvShow, onClick }) {
  const onClick_ = () => {
    onClick(tvShow);
  };

  return (
    <div onClick={onClick_} className={s.container}>
      <img
        alt={tvShow.name}
        src={SMALL_IMAGE_COVER_BASE_URL + tvShow.backdrop_path}
        className={s.image}
      />
      <div className={s.title}>
        {tvShow?.name?.length > MAX_TITLE_CHAR
          ? tvShow.original_title.slice(0, MAX_TITLE_CHAR) + "..."
          : tvShow.original_title}
      </div>
    </div>
  );
}
