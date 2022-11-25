import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Box } from 'components/Box/Box';
import { Modal } from 'components/Modal/Modal';
import { GalleryViewer } from 'components/GalleryWiewer/GalleryWiewer';

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
        <Box display="flex" flexWrap="wrap" as="ul" gridGap={16}>
          <ImageGalleryItem
            onItemClick={this.onItemClick}
            images={this.props.images}
          ></ImageGalleryItem>
        </Box>

        {this.props.images.length > 0 && (
          <button type="button" onClick={this.props.onkBtnClick}>
            More Photo
          </button>
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
