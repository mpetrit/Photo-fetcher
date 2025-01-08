let toggle = document.querySelector("#checkboxInput");
let photos = document.querySelector("#photoDisplay");

let fetchNewButton = document.querySelector("#fetchNewPhoto");
let fetchMoreButton = document.querySelector("#fetchMore");

let isFetching = false;

function fetchPhotos() {
  let randomPage = Math.floor(Math.random() * 4) + 1;

  fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
    .then((response) => response.json())
    .then((data) => {
      for (let x = 1; x <= 4; x++) {
        let randomPhoto = Math.floor(Math.random() * data.length);
        let img = document.createElement("img");
        let blankSkeleton = document.createElement("div");
        blankSkeleton.classList.add("blank");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("imgContainer");

        let overlayDiv = document.createElement("div");
        overlayDiv.classList.add("overlay");
        let author = document.createElement("h4");
        let url = document.createElement("p");

        author.textContent = data[randomPhoto].author;
        url.textContent = data[randomPhoto].url;
        overlayDiv.appendChild(author);
        overlayDiv.appendChild(url);

        imgContainer.appendChild(blankSkeleton);
        photos.appendChild(imgContainer);
        img.src = data[randomPhoto].download_url;
        img.onload = () => {
          imgContainer.appendChild(overlayDiv);
          blankSkeleton.replaceWith(img);
        };

      }
      isFetching = false;
    })
    .catch((error) => {
      console.error("Error fetching photos:", error);
      photos.textContent = "Failed to load photos.";
    });
}

fetchNewButton.addEventListener("click", () => {
  if (isFetching) return
  isFetching = true;

  photos.innerHTML = "";

  fetchPhotos()
});



fetchMoreButton.addEventListener("click",()=>{
  if (isFetching) return
  isFetching = true;

  fetchPhotos();
})

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    photos.style.filter = "grayscale(100%)";
  } 
  else {
    photos.style.filter = "grayscale(0%)";
  }
});

fetchPhotos();