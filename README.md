Healthcare Project

# Healthcare App — README

## 🚀 Overview

This is a **Healthcare Web Application** built using:

* **Next.js** (Frontend)
* **React (JS)** for component logic
* **Tailwind CSS** for styling
* **PrimeReact** components styled to work with Tailwind
* **Node.js + Express** (Backend)
* **MongoDB** using Mongoose ODM

The application allows users to register, log in, view health metrics, interact with a calendar, and check health insights.

---

## 🧩 Features

### 🔐 Authentication

* **User Registration**
* **User Login**
* JWT or session-based authentication (depending on your setup)

### 🏥 Dashboard

Displays important patient vitals:

* **Blood Pressure (BP)**
* **Sleep Duration**
* **Step Count**

### 📅 Calendar Integration

* Built using **react-calendar**
* Click any date to view corresponding health data
* Allows navigating by month/week

### 📊 Graphs & Visualization

* Graph showing **BP Trends** over selected dates
* Uses any chart library integrated with React 

### 💡 Health Tips Section

* UI section that displays doctor/AI-generated health tips
* Can be static or fetched from backend

---

## 📁 Tech Stack

### **Frontend**

* Next.js
* React (JavaScript)
* Tailwind CSS
* PrimeReact

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/whoisRAJ/iron_man_squad_2.git
cd your-project-folder
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

### 3️⃣ Install Backend Dependencies (if backend folder exists)

```bash
cd FE
npm install
```

### 4️⃣ Environment Variables

Create a `.env` file in both frontend & backend folders.

Example for backend:

```
PORT=5000
MONGO_URI=mongodb+srv://ironman_db_user:Ironman%40123@ironmancluster.zhsmysn.mongodb.net/Healthcare?
JWT_SECRET=namnorihclnohtkcahqwertzxcvpoiumnbv
appName=IronManCluster
```

---

## ▶️ Running the App
```
npm run dev
```

#
