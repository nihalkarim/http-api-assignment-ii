const users = {};

const respondJSON = (request, response, status, object) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	response.writeHead(status, headers);
	response.write(JSON.stringify(object));
	response.end();
};

const respondJSONMeta = (request, response, status) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	response.writeHead(status, headers);
	response.end();
};

const getUsers = (request, response) => {
	const responseJSON = {
		users,
	};

	return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
	return respondJSONMeta(request, response, 200);
};

// /addUser: Should return a 201 status code when adding a new user, a 204 when
// updating the age of an existing user, and a 400 if the request is missing a name, age, or both.

const addUSer = (request, response, body) => {
    const responseJSON = {
		message: 'Name and age are both required',
	};

	if(!body.name || !body.age) {
		responseJSON.id = 'addUserMissingParams';
		return respondJSON(request, response, 400, responseJSON);
	}

	let responseCode = 204;

	if(!users[body.name]) {
		responseCode = 201;
		users[body.name] = {
			name: body.name,
		}
	}

	users[body.name].age = body.age;

	if(responseCode === 201) {
		responseJSON.message = 'New user created successfully';
        console.log(users);
		return respondJSON(request, response, responseCode, responseJSON);
	}

    console.log(users);

	return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
	const responseJSON = {
		message: 'The page you are looking for was not found.',
		id: 'notFound',
	};

	return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
	return respondJSONMeta(request, response, 404); 
};

module.exports = {
	getUsers,
	getUsersMeta,
	addUSer,
	notFound,
	notFoundMeta,
};