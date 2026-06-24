import { create } from "zustand";

export const useThemeStore = create((set) => ({
	darkMode:
		localStorage.getItem("theme") === "dark",

	toggleTheme: () =>
		set((state) => {
			const newMode = !state.darkMode;

			if (newMode) {
				document.body.classList.add("dark-mode");
				localStorage.setItem("theme", "dark");
			} else {
				document.body.classList.remove("dark-mode");
				localStorage.setItem("theme", "light");
			}

			return {
				darkMode: newMode,
			};
		}),
}));