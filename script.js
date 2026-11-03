
// Get HTML elements
const likeButton = document.getElementById("like-button");
const likeCount = document.getElementById("like-count");
const buttonText = document.getElementById("button-text");
const likeMessage = document.getElementById("like-message");
const resetButton = document.getElementById("reset-button");

// Application state
let totalLikes = 0;
let isLiked = false;

// Load saved likes safely
try {
    const savedLikes = Number(localStorage.getItem("totalLikes"));
    const savedLikedState = localStorage.getItem("isLiked");

    if (Number.isSafeInteger(savedLikes) && savedLikes >= 0) {
        totalLikes = savedLikes;
    }

    isLiked = savedLikedState === "true" && totalLikes > 0;
} catch (error) {
    // Continue with default values if storage is unavailable.
    totalLikes = 0;
    isLiked = false;
}

// Update the interface
function updateLikeDisplay() {
    likeCount.textContent = totalLikes;

    likeButton.classList.toggle("liked", isLiked);
    likeButton.setAttribute("aria-pressed", String(isLiked));

    if (isLiked) {
        buttonText.textContent = "Liked";
        likeMessage.textContent = "Thanks for liking this project!";
    } else {
        buttonText.textContent = "Like";

        if (totalLikes === 0) {
            likeMessage.textContent = "Be the first to like this!";
        } else {
            likeMessage.textContent = "You can like this project again.";
        }
    }
}

// Save application state
function saveLikeState() {
    try {
        localStorage.setItem("totalLikes", String(totalLikes));
        localStorage.setItem("isLiked", String(isLiked));
    } catch (error) {
        // The button remains functional without local storage.
    }
}

// Handle Like button click
likeButton.addEventListener("click", function() {

    if (isLiked) {
        // Remove the user's like
        totalLikes = Math.max(0, totalLikes - 1);
        isLiked = false;
    } else {
        // Add the user's like
        totalLikes++;
        isLiked = true;
    }

    saveLikeState();
    updateLikeDisplay();
});

// Handle Reset button click
resetButton.addEventListener("click", function() {

    totalLikes = 0;
    isLiked = false;

    saveLikeState();
    updateLikeDisplay();

    likeMessage.textContent = "Likes have been reset!";
});

// Show saved state when page loads
updateLikeDisplay();
