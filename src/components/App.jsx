import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Searchbar } from './Searchbar.js';
import { ImageGallery } from './ImageGallery.js';
import { ImageGalleryItem } from './ImageGalleryItem.js';
import { Button } from './Button.js';
import { Modal } from './Modal.js';
import css from '../styles.module.css';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = () => {
    const apiKey = '38965444-221e39e59f698a8ee4d2c4c8b';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    setIsLoading(true);
    setError(null);

    axios
      .get(url)
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          setError("We don't have any photos for your request");
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(totalHits);
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

  const shouldRenderLoadMoreButton = images.length < totalHits;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={handleImageClick}
          />
        ))}
      </ImageGallery>
      {isLoading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      {shouldRenderLoadMoreButton && <Button onClick={handleLoadMoreClick} />}
      {showModal && (
        <Modal largeImageURL={modalImageURL} onClose={handleCloseModal} />
      )}
      {error && <h1 className={css.error}>{error}</h1>}
    </div>
  );
}
