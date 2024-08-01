import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store/store';
import { addFavorite, removeFavorite } from './store/FavoritesActions';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

const AppContent = () => {
  const user = useSelector((state) => state.auth ? state.auth.user : null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const location = useLocation();

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
    if (user) {
      setShowFavorites(!showFavorites);
    } else {
      alert("You need to login to view favorites");
    }
  };
  
const shouldShowHeader = !['/login', '/register'].includes(location.pathname);

  return (
    <Provider store={store}>
        <div className="App">
          <Navbar bg="dark" variant="dark" expand="lg" className='navbar-home'>
            <Navbar.Brand href="/">Book Finder</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/" onClick={() => setShowFavorites(false)}>Home</Nav.Link>
                <Nav.Link href="#" onClick={toggleFavorites}>
                  {showFavorites ? 'Search Books' : 'View Favorites'}
                </Nav.Link>
                <Nav.Link>
                  {user ? (
                    <>
                      <span className="welcome-message">Welcome, {user.email}!</span>
                      <Logout />
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="link-login">Login</Link>
                      <Link to="/register" className="link-register">Register</Link>
                    </>
                  )}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <header className="App-header">
            {shouldShowHeader && (
          <>
            <h1>{showFavorites ? 'Favorite Books' : 'Book List'}</h1>
            {!showFavorites && <SearchBar onSearch={handleSearch} />} {/* Hanya tampilkan SearchBar jika bukan di halaman favorit */}
          </>
        )}
            <Container>
              <Routes>
                <Route path="/" element={
                  <>
                    {showFavorites ? (
                      user ? (
                        <BookList
                          books={favorites}
                          loading={loading}
                          error={error}
                          favorites={favorites}
                          addFavorite={handleAddFavorite}
                          removeFavorite={handleRemoveFavorite}
                        />
                      ) : (
                        <Login />
                      )
                    ) : (
                      <BookList
                        books={books.length > 0 ? books : recommendedBooks}
                        loading={loading}
                        error={error}
                        favorites={favorites}
                        addFavorite={handleAddFavorite}
                        removeFavorite={handleRemoveFavorite}
                      />
                    )}
                  </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Container>
          </header>
        </div>
    </Provider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;