import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../styles.module.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please write something', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <ToastContainer />

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
