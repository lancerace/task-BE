# task-BE


API endpoint url is https://delivify-list-backend.herokuapp.com 

if api is not working for the first time, heroku is in **sleep mode** as i am using the free version. 
please try to trigger the api again.

# Available Routes

POST `/api/lists` - Create a list with name.

GET `/api/lists` - Get all lists with tasks.

DELETE `/api/list/:listId` - Delete a list with all its tasks.

POST `/api/tasks` - Create a task of a list.

PUT `/api/tasks` - Update task.

DELETE `/api/tasks/:id` - Delete one task.

DELETE `/api/tasks/` - Delete multiple tasks from a list.

PUT `/api/tasks/complete` - Update task status of complete or incomplete. 

## How to run the project
1. `npm install --global yarn`
2. `yarn install`
3. `yarn dev`
