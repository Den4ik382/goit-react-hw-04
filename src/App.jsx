import toast, { Toaster } from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import css from "./App.module.css";
import ImageModal from "./components/ImageModal/ImageModal";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
export default function App() {
  const [img, setImg] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loader, setloader] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  axios.defaults.baseURL = "https://api.unsplash.com/";

  const notify = () =>
    toast("Text must be entered to search for images.", {
      style: {
        border: "1px solid black",
        color: "red",
      },
    });
  const onSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      notify();
      return;
    }
    setImg([]);
    setPage(1);
    setQuery(searchQuery);
    setError(false);
  };
  const handlePage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (query === "") {
      return;
    }

    const fetchImg = async (number, searchQuery) => {
      // try {
      const response = await axios.get("search/photos", {
        params: {
          client_id: "15wgyaekuwfQchIVoE3QhgA-HRNMHb0mlcQDMiWXYQY",
          page: number,
          per_page: 12,
          query: searchQuery,
        },
      });
      return response.data.results;
    };

    const getImage = async () => {
      try {
        setloader(true);
        setSearch(false);
        const dataFetch = await fetchImg(page, query);
        console.log(dataFetch);
        setImg((prevImg) => [...prevImg, ...dataFetch]);
        if (dataFetch.length === 0) {
          setSearch(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setloader(false);
      }
    };

    getImage();
  }, [page, query]);

  const handleImageClick = (imgUrl, imgAlt) => {
    if (!selectedImage || selectedImage.imgUrl !== imgUrl) {
      setSelectedImage({ imgUrl, imgAlt });
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {loader === true && (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      )}
      {error === true && (
        <p>Oops! There was an error, please reload this page!</p>
      )}
      {search === true && <h1>Sorry, nothing was found</h1>}
      {img.length > 0 && (
        <ImageGallery img={img} handleImageClick={handleImageClick} />
      )}
      {img.length > 0 && !loader && (
        <button onClick={handlePage} className={css.btnLoad}>
          Load more
        </button>
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onRequestClose={handleCloseModal}
        imgUrl={selectedImage?.imgUrl}
        imgAlt={selectedImage?.imgAlt}
      />
      <Toaster />
    </div>
  );
}
