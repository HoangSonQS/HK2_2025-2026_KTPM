import React, { useState, useEffect, useRef } from 'react';
import api from './api';
import { 
  Film, User, Ticket, LogOut, Loader2, CheckCircle2, 
  XCircle, Clock, Shield, Plus, Edit2, Trash2, CreditCard, Bell, ChevronRight
} from 'lucide-react';

// --- Components ---

const SeatMap = ({ onSelect, selectedSeat, occupiedSeats }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="seat-screen"></div>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stage / Screen</div>
      
      <div className="seat-grid">
        {rows.map(row => (
          cols.map(col => {
            const id = `${row}${col}`;
            const isOccupied = occupiedSeats.includes(id);
            const isSelected = selectedSeat === id;
            
            return (
              <div 
                key={id} 
                className={`seat ${isOccupied ? 'occupied' : (isSelected ? 'selected' : 'available')}`}
                onClick={() => !isOccupied && onSelect(id)}
              >
                {row}{col}
              </div>
            );
          })
        ))}
      </div>

      <div className="seat-legend">
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}></div> Available</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--primary)' }}></div> Selected</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(255,255,255,0.1)' }}></div> Occupied</div>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`glass toast ${type === 'success' ? 'status-confirmed' : 'status-failed'}`}>
      {type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};

