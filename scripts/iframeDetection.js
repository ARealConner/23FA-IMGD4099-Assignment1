// Check if the page is being viewed inside an iframe
if (window.self !== window.top) {
    // If it's inside an iframe, hide the back button
    document.querySelector('.back-btn').style.display = 'none';
}