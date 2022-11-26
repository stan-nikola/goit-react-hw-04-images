import { BounceLoader } from 'react-spinners';
import { Component } from 'react';
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
    if (prevState.query !== this.state.query) {
      this.setState({ images: [] });
    }
    if (
      prevState.query !== this.state.query ||
      this.state.page > prevState.page
    ) {
      const { query, page } = this.state;

      try {
        this.setState({ loading: true });
        const images = await fetchImages(query.trim(), page);

        this.setState(state => ({
          images: [...state.images, ...images.hits],
          loading: false,
        }));
        if (this.state.loading) {
          setTimeout(() => {
            scrollTarget.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }, 100);
        }
      } catch (error) {
        this.setState({ loading: false });
        alert(error);
      }
    }
  }
  handleSubmit = query => {
    if (query.trim() === '') {
      alert('Enter search query');
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
          onkBtnClick={this.loadMore}
          onkBtnUpClick={this.returnToTop}
        />
        <BounceLoader
          cssOverride={override}
          size={20}
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
