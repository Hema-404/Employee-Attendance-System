**Employee-Attendance-System**
A web-based Attendance Tracking System for Employees and Managers with dynamic dashboards, attendance marking, and reporting. Built using HTML, CSS, and JavaScript with a clean and responsive design.


A simple and elegant Attendance Tracking System built with HTML, CSS, and JavaScript,sql.  
The system supports two user roles: Employee and Manager, with dynamic dashboards, attendance tracking, and reporting.

Employee Features
- Register/Login (predefined users for demo)
- Mark daily attendance (**Check In / Check Out**)
- View attendance history

Manager Features
- Login
- View all employees' attendance


 1. **Clone the repository**

```bash
git clone https://github.com/Hema-404/Employee-Attendance-System.git
cd backend
Open in browser


2.**project structure**

attendance-system/
│
├── index.html # Landing & login page for both roles
├── css/
│ └── style.css # Shared styles for all pages
├── js/
│ └── main.js # Shared JS: login, navbar, logout, attendanc
├── employee/
│ ├── dashboard.html
│ ├── attendance.html
│ ├── history.html
└── profile.html
├── manager/
│ ├── dashboard.html
│ ├── all_attendance.html
│ ├── team_calendar.html
│ └── reports.html

3.Simply open index.html in your browser .

4.Login Credentials (for demo)

| Role     | Name          | Email                  | Password |
| -------- | ------------- | ------------------------------------
| Employee | Hema Employee | [employee@example.com] | 1234     |
| Manager  | john Manager  | [manager@example.com]  | 1234     |


5.Test Features

Select role (Employee / Manager) → Login
Employee: Mark attendance, view dashboard and history
Manager: View team dashboard, all attendance, and reports

How to Run
npm init -y
npm install express mysql2 body-parser cors
node server.js


Technologies Used

HTML5
CSS3 (Responsive & elegant design)
JavaScript (Vanilla JS, localStorage for data persistence)
SQL

screenshots
<img width="1844" height="924" alt="image" src="https://github.com/user-attachments/assets/a792bc3e-e954-4d28-b7db-be3ad0063a7a" />


Key Features

Dynamic Navbar based on role
LocalStorage-based authentication for demo purposes
Employee Dashboard with attendance stats and charts
Manager Dashboard with team stats and charts
Responsive design for mobile and desktop



AUTHOR:
Name:Hema M (Hema-404)
College Name:Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College
Contact no: 7402305404
