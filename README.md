# CRM  Website

ClientConnect, a lightweight and intuitive CRM web application designed to help teams manage leads more efficiently and make data-driven decisions with ease.

---

## Demo Link

[Live Demo](https://crm-frontend-flame-rho.vercel.app/)

---

## Quick Start

```
  git clone https://github.com/Shoubhik12/CRM-Frontend.git
  cd <your-repo>
  npm install
  npm run dev 
```

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB

---

## Screenshots
   
   ### Lead List page
   ![Lead list](image.png)   

   ### Lead Details page
   ![Details page](image-1.png)


---

## Demo Video
 Watch a  video explaining all the features of this website: [Video Link]( https://drive.google.com/file/d/1KUDsNvl41airYpNN3IAmhbpV0DPGyf5i/view?usp=sharing)

 ## Features

- Add New Lead - adds  a new lead.
- Add SalesAgent - adds a new agent. 
- Agents- lists all the agents.
- Lead Details - shows the details of a list with edit and comment button. 
- Lead List - lists all  the leads with their statuses. 
- Leads Status - lists list as per their status. 
- Report - shows the report based on the data.
- Settings - lists all the agents and leads with delete buttons.

---

## API References 

 ***POST/api/leads***
  
  Creates a new lead.

  Response - 201 Created.

***GET/api/leads***

  Fetches leads with filtering.

  Response-
  ```[{"name","source","salesAgent",...}...]```  

***POST/api/leads/id***

  Updates a lead.

  Response-
  ```[{"name","source","salesAgent",...}...]```  

***Delete/api/leads/:id***

  Deletes a lead.

  Response-
  ```[{"name","source","salesAgent",...}...]```  

***Post/api/agents***

  Adds a new agent.

  Response- 201 Created.

***Get/api/agents***

  Fetch a list of the salesagents.

  Response-
  ```[{"name","email"}...]``` 

---

## Environment Setup And Backend(/server/.env)

  ### Server
  PORT=3000
  NODE_ENV=development

 ### Database
 MONGODB_URI=mongodb+srv://NeoGStudent:shoubhik@neog.h3ciunv.mongodb.net/?retryWrites=true&w=majority&appName=NeoG



---

## Contacts

For queries contact me on shoubhikghosh360@gmail.com 