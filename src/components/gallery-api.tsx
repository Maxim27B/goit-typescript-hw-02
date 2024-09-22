import axios from 'axios';
import { Photo } from './App/App.types';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    Authorization: 'Client-ID wd1bdipkEtNjAx-zjCaDYCk9jeCG1Bp4TaQBgXu7zEI',
  },
});

type ApiResponse = {
  results: Photo[],
  total_pages: number,
  total: number,
}

const fetchPhotosWithTopic = async (topic: string, page:number):(Promise<ApiResponse> ) => {
  const response = await instance.get<ApiResponse>(
    `?query=${topic}&orientation=squarish&per_page=12&page=${page}`
  );
  return response.data;
};

export default fetchPhotosWithTopic;
