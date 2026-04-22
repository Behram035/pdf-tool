import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Split from "../pages/Split";
import Compress from "../pages/Compress";
import PdfToJpg from "../pages/PdfToJpg";
import JpgToPdf from "../pages/JpgToPdf";
import Merge from "../pages/Merge";
import History from "../pages/History";
import ProtectedRoute from "../components/ProtectedRoute";
import Rotate from "../pages/Rotate";
import DeletePages from "../pages/DeletePages";
import ExtractPages from "../pages/ExtractPages";
import Watermark from "../pages/Watermark";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/merge"
          element={
            <ProtectedRoute>
              <Merge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/split"
          element={
            <ProtectedRoute>
              <Split />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compress"
          element={
            <ProtectedRoute>
              <Compress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdf-to-jpg"
          element={
            <ProtectedRoute>
              <PdfToJpg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jpg-to-pdf"
          element={
            <ProtectedRoute>
              <JpgToPdf />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rotate"
          element={
            <ProtectedRoute>
              <Rotate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete-pages"
          element={
            <ProtectedRoute>
              <DeletePages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/extract-pages"
          element={
            <ProtectedRoute>
              <ExtractPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watermark"
          element={
            <ProtectedRoute>
              <Watermark />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
