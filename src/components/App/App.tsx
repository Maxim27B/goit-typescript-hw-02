
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import fetchPhotosWithTopic from '../gallery-api';
import { FormEvent, useEffect, useState } from 'react';
import { CurrentPhoto, Photo } from './App.types';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPhoto, setCurrentPhoto] = useState<CurrentPhoto>({
    url: '',
    alt: '',
  });

  useEffect(() => {
    async function fetchPhotos(query:string):Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        if (inputValue === '') return;
        const data = await fetchPhotosWithTopic(query, currentPage);
        if (totalPages < currentPage) return;
        if (data.results.length === 0) {
          setError(true);
        } else {
          setPhotos((prev:null | Photo[]):Photo[] =>
            currentPage === 1 ? data.results : [...prev, ...data.results]
          );
          setTotalPages(data.total_pages);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos(inputValue);
  }, [inputValue, currentPage, totalPages]);

  const onSubmit = (query: string): void => {
    setInputValue(query);
    setCurrentPage(1);
  };

  const onLoadMore = ():void => {
    setCurrentPage(currentPage + 1);
  };

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [modalIsOpen]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery
          photos={photos}
          setCurrentPhoto={setCurrentPhoto}
          openModal={openModal}
        />
      )}
      {totalPages < currentPage && (
        <p
          style={{
            color: 'red',
            margin: 'auto',
            width: '500px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          За вашим запитом не знайдено більше фотографій
        </p>
      )}
      {Array.isArray(photos) && photos.length === 0 && (
        <p style={{ color: 'red', margin: 'auto', width: '500px' }}>
          За вашим запитом не знайдено фотографій, спробуйте ще раз
        </p>
      )}
      {isLoading && <Loader />}
      {Array.isArray(photos) && photos.length > 0 && !error && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentPhoto={currentPhoto}
        />
      )}
    </div>
  );
};
export default App;
