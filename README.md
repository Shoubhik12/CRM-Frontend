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

## Demo Video
 Watch a  video explainig all the features of this website: [Video Link]( https://drive.google.com/file/d/1KUDsNvl41airYpNN3IAmhbpV0DPGyf5i/view?usp=sharing)

 ## Features

- AddNewLead - adds  a new lead.
- AddSalesAgent - adds a new agent. 
- Agents- lists all the agents.
- LeadDetails - shows the details of a list with edit and comment button. 
- LeadList - lists all  the leads with their statuses. 
- LeadsStatus - lists list as per their status. 
- Report- shows the report based on the data.
- Settings- lists all the agents and leads with delete buttons.

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
  Response-
  ```[{"name","email"}...]```        

## Contacts

For queries contact me on shoubhikghosh360@gmail.com 