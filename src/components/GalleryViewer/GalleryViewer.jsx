import { Component } from 'react';
import { RotateLoader } from 'react-spinners';
import { fetchImagesById } from 'services/pixabay-api';

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

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
      console.log(image.hits[0]);
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
    });

    console.log(this.state.currentIdx);
    const idxImageId = this.props.imagesArray[this.state.currentIdx + value];
    console.log(idxImageId);
    try {
      const image = await fetchImagesById(idxImageId.id);
      console.log(image);

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
        <div>
          <p>
            {this.state.currentIdx}/{this.props.imagesArray.length}
          </p>
          <img src={this.state.currentImage} width={300} alt="" />
          <button
            type="button"
            onClick={() => this.nextImage(+1)}
            disabled={
              this.state.currentIdx + 1 >= this.props.imagesArray.length
            }
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => this.nextImage(-1)}
            disabled={this.state.currentIdx < 1}
          >
            Prev
          </button>
        </div>

        <RotateLoader
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
