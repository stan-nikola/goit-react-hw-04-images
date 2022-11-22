export const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li key={id}>
      <img width={240} src={webformatURL} alt={tags} />
    </li>
  ));
};
