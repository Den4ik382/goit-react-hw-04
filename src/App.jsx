import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ImageModal from "./components/ImageModal/ImageModal";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NotFound from "./components/NotFound/NotFound";
import { fetchImg, notify } from "./services/Api";

export default function App() {
  const [img, setImg] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loader, setloader] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      {loader === true && <Loader />}
      {error === true && <ErrorMessage />}
      {search === true && <NotFound />}
      {img.length > 0 && (
        <ImageGallery img={img} handleImageClick={handleImageClick} />
      )}

      {img.length > 0 && !loader && <LoadMoreBtn handlePage={handlePage} />}
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
