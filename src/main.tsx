/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
const App = lazy(() => import("./App.tsx"));
const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const MarsImagesPage = lazy(() => import("./pages/MarsImagesPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "/mars", element: <MarsImagesPage /> },
      { path: "/gallery", element: <GalleryPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
