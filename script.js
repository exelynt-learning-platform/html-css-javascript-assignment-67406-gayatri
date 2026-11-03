
// ======================================
// 1. SELECT HTML ELEMENTS
// ======================================

const themeButton = document.getElementById("theme-toggle");


// ======================================
// 2. CHECK SAVED THEME
// ======================================

function getSavedTheme() {
    try {
        return localStorage.getItem("tinyCafeTheme");
    } catch (error) {
        return null;
    }
}


// ======================================
// 3. UPDATE THEME
// ======================================

function updateTheme(isDarkMode) {

    // Add or remove dark-theme class from body
    document.body.classList.toggle("dark-theme", isDarkMode);

    // Update button text
    if (isDarkMode) {
        themeButton.textContent = "☀️ Light Mode";
        themeButton.setAttribute("aria-label", "Switch to light theme");
    } else {
        themeButton.textContent = "🌙 Dark Mode";
        themeButton.setAttribute("aria-label", "Switch to dark theme");
    }

    // Update accessibility state
    themeButton.setAttribute("aria-pressed", String(isDarkMode));
}


// ======================================
// 4. SAVE THEME PREFERENCE
// ======================================

function saveTheme(isDarkMode) {

    try {
        localStorage.setItem(
            "tinyCafeTheme",
            isDarkMode ? "dark" : "light"
        );
    } catch (error) {
        // Theme switching still works if storage is unavailable.
    }
}


// ======================================
// 5. INITIALIZE THEME
// ======================================

const savedTheme = getSavedTheme();

let isDarkMode = savedTheme === "dark";

updateTheme(isDarkMode);


// ======================================
// 6. THEME BUTTON CLICK EVENT
// ======================================

if (themeButton) {

    themeButton.addEventListener("click", function() {

        // Toggle between light and dark mode
        isDarkMode = !isDarkMode;

        // Update the page
        updateTheme(isDarkMode);

        // Save the selected theme
        saveTheme(isDarkMode);

    });

}
