import { CurrentPhoto, Photo } from '../App/App.types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type Props = {
  photos:Photo[] | null,
  openModal: () => void,
  setCurrentPhoto:({url, alt}:CurrentPhoto) => void,
}

const ImageGallery = ({ photos, openModal, setCurrentPhoto }:Props) => {
  return (
    <ul className={css.photoList}>
      {Array.isArray(photos) &&
        photos.map(photo => {
          return (
            <li key={photo.id}>
              <ImageCard
                openModal={openModal}
                small={photo.urls.small}
                alt={photo.alt}
                likes={photo.likes}
                urls={photo.urls}
                setCurrentPhoto={setCurrentPhoto}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
