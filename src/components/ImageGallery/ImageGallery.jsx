import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Box } from 'components/Box/Box';
import { Modal } from 'components/Modal/Modal';
import { GalleryViewer } from 'components/GalleryViewer/GalleryViewer';
import { LoadMoreBtn } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = { modalShow: false, currentId: '' };

  onItemClick = e => {
    this.setState({ modalShow: true, currentId: e.currentTarget.dataset.id });
  };
  closeModal = () => {
    this.setState({ modalShow: false });
  };
  render() {
    return (
      <>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          as="ul"
          gridGap={16}
        >
          <ImageGalleryItem
            onItemClick={this.onItemClick}
            images={this.props.images}
          ></ImageGalleryItem>
        </Box>

        {this.props.images.length > 0 && (
          <LoadMoreBtn type="button" onClick={this.props.onkBtnClick}>
            Load more
          </LoadMoreBtn>
        )}
        {this.state.modalShow && (
          <Modal onClose={this.closeModal}>
            <GalleryViewer
              currentId={this.state.currentId}
              imagesArray={this.props.images}
            ></GalleryViewer>
          </Modal>
        )}
      </>
    );
  }
}
