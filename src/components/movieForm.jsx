import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import logger from '../services/logService';

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      movie: { id: '', title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
      genres: [],
      errors: {},
    };
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  render() {
    if (!this.state.isLoaded) return <p>Loading...</p>;

    return (
      <React.Fragment>
        <h1>{this.state.movie.id === '' ? 'New movie' : 'Edit Movie '}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name='title'
              value={this.state.movie.title}
              onChange={this.handleChange}
              placeholder='Enter movie title'
            />
            {this.state.errors.title && (
              <Form.Text className='text-danger'>{this.state.errors.title}</Form.Text>
            )}
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId='genreId'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as='select'
                name='genreId'
                value={this.state.movie.genreId}
                onChange={this.handleChange}>
                <option value='' />
                {this.state.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
              {this.state.errors.genreId && (
                <Form.Text className='text-danger'>{this.state.errors.genreId}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='numberInStock'>
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type='number'
                name='numberInStock'
                value={this.state.movie.numberInStock}
                onChange={this.handleChange}
              />
              {this.state.errors.numberInStock && (
                <Form.Text className='text-danger'>{this.state.errors.numberInStock}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='dailyRentalRate'>
              <Form.Label>Rate</Form.Label>
              <Form.Control
                name='dailyRentalRate'
                value={this.state.movie.dailyRentalRate}
                onChange={this.handleChange}
                placeholder='Enter daily rental rate'
              />
              {this.state.errors.dailyRentalRate && (
                <Form.Text className='text-danger'>{this.state.errors.dailyRentalRate}</Form.Text>
              )}
            </Form.Group>
          </Form.Row>

          <Button type='submit'>Save</Button>
        </Form>
      </React.Fragment>
    );
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === 'new') {
      this.setState({ isLoaded: true });
      return;
    }

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ movie: this.mapToModelView(movie), isLoaded: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  }

  mapToModelView = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    if (errors) {
      console.log('Errors', errors);
      return;
    }

    const movie = this.state.movie;
    await saveMovie(movie);
    this.props.history.push('/movies');
  };

  handleChange = (event) => {
    const movie = this.state.movie;
    movie[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ movie });
  };

  validateForm = () => {
    const errors = {};
    const movie = this.state.movie;

    const title = movie.title;
    if (title === '') errors.title = 'Title is required';
    if (title.length < 5) errors.title = 'Tile must be at least 5 characters long';

    if (movie.genreId === '') errors.genreId = 'Genre is required';

    const numberInStock = movie.numberInStock;
    if (numberInStock === '') errors.numberInStock = 'In Stock is required';
    if (isNaN(numberInStock)) errors.numberInStock = 'Must be a number';
    if (numberInStock < 0 || numberInStock > 100) errors.numberInStock = 'Must be from 0 to 100';

    const dailyRentalRate = movie.dailyRentalRate;
    if (dailyRentalRate === '') errors.dailyRentalRate = 'Rate is required';
    if (isNaN(parseFloat(dailyRentalRate))) errors.dailyRentalRate = 'Must be a number';
    if (dailyRentalRate < 0 || dailyRentalRate > 10)
      errors.dailyRentalRate = 'Must be from 0 to 10';

    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  };
}

export default MovieForm;
