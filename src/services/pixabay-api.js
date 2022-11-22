import axios from 'axios';

const API_KEY = '30789164-35a7cf56b7677b8602e966f0f';

const config = {
  responseType: 'json',
  baseURL: 'https://pixabay.com/api',
};

export const fetchImages = async (query, page) => {
  const response = await axios(
    `/?key=${API_KEY}&q=${query}&per_page=12&page=${page}&image_type=photo&orientation=horizontal`,
    config
  );
  return response.data;
};
