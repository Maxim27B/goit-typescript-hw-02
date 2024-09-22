import css from './LoadMoreBtn.module.css';

type Props = {
  onLoadMore: () => void,
}
const LoadMoreBtn = ({ onLoadMore }:Props) => {
  return (
    <button className={css.loadBtn} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
