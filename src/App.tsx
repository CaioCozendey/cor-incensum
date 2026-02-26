import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PrayersPage from './pages/PrayersPage';
import PrayerPage from './pages/PrayerPage';
import NovenasPage from './pages/NovenasPage';
import NovenaPage from './pages/NovenaPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';
import RosarioPage from './pages/RosarioPage';
import LeituraPage from './pages/LeituraPage';
import BibliePage from './pages/BibliePage';
import LivrosPage from './pages/LivrosPage';
import SagradoCoracaoPage from './pages/SagradoCoracaoPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sagrado-coracao" element={<SagradoCoracaoPage />} />
            <Route path="/oracoes" element={<PrayersPage />} />
            <Route path="/oracao/:slug" element={<PrayerPage />} />
            <Route path="/novenas" element={<NovenasPage />} />
            <Route path="/novena/:slug" element={<NovenaPage />} />
            <Route path="/favoritas" element={<FavoritesPage />} />
            <Route path="/rosario" element={<RosarioPage />} />
            <Route path="/leitura-do-dia" element={<LeituraPage />} />
            <Route path="/biblia" element={<BibliePage />} />
            <Route path="/livros" element={<LivrosPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
