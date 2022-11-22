import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/pixabay-api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };

  handleSubmit = query => {
    if (query.trim() === '') {
      alert('Enter search query');
      return;
    }

    this.setState({ query });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      this.state.page > prevState.page
    ) {
      const { query, page } = this.state;

      try {
        const images = await fetchImages(query.trim(), page);
        this.setState(state => ({ images: [...state.images, ...images.hits] }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} onClick={this.loadMore} />
      </>
    );
  }
}
