const slideContainer = document.querySelector('.carousel-slide');

function cloneImages() {
  const images = slideContainer.querySelectorAll('img');
  images.forEach((image) => {
    const clone = image.cloneNode(true);
    slideContainer.appendChild(clone);
  });
}

cloneImages();

