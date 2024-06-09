import React from "react";
import { useTheme } from "../context/ThemeContext";

function Theme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            style={{
                backgroundColor: theme === "light" ? "#ffffff" : "#333333",
                padding: "20px",
            }}
        >
            <h1>{theme === "light" ? "Light Theme" : "Dark Theme"}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

export default Theme;
