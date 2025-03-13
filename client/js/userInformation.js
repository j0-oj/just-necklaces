const button = document.getElementById('demo');
const output = document.getElementById('output');

const getUserData = async () => {
	console.log('Fetching user data...');
	const response = await fetch('http://localhost:4000/api/users');
	const data = await response.json();
	console.log(data);

	output.innerHTML = '';

	data.forEach((data) => {
		const divEl = document.createElement('div');

		divEl.textContent = `
					id: ${data.id}, 
					firstname: ${data.firstname},
					lastname: ${data.lastname},
					contact: ${data.contact},
					email: ${data.email},
					username: ${data.username},
					password: ${data.password}`;
		output.appendChild(divEl);
	});
};

button.addEventListener('click', getUserData);
