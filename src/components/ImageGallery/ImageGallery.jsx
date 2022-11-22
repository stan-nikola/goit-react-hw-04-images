import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ onClick, images }) => {
  return (
    <>
      <ul className="gallery">
        <ImageGalleryItem images={images}></ImageGalleryItem>
      </ul>
      {images.length > 0 && (
        <button type="button" onClick={onClick}>
          More Photo
        </button>
      )}
    </>
  );
};
