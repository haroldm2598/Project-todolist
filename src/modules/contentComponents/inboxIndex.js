import '../../styles/main.scss';

/* <i class="fas fa-trash"></i> */

const setAttributes = (elem, attr) => {
	for (const key in attr) {
		elem.setAttribute(key, attr[key]);
	}
};

const radioButtons = () => {
	const element = document.createElement('div');
	const input = document.createElement('input');
	const forInput = document.createElement('for');
	const datePara = document.createElement('p');
	const icon = document.createElement('i');

	setAttributes(input, { type: 'checkbox', id: 'testing', name: 'testing' });
	forInput.textContent = 'testing lorem ipsum';
	datePara.textContent = '30/06/2022';
	setAttributes(icon, { class: 'fas fa-trash' });

	element.classList.add('contentContainer__input');
	input.classList.add('contentContainer__input--checkBox');
	forInput.classList.add('contentContainer__input--title');
	datePara.classList.add('contentContainer__input--date');
	icon.classList.add('contentContainer__input--icon');

	element.appendChild(input);
	element.appendChild(forInput);
	element.appendChild(datePara);
	element.appendChild(icon);
	return element;
};

export const inboxComponents = () => {
	const element = document.createElement('div');
	const h1 = document.createElement('h1');

	h1.textContent = 'inbox';

	element.classList.add('contentContainer');
	h1.classList.add('contentContainer__header');

	element.appendChild(h1);
	element.appendChild(radioButtons());
	return element;
};
