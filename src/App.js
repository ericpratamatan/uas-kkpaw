import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store/store';
import { addFavorite, removeFavorite } from './store/FavoritesActions';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://openlibrary.org/subjects/recommendations.json?limit=12'); //membatasi jumlah buku tampilan awal
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRecommendedBooks(result.works || result.docs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, []);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=24`); //membatasi jumlah buku yang tampil setelah melakukan pencarian
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setBooks(result.docs);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    fetchBooks(query);
  };

  const handleAddFavorite = (book) => {
    dispatch(addFavorite(book));
    console.log(`Action: ADD, Book: ${book.title}`);
  };

  const handleRemoveFavorite = (book) => {
    dispatch(removeFavorite(book));
    console.log(`Action: REMOVE, Book: ${book.title}`);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark" expand="lg" className='navbar-home'>
            <Navbar.Brand href="/">Book Finder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" onClick={() => setShowFavorites(false)}>Home</Nav.Link>
                <Nav.Link href="#" onClick={toggleFavorites}>
                  {showFavorites ? 'Search Books' : 'View Favorites'}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <header className="App-header">
            <h1>{showFavorites ? 'Favorite Books' : 'Book List'}</h1>
            <SearchBar onSearch={handleSearch} />
            <Container>
              <Routes>
                <Route path="/" element={
                  <>
                    <BookList
                      books={showFavorites ? favorites : (books.length > 0 ? books : recommendedBooks)}
                      loading={loading}
                      error={error}
                      favorites={favorites}
                      addFavorite={handleAddFavorite}
                      removeFavorite={handleRemoveFavorite}
                    />
                  </>
                } />
              </Routes>
            </Container>
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
