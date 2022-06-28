import '../../styles/main.scss';

const contentComponents = () => {
	const element = document.createElement('div');

	element.innerHTML = 'Inbox Section';

	return element;
};

export const inboxComponents = () => {
	const div = document.createElement('div');
	div.textContent = '';
	div.appendChild(contentComponents());
};
