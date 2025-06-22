# ⚙️ React Admin Dashboard

A modern, responsive Admin Dashboard built with **React**, offering customizable themes, dynamic tables, interactive charts, Kanban boards, calendars, and more. Designed for performance, usability, and clean UI.

🌐 [Live Demo](https://admin-dashboard-rosy-rho.vercel.app/)

---

## 📸 Features

- 🎨 **Customizable Themes** – Light/dark mode toggle with color palette options
- 📊 **Charts & Analytics** – Line, Bar, Pie, and Area charts powered by Recharts / Chart.js
- 📅 **Full Calendar Integration** – Drag-and-drop events and scheduling
- 📋 **Data Tables** – Sortable, filterable, and paginated dynamic tables
- 🗂 **Kanban Board** – Task management with drag-and-drop capabilities
- 🔍 **Search & Filter** – Intelligent global and field-level filtering
- 🧩 **Modular Components** – Reusable UI components built with best practices
- ⚡ **Optimized UX** – Smooth transitions, loading states, and responsive layout

---

## 🛠️ Tech Stack

| Tech               | Description                            |
|--------------------|----------------------------------------|
| **React.js**       | UI library for building user interfaces |
| **Tailwind CSS**   | Utility-first CSS for styling           |
| **Recharts / Chart.js** | Data visualization                |
| **FullCalendar**   | Calendar and event management           |
| **React Router**   | Page routing                            |
| **React Context API / Redux** | State management              |
| **Framer Motion**  | Smooth animations and transitions       |

---

## 📁 Folder Structure

```
src/
│
├── components/       # Reusable UI components
├── pages/            # Main dashboard pages (Dashboard, Kanban, Calendar, etc.)
├── assets/           # Images, icons, styles
├── utils/            # Helper functions
├── context/          # Theme and global state context
└── App.jsx           # App entry point
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/react-admin-dashboard.git
cd react-admin-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the App Locally

```bash
npm start
# or
yarn start
```

App will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Scripts

| Command            | Action                                 |
|--------------------|----------------------------------------|
| `npm start`        | Start development server               |
| `npm run build`    | Build production-ready app             |
| `npm run lint`     | Lint code                              |
| `npm run format`   | Format code with Prettier              |

---

## 📦 Deployment

Deployed via **[Vercel](https://vercel.com/)**. Easily scalable and CI/CD enabled.

> 💡 To deploy your own fork:
>
> - Push to GitHub
> - Import repo in Vercel
> - Set up build command: `npm run build`
> - Output directory: `build`

---

## ✨ Customization

- Change theme via context in `context/ThemeContext.js`
- Add new sidebar routes in `components/Sidebar`
- Modify chart data via `pages/Analytics.js` or related files

---

## 📅 Roadmap

- [x] Responsive layout
- [x] Theming and light/dark toggle
- [x] Charting integration
- [x] Calendar with scheduling
- [x] Kanban drag-and-drop

