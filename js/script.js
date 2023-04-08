import { Popup } from "./popup.js";

const popupPreloader = document.querySelector('.popup__preloader')
let popupTitle = null;
let popupImage = null;

window.addEventListener('load', documentLoaded);

function documentLoaded(e) {
	const popup = new Popup();
	popupTitle = document.querySelector('.popup__title');
	popupImage = document.querySelector('.popup__image img');

	document.addEventListener('click', actionDocument);
}

function actionDocument(e) {
	let target = e.target;

	// Установка изображения для попапа

	if (target.closest('.works__img') && target.closest('.works__img').hasAttribute('data-src-image')) {
		const imageUrl = target.closest('.works__img').dataset.srcImage;
		const titleText = target.closest('.works__item').querySelector('.works__title').innerHTML;

		popupTitle.innerHTML = titleText;
		popupPreloader.style.display = 'block';
		popupImage.style.display = 'none';
		const image = new Image();
		image.addEventListener('load', () => {
			popupPreloader.style.display = 'none';
			popupImage.style.display = 'block';
			popupImage.src = imageUrl;
		})
		image.src = imageUrl;
	}

	// Настройка фильтра
	if (target.classList.contains("filter__button") && !target.classList.contains("active")) {
		const activeElement = document.querySelector('.filter__button.active');
		const elements = document.querySelectorAll('.works__item');
		const elementType = target.dataset.workType;

		activeElement.classList.remove("active");
		target.classList.add("active");

		elements.forEach(element => {
			if (element.dataset.workType && elementType !== "All") {
				let arr = element.dataset.workType.split(',');
				!elementType || !arr.includes(elementType) ?
					element.hidden = true : element.hidden = false
			} else {
				element.hidden = false
			}
		})
	}
}