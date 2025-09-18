# First Mini Project : “Make it”  
## Subject - 제목  
This is my very first front-end / back-end project.  
The goal of this project was to apply both back-end and front-end knowledge learned in class in order to create a client management system.  
My project was a little different as I decided to build a to-do list system that I called “Make it”.  
Based on the CRUD model, users can create an account or login and retrieve, modify or delete information from their personal projects or tasks.  


저의 첫 번째 프론트엔드/백엔드 프로젝트입니다.  
이 프로젝트의 목표는 수업에서 배운 백엔드 지식과 프론트엔드 지식을 모두 적용하여 고객 관리 시스템을 만드는 것이었습니다.  
제 프로젝트는 "Make it"이라는 할 일 목록 시스템을 구축하기로 결정하면서 조금 달랐습니다.  
CRUD 모델을 기반으로 사용자는 계정이나 로그인을 생성하고 개인 프로젝트나 작업에서 정보를 검색, 수정 또는 삭제할 수 있습니다.  

## Technologies - 기술
**Front-End**
+ HTML/CSS
+ Figma
+ Swup

**Back-End**
+ Vue.js
+ Express
+ Node.js
+ Oracle
  
## Time Period - 기간
2025.09.15 ~ 2025.09.19 (5 days)

## Usage - 사용 방법
### 1. Login / Sign Up
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/homepage.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/login.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/signup.png" width="400">
>
> On the homepage, "login" and "sign up" will take you respectively to the login and sign up page.  
> Once the user is on either one of those two pages, they can still go back to the homepage by clicking on the site's name ("Make it").  


> **홈페이지에서 "로그인"과 "가입"은 각각 로그인 페이지와 가입 페이지로 이동합니다.**  
> **사용자가 두 페이지 중 하나에 접속하면, 사이트 이름("Make it")을 클릭하여 홈페이지로 돌아갈 수 있습니다.**  

### 2. User’s Projects Overall Overview
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectsList.png" width="400">
> 
> After login, the user will be able to see the projects they created.    
> The projects are displayed from the newest to the oldest by default.  
> By clicking on "Due Date", the user can rearrange and display their projects according to the deadline (closest or latest).  
> The search bar allows to look for a project through its name, priority or status.  
> The user can logout at anytime by clicking on the "logout" button on the right top corner of the page.  


> **로그인 후 사용자는 자신이 만든 프로젝트를 볼 수 있습니다.**  
> **프로젝트는 기본적으로 최신 프로젝트부터 가장 오래된 프로젝트까지 표시됩니다.**  
> **사용자는 "Due Date" (마감 시간)을 클릭하여 마감일(가까운 날짜 또는 최근 날짜)에 맞춰 프로젝트를 재배열하고 표시할 수 있습니다.**  
> **검색창을 통해 프로젝트의 이름, 우선순위 또는 상태를 확인할 수 있습니다.**  
> **사용자는 페이지 오른쪽 상단 모서리에 있는 "로그아웃" 버튼을 클릭하여 언제든지 로그아웃할 수 있습니다.**  

### 3. User’s Projects Individual Overview
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectView.png" width="400">
> 
> The user can click on the project's name to access the "view project".  
> This page displays an overview (information) of the project you clicked on.  


> **사용자는 프로젝트 이름을 클릭하여 "보기 프로젝트"에 액세스할 수 있습니다.**  
> **이 페이지에는 클릭한 프로젝트의 개요(정보)가 표시됩니다.**  

### 4. New Project
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/newProject.png" width="400">
>
> The "new project" page will allow the user to create a brand new project.  
> You will be able to select the title, priority, deadline, and insert multiple tasks. 


> **사용자는 "new project" (새 프로젝트) 페이지를 통해 새로운 프로젝트를 만들 수 있습니다.**  
> **제목, 우선순위, 마감일을 선택하고 여러 작업을 삽입할 수 있습니다.**  


### 5. Project’s Edit
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectEdit1.png" width="400">
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/projectEdit2.png" width="400">
> 
> The "edit project" page will allow the user to modify their project's name, priority, deadline, tasks.  
> By clicking on the checkboxes ("completed"), the user will be able to disable the input field and change the tasks' status to "completed".
> To save the changes, the user will have to click on the button "save changes".  


> **"edit project" (프로젝트 수정) 페이지에서는 사용자가 프로젝트 이름, 우선순위, 마감일, 작업을 수정할 수 있습니다.**  
> **체크박스("completed")을 클릭하면 사용자는 입력 필드를 비활성화하고 작업 상태를 "완료됨"으로 변경할 수 있습니다.**   
> **변경 사항을 저장하려면 사용자가 "변경 사항 저장" 버튼을 클릭해야 합니다.**  

### 6. Delete Project
> <img src="https://raw.githubusercontent.com/aline-rousselinsiv/vue_express/main/illustrations/deleteProject.png" width="400">
>
> After having selected as least one project, the user will be able to delete one or multiple projects at once after confirmation (alert message).  


> **하나 이상의 프로젝트를 선택한 후, 사용자는 확인(알림 메시지) 후 한 번에 하나 또는 여러 프로젝트를 삭제할 수 있습니다.**  
## Resources - 자료
+ Icons from FontAwesome
+ Fonts from Google Fonts
## After Project - 프로젝트 후기
*Things I would improve/wish to continue working on:*

**Back-End**
+ Edit part : it allows the user to edit their projects or tasks but does not offer the possibility to delete tasks yet.
+ **수종 페이지 : 사용자는 프로젝트나 작업을 편집할 수 있지만 아직 작업을 삭제할 수 있는 가능성은 제공하지 않습니다.**
+ Add tasks function : users should be able to add as many tasks as they want but I limited the number of tasks per project to 5 as a test-run. I think I could change that function and modify my frond-end code accordingly.
+ **작업 추가 기능 : 사용자가 원하는 만큼 작업을 추가할 수 있어야 하지만, 테스트 실행을 위해 프로젝트당 작업 수를 5개로 제한했습니다. 그 기능을 변경하고 그에 따라 프론트엔드 코드를 수정할 수 있을 것 같습니다.**
+ Others : I considered adding other functions such as a calendar that would display the user’s projects over time.
+ **기타 : 시간이 지남에 따라 사용자의 프로젝트를 표시하는 캘린더와 같은 다른 기능을 추가하는 것을 고려했습니다.**

**Front-End**
+ I decided to keep the front-end part rather simple and minimalist in order to focus on implementing all the different CRUD operations learned in class, but I would like to work on a more responsive design such as smoother transitions or swiper functions instead of a “plain” display. I failed on implementing the library Swup as I encountered issues such as “jumpy” effects when transitioning.
+ **수업에서 배운 모든 다양한 CRUD 연산을 구현하는 데 집중하기 위해 프론트엔드 부분을 다소 단순하고 미니멀하게 유지하기로 결정했지만, "심플" 디스플레이 대신 부드러운 전환이나 스위퍼 기능과 같은 더 반응성 있는 디자인으로 작업하고 싶습니다. 전환할 때 "점프" 효과와 같은 문제가 발생하여 라이브러리 Swup을 구현하는 데 실패했습니다.**
