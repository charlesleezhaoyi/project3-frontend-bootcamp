import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import AuthWrapper from "./components/AuthWrapper";
import Forum from "./components/Forum/Forum";
import ForumMainPage from "./components/Forum/ForumMain/ForumMainPage";
import ForumCreatePost from "./components/Forum/ForumCreatePost";
import Onboarding from "./pages/OnboardingForm";
// import ForumSubSection from "./components/Forum/ForumSubSection/ForumSubSection";
import ForumPost from "./components/Forum/ForumPost/ForumPost";
import NewBook from "./pages/NewBook";
import SingleBook from "./pages/SingleBook";
import BookList from "./components/Dashboard/BookList";
import CategoryList from "./components/Dashboard/CategoryList";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={`${window.location.origin}/onboarding`}
    audience={process.env.REACT_APP_AUDIENCE}
    scope="read:current_user update:current_user_metadata"
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            path="/home"
            element={
              <AuthWrapper>
                <Home />
              </AuthWrapper>
            }
          ></Route>
          <Route
            path="/onboarding"
            element={
              <AuthWrapper>
                <Onboarding />
              </AuthWrapper>
            }
          />

          <Route path="/create-newbook" element={<NewBook />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/forum" element={<Forum />}>
            <Route path="" element={<ForumMainPage />} />
            <Route path="create/post" element={<ForumCreatePost />} />
            {/* <Route path="categories/:category" element={<ForumSubSection />} /> */}
            <Route path="posts/:postId" element={<ForumPost />} />
          </Route>
          {/* <Route path="*" element={"Nothing here!"} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
