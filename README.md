## Enterprise CRM - Lead Management UI (Frontend)

This project is a fully responsive Enterprise CRM UI built using React, TypeScript, Vite, Tailwind, Shadcn UI & React Router.
It simulates a modern SaaS CRM platform for managing leads, reviewing analytics, and enabling sales workflows.

---

## 🎯 Objective

To showcase a scalable CRM frontend architecture with clean enterprise design system, role based access structure, reusable components, and modular page structure.

---

## 🧱 Tech Stack

| Layer                    | Tools                                                         |
| ------------------------ | ------------------------------------------------------------- |
| Framework                | React 18 + TypeScript                                         |
| Build Tool               | Vite                                                          |
| UI System                | Tailwind CSS + Shadcn UI Components                           |
| Routing                  | React Router DOM                                              |
| State / Query Data Layer | React Query (setup ready)                                     |
| Authentication           | Mock Auth + LocalStorage                                      |
| Design Language          | Inter font, enterprise SaaS style (HubSpot / Notion inspired) |

---

## ✅ Features Completed

### Design System

* White + subtle gray theme
* Professional deep-blue accents
* Rounded corners, smooth spacing, subtle shadows
* HSL based semantic tokens

### Authentication

* Mock login (Admin / Manager / Sales Executive roles)
* LocalStorage session persistence
* Protected Routes
* Role based structure ready

### Pages Implemented

| Page           | Route        | Status |
| -------------- | ------------ | ------ |
| Login          | `/login`     | ✅      |
| Dashboard      | `/dashboard` | ✅      |
| Leads Listing  | `/leads`     | ✅      |
| Lead Details   | `/leads/:id` | ✅      |
| Create Lead    | `/leads/new` | ✅      |
| Not Found Page | `*`          | ✅      |

### Components Built

* Sidebar Layout (collapsible)
* Status Badge component (NEW / CONTACTED / QUALIFIED / WON / LOST)
* Navigation Link System with active highlight

### Data System

* Lead + Activities Types defined
* 5 mock sample leads with activity timeline

---

## ❌ Not Implemented Yet (Backend Needed Later)

| Feature                               | Reason            |
| ------------------------------------- | ----------------- |
| Real DB / API Integration             | Needs backend     |
| Real Authentication + JWT             | Placeholder only  |
| Live Notifications + Socket.io        | Backend dependent |
| CRUD Actions (edit/delete lead)       | Mock only         |
| Charts on Dashboard from real metrics | Needs API data    |

---

## Folder Structure Overview

```
src/
 ├─ components/
 ├─ pages/
 ├─ context/AuthContext.tsx
 ├─ data/mockData.ts
 ├─ types/
 └─ main.tsx
```

---

## How to Run Locally

```bash
npm install
npm run dev
```

App runs on:
`http://localhost:8080`

---

## Future Extension (Scale Direction)

* Connect Node + Mongo based backend
* Implement dynamic lead assignment & scoring model
* Real analytics dashboard with Recharts + real values

---

## Conclusion

This CRM Frontend demonstrates clean enterprise SaaS UI thinking, modular structure, proper role based routing setup, reusable patterns and visually consistent design system.
This can be directly extended into a real production CRM with backend integration.

---