function App() {
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('cinema_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingStep, setBookingStep] = useState('select-seat'); 
  const [seatNumber, setSeatNumber] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;
  
  const [toasts, setToasts] = useState([]);
  const [movieForm, setMovieForm] = useState({ id: null, title: '', description: '', price: '' });
  const [showMovieForm, setShowMovieForm] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('cinema_user', JSON.stringify(activeUser));
      fetchBookings();
    } else {
      localStorage.removeItem('cinema_user');
      setBookings([]);
    }
  }, [activeUser]);

  const prevBookingsRef = useRef([]);
  useEffect(() => {
    bookings.forEach(booking => {
      const prev = prevBookingsRef.current.find(b => b.id === booking.id);
      if (prev && prev.status === 'PENDING' && booking.status === 'FAILED') {
        addToast(`Order #${booking.id} was rejected. Please try another seat.`, 'error');
      }
    });
    prevBookingsRef.current = bookings;
  }, [bookings]);

  // Removed automatic polling to prevent continuous Gateway load as per user request.
  // Bookings will refresh on login and manually via UI.

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authMode === 'register') {
        await api.post('/users/register', formData);
        addToast('Sign up successful! Welcome to the club.', 'success');
        setAuthMode('login');
      } else {
        const res = await api.post(`/users/login?username=${formData.username}&password=${formData.password}`);
        setActiveUser(res.data);
        addToast(`Glad to see you, ${res.data.username}!`);
      }
    } catch (e) {
      addToast(e.response?.data?.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async () => {
    setBookingStep('processing');
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    
    try {
      const res = await api.post('/bookings', {
        userId: activeUser.id,
        movieId: selectedMovie.id,
        seatNumber: seatNumber
      });
      setBookings([res.data, ...bookings]);
      addToast('Booking request sent! Verifying seat allocation...', 'success');
      setSelectedMovie(null);
      setSeatNumber('');
      setBookingStep('select-seat');

      // Smart Polling: Poll every 2s for the next 10s only after a booking
      let count = 0;
      const tempInterval = setInterval(() => {
        fetchBookings();
        count++;
        if (count >= 5) clearInterval(tempInterval);
      }, 2000);

    } catch (e) {
      addToast('Transaction failed', 'error');
      setBookingStep('payment');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (movieForm.id) {
        await api.put(`/movies/${movieForm.id}`, movieForm);
        addToast(`Updated: ${movieForm.title}`);
      } else {
        await api.post('/movies', movieForm);
        addToast(`Added: ${movieForm.title}`);
      }
      fetchMovies();
      setShowMovieForm(false);
      setMovieForm({ id: null, title: '', description: '', price: '' });
    } catch (e) {
      addToast('Error saving movie', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Remove this movie from catalog?')) return;
    setLoading(true);
    try {
      await api.delete(`/movies/${id}`);
      addToast('Movie removed');
      fetchMovies();
    } catch (e) {
      addToast('Deletion failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Occupied seats for current selected movie
  const getOccupiedSeats = () => {
    if (!selectedMovie) return [];
    // This is simple: in real app would filter by movie ID and status CONFIRMED
    return bookings.map(b => b.seatNumber);
  };

  // --- Render Helpers ---

  if (!activeUser) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
        <div className="glass" style={{ padding: '3.5rem', width: '100%', maxWidth: '450px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="glass" style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', color: 'white' }}>
              <Film size={32} />
            </div>
            <h2 style={{ fontSize: '2rem' }}>{authMode === 'login' ? 'CinemaMagic' : 'Join Us'}</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {authMode === 'login' ? 'Login to browse and book movies' : 'Create an account to start booking'}
            </p>
          </div>
          <form onSubmit={handleAuth}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Username</label>
              <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="Enter your username" />
            </div>
            {authMode === 'register' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email Address</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" />
              </div>
            )}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Password</label>
              <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
            </div>
            <button className="primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : (authMode === 'login' ? 'Continue' : 'Create Account')}
            </button>
          </form>
          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>{authMode === 'login' ? "New here?" : "Already member?"} </span>
            <button style={{ background: 'none', color: 'var(--primary)', padding: '0', fontSize: '0.9rem' }} onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'Register Account' : 'Sign In'}
            </button>
          </div>
        </div>
        <div className="toast-container">
          {toasts.map(t => <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Toast System */}
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />)}
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5rem', padding: '1rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="glass" style={{ padding: '0.5rem', background: 'var(--primary)' }}><Film size={24} /></div>
          <h1 style={{ fontSize: '1.75rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CinemaMagic</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="secondary" onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? <User size={18} /> : <Shield size={18} />}
            {isAdmin ? 'User Mode' : 'Admin Mode'}
          </button>
          <div className="glass" style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '700' }}>{activeUser.username}</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{isAdmin ? 'ADMINISTRATOR' : 'PREMIUM USER'}</p>
            </div>
            <button style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--error)', padding: '0.4rem' }} onClick={() => setActiveUser(null)}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {isAdmin ? (
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem' }}>Movie Catalog</h2>
              <p style={{ color: 'var(--text-muted)' }}>Manage the movies available for your users</p>
            </div>
            <button className="primary" onClick={() => { setMovieForm({ id: null, title: '', description: '', price: '' }); setShowMovieForm(true); }}>
              <Plus size={20} /> Add New Movie
            </button>
          </div>

          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="glass movie-card">
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{movie.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{movie.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>${movie.price}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="secondary" style={{ padding: '0.5rem' }} onClick={() => { setMovieForm(movie); setShowMovieForm(true); }}><Edit2 size={18} /></button>
                    <button className="danger" style={{ padding: '0.5rem' }} onClick={() => handleDeleteMovie(movie.id)}><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span className="status-badge status-confirmed" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', marginBottom: '1.5rem', display: 'inline-block' }}>Exclusive Premieres</span>
            <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1' }}>Experience Cinema<br/>Like Never Before.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Book your tickets in seconds with our state-of-the-art event-driven system. Fast, reliable, and seamless.
            </p>
          </section>

          {bookings.filter(b => b.userId === activeUser?.id).length > 0 && (
            <section id="bookings" style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Ticket className="text-primary" /> My Bookings
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="secondary" onClick={fetchBookings} style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }}>
                    <Clock size={16} /> Refresh
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {bookings
                  .filter(b => b.userId === activeUser?.id)
                  .sort((a, b) => b.id - a.id)
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map(booking => (
                  <div key={booking.id} className="glass" style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                      <div className="glass" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)' }}><Ticket size={24} /></div>
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>Booking #{booking.id}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Seat Allocation: {booking.seatNumber}</p>
                      </div>
                    </div>
                    <div>
                      {booking.status === 'PENDING' && (
                        <div className="status-badge status-pending" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Loader2 size={14} className="animate-spin" /> Verifying Order
                        </div>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <div className="status-badge status-confirmed" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={14} /> Confirmed
                        </div>
                      )}
                      {booking.status === 'FAILED' && (
                        <div className="status-badge status-failed" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <XCircle size={14} /> Rejected
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {bookings.filter(b => b.userId === activeUser?.id).length > PAGE_SIZE && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    className="secondary" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Page {currentPage} of {Math.ceil(bookings.filter(b => b.userId === activeUser?.id).length / PAGE_SIZE)}
                  </span>
                  <button 
                    className="secondary" 
                    disabled={currentPage >= Math.ceil(bookings.filter(b => b.userId === activeUser?.id).length / PAGE_SIZE)}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          )}

          <div style={{ marginBottom: '3rem' }}>
             <h2 style={{ fontSize: '2.5rem' }}>Available Movies</h2>
             <p style={{ color: 'var(--text-muted)' }}>Select a movie to start booking your experience</p>
          </div>

          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="glass movie-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedMovie(movie)}>
                <div style={{ width: '100%', height: '350px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Film size={64} style={{ opacity: 0.2 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{movie.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{movie.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>${movie.price}</span>
                  <button className="primary">Book Ticket</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Booking Modal Flow */}
      {selectedMovie && (
        <div className="modal-overlay">
          <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '550px' }}>
            {bookingStep === 'select-seat' && (
              <>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700' }}>
                   STEP 1 <ChevronRight size={14} /> SEATING
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{selectedMovie.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Select your preferred seat to proceed to payment.</p>
                
                <SeatMap 
                  onSelect={setSeatNumber} 
                  selectedSeat={seatNumber} 
                  occupiedSeats={getOccupiedSeats()} 
                />

                <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                  <button type="button" className="secondary" style={{ flex: 1 }} onClick={() => { setSelectedMovie(null); setSeatNumber(''); }}>Cancel</button>
                  <button 
                    className="primary" 
                    style={{ flex: 1 }} 
                    disabled={!seatNumber}
                    onClick={() => setBookingStep('payment')}
                  >
                    Confirm Selection
                  </button>
                </div>
              </>
            )}

            {bookingStep === 'payment' && (
              <>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: '700' }}>
                   STEP 2 <ChevronRight size={14} /> PAYMENT
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Complete Transaction</h3>
                <div className="glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Ticket Price</span>
                    <span style={{ fontWeight: '700' }}>${selectedMovie.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>Total Amount</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)' }}>${selectedMovie.price}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="secondary" style={{ flex: 1 }} onClick={() => setBookingStep('select-seat')}>Back</button>
                  <button className="primary" style={{ flex: 2 }} onClick={confirmPayment}>
                    <CreditCard size={18} /> Pay & Confirm Booking
                  </button>
                </div>
              </>
            )}

            {bookingStep === 'processing' && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 2rem' }}><CreditCard size={48} /></div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Processing Payment</h3>
                <p style={{ color: 'var(--text-muted)' }}>Please do not refresh the page. We are finalizing your secure transaction...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Movie Form Modal */}
      {showMovieForm && (
        <div className="modal-overlay">
          <form className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }} onSubmit={handleSaveMovie}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>{movieForm.id ? 'Edit Movie' : 'Add New Movie'}</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Title</label>
              <input type="text" required value={movieForm.title} onChange={e => setMovieForm({...movieForm, title: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
              <textarea style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '0.75rem', width: '100%', minHeight: '100px' }} 
                required value={movieForm.description} onChange={e => setMovieForm({...movieForm, description: e.target.value})} />
            </div>
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Price ($)</label>
              <input type="number" step="0.01" required value={movieForm.price} onChange={e => setMovieForm({...movieForm, price: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" className="secondary" style={{ flex: 1 }} onClick={() => setShowMovieForm(false)}>Cancel</button>
              <button className="primary" style={{ flex: 2 }} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Save Movie'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <footer style={{ marginTop: '10rem', paddingBottom: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>&copy; 2026 CinemaMagic Engine. Event-Driven Microservices Demo.</p>
      </footer>
    </div>
  );
}

export default App;
