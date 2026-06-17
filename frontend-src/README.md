# Flask + React Student Management System

A simple Student Management System built with **Flask**, **React (Vite)**, and **SQLite**.

## Project Structure

```text
my-project/
│
├── venv/                    # Python virtual environment
│
├── static/                  # React production build output
│   ├── index.html
│   └── assets/
│       ├── index-abc123.js
│       └── index-abc123.css
│
├── frontend-src/            # React source code
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── app.py                   # Flask application
├── database.py              # SQLite database connection
├── requirements.txt         # Python dependencies
└── students.db              # SQLite database
```

## Technologies Used

* Python
* Flask
* React
* Vite
* SQLite
* JavaScript
* HTML
* CSS

## Setup Instructions

### 1. Create Virtual Environment

```
python -m venv venv
```

### 2. Activate Virtual Environment

Windows:

```
venv\Scripts\activate
```


### 3. Install Flask

```
pip install flask
```

### 4. Generate Requirements File

```
pip freeze > requirements.txt
```

### 5. Create Project Directories

```
mkdir static
mkdir frontend-src
```

### 6. Create Backend Files

```
echo. > app.py
echo. > database.py
```

### 7. Setup React Frontend

```
cd frontend-src
npm install
```

## Vite Configuration

File: `frontend-src/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../static',
    emptyOutDir: true
  }
})
```

## Build React Application

Navigate to the frontend directory:

```
cd frontend-src
```

Build the React application:

```
npm run build
```

The generated files will be placed inside the `static/` directory.

## Run Flask Application

```
python app.py
```

Flask will serve both the backend API and the React frontend.

## Features

* Add Students
* View Students
* Update Student Information
* Delete Students
* SQLite Database Integration
* React Frontend
* Flask REST API

## License

This project is open-source and available under the MIT License.
