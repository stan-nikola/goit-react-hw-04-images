export const ImageGalleryItem = ({ images, onItemClick }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li key={id} onClick={onItemClick} data-id={id}>
      <img width={240} src={webformatURL} alt={tags} />
    </li>
  ));
};
