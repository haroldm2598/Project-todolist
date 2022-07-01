import '../../styles/main.scss';
import { format } from 'date-fns';

const dataArr = [
	{
		inputId: 'testing',
		inputName: 'testing',
		inputContent: 'first paragraph',
		inputDate: '30/06/2022'
	},
	{
		inputId: 'testing2',
		inputName: 'testing2',
		inputContent: 'second paragraph',
		inputDate: '01/07/2022'
	},
	{
		inputId: 'testing3',
		inputName: 'testing3',
		inputContent: 'Third paragraph',
		inputDate: '01/07/2022'
	}
];

const setAttributes = (elem, attr) => {
	for (const key in attr) {
		elem.setAttribute(key, attr[key]);
	}
};

const radioButtons = () => {
	const element = document.createElement('div');

	for (const data of dataArr) {
		const elementWrapper = document.createElement('div');
		const input = document.createElement('input');
		const forInput = document.createElement('label');
		const datePara = document.createElement('p');
		const icon = document.createElement('i');

		forInput.textContent = data.inputContent;
		datePara.textContent = data.inputDate;
		setAttributes(input, {
			type: 'checkbox',
			id: data.inputId,
			name: data.inputName
		});
		setAttributes(icon, { class: 'fas fa-trash' });

		elementWrapper.classList.add('contentContainer__input');
		input.classList.add('contentContainer__input--checkBox');
		forInput.classList.add('contentContainer__input--title');
		datePara.classList.add('contentContainer__input--date');
		icon.classList.add('contentContainer__input--icon');

		elementWrapper.appendChild(input);
		elementWrapper.appendChild(forInput);
		elementWrapper.appendChild(datePara);
		elementWrapper.appendChild(icon);
		element.appendChild(elementWrapper);
	}

	console.log(format(new Date().getFullYear(), 'MM/dd/yyyy'));
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
