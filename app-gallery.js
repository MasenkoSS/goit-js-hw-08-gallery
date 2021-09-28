import pics from './data/app.js';

// поиск в ДОМ
const galleryRef = document.querySelector('.js-gallery');
const backdropRef = document.querySelector('.js-lightbox');
const modalImgRef = backdropRef.querySelector('.lightbox__image');
const closeModalBtnRef = backdropRef.querySelector('button[data-action="close-lightbox"]');

// слушаем событие
galleryRef.addEventListener('click', onGalleryClick);
closeModalBtnRef.addEventListener('click', onCloseModal);

// из массива создаем галлерею обьектов
const createGallery = slide => {
  const item = document.createElement('li');
  item.classList.add('gallery__item');
  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = slide.original;
  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = slide.preview;
  image.alt = slide.description;
  image.dataset.source = slide.original;
  image.dataset.index = pics.indexOf(slide);
  link.append(image);
  item.append(link);
  return item;
};

const picsList = pics.map(slide => createGallery(slide));
galleryRef.append(...picsList);

// проверяем клик и переход по ссылке
function onGalleryClick(event) {
  event.preventDefault();

//  переменная индекса слайда
let actualIndex;

actualIndex = Number(event.target.dataset.index);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  setLargeImage(event);
  onOpenModal();
}

// замена картинки и aтрибутa alt
function setLargeImage(event) {
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.alt = event.target.alt;
}

// модальное окно open
function onOpenModal() {
  window.addEventListener('keydown', keyNavigation);
  backdropRef.classList.add('is-open');
}

// модальное окно closed
function onCloseModal() {
  window.removeEventListener('keydown', keyNavigation);
  modalImgRef.src = '';
  modalImgRef.alt = '';
  backdropRef.classList.remove('is-open');
}

function keyNavigation(event) {
      if (actualIndex > 0) {
      modalImgRef.src = images[(actualIndex -= 1)].original;
      modalImgRef.alt = images[actualIndex].description;
      modalImgRef.title = images[actualIndex].description;
    }
  }