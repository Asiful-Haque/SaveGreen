# 🤝 SaveGreen 🤝

The Web Application is designed to provide an efficient platform for managing disaster relief efforts. The project aims to streamline volunteer coordination, crisis reporting, donation collection, and inventory management to enhance disaster response. The system includes roles for Admins and Volunteers, along with public access for donation and crisis reporting.

![App Screenshot](https://res.cloudinary.com/drpasy4d2/image/upload/v1742202643/saveGreen1_uwe4zs.png)

## 🛠️ Tech Stack

**🌍 Front-end:** React.js, TailwindCSS

**🖥️ Back-end:** Node.js, Express.js

**🛢️ Database:** PostgreSQL

**🔑 Authentication:** JWT (JSON Web Token)

## 🌟 Features

1️⃣ User Registration & Log In

-   Secure user authentication and authorization with email and password (JWT).
-   User profiles containing basic info, skills, and supported causes.
-   users here are admin,and normal user.

2️⃣ Dashboard

-   Customized dashboard for both users and admin.
-   For Admin : Crisis, Fund, Volunteer, Task part, Report.
-   For User: Crisis, Fund, Volunteer.

3️⃣ Donation

-   Users and admin both can see the donation form to donate.
-   Both can track the total amount of donation.
-   Daily donation chart is shown in this part.
-   Better UI like other Dashboard platforms.

4️⃣ Crisis

-   Users can see the crises (when admin approves).
-   Admin can approve the crises.
-   Admin can assign crisis to volunteers.
-   Both can filter the crises.

5️⃣ Volunteer

-   Users can see Volunteers (When admin approves).
-   Admin can verify and approve volunteers.

6️⃣ Task

-   Only admin can access this.
-   Admin can assign task to the volunteers.

7️⃣ Report

-   Admin can access this.
-   Admin can generate report excel file daily basis.

## 🔗 API Reference

#### 👤 User 🏷️

```http
POST /api/users/register - Register a new user
POST /api/users/login - Authenticate user and return a token
POST /api/users/donate - Register the donation information.
GET /api/users/total_donation - Get the total amount of donation
GET /api/users/total_donation_date_wise - Date wise donation amount
```

#### 🦸 Volunteer 🤝

```http
GET /api/volunteer/get_volunteer - Fetch all volunteers to show in UI
PUT /api/volunteer/approve_volunteer - volunteer will be approved after validation by admin
```

#### 📋 Task 📌

```http
GET /api/task/get_tasks - Fetch all tasks to show in UI
POST /api/task/assign_tasks - volunteer will be assigned on the tasks by admin
```

#### 🚨 Crisis ⚠️

```http
GET /api/crisis/get_crisis - Fetch all crisis to show in UI
POST /api/crisis/set_crisis - Anyone can add crisis to get help
PUT /api/crisis/approve_crisis - Added crisis will be rechecked by admin and approved or rejected
POST /api/crisis/assign_volunteers - Admin can assign volunteers to specific crises
```

#### 📊 Report 📑

```http
GET /api/report/get_report - Admin will generate datily donation update on excel files
```

## Database Schema

![App Screenshot](https://res.cloudinary.com/drpasy4d2/image/upload/v1742202480/SaveGreen.drawio_qy3yl0.png)

## 🏎️ Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Feedback

If you have any feedback, please reach out to us at asiful35-2961@diu.edu.bd
