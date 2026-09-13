import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { useEffect } from "react";
import { useThemeStore } from "./stores/theme.store";

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}