const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];
let isInitialLoad = true;

//unsplash api
let initialcount = 5;
const apiKey = "VgHvs7g0sJKtqXbFxF7Mht6z8Jnkmz8xDt5qRSB5q28";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialcount}`;

// Update api url with new count
function updateApiUrlWithNewCount(count) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
}

// check all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function for set Attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for photos & Links, add to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //   create <a> from link unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //   create img for photos from unsplash
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.alt_description,
      alt: photo.alt_description,
    });
    //add a event , for all image is completely loaded
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash API
async function getPhotos() {
  try {
    const responce = await fetch(apiUrl);
    photosArray = await responce.json();
    displayPhotos();
    if (isInitialLoad) {
      updateApiUrlWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    //   catch error here
  }
}

// Check to see if scrolling near bottom of page, load more image
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
