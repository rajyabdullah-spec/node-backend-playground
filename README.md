# Node.js & ExpressJS Backend Playground

Welcome to my personal backend development repository. This repository documents my journey in mastering server-side architecture, RESTful routing, MVC design patterns, and database integrations using Express.js and MongoDB.

## 📂 Repository Structure

The project is highly organized into isolated, scalable modules to prevent code clutter and ensure clear separation of concerns:

* **`01-express-ejs-basics/`** Contains early architectural concepts, chainable route handlers, custom middlewares (including Morgan logger), static file serving, and the implementation of EJS template layout partials.
* **`02-the-timeline/`** *Assignment 1 Setup.* A full-stack mockup of a social network feed that utilizes a dynamic sorting algorithm to display user messages in a strict chronological order (most recent on top).
* **`03-the-timeline-v2/`** *Assignment 2 Setup.* An advanced evolution of the timeline project implementing a full **Model-View-Controller (MVC)** architecture integrated with a cloud database (**MongoDB Atlas**). 

---

## 🚀 Key Features in Version 2 (03-the-timeline-v2)

This upgraded version introduces robust backend functionalities and full CRUD operations:
* **Cloud Database Integration:** Connected seamlessly to MongoDB Atlas using Mongoose ODM to persist post data permanently in the cloud ☁️.
* **Full CRUD Capabilities:** Users can now **Create** new posts, **Read** the dynamic timeline feed, view single post details, **Update** existing post content, and **Delete** posts permanently 🛠️.
* **Data Validation:** Strict backend validation rules ensuring that any created or edited post must be a minimum of 25 characters long before saving 🛑.
* **Modernized UI Style:** Fully customized the edit and details view (`details.ejs`) to perfectly match the sleek GitHub-inspired dark theme (Matrix Connect) used in the main timeline page 🖤.

---

## 🛠️ Tech Stack & Dependencies

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Database & ODM:** MongoDB Atlas & Mongoose
* **Template Engine:** EJS (Embedded JavaScript)
* **Development Tools:** Morgan (HTTP Request Logger), Nodemon

---

## 🚀 How to Run the Projects Locally

To explore or run any specific module on your machine, follow these steps:

1. **Clone the Repository:**
```bash
   git clone https://github.com/rajyabdullah-spec/node-backend-playground.git

   cd node-backend-playground
```

2. **Navigate and Run Module 1 (Basics):**
```bash
    cd 01-express-ejs-basics
    npm install
    node app.js
```

3. **Navigate and Run Module 2 (The Timeline Assignment 1):**
```bash
    cd ../02-the-timeline
    npm install
    node app.js
```

4. **Navigate and Run Module 3 (The Timeline V2 with DB):**
```bash
    cd ../03-the-timeline-v2
    npm install
    npm start
```

*💡 After running any module, you can access the local server at:*
 http://localhost:3000