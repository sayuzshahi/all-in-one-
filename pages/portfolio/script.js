// Function to open the popup
function openPopup() {
    document.getElementById("product-popup").style.display = "flex";
  }
  
  // Function to close the popup
  function closePopup() {
    document.getElementById("product-popup").style.display = "none";
  }
  
  // Optional: Close the popup when clicking outside of the content area
  window.onclick = function(event) {
    if (event.target === document.getElementById("product-popup")) {
      closePopup();
    }
  };
  