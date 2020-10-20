let paths = document.querySelectorAll("path");

const API_URL = 'https://api.rootnet.in/covid19-in/stats/latest';

async function getData(){
	const response = await fetch(API_URL);
	const data = await response.json();
	state_data = [];
	console.log(data);

// 	document.querySelector('.total_cases').textContent = data.data.summary.total;
// 	document.querySelector('.total_deaths').textContent = data.data.summary.deaths;
// 	document.querySelector('.discharged').textContent = data.data.summary.discharged;
// 	document.querySelector('.refreshed').textContent = data.lastRefreshed;	

	Object.keys(data.data.regional).forEach(key=>{
		state_data.push(data.data.regional[key]);
	})
	paths.forEach(path=>{
		// console.log(path.getAttribute("name"));
		target_state_data = state_data.find(state=>state.loc === path.getAttribute("name"));
		path.setAttribute("data-toggle","tooltip");
		path.setAttribute("data-html",true);
		path.setAttribute("data-original-title",`<b><div>${target_state_data.loc}</div></b><ul><li>Indian Cases: <b>${target_state_data.confirmedCasesIndian}</b></li><li>Foregin Cases: <b>${target_state_data.confirmedCasesForeign}</b></li><li>Discharged: <b>${target_state_data.discharged}</b></li><li>Deaths: <b>${target_state_data.deaths}</b> </li><li>Total Confirmed:<b> ${target_state_data.totalConfirmed}</b></li></ul>`)
	});
	// console.log(state_data);
	// console.log(data.data.regional);

	// state_data = data.data.regional;
	// Object.keys(state_data).forEach(key=>{

	// });
}
getData();
