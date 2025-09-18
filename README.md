# First Mini Project : “Make it”  
## Subject  
This is my very first front-end / back-end project.
The goal of this project was to apply both back-end and front-end knowledge learned in class in order to create a client management system.
My project was a little different as I decided to build a to-do list system that I called “Make it”.
Based on the CRUD model, users can create an account or login and retrieve, modify or delete information from their personal projects or tasks.
## Technologies
**Front-End**
+ HTML/CSS
+ Figma
+ Swup

**Back-End**
+ Vue.js
+ Express
+ Node.js
+ Oracle
## Time Period
2025.09.15 ~ 2025.09.19 (5 days)
## Usage
### 1. Login / Sign Up
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/homepage.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/login.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/signup.png" width="400">
>
> On the homepage, "login" and "sign up" will take you respectively to the login and sign up page.

### 2. User’s Projects Overall Overview
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectsList.png" width="400">
> 
> After login, you will be able to see the projects you created.
> They are displayed from the newest to the oldest project created.
> By clicking on "Due Date", you can rearrange your projects according to the deadline (closest or latest).
> The search bar allows to look for a project through its name, priority or status.

### 3. User’s Projects Individual Overview
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectView.png" width="400">
> 
> You can click on the project's name to access the "view project".
> This page gives you an overview (information) of a project.

### 4. New Project
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/newProject.png" width="400">
>
> The "add project" page will allow you to create a brand new project.
> You will be able to select the title, priority, deadline, and insert multiple tasks.

### 5. Project’s Edit
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectEdit1.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/newProject2.png" width="400">
> 
> 
### 6. Delete Project
## Resources
+ Icons from FontAwesome
+ Fonts from Google Fonts
## After Project
*Things I would improve/wish to continue working on:*

**Back-End**
+ Edit part : it allows the user to change information both related to the project or the tasks, but does not offer the possibility to delete tasks yet.
+ Add tasks function : users should be able to add as many tasks as they want but I limited the number of tasks per project to 5 as a test-run. I think I could change that function and modify my frond-end code accordingly.
+ Others : I considered adding other functions such as a calendar that would display the user’s projects over time.

**Front-End**
+ I decided to keep the front-end part rather simple and neutral in order to focus on implementing all the different CRUD operations learned in class, but I would like to work on a more responsive design such as smoother transitions or swiper functions instead of a “plain” display. I failed on implementing the library Swup as I encountered issues such as “jumpy” effects when transitioning.
