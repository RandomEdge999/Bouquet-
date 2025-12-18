import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './components/Layout';

function Favorites() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 px-4 text-center">
        <h1 className="text-3xl font-serif text-stone-800 mb-8">Your Collection</h1>
        <p className="text-stone-500">Local favorites coming soon.</p>
        <Link to="/" className="mt-8 inline-block underline text-stone-600 hover:text-rose-600 transition-colors">
          ← Back to Bouquet
        </Link>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
