import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';
import { getStore } from '../inboxComponents/getTask';
import { setAttributes } from '../helperComponents/setAttributes';
import { radioButtons, getLastItem } from '../inboxComponents/radioButtons';

const todayDate = format(endOfDay(new Date()), 'MM/dd/yyyy');

const dataArr = [];

export const inboxComponents = () => {
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

		const removeAddTask = () => {
			const targetElement = document.querySelector('#modalTask');

			targetElement.parentElement.removeChild(targetElement);
			// element.appendChild(buttonWrapper);
		};
		/*	
			PROBLEM:
				- Change onload event turn without onload.
			SOLUTION:
				- Change the way reload itself by inserting inside the function of 
				any event or methods the appendChild where you will post it.
			PROBLEMS(2):
				- Should post only the last insert and not all the data itself.
		*/
		confirmBtn.addEventListener('click', () => {
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

				getLastItem();
				element.appendChild(buttonWrapper);
				// removeAddTask();
				// location.reload();
			}
		});

		cancelBtn.addEventListener('click', () => {
			removeAddTask();
			element.appendChild(buttonWrapper);

			// location.reload();
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
