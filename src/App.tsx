import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user.model";
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/notesPage";
import PrivacyPage from "./pages/PrivacyPage";
import PageNotFound from "./pages/PageNotFound";
import styles from "./styles/App.module.css";
import ShowToast from "./components/toast/ShowToast";
import { toast } from "react-toastify";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignupClicked={() => setShowSignupModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Container>

        {showSignupModal && (
          <SignUpModal
            onDismiss={() => setShowLoginModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignupModal(false);
              toast.success(`Sign up successful!`);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
              toast.success(`Welcome! ${user.username}.`);
            }}
          />
        )}
        <ShowToast />
      </div>
    </BrowserRouter>
  );
}

export default App;
