import { AiOutlineEye, AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { CardItem, CardImg, CardData } from './ImageGalleryItem.styled.';
import { Box } from './../Box/Box';

export const ImageGalleryItem = ({ images, onItemClick }) => {
  return images.map(({ id, webformatURL, tags, views, likes, comments }) => (
    <CardItem key={id} onClick={onItemClick} data-id={id}>
      <CardImg width="270" height="150" src={webformatURL} alt={tags} />
      <Box display="flex" justifyContent="space-around" as="ul" p={2}>
        <CardData>
          <AiOutlineEye />
          {views}
        </CardData>
        <CardData>
          <AiOutlineLike />
          {likes}
        </CardData>
        <CardData>
          <AiOutlineComment />
          {comments}
        </CardData>
      </Box>
    </CardItem>
  ));
};
