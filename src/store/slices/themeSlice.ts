import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeMode } from "../../types";

interface ThemeState {
  mode: ThemeMode;
}

// Get initial theme from localStorage or default to light
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }
  }
  return "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

// Apply theme to document
const applyTheme = (mode: ThemeMode) => {
  if (typeof document !== "undefined") {
    // Add transition class to body
    document.body.classList.add("theme-transition");

    // Set background color
    document.body.style.backgroundColor =
      mode === "dark" ? "rgb(17, 24, 39)" : "white";

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);

    // Save to localStorage
    localStorage.setItem("theme", mode);
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      applyTheme(state.mode);
    },

    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      applyTheme(state.mode);
    },

    loadThemeFromStorage: (state) => {
      const savedTheme = getInitialTheme();
      state.mode = savedTheme;
      applyTheme(savedTheme);
    },
  },
});

export const { toggleTheme, setTheme, loadThemeFromStorage } =
  themeSlice.actions;

export default themeSlice.reducer;
