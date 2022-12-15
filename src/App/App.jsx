import { PropagateLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { fetchImages } from 'services/pixabay-api';
import { override } from 'constants/loading-settings';

const scrollTarget = document.getElementById('modal-root');

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    (async () => {
      setLoading(true);
      const loadedImages = await fetchImages(query, page);
      try {
        setImages(prevImages => [...prevImages, ...loadedImages.hits]);
        setTotalHits(loadedImages.totalHits);
        setLoading(false);
      } catch (error) {
        toast.warn(`${error}`);
      }
    })();
  }, [query, page]);

  useEffect(() => {
    setTimeout(() => {
      scrollTarget.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }, 100);
  }, [loading]);

  const handleSubmit = handleQuery => {
    if (handleQuery === '') {
      toast.warn('Enter search query');
      return;
    }
    if (handleQuery === query) {
      toast.success(`${handleQuery} already finned`);
      return;
    } else {
      setPage(1);
      setImages([]);
    }
    setQuery(handleQuery);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };
  const returnToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery
        images={images}
        totalHits={totalHits}
        onBtnClick={loadMore}
        onBtnUpClick={returnToTop}
      />
      <PropagateLoader
        cssOverride={override}
        size={20}
        color={'#36d7b7'}
        loading={loading}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ToastContainer />
    </>
  );
}
