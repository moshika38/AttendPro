my-project/
│
├── venv/                    ← Python virtual environment
│
├── static/                  ← React build output (npm run build)
│   ├── index.html
│   └── assets/
│       ├── index-abc123.js
│       └── index-abc123.css
│
├── frontend-src/            ← React source code (development only)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── app.py                   ← Flask main file
├── database.py              ← SQLite connection
├── requirements.txt         ← pip packages
└── students.db              ← SQLite database file


```python -m venv venv```

```venv\Scripts\activate```

```pip install flask```

```
mkdir static
mkdir frontend-src
```

```
echo. > app.py
```

```
echo. > database.py
```

```
pip freeze > requirements.txt
```

```
cd frontend-src
npm install
```


### frontend-src/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../static',
    emptyOutDir: true
  }
})

