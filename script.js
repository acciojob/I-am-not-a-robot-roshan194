//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const imagesContainer = document.getElementById('images-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const resultPara = document.getElementById('para');
const h3 = document.getElementById('h');

let selectedImages = [];
let imageElements = [];

// Initialize the game
function init() {
  selectedImages = [];
  resultPara.textContent = '';
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';

  imagesContainer.innerHTML = '';

  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  const duplicateClass = imageClasses[duplicateIndex];

  const allImages = [...imageClasses];
  allImages.push(duplicateClass); // Add a duplicate

  // Shuffle images
  for (let i = allImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
  }

  allImages.forEach((imgClass, index) => {
    const img = document.createElement('img');
    img.classList.add(imgClass);
    img.dataset.class = imgClass;
    img.addEventListener('click', () => onImageClick(img));
    imagesContainer.appendChild(img);
    imageElements.push(img);
  });
}

// Handle image click
function onImageClick(img) {
  if (selectedImages.includes(img)) return;

  img.classList.add('selected');
  selectedImages.push(img);
  resetBtn.style.display = 'inline-block';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }

  if (selectedImages.length > 2) {
    // only allow 2 selections
    selectedImages.forEach(el => el.classList.remove('selected'));
    selectedImages = [];
    verifyBtn.style.display = 'none';
  }
}

// Reset functionality
resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  resultPara.textContent = '';
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify functionality
verifyBtn.addEventListener('click', () => {
  const [first, second] = selectedImages;

  if (first.dataset.class === second.dataset.class) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = 'none';
});

init(); // run on load
