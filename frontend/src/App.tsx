import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PageNotFound from './pages/PageNotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
