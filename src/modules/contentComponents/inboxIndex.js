import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';
import { getStore } from '../data/getTask';
import { setAttributes } from '../helperComponents/setAttributes';

/*	
PROBLEM ::
	If we delete it should double the delete data example
	1. apple (if i clicked this one and deleted)
	2. orange
	3. banana
	RESULT WILL :: 
	1. apple (deleted)
	2. orange
	3. banana
	2. orange 
	3. banana
	
POSIBLE SOLUTION ::
	- Check the await method if working it should remove the contentContainer 
	and replace by new appendchild.
	- Check the containermain if their both children but if there is two parent
	and separate child means it will double the error! 

	- Try to return elementWrapper only in getElement
*/

const mainInboxComponents = (paramsTarget) => {
	const dataArr = [];
	const todayDate = format(endOfDay(new Date()), 'MM/dd/yyyy');

	const buttonWrapper = document.createElement('div');
	const h1 = document.createElement('h1');
	const buttonTask = document.createElement('button');
	const icon = document.createElement('i');

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

		paramsTarget.appendChild(modalTask());
		targetElement.parentElement.removeChild(targetElement);
	});

	const removeAddTask = (target) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(target);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	};

	const truncateResult = (data, size) => {
		return data.length > size ? `${data.slice(0, size - 1)} ...` : data;
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

			if (inputVal === null || inputVal === '') {
				alert('input some text');
			} else {
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
				paramsTarget.appendChild(getLastItem());
				// paramsTarget.appendChild(showAllItem());
				paramsTarget.appendChild(buttonWrapper);
			}
		});

		cancelBtn.addEventListener('click', async () => {
			await removeAddTask('#modalTask');
			paramsTarget.appendChild(buttonWrapper);
		});

		elementTask.appendChild(inputTask);
		elementTask.appendChild(confirmBtn);
		elementTask.appendChild(cancelBtn);

		return elementTask;
	};

	const getElement = (params1, params2) => {
		const element = document.createElement('div');

		const elementWrapper = document.createElement('div');
		const firstDiv = document.createElement('div');
		const secondDiv = document.createElement('div');
		const input = document.createElement('input');
		const forInput = document.createElement('label');
		const datePara = document.createElement('p');
		const icon = document.createElement('i');

		setAttributes(element, {
			id: 'contentContainer__main'
		});

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

		icon.addEventListener('click', async () => {
			const currentTask = getStore('storeTask');
			const newTask = currentTask.filter(
				(task) => task.inputId != params1.inputId
			);

			localStorage.setItem('storeTask', JSON.stringify(newTask));

			await removeAddTask('#contentContainer__main');
			paramsTarget.appendChild(showAllItem());
			paramsTarget.appendChild(buttonWrapper);
		});

		elementWrapper.appendChild(firstDiv);
		elementWrapper.appendChild(secondDiv);
		firstDiv.appendChild(input);
		firstDiv.appendChild(forInput);
		secondDiv.appendChild(datePara);
		secondDiv.appendChild(icon);

		params2.appendChild(elementWrapper);
	};

	const testingHelper = () => {
		const element = document.createElement('div');
		setAttributes(element, {
			id: 'contentContainer__main'
		});

		return element;
	};

	const showAllItem = () => {
		const element = document.createElement('div');
		const dataArr = getStore('storeTask');
		setAttributes(element, {
			id: 'contentContainer__main'
		});

		for (const data of dataArr) {
			getElement(data, element);
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
		element.appendChild(getElement(getLastItemArr, element));
		console.log(element);

		return element;
	};

	paramsTarget.appendChild(h1);
	paramsTarget.appendChild(showAllItem());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	paramsTarget.appendChild(buttonWrapper);
};

export const inboxComponents = () => {
	const element = document.createElement('div');

	setAttributes(element, {
		class: 'contentContainer',
		id: 'inboxIndex'
	});

	mainInboxComponents(element);

	return element;
};
