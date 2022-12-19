import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';
import { getProj } from '../data/getProj';
import { setAttributes } from '../helperComponents/setAttributes';

const mainComponents = (paramsTarget) => {
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

	h1.textContent = 'Projects !!';
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
			const currentTask = getProj('storeProj');

			if (inputVal === null || inputVal === '') {
				alert('input some text');
			} else {
				for (let dataObj of currentTask) {
					let dataMap = dataObj.projectTask;

					dataMap.push({
						inputId: Math.floor(Math.random() * 999),
						inputName: 'testing',
						inputContent: inputVal,
						inputDate: todayDate
					});

					currentTask.concat(dataMap);
					const lastArr = [currentTask.slice(-1).pop()];

					localStorage.setItem('storeProj', JSON.stringify(lastArr));
				}

				await removeAddTask('#modalTask');
				await removeAddTask('#contentContainer__main');

				paramsTarget.appendChild(showAllItem());
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

		icon.addEventListener('click', async () => {
			const currentTask = getProj('storeProj');

			/*
				Must update the currentTask first and push new array of objects in currents 
				Therefore the new currentTask will be push into localStorage
				Use slice method if there's any problem or double pushing in localStorage
				It's only creating and updating the new array of object not the currentTask
			*/

			// hasOwnProperty is not working
			const dataObj = currentTask.forEach((item) => {
				const result = item.projectTask;
				const newTask = result.find((task) => task.inputId === params1.inputId);

				if (result.hasOwnProperty(newTask)) {
					delete result[newTask];
					localStorage.setItem('storeProj', JSON.stringify(result));
				}
			});

			// ----------------------------------------------------

			// const dataObj = currentTask.forEach((item) => {
			// 	const result = item.projectTask;
			// 	const newTask = result.filter(
			// 		(task) => task.inputId !== params1.inputId
			// 	);
			// 	// const testing = currentTask.push(newTask);
			// 	const resultObj = currentTask.concat(newTask);
			// 	const lastArr = [resultObj.slice(-1).pop()];

			// 	localStorage.setItem('storeProj', JSON.stringify(lastArr));
			// 	console.log(lastArr);
			// });

			// ----------------------------------------------------

			// const dataObjMap = currentTask.map((item) => {
			// 	const result = item.projectTask;
			// 	const newTask = result.filter(
			// 		(task) => task.inputId !== params1.inputId
			// 	);

			// 	const resultObj = currentTask.concat(newTask);
			// 	const lastArr = [resultObj.slice(-1).pop()];

			// 	// localStorage.setItem('storeProj', JSON.stringify(lastArr));
			// 	// console.log(resultObj);
			// });

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

	const showAllItem = () => {
		const element = document.createElement('div');
		setAttributes(element, {
			id: 'contentContainer__main'
		});

		for (const data of getProj('storeProj')) {
			let dataMap = data.projectTask;
			dataMap.map((item) => {
				getElement(item, element);
			});
		}

		return element;
	};

	paramsTarget.appendChild(h1);
	paramsTarget.appendChild(showAllItem());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	paramsTarget.appendChild(buttonWrapper);
};

export const constructorComponent = () => {
	const element = document.createElement('div');

	setAttributes(element, {
		class: 'contentContainer',
		id: 'inboxIndex'
	});

	mainComponents(element);

	return element;
};
