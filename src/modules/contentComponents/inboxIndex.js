import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';

const todayDate = format(endOfDay(new Date()), 'MM/dd/yyyy');

const dataArr = [
	{
		inputId: 'testing',
		inputName: 'testing',
		inputContent: 'first paragraph',
		inputDate: todayDate
	},
	{
		inputId: 'testing2',
		inputName: 'testing2',
		inputContent: 'second paragraph',
		inputDate: todayDate
	},
	{
		inputId: 'testing3',
		inputName: 'testing3',
		inputContent: 'Third paragraph',
		inputDate: todayDate
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

	return element;
};

const modalTask = () => {
	const element = document.createElement('div');
	const inputTask = document.createElement('input');
	const confirmBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');

	setAttributes(element, { class: 'contentContainer__task', id: 'modalTask' });
	setAttributes(inputTask, {
		type: 'text',
		id: 'inputTask',
		name: 'Input Task',
		class: 'contentContainer__task--input'
	});
	setAttributes(confirmBtn, { class: 'contentContainer__task--confirm' });
	setAttributes(cancelBtn, { class: 'contentContainer__task--cancel' });

	confirmBtn.textContent = 'Confirm';
	cancelBtn.textContent = 'Cancel';

	confirmBtn.addEventListener('click', () => {
		const inputVal = document.querySelector('#inputTask').value;

		const dataVal = dataArr.push({
			inputId: Math.floor(Math.random() * 999),
			inputName: 'testing',
			inputContent: inputVal,
			inputDate: todayDate
		});

		console.log(dataArr);

		return dataVal;
	});

	cancelBtn.addEventListener('click', () => {
		const targetElement = document.querySelector('#modalTask');

		targetElement.parentElement.removeChild(targetElement);
	});

	element.appendChild(inputTask);
	element.appendChild(confirmBtn);
	element.appendChild(cancelBtn);

	return element;
};

export const inboxComponents = () => {
	const element = document.createElement('div');
	const buttonWrapper = document.createElement('div');
	const h1 = document.createElement('h1');
	const buttonTask = document.createElement('button');
	const icon = document.createElement('i');

	h1.textContent = 'inbox';
	buttonTask.textContent = 'Add Task';
	buttonTask.addEventListener('click', () => {
		element.appendChild(modalTask());
	});

	element.classList.add('contentContainer');
	h1.classList.add('contentContainer__header');
	buttonWrapper.classList.add('contentContainer__addButton');
	icon.classList.add('contentContainer__addButton--icon');
	buttonTask.classList.add('contentContainer__addButton--button');
	icon.setAttribute('class', `fas fa-plus-square`);

	element.appendChild(h1);
	element.appendChild(radioButtons());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	element.appendChild(buttonWrapper);
	return element;
};