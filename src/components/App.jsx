import { PropagateLoader } from 'react-spinners';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/pixabay-api';

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

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

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery images={this.state.images} onkBtnClick={this.loadMore} />
        <PropagateLoader
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
