import './styles/styles';
import { format, endOfDay } from 'date-fns';
import { getStore } from './components/getTask';
import { setAttributes } from './components/helper';
// import { radioButtons, getLastItem } from "./components/radioButtons";

const truncateResult = (data, size) => {
	return data.length > size ? `${data.slice(0, size - 1)} ...` : data;
};

const inboxComponents = () => {
	const dataArr = [];
	const todayDate = format(endOfDay(new Date()), 'MM/dd/yyyy');
	const element = document.createElement('div');
	const buttonWrapper = document.createElement('div');
	const h1 = document.createElement('h1');
	const buttonTask = document.createElement('button');
	const icon = document.createElement('i');

	setAttributes(element, {
		class: 'contentContainer',
		id: 'inboxIndex'
	});
	setAttributes(h1, {
		class: 'contentContainer__header'
	});
	setAttributes(buttonTask, {
		class: 'contentContainer__addButton--button'
	});
	setAttributes(icon, {
		class: 'contentContainer__addButton--icon fas fa-plus-square'
	});
	setAttributes(buttonWrapper, {
		class: 'contentContainer__addButton',
		id: 'addBtnWrapper'
	});

	h1.textContent = 'inbox';
	buttonTask.textContent = 'Add Task';
	buttonTask.addEventListener('click', () => {
		const targetElement = document.querySelector('#addBtnWrapper');

		element.appendChild(modalTask());
		targetElement.parentElement.removeChild(targetElement);
	});

	const removeAddTask = (params) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(params);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	};

	const modalTask = () => {
		const elementTask = document.createElement('div');
		const inputTask = document.createElement('input');
		const confirmBtn = document.createElement('button');
		const cancelBtn = document.createElement('button');

		setAttributes(elementTask, {
			class: 'contentContainer__task',
			id: 'modalTask'
		});
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

		confirmBtn.addEventListener('click', async () => {
			const inputVal = document.querySelector('#inputTask').value;
			const currentTask = getStore('storeTask');

			dataArr.push({
				inputId: Math.floor(Math.random() * 999),
				inputName: 'testing',
				inputContent: inputVal,
				inputDate: todayDate
			});

			const lastArr = [dataArr.slice(-1).pop()];

			localStorage.setItem(
				'storeTask',
				JSON.stringify(currentTask.concat(lastArr))
			);
			await removeAddTask('#modalTask');
			element.appendChild(getLastItem());
			element.appendChild(buttonWrapper);
		});

		cancelBtn.addEventListener('click', async () => {
			await removeAddTask('#modalTask');
			element.appendChild(buttonWrapper);
		});

		elementTask.appendChild(inputTask);
		elementTask.appendChild(confirmBtn);
		elementTask.appendChild(cancelBtn);

		return elementTask;
	};

	const dataCallBack = (params1, params2) => {
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
		datePara.addEventListener('click', async () => {
			const currentTask = getStore('storeTask');
			const newTask = currentTask.filter(
				(task) => task.inputId !== params1.inputId
			);

			localStorage.setItem('storeTask', JSON.stringify(newTask));

			await removeAddTask('#contentContainer__main');
			element.appendChild(radioButtons());
			element.appendChild(buttonWrapper);
		});

		elementWrapper.appendChild(firstDiv);
		elementWrapper.appendChild(secondDiv);
		firstDiv.appendChild(input);
		firstDiv.appendChild(forInput);
		secondDiv.appendChild(datePara);
		secondDiv.appendChild(icon);

		params2.appendChild(elementWrapper);
	};

	const radioButtons = () => {
		const element = document.createElement('div');
		setAttributes(element, {
			id: 'contentContainer__main'
		});

		for (const data of getStore('storeTask')) {
			dataCallBack(data, element);
		}

		return element;
	};

	const getLastItem = () => {
		const element = document.createElement('div');
		const dataArr = getStore('storeTask');
		const getLastItemArr = dataArr[dataArr.length - 1];

		setAttributes(element, {
			id: 'contentContainer__main'
		});
		dataCallBack(getLastItemArr, element);

		return element;
	};

	element.appendChild(h1);
	element.appendChild(radioButtons());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	element.appendChild(buttonWrapper);

	return element;
};

export const execute = () => {
	const divWrapper = document.createElement('div');

	divWrapper.appendChild(inboxComponents());

	document.body.append(divWrapper);
};
