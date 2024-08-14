import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PageNotFound from './pages/PageNotFound';
import LoggedOutView from './components/LoggedOutView';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <LoggedOutView />
                        </Layout>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <Layout>
                            <PageNotFound />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
