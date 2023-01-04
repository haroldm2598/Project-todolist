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

		body.addEventListener('click', async (e) => {
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
				/*
						if the element is null or nothing return nothing for container
						if the element is true and has item therefore go for paramsContainer
						make else remove only previous element not the `paramsContainer`
							
						if the element exist therefore removeIdContainer else do default removeContainer
						maybe select element therefore show the ID of it and not the way getElementById
					*/
				case params:
					const targetId = `#${params}Container`;
					const elementTarget = document.getElementById('wahaContainer');
					for (let i = 0; i < elementTarget.length; i++) {
						console.log(elementTarget[i].id);
					}

					if (elementTarget) {
						// await removeAddElement(targetId);
						await removeAddElement('.contentContainer');
						divWrapper.appendChild(constructorComponent());
					} else {
						await removeAddElement('.contentContainer');
						divWrapper.appendChild(constructorComponent());
					}

					break;
			}
		});
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
