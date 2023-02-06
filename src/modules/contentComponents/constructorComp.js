import '../../styles/main.scss';
import { format, endOfDay } from 'date-fns';
import { getProj } from '../data/getProj';
import { setAttributes } from '../helperComponents/setAttributes';
import { autoId } from '../helperComponents/setID';
import { truncateResult } from '../helperComponents/setRemoveTask';
import { removeAddTask } from '../helperComponents/setTruncate';

const currentTask = getProj('storeProj');

function mainComponents(paramsTarget) {
	'use strict';
	const dataArr = [];

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

	/*
			NOTE FOR JAN 06 2023
		make use of oop the 'this' keyword in object keys before pushing it to the localStorage
		handling error for not getting others object values.
		The problem is if we keep using 'this' word onto push method it will error

			NOTE FOR JAN 13 2023
		make use of the OOP the function way where the getElement will be implement the oop not the old 
		of straight to the obj insuring not copying the other objects values rather than making them new
		and unique keys and value for itself. (codeSandBox refference)

		`NOTE FOR JAN 18 2023
		having an error push inside the localStorage if will push new array object and it will delete existed array object 
		maybe the impletation of the OOP the projectTodoList requiring a prototype where 'this' keyword required using the OOP 
		method

		NOTE FOR JAN 23 2023 testing only
		it shouldn't for constructor components the assign id of components it should be in sidebar proj.
		what does concat do again?

		NOTE FOR JAN 31 2023
		- First test if the prototype of OOP is working * turns out to spaghetti coding
		- Second test if the outside array(dataArr) is working pushing unique values not reset the process of setting Object
		- Third test make the basic of the main.js of 16_project
			- Possible proble :: because of var lastArr only pushing that's why all of the remaining array that already insert
			will be erase by the new Var lastArr.  
			- Who will be stringify to the localStorage???
			- If 3 is the sideProj therefore all of them is inserted in localStorage that's why it has double.
		- Fourth it because same array of object not finding it's specific ID to push an new array of it.
			- 1st) find it's ID of array of object
			- 2nd) implement the find method and push new Object inside the array of object
			- 3rd) check the localStorage if proper storing and console for checking
		
		NOTE FOR FEB 1-2 2023
		- it's either Array.forEach() || Array.Map() both working replacement for(var name of Array){...} // DONE
		- make guarantee working of the fourth problem for last note. // ON GOING 
		- instead of using if operator use Array.find() // 
			DIDN'T APPLY
			* to hassle a lot of spaghetti coding happening
		- statement for the if() should dynamic everytime selected Array.projectTitle
			* try implement of getting of sideProj IDS and insert statement in IF
				- it will lead to blank because target their id is on index that imported of sidebar
			* try autoID if will work on finding id to implement
			* focus on set id first for container


		MAIN Possible problem :: DONE
			Due to changing the concat situation it will became only one push
			Create a prototype where with using 'this' keyword in order to push unique keys & values
			
		NOTE FOR FEB 7 2023
		- return specific element with id in contructorComponent in order to build index.js
		- add parameter in constructorComponents and then ask for arguments for no.1 question
	*/
	function ProjectTodoList(id, name, content, date) {
		this.inputId = id;
		this.inputName = name;
		this.inputContent = content;
		this.inputDate = date;
	}

	ProjectTodoList.prototype.pushTodoList = function (arrayName) {
		const inputId = this.inputId;
		const inputName = this.inputName;
		const inputContent = this.inputContent;
		const inputDate = this.inputDate;

		return arrayName.push({ inputId, inputName, inputContent, inputDate });

		// return currentTask.concat(arrayName);
	};

	// ------------- MAIN COMPONENTS -------------
	function modalTask() {
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

		confirmBtn.addEventListener('click', async (e) => {
			const objectId = Math.floor(Math.random() * 999);
			const objectVal = document.querySelector('#inputTask').value;
			const objectDate = format(endOfDay(new Date()), 'MM/dd/yyyy');
			const objCollected = new ProjectTodoList(
				objectId,
				objectVal,
				objectVal,
				objectDate
			);

			if (objectVal === null || objectVal === '') {
				alert('input some text');
			} else {
				currentTask.forEach((dataObj) => {
					if (dataObj.projectTitle === 'create') {
						let dataMap = dataObj.projectTask;
						objCollected.pushTodoList(dataMap);

						return localStorage.setItem(
							'storeProj',
							JSON.stringify(currentTask)
						);
					}
				});

				// for (let dataObj of currentTask) {
				// 	if (dataObj.projectTitle === 'gege') {
				// 		let dataMap = dataObj.projectTask;
				// 		// -------- ORIGINAL PUSH METHOD --------
				// 		// dataMap.push({
				// 		// 	inputId: objectId,
				// 		// 	inputName: `${objectVal}Name`,
				// 		// 	inputContent: objectVal,
				// 		// 	inputDate: objectDate
				// 		// });

				// 		// -------- IF USING OOP METHOD --------
				// 		//G dataMap.push(objCollected);
				// 		// dataMap.push(
				// 		// 	new ProjectTodoList(objectId, objectVal, objectVal, objectDate)
				// 		// );

				// 		//G currentTask.concat(dataMap);
				// 		//G const lastArr = [currentTask.slice(-1).pop()];
				// 		//G localStorage.setItem('storeProj', JSON.stringify(lastArr));

				// 		// -------- USING PROTOYPE OOP --------
				// 		objCollected.pushTodoList(dataMap);

				// 		// const lastArr = [currentTask.slice(-1).pop()];
				// 		localStorage.setItem('storeProj', JSON.stringify(currentTask));
				// 	}
				// }

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
	}

	function getElement(params1, params2) {
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

			const dataObj = currentTask.map((item) => {
				const deleteObj = item.projectTask.filter(
					(task) => task.inputId !== params1.inputId
				);

				item.projectTask = deleteObj;
				localStorage.setItem('storeProj', JSON.stringify(currentTask));
			});

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
	}

	function showAllItem() {
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
	}

	paramsTarget.appendChild(h1);
	paramsTarget.appendChild(showAllItem());
	buttonWrapper.appendChild(icon);
	buttonWrapper.appendChild(buttonTask);
	paramsTarget.appendChild(buttonWrapper);
}

export function constructorComponent() {
	// function autoId() {
	// 	for (const data of getProj('storeProj')) {
	// 		const dataSelected = data.projectTitle;
	// 		const splitData = dataSelected.toLowerCase().split(' ')[0];
	// 		return splitData;
	// 	}
	// }
	// const setIdContainer = currentTask.forEach((item) => {
	// 	return autoId(item);
	// });
	// console.log(`set ids for ${setIdContainer}`);
	// ---------- USING FOR OF LOOP ----------

	// for (const data of getProj('storeProj')) {
	// 	const elementMain = document.createElement('div');

	// 	setAttributes(elementMain, {
	// 		class: 'contentContainer',
	// 		id: `${autoId(data)}Container`
	// 	});

	// 	mainComponents(elementMain);

	// 	return elementMain;
	// }

	// FOCUS FEB 07 2023
	// ---------- USING MAP ITERATOR ----------
	const elementMain = document.createElement('div');

	setAttributes(elementMain, {
		class: 'contentContainer'
	});

	const arrObjMap = getProj('storeProj').map((item) => {
		const elementStoreId = document.createElement('div');

		setAttributes(elementStoreId, {
			class: 'contentContainer',
			id: `${autoId(item)}Container`
		});

		mainComponents(elementStoreId);

		return elementMain.appendChild(elementStoreId);
	});

	return elementMain;
}

console.log(constructorComponent());
