import { FiveStarRating } from "../fiveStarRating/FiveStarRating";
import s from "./style.module.css";

export function TVShowDetails({ tvShow }) {
  const rating = (tvShow.vote_average / 2).toFixed(1);
  return (
    <div>
      <div className={s.title}>{tvShow.original_title}</div>
      <div className={s.rating_container}>
        <FiveStarRating rating={rating} />
        <span className={s.rating}>{rating}/5</span>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </div>
  );
}
