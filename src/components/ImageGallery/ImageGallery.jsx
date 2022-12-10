import { Component } from 'react';
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

export class ImageGallery extends Component {
  state = { modalShow: false, currentId: '' };

  onItemClick = e => {
    this.setState({ modalShow: true, currentId: e.currentTarget.dataset.id });
  };
  closeModal = () => {
    this.setState({ modalShow: false });
  };
  render() {
    const { totalHits, images, onBtnClick, onBtnUpClick } = this.props;
    const { modalShow, currentId } = this.state;
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
            onItemClick={this.onItemClick}
            images={images}
          ></ImageGalleryItem>
        </Box>
        <Box display="flex" justifyContent="center" mb={4} id="scrollTarget-js">
          {images.length < totalHits && images.length > 11 && (
            <LoadMoreBtn type="button" onClick={onBtnClick}>
              <BsFillArrowDownCircleFill /> Load more
            </LoadMoreBtn>
          )}
          {images.length > 6 && (
            <UpBtn type="button" onClick={onBtnUpClick}>
              Return to top
              <BsFillArrowUpCircleFill />
            </UpBtn>
          )}
        </Box>

        {modalShow && (
          <Modal onClose={this.closeModal}>
            <GalleryViewer
              currentId={currentId}
              imagesArray={images}
            ></GalleryViewer>
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  totalHits: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  onBtnUpClick: PropTypes.func.isRequired,
};
