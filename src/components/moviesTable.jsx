import React from 'react';
import Like from './common/like';
import { Link } from 'react-router-dom';

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th onClick={() => onSort('title')}>
            <span className='clickable'>Title</span>
          </th>
          <th onClick={() => onSort('genre.name')}>
            <span className='clickable'>Genre</span>
          </th>
          <th onClick={() => onSort('numbersInStock')}>
            <span className='clickable'>Stock</span>
          </th>
          <th onClick={() => onSort('dailyRentalRate')}>
            <span className='clickable'>Rate</span>
          </th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button onClick={() => onDelete(movie.id)} className='btn btn-danger btn-sm'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
