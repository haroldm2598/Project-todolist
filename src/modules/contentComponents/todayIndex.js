import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';

const todayDate = format(endOfDay(new Date()), 'MM/dd/yyyy');

const dataArr = [];

const setAttributes = (elem, attr) => {
	for (const key in attr) {
		elem.setAttribute(key, attr[key]);
	}
};

const getStore = () => {
	const getStoreTask = JSON.parse(localStorage.getItem('storeTodayTask'));

	return getStoreTask;
};

const truncateResult = (data, size) => {
	return data.length > size ? `${data.slice(0, size - 1)} ...` : data;
};

const radioButtons = () => {
	const element = document.createElement('div');

	for (const data of getStore()) {
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
			id: data.inputId,
			name: data.inputName
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

		let dataInputContent = data.inputContent;
		let dataResult = truncateResult(dataInputContent, 50);

		forInput.textContent = dataResult;
		datePara.textContent = data.inputDate;

		input.addEventListener('click', () => {
			forInput.classList.toggle('contentContainer__input--lineThrough');
		});

		icon.addEventListener('click', () => {
			const currentTask = getStore();
			const newTask = currentTask.filter(
				(task) => task.inputId != data.inputId
			);

			localStorage.setItem('storeTodayTask', JSON.stringify(newTask));
			location.reload();
		});

		elementWrapper.appendChild(firstDiv);
		elementWrapper.appendChild(secondDiv);
		firstDiv.appendChild(input);
		firstDiv.appendChild(forInput);
		secondDiv.appendChild(datePara);
		secondDiv.appendChild(icon);

		element.appendChild(elementWrapper);
	}

	return element;
};

export const todayComponents = () => {
	const element = document.createElement('div');
	const buttonWrapper = document.createElement('div');
	const h1 = document.createElement('h1');
	const buttonTask = document.createElement('button');
	const icon = document.createElement('i');

	h1.textContent = "Today's inbox";
	buttonTask.textContent = 'Add Task';
	buttonTask.addEventListener('click', () => {
		const targetElement = document.querySelector('#addBtnWrapper');

		element.appendChild(modalTask());
		targetElement.parentElement.removeChild(targetElement);
	});

	setAttributes(element, {
		class: 'contentContainer'
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

	const modalTask = () => {
		const element = document.createElement('div');
		const inputTask = document.createElement('input');
		const confirmBtn = document.createElement('button');
		const cancelBtn = document.createElement('button');

		setAttributes(element, {
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

		confirmBtn.addEventListener('click', () => {
			const inputVal = document.querySelector('#inputTask').value;
			const currentTask = getStore();

			dataArr.push({
				inputId: Math.floor(Math.random() * 999),
				inputName: 'testing',
				inputContent: inputVal,
				inputDate: todayDate
			});

			const lastArr = [dataArr.slice(-1).pop()];

			if (inputVal === null || inputVal === '') {
				alert('input some text');
			} else {
				localStorage.setItem(
					'storeTodayTask',
					JSON.stringify(currentTask.concat(lastArr))
				);

				element.appendChild(buttonWrapper);
				location.reload();
			}
		});

		cancelBtn.addEventListener('click', () => {
			const targetElement = document.querySelector('#modalTask');

			targetElement.parentElement.removeChild(targetElement);
			element.appendChild(buttonWrapper);

			location.reload();
		});

		element.appendChild(inputTask);
		element.appendChild(confirmBtn);
		element.appendChild(cancelBtn);

		return element;
	};

	element.appendChild(h1);
	element.appendChild(radioButtons());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	element.appendChild(buttonWrapper);

	return element;
};
