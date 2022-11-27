import { Component } from 'react';
import { PuffLoader } from 'react-spinners';
import { fetchImagesById } from 'services/pixabay-api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { currentId } = this.state;
    const { imagesArray } = this.props;

    const index = imagesArray.findIndex(el => el.id === Number(currentId));

    try {
      this.setState({ loading: true });
      const image = await fetchImagesById(currentId);

      this.setState({
        currentImage: image.hits[0].largeImageURL,
        loading: false,
        currentIdx: index,
      });
    } catch (error) {
      toast(`${error}`);
    }
  }

  nextImage = async value => {
    const { imagesArray } = this.props;
    const { currentIdx } = this.state;

    this.setState({
      loading: true,
      currentIdx: currentIdx + value,
      currentImage: '',
    });

    const idxImageId = imagesArray[currentIdx + value];
    try {
      const image = await fetchImagesById(idxImageId.id);

      this.setState({
        currentImage: image.hits[0].largeImageURL,
        loading: false,
      });
    } catch (error) {
      toast.warn(error);
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    const { imagesArray } = this.props;
    const { currentIdx, currentImage, loading } = this.state;
    return (
      <>
        <>
          <ViewerImgPosition>
            {currentIdx + 1}/{imagesArray.length}
          </ViewerImgPosition>
          <ViewerImg src={currentImage} alt="image" />
          <NextViewerBtn
            type="button"
            aria-label="NextViewerBtn"
            onClick={() => this.nextImage(+1)}
            disabled={currentIdx + 1 >= imagesArray.length}
          >
            <FiChevronRight />
          </NextViewerBtn>
          <PrevViewerBtn
            type="button"
            aria-label="PrevViewerBtn"
            onClick={() => this.nextImage(-1)}
            disabled={currentIdx < 1}
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
}
