# csv-to-db-grooton-round-2
This web application allows users to upload .csv files to the server, where the csv file is converted to json file for easier working, then every single row is inserted to the data base. The application also encrypts the password credentials from the column named "password".
The application's front-end is developed using HTML, CSS and Javascript. The front-end application makes api requests to the server end points for uploading data and also receiving information about the uploads.
The back-end is developed using Node.js, Express, MongoDB, Mongoose ORM, Bcrypt.js, csvtojson, express-fileUpload.<br>
## Features
	1.Encryption of the password column using Bcrypt.js package.
	2.Displaying the progress of the upload to the database.
	3.Prevents reuploading same csv file to the server.
	4.Error messages displayed in the UI in while encountering errors.
## Tech Stack
### Frontend
	1.HTML
	2.CSS
	3.Javascript
### Backend
	1.Node.js
	2.Express // Run server
	3.MongoDB // Database 
	4.Mongoose // ORM
	5.Bacrypt.js // To hash the password 
	6.csvtojson // To convert csv file to json
	7.express-fileUpload // For easier file uploads to the server in backend

## File Structure
	📦client
	 ┣ 📜folder.png
	 ┣ 📜index.html
	 ┣ 📜main.js
	 ┗ 📜style.css
	📦server
	 ┣ 📂models
	 ┃ ┗ 📜Main.js
	 ┣ 📂routes
	 ┃ ┗ 📜main.js
	 ┣ 📂uploads
	 ┃ ┗ 📜userdata.csv
	 ┣ 📜.env
	 ┣ 📜index.js
	 ┣ 📜package-lock.json
	 ┗ 📜package.json
