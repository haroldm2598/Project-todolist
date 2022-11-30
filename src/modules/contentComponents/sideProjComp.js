import '../../styles/main.scss';
import { getProj } from '../data/getProj';
import { setAttributes } from '../helperComponents/setAttributes';
import { createElem } from '../helperComponents/setElement';

const removeAddTask = (target) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const targetNode = document.querySelector(target);
			const result = targetNode.parentNode.removeChild(targetNode);
			resolve(result);
		}, 100);
	});
};

//	STRING LIMIT
// const stringLimit = (string = '', limit = 0) => {
// 	return string.substring(0, limit);
// };

// GLOBAL VAR
const subHeadWrapper = document.createElement('div');

setAttributes(subHeadWrapper, {
	class: 'sideBarContainer__wrapper',
	id: 'projectAddBtn'
});

const addProjList = (addProjParam, addProjParam2 = false) => {
	const objProject = [];

	const projWrapper = createElem('div');
	const btnInput = createElem('input');
	const btnConfirm = createElem('button');
	const btnCancel = createElem('button');

	setAttributes(projWrapper, { class: 'projWrapper', id: 'projIdTask' });
	setAttributes(btnInput, { class: 'projWrapper__input', id: 'projValue' });
	setAttributes(btnConfirm, {
		class: 'projWrapper__confirm fas fa-plus-square'
	});
	setAttributes(btnCancel, {
		class: 'projWrapper__cancel fas fa-times-circle'
	});

	btnConfirm.addEventListener('click', async () => {
		const selectValue = btnInput.value;
		const currentTask = getProj('storeProj');

		if (selectValue === null || selectValue === '') {
			alert('Input some text');
		} else {
			objProject.push({ projectTitle: selectValue, projectTask: [] });
			const lastArr = [objProject.slice(-1).pop()];

			localStorage.setItem(
				'storeProj',
				JSON.stringify(currentTask.concat(lastArr))
			);

			await removeAddTask('#projIdTask');
			await removeAddTask('#sbProjectList');

			addProjParam.appendChild(showAllItem(addProjParam));
			addProjParam.appendChild(addProjParam2);
			// ERROR NODE PLEASE COPY THE INBOXINDEX THE WAY IT LOOP AND ITERATE THE OBJECT
			// lastArr.forEach((data) => {
			// 	return projListItem.appendChild(data.projectTitle);
			// });
		}
	});

	btnCancel.addEventListener('click', async () => {
		await removeAddTask('#projIdTask');
		addProjParam.appendChild(addProjParam2);
	});

	projWrapper.appendChild(btnInput);
	projWrapper.appendChild(btnConfirm);
	projWrapper.appendChild(btnCancel);

	return addProjParam.appendChild(projWrapper);
};

const getElement = (getElemParams, getElemParams2, getElemParams3) => {
	const projListItem = document.createElement('li');
	const projListBtn = document.createElement('button');
	const deleteIcon = document.createElement('i');

	const autoId = () => {
		const getData = getElemParams.projectTitle;
		const splitData = getData.toLowerCase().split(' ')[0];

		return splitData;
	};

	setAttributes(projListItem, {
		class: 'sideBarContainer__projectList--item'
	});
	setAttributes(projListBtn, {
		class: 'sideBarContainer__projectList--item__btn',
		id: `${autoId()}`
	});

	projListBtn.textContent = getElemParams.projectTitle;

	deleteIcon.addEventListener('click', async () => {
		const currentTask = getProj('storeProj');
		const newTask = currentTask.filter(
			(task) => task.projectTitle != getElemParams.projectTitle
		);
		localStorage.setItem('storeProj', JSON.stringify(newTask));

		await removeAddTask('#sbProjectList');
		await removeAddTask('#projectAddBtn');

		// use params instead of using direct
		getElemParams3.appendChild(showAllItem(getElemParams3));
		getElemParams3.appendChild(subHeadWrapper);
	});

	projListItem.addEventListener('mouseover', (e) => {
		setAttributes(deleteIcon, {
			class: 'sideBarContainer__projectList--item__icon fas fa-times',
			id: 'deleteIconId'
		});
		// NOV 30 2022
		// SAMPLE ONLY FOR PUSHING INSIDE THE ARRAY SPECIFIC
		/*
			Try to find the specific data and then edit the other second one
			Then insert a new update array of an objects.
		*/
		const data = getProj('storeProj');
		const result = data.map((task) => {
			const dataProjectTask = task.projectTask;
			const dataProjectTaskResult = dataProjectTask.push({ anoName: 'tite' });
			return dataProjectTaskResult;
		});
		console.log(data);
		console.log(result);
		// to target there own ids
		// console.log(e.target.id);
	});

	projListItem.addEventListener('mouseout', () => {
		setAttributes(deleteIcon, {
			class: 'sideBarContainer__projectList--item__iconRemove '
		});
	});

	projListItem.appendChild(projListBtn);
	projListItem.appendChild(deleteIcon);
	getElemParams2.appendChild(projListItem);
};

const showAllItem = (showAllItemParams) => {
	const projList = document.createElement('ul');
	setAttributes(projList, {
		class: 'sideBarContainer__projectList',
		id: 'sbProjectList'
	});

	for (const data of getProj('storeProj')) {
		getElement(data, projList, showAllItemParams);
	}

	showAllItemParams.appendChild(projList);

	return projList;
};

export const addProject = (paramTarget) => {
	const icon = document.createElement('i');
	const addBtn = document.createElement('button');

	setAttributes(icon, {
		class: 'sideBarContainer__wrapper--icon fas fa-plus-square'
	});
	setAttributes(addBtn, {
		class: 'sideBarContainer__wrapper--btn'
	});

	addBtn.textContent = 'Add Project';

	subHeadWrapper.addEventListener('click', () => {
		const targetElement = document.querySelector('#projectAddBtn');

		paramTarget.appendChild(addProjList(paramTarget, subHeadWrapper));
		targetElement.parentElement.removeChild(targetElement);
	});

	subHeadWrapper.appendChild(icon);
	subHeadWrapper.appendChild(addBtn);

	return (
		paramTarget.appendChild(showAllItem(paramTarget)) &&
		paramTarget.appendChild(subHeadWrapper)
	);
};
