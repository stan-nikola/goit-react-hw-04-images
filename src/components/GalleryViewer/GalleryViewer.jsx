import { useState, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { PropTypes } from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { override } from 'constants/loading-settings';

import {
  ViewerImg,
  ViewerImgPosition,
  NextViewerBtn,
  PrevViewerBtn,
} from './GalleryViewer.styled';

export function GalleryViewer({ currentId, imagesArray }) {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState();
  const [currentImageAlt, setCurrentImageAlt] = useState('');

  const index = imagesArray.findIndex(el => el.id === Number(currentId));

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  useEffect(() => {
    setCurrentImage(imagesArray[currentIndex].largeImageURL);
    setCurrentImageAlt(imagesArray[currentIndex].tags);
  }, [imagesArray, currentIndex]);

  useEffect(() => {
    setLoading(true);
  }, [currentImage]);

  const slideImage = ({ type, payload }) => {
    function changeImageData() {
      setCurrentImage(imagesArray[currentIndex].largeImageURL);
      setCurrentImageAlt(imagesArray[currentIndex].tags);
    }
    switch (type) {
      case 'nextImage':
        setCurrentIndex(prevIndex => prevIndex + payload);
        changeImageData();
        return;

      case 'prevImage':
        setCurrentIndex(prevIndex => prevIndex - payload);
        changeImageData();
        return;

      default:
        throw new Error(`Unsupported action type ${type}`);
    }
  };

  return (
    <>
      <>
        <ViewerImgPosition>
          {currentIndex + 1}/{imagesArray.length}
        </ViewerImgPosition>
        <ViewerImg
          onLoad={() => setLoading(false)}
          onError={() => toast.warn('Ups,something going wrong :(')}
          src={currentImage}
          alt={currentImageAlt}
        />

        <NextViewerBtn
          type="button"
          aria-label="NextViewerBtn"
          onClick={() => slideImage({ type: 'nextImage', payload: 1 })}
          disabled={currentIndex + 1 >= imagesArray.length}
        >
          <FiChevronRight />
        </NextViewerBtn>
        <PrevViewerBtn
          type="button"
          aria-label="PrevViewerBtn"
          onClick={() => slideImage({ type: 'prevImage', payload: 1 })}
          disabled={currentIndex < 1}
        >
          <FiChevronLeft />
        </PrevViewerBtn>
      </>

      <PuffLoader
        cssOverride={override}
        size={60}
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

GalleryViewer.propTypes = {
  imagesArray: PropTypes.array.isRequired,
};
