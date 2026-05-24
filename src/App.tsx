import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, ComponentType } from "react";
import { AnimatePresence } from "framer-motion";
import Iridescence from "@/components/Iridescence";

const Index = lazy(() => import("./pages/Index.tsx"));
const Experience = lazy(() => import("./pages/Experience.tsx"));
const Illusionist = lazy(() => import("./pages/Illusionist.tsx"));
const InnerWork = lazy(() => import("./pages/InnerWork.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const SuspendedRoute = ({ Component }: { Component: ComponentType }) => (
  <Suspense fallback={<div className="w-screen h-screen bg-transparent" />}>
    <Component />
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SuspendedRoute Component={Index} />} />
        <Route path="/experience" element={<SuspendedRoute Component={Experience} />} />
        <Route path="/illusionist" element={<SuspendedRoute Component={Illusionist} />} />
        <Route path="/innerwork" element={<SuspendedRoute Component={InnerWork} />} />
        <Route path="/contact" element={<SuspendedRoute Component={Contact} />} />
        <Route path="*" element={<SuspendedRoute Component={NotFound} />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative w-screen min-h-screen overflow-hidden">
          {/* Animated iridescent background — rendered ONCE globally */}
          <div className="fixed inset-0 z-0">
            <Iridescence mouseReact amplitude={0.1} speed={1} />
          </div>
          {/* Main page content layout */}
          <div className="relative z-10 w-full min-h-screen">
            <AnimatedRoutes />
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
