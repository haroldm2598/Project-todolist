import '../../styles/main.scss';

export const contentComponents = () => {
	const element = document.createElement('div');
	const h1 = document.createElement('h1');

	h1.innerHTML = 'Todo List';

	element.classList.add('header');
	h1.classList.add('header__heading');

	element.appendChild(h1);

	return element;
};
