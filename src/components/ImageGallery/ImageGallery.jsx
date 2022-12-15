import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Box } from 'components/Box/Box';
import { Modal } from 'components/Modal/Modal';
import { GalleryViewer } from 'components/GalleryViewer/GalleryViewer';
import { LoadMoreBtn, UpBtn } from './ImageGallery.styled';

export function ImageGallery({ totalHits, images, onBtnClick, onBtnUpClick }) {
  const [modalShow, setModalShow] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const onItemClick = e => {
    setModalShow(true);
    setCurrentId(e.currentTarget.dataset.id);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        as="ul"
        gridGap={16}
        mb={4}
      >
        <ImageGalleryItem
          onItemClick={onItemClick}
          images={images}
        ></ImageGalleryItem>
      </Box>
      <Box display="flex" justifyContent="center" mb={4} id="scrollTarget-js">
        {images.length < totalHits && images.length > 11 && (
          <LoadMoreBtn type="button" onClick={onBtnClick}>
            <BsFillArrowDownCircleFill /> Load more
          </LoadMoreBtn>
        )}
        {images.length > 13 && (
          <UpBtn type="button" onClick={onBtnUpClick}>
            Return to top
            <BsFillArrowUpCircleFill />
          </UpBtn>
        )}
      </Box>

      {modalShow && (
        <Modal onClose={closeModal}>
          <GalleryViewer
            currentId={currentId}
            imagesArray={images}
          ></GalleryViewer>
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  totalHits: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  onBtnUpClick: PropTypes.func.isRequired,
};
