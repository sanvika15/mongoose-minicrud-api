```markdown
# ✅ Mongoose + Express CRUD API

A simple REST API built with **Node.js**, **Express**, and **Mongoose** to manage employees (`name`, `email`, `position`).

---

## 📁 Project Structure

```

minicrud-api/
├── config/
│   └── database.js        # MongoDB connection
├── controllers/
│   └── empController.js   # HTTP handlers
├── models/
│   └── empModel.js        # Mongoose schema
├── routes/
│   └── empRoutes.js       # API endpoints
├── services/
│   └── empService.js      # Business logic & validation
├── .env                   # Environment variables
├── app.js                 # Server entry point
└── package.json           # Dependencies & scripts

````

---

## 🔧 Setup & Run

1. **Create project folder** and initialize:
   ```bash
   mkdir minicrud-api
   cd minicrud-api
   npm init -y
````

2. **Install dependencies**:

   ```bash
   npm install express mongoose dotenv
   ```

3. **Create folders & files** (example in PowerShell):

   ```powershell
   mkdir config controllers models routes services
   New-Item -ItemType File -Name app.js, .env
   New-Item -ItemType File -Path config -Name database.js
   New-Item -ItemType File -Path controllers -Name empController.js
   New-Item -ItemType File -Path models -Name empModel.js
   New-Item -ItemType File -Path routes -Name empRoutes.js
   New-Item -ItemType File -Path services -Name empService.js
   ```

4. **Configure environment** — create a file `.env` in the project root:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/nobaba_employees
   ```

---

## 🛠️ Code Overview

### 1. MongoDB Connection — `config/database.js`

```js
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
```

---

### 2. Mongoose Schema — `models/empModel.js`

```js
const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  position: { type: String, enum: ['Manager','Developer','Intern'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', empSchema);
```

---

### 3. Business Logic — `services/empService.js`

```js
const Employee = require('../models/empModel');

exports.fetchAll = () => Employee.find();

exports.create = payload => {
  if (!payload.name || !payload.email || !payload.position) {
    throw new Error('All fields are required');
  }
  return new Employee(payload).save();
};

exports.update = (id, payload) =>
  Employee.findByIdAndUpdate(id, payload, { new: true });

exports.remove = id =>
  Employee.findByIdAndDelete(id);
```

---

### 4. HTTP Handlers — `controllers/empController.js`

```js
const svc = require('../services/empService');

exports.getAll    = async (req, res) => {
  res.json(await svc.fetchAll());
};

exports.create    = async (req, res) => {
  try {
    const emp = await svc.create(req.body);
    res.status(201).json(emp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update    = async (req, res) => {
  try {
    const emp = await svc.update(req.params.id, req.body);
    res.json(emp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete    = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
```

---

### 5. Routes — `routes/empRoutes.js`

```js
const router = require('express').Router();
const ctrl   = require('../controllers/empController');

router
  .get   ('/emp',     ctrl.getAll)
  .post  ('/emp',     ctrl.create)
  .put   ('/emp/:id', ctrl.update)
  .delete('/emp/:id', ctrl.delete);

module.exports = router;
```

---

### 6. Server Entry Point — `app.js`

```js
const express   = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();
app.use('/api', require('./routes/empRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## ▶️ Run the Server

Make sure MongoDB is running locally, then:

```bash
node app.js
```

You should see:

```
✅ MongoDB connected
🚀 Server running on port 5000
```

---

## 🌐 Testing Endpoints

Use Postman or cURL:

| Method | Endpoint       | Body (JSON)                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| GET    | `/api/emp`     | —                                                          |
| POST   | `/api/emp`     | `{ "name":"Alice","email":"a@x.com","position":"Intern" }` |
| PUT    | `/api/emp/:id` | `{ "position":"Developer" }`                               |
| DELETE | `/api/emp/:id` | —                                                          |

---

## 📈 Next Steps

* Add input validation (Joi/Zod)
* Implement centralized error middleware
* Deploy to MongoDB Atlas
* Add Swagger/OpenAPI documentation

Enjoy building! 🚀

```
```
