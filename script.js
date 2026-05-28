const photo = document.getElementById("photo");
const clock = document.getElementById("clock");
const noSignal = document.getElementById("noSignal");

let currentHour = null;
let currentIndex = 0;
let interval;

/* IMAGES AVAILABLE FOR EACH HOUR */

function getImagesForHour(hour) {
  const library = {
    10: ["10.JPG", "10.1.JPG", "10.2.JPG", "10.3.JPG"],
    14: ["14.JPG", "14.1.JPG", "14.2.JPG", "14.3.JPG"],
    15: ["15.JPG", "15.1.JPG", "15.2.JPG", "15.3.JPG", "15.4.JPG", "15.5.JPG"],
    16: ["16.JPG", "16.1.JPG", "16.2.JPG", "16.3.JPG", "16.4.JPG", "16.5.JPG", "16.6.JPG", "16.7.JPG", "16.8.JPG"],
    20: ["20.JPG", "20.1.JPG", "20.2.JPG"],
    21: ["21.JPG", "21.1.JPG", "21.2.JPG"],
    22: ["22.JPG", "22.1.JPG", "22.2.JPG", "22.3.JPG", "22.4.JPG"],
  };

    return library[hour] || null;
}

/* SHOW IMAGE */

function showImage(hour) {

  const images = getImagesForHour(hour);

  /* NO IMAGES */

  if (!images || images.length === 0) {

    document.body.style.background = "black";

    photo.style.display = "none";

    noSignal.style.display = "block";

    return;
  }

  /* SHOW IMAGE */

  noSignal.style.display = "none";

  photo.style.display = "block";

  /* FADE OUT */

  photo.style.opacity = 0;

  setTimeout(() => {

    photo.src = `images/${hour}/${images[currentIndex]}`;

    /* FADE IN */

    setTimeout(() => {

      photo.style.opacity = 1;

    }, 100);

  }, 500);

  currentIndex = (currentIndex + 1) % images.length;
}

/* MAIN UPDATE FUNCTION */

function update() {

  const now = new Date();

  const hour = now.getHours();

  const minutes = String(now.getMinutes()).padStart(2, "0");

  const seconds = String(now.getSeconds()).padStart(2, "0");

  /* LIVE CLOCK */

  clock.innerText = `${hour}:${minutes}:${seconds}`;

  /* WHEN HOUR CHANGES */

  if (hour !== currentHour) {

    currentHour = hour;

    currentIndex = 0;

    clearInterval(interval);

    showImage(hour);

    /* CHANGE IMAGE EVERY 5 MINUTES */

    interval = setInterval(() => {

      showImage(hour);

    }, 10000);
  }
}

/* START */

update();

/* UPDATE CLOCK EVERY SECOND */

setInterval(update, 1000);