import { getStore } from './getTask';
import { setAttributes } from '../helperComponents/setAttributes';

const truncateResult = (data, size) => {
	return data.length > size ? `${data.slice(0, size - 1)} ...` : data;
};

const getElement = (params1, params2) => {
	const elementWrapper = document.createElement('div');
	const firstDiv = document.createElement('div');
	const secondDiv = document.createElement('div');
	const input = document.createElement('input');
	const forInput = document.createElement('label');
	const datePara = document.createElement('p');
	const icon = document.createElement('i');

	setAttributes(elementWrapper, {
		class: 'contentContainer__input'
	});
	setAttributes(firstDiv, {
		class: 'contentContainer__input--first'
	});
	setAttributes(secondDiv, {
		class: 'contentContainer__input--second'
	});

	setAttributes(input, {
		class: ' contentContainer__input--first__checkBox',
		type: 'checkbox',
		id: params1.inputId,
		name: params1.inputName
	});
	setAttributes(forInput, {
		class: 'contentContainer__input--first__title'
	});

	setAttributes(datePara, {
		class: ' contentContainer__input--second__date'
	});
	setAttributes(icon, {
		class: 'contentContainer__input--second__icon fas fa-trash'
	});

	let dataInputContent = params1.inputContent;
	let dataResult = truncateResult(dataInputContent, 50);

	forInput.textContent = dataResult;
	datePara.textContent = params1.inputDate;

	input.addEventListener('click', () => {
		forInput.classList.toggle('contentContainer__input--lineThrough');
	});

	icon.addEventListener('click', () => {
		const currentTask = getStore('storeTask');
		const newTask = currentTask.filter(
			(task) => task.inputId != params1.inputId
		);

		localStorage.setItem('storeTask', JSON.stringify(newTask));

		location.reload();
	});

	elementWrapper.appendChild(firstDiv);
	elementWrapper.appendChild(secondDiv);
	firstDiv.appendChild(input);
	firstDiv.appendChild(forInput);
	secondDiv.appendChild(datePara);
	secondDiv.appendChild(icon);

	params2.appendChild(elementWrapper);
};

export const radioButtons = () => {
	const element = document.createElement('div');

	setAttributes(element, {
		id: 'contentContainer__main'
	});

	for (const data of getStore('storeTask')) {
		getElement(data, element);
	}

	return element;
};

export const getLastItem = () => {
	const element = document.createElement('div');
	const dataArr = getStore('storeTask');
	const getLastItemArr = dataArr[dataArr.length - 1];

	setAttributes(element, {
		id: 'contentContainer__main'
	});
	getElement(getLastItemArr, element);

	return element;
};
