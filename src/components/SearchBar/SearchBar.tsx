import { useState } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { Field, Formik } from 'formik';

interface SearchFormValues {
  query: string;
}
type Props = {
  onSubmit: (value:string) => void,
}

const initialValues: SearchFormValues = {
  query: "",
};

const SearchBar = ({ onSubmit }: Props) => {
  const [notification, setNotification] = useState<boolean>(false);

  const handleSubmit = (values: SearchFormValues, actions:any) => {
    actions.preventDefault();
    if (values.query.trim() === '') {
      setNotification(true);
    } else {
      setNotification(false);
      onSubmit(values.query);
    }
  };

  const notify = () => {
    toast.dismiss();
    toast.error('Поле пошуку не може бути порожнім.');
  };
  return (
    <header className={css.header}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <form className={css.form}>
          <button className={css.btn} type="submit" onClick={notify}>
            <FaSearch className={css.searchIcon} />
          </button>
          <Field
            className={css.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
      </form>
      </Formik>
      {notification && (
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
          }}
        />
      )}
    </header>
  );
};

export default SearchBar;
