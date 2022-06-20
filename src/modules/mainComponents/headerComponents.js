import '../../styles/main.scss';

export const headerComponents = () => {
	const headerContainer = document.createElement('div');
	const h1 = document.createElement('h1');
	const iFonts = document.createElement('i');

	h1.innerHTML = 'Todo List';

	headerContainer.classList.add('header');
	h1.classList.add('header__heading');
	iFonts.setAttribute('class', 'fas fa-book');

	headerContainer.appendChild(h1);
	headerContainer.appendChild(iFonts);

	return headerContainer;
};
