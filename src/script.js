function openModal(image) {
    // Get the modal
    var modal = document.getElementById("modal");
    
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt;

    // Adjust the size of the modal image to fit within 90% of the window size
    modalImg.onload = function() {
        var maxHeight = window.innerHeight * 0.9;
        var maxWidth = window.innerWidth * 0.9;
        var ratio = Math.min(maxHeight / modalImg.height, maxWidth / modalImg.width);
        modalImg.style.height = (modalImg.height * ratio) + "px";
        modalImg.style.width = (modalImg.width * ratio) + "px";
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    document.getElementById("modal").style.display = "none";
}

// Close the modal if the user clicks outside of the image
window.onclick = function(event) {
    if (event.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
}