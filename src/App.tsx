
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnimeEbooks from "./pages/AnimeEbooks";
import AnimeStories from "./pages/AnimeStories"; 
import AnimeGallery from "./pages/AnimeGallery";
import LatestAnimes from "./pages/LatestAnimes";
import Login from "./pages/Login";
import AnimeGenerator from "./pages/AnimeGenerator";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generator"
              element={
                <ProtectedRoute>
                  <AnimeGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ebooks"
              element={
                <ProtectedRoute>
                  <AnimeEbooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stories"
              element={
                <ProtectedRoute>
                  <AnimeStories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <AnimeGallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/latest"
              element={
                <ProtectedRoute>
                  <LatestAnimes />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
