import { PropagateLoader } from 'react-spinners';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { fetchImages } from 'services/pixabay-api';
import { override } from 'constants/loading-settings';

const scrollTarget = document.getElementById('modal-root');

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, loading } = this.state;
    if (prevState.query !== query) {
      this.setState({ images: [] });
    }
    if (prevState.query !== query || page > prevState.page) {
      try {
        this.setState({ loading: true });
        const images = await fetchImages(query.trim(), page);

        this.setState(state => ({
          images: [...state.images, ...images.hits],
          loading: false,
        }));
        if (loading) {
          setTimeout(() => {
            scrollTarget.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }, 100);
        }
      } catch (error) {
        toast.warn(`${error}`);
        this.setState({ loading: false });
      }
    }
  }
  handleSubmit = query => {
    if (query.trim() === '') {
      toast.warn('Enter search query');
      return;
    }

    this.setState({ query });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loading: true }));
  };
  returnToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery
          images={this.state.images}
          onBtnClick={this.loadMore}
          onBtnUpClick={this.returnToTop}
        />
        <PropagateLoader
          cssOverride={override}
          size={20}
          color={'#36d7b7'}
          loading={this.state.loading}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <ToastContainer />
      </>
    );
  }
}
