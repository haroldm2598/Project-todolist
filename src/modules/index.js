import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';
import { constructorComponent } from './contentComponents/constructorComp';

export function mainComponents() {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	divWrapper.appendChild(inboxComponents());

	// -------------------------------
	// ROUTERS

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

				case params:
					await removeAddElement('.contentContainer');
					divWrapper.appendChild(constructorComponent(params));

					// // FOCUS FEB 09 2023
					// for (const componentChildren of constructorComponent().children) {
					// 	const result = componentChildren.id;
					// 	if (result === `${params}Container`) {
					// 		divWrapper.appendChild(constructorComponent(params));
					// 	}
					// }
					break;

				// case params:
				// 	const targetId = `#${params}Container`;
				// 	const elementTarget = document.getElementById('wahaContainer');
				// 	for (let i = 0; i < elementTarget.length; i++) {
				// 		console.log(elementTarget[i].id);
				// 	}

				// 	if (elementTarget) {
				// 		// await removeAddElement(targetId);
				// 		await removeAddElement('.contentContainer');
				// 		divWrapper.appendChild(constructorComponent());
				// 	} else {
				// 		await removeAddElement('.contentContainer');
				// 		divWrapper.appendChild(constructorComponent());
				// 	}

				// 	break;
			}
		});
	});

	function removeAddElement(target) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const targetNode = document.querySelector(target);
				const result = targetNode.parentNode.removeChild(targetNode);
				resolve(result);
			}, 500);
		});
	}

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
}
