import '../../styles/main.scss';

export const contentComponents = () => {
	const element = document.createElement('div');
	const h1 = document.createElement('h1');
	const iFonts = document.createElement('i');

	h1.innerHTML = 'Todo List';

	element.classList.add('header');
	h1.classList.add('header__heading');
	iFonts.setAttribute('class', 'fas fa-archive');

	element.appendChild(h1);
	element.appendChild(iFonts);

	return element;
};
