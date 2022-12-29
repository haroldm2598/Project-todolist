import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';
import { constructorComponent } from './contentComponents/constructorComp';
import { getProj } from './data/getProj';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	divWrapper.appendChild(inboxComponents());

	// TESTING PURPOSE
	const data = getProj('storeProj');
	const mapTable = data.map((getElemParams) => {
		const findTable = data.find(
			(task) => task.projectTitle === getElemParams.projectTitle
		);

		return findTable;
	});
	// -------------------------------

	document.addEventListener('DOMContentLoaded', (event) => {
		const body = document.getElementById('sideBarContainer');

		body.addEventListener(
			'click',
			async (e) => {
				let params = e.target.id;

				switch (params) {
					case 'inboxId':
						await removeAddElement('.contentContainer');
						divWrapper.appendChild(inboxComponents());
						break;

					case 'todayId':
						await removeAddElement('.contentContainer');
						divWrapper.appendChild(todayComponents());
						break;

					case 'weekId':
						await removeAddElement('.contentContainer');
						divWrapper.appendChild(weekComponents());
						break;
					case 'create':
						await removeAddElement('.contentContainer');
						// await removeAddElement('#gege');
						divWrapper.appendChild(constructorComponent());
						break;
					case 'gege':
						await removeAddElement('.contentContainer');
						// await removeAddElement('#create');
						divWrapper.appendChild(constructorComponent());
						break;
					default:
						console.log(`${params} not found`);
				}
			},
			false
		);
	});

	const removeAddElement = (target) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(target);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	};

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};

/*
	- Get the dynamic id of the constructor of selected sideproj sidebar (constructorComp)
	- Implement finding id and insert it in switch case method in order to find there dynamic constructor
	- Correct if putting 'case params' it will find it's id of sidebar but not the specific id for container id 
*/
