# 📝 **Assignment: Build a Dashboard UI with React Router**

Create a responsive **dashboard web app** using **React Router v7**, **TypeScript**, and **TailwindCSS**. When clicking a menu item on the left sidebar, the right content area (red box in the image) should update to show the **name of the page + the word “Page”**, e.g., `Overview Page`, `Doctors Page`, etc.

![dashboard](./dashboard-design.png)
---

## 📌 **Features & Requirements**

### ✅ 1. Navigation Sidebar (Blue Box in Image)

* Located on the **left side**
* Contains a vertical menu with the following items:

  * Patients
  * Overview
  * Map
  * Departments
  * Doctors
  * History
  * Settings
* Use `react-router` to handle routing between pages.
* Clicking on each item updates the main content (right section).

---

### ✅ 2. Main Content Area (Red Box in Image)

* The content area should display **only text** like:

  * `Overview Page`
  * `Doctors Page`
  * `Map Page`
  * etc.
* Each page must be a separate React component using TypeScript.

---

## 🔧 **Tech Stack**

* React + TypeScript
* React Router v7
* Tailwind CSS
* No API calls required
* Focus on routing + layout

---

## 📁 **Project Structure Suggestion**

```
src/
├── components/
│   └── Sidebar.tsx
├── pages/
│   ├── PatientsPage.tsx
│   ├── OverviewPage.tsx
│   ├── MapPage.tsx
│   ├── DepartmentsPage.tsx
│   ├── DoctorsPage.tsx
│   ├── HistoryPage.tsx
│   └── SettingsPage.tsx
├── App.tsx
├── main.tsx
```

---

## 🚀 Bonus Challenge (Optional)

* Highlight the active menu item with a different background.
* Add icons to each menu item (e.g., using `react-icons`, `lucide-react`).
* Make it responsive on small screens.

---

## 📌 Example Output:

If the user clicks on **Doctors**, the red area should display:

```tsx
<h1 className="text-2xl font-semibold">Doctors Page</h1>
```
