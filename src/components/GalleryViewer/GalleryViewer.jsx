import { Component } from 'react';
import { PuffLoader } from 'react-spinners';
import { fetchImagesById } from 'services/pixabay-api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { override } from 'constants/loading-settings';
import {
  ViewerImg,
  ViewerImgPosition,
  NextViewerBtn,
  PrevViewerBtn,
} from './GalleryViewer.styled';

export class GalleryViewer extends Component {
  state = {
    currentId: this.props.currentId,
    currentImage: '',
    loading: false,
    currentIdx: 0,
  };

  async componentDidMount() {
    const { imagesArray } = this.props;
    const index = imagesArray.findIndex(
      el => el.id === Number(this.state.currentId)
    );

    try {
      this.setState({ loading: true });
      const image = await fetchImagesById(this.state.currentId);

      this.setState({
        currentImage: image.hits[0].largeImageURL,
        loading: false,
        currentIdx: index,
      });
    } catch (error) {
      alert(error);
    }
  }

  nextImage = async value => {
    this.setState({
      loading: true,
      currentIdx: this.state.currentIdx + value,
      currentImage: '',
    });

    const idxImageId = this.props.imagesArray[this.state.currentIdx + value];
    try {
      const image = await fetchImagesById(idxImageId.id);

      this.setState({
        currentImage: image.hits[0].largeImageURL,
        loading: false,
      });
    } catch (error) {
      alert(error);
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <>
        <>
          <ViewerImgPosition>
            {this.state.currentIdx + 1}/{this.props.imagesArray.length}
          </ViewerImgPosition>
          <ViewerImg src={this.state.currentImage} alt="image" />
          <NextViewerBtn
            type="button"
            onClick={() => this.nextImage(+1)}
            disabled={
              this.state.currentIdx + 1 >= this.props.imagesArray.length
            }
          >
            <FiChevronRight />
          </NextViewerBtn>
          <PrevViewerBtn
            type="button"
            onClick={() => this.nextImage(-1)}
            disabled={this.state.currentIdx < 1}
          >
            <FiChevronLeft />
          </PrevViewerBtn>
        </>

        <PuffLoader
          cssOverride={override}
          size={60}
          color={'#36d7b7'}
          loading={this.state.loading}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    );
  }
}
