import React, { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetails } from "./components/TvShowDetails/TVShowdetails";
import { Logo } from "./components/Logo/Logo";
import LogoImg from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Dropdown } from "react-bootstrap";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [genTitle, setGenTitle] = useState("You'll probably like :");
  const [movieList, setMovieList] = useState([]);

  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  const [genre, setGenre] = useState([]);

  async function fetchGenre() {
    try {
      const genreList = await TVShowAPI.fetchGenre();
      setGenre(genreList.genres);
      // console.log(genreList);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendationListResp.length > 0) {
        setMovieList(recommendationListResp.slice(0, 10));
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  async function fetchByGenre(genreId) {
    console.log(genreId);
    try {
      const moviesByGenre = await TVShowAPI.fetchByGenre(genreId);
      if (moviesByGenre.map((item) => item.genre_ids)) {
        setMovieList(moviesByGenre);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  async function fetchByTitle(title) {
    try {
      setGenTitle("You'll probably like :");
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  function updateCurrentTvShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow || !genTitle) {
      fetchRecommendations(currentTVShow.id);
      //new Code
    }
  }, [currentTVShow]);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              img={LogoImg}
              title="watch"
              subtitle="Find a movie you may like"
            />
          </div>
          <div
            className="col-md-12 col-lg-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SearchBar onSubmit={fetchByTitle} />
            <Dropdown onSelect={fetchGenre}>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#d9d9d96e",
                  border: "none",
                  width: "80px",
                }}
                id="dropdown-basic"
              >
                Genre
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  backgroundColor: "#d9d9d9",
                  height: "150px",
                  overflow: "scroll",
                }}
                className={s.genrescroll}
              >
                {genre &&
                  genre.map((item) => (
                    <Dropdown.Item
                      onClick={() => {
                        fetchByGenre(item.id);
                        setGenTitle(item.name);
                      }}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetails tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_tv_shows}>
        {movieList && (
          <TVShowList
            onClickItem={updateCurrentTvShow}
            tvShowList={movieList}
            // grmMovie
            genTitle={genTitle}
          />
        )}
      </div>
    </div>
  );
}
