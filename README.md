## Getting Started
To get started with this project, follow these steps:

1.Fork this repository

2.Clone this repository to your local machine:

```bash
  git clone https://github.com/your-username/todolist.git
```
2.Install the required dependencies for both the backend and frontend:

```bash
cd todolist
cd backend && npm install
```

To more easily customize the URL of the server:

1. Open the `.env` file in the text editor of your choice.
2. Set the `FRONTEND_URL` ,`JWT_SECRET`and `MONGO_URI` environment variable to the env file.
3. When sending a request, use `BACKEND_HOST` as the base URL:

Configure the database connection in the backend. You can use MongoDB Atlas or a local MongoDB server.

```bash
cd ../client && yarn install
```

To more easily customize the URL of the client:

1. Open the `.env` file in the text editor of your choice.
2. Set the `VITE_APP_URL`  environment variable to the URL of the server.
3. When sending a request, use `VITE_APP_URL` as the base URL:



Start the backend server:

```bash
cd backend && npm start
```
The server becomes available at <http://localhost:5000>.

Start the frontend application:

```bash
cd client && yarn dev
```

Access the application in your web browser at http://localhost:5173.


