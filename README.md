# Cocktail Management App

A flexible and intuitive **Cocktail Management Application** built using **React**, **Redux Toolkit**, **React Router**, and **Vite**. The app allows users to seamlessly view, search, add, edit, and manage cocktails from both local storage and an external API.

> **Live Demo**: [View on GitHub Pages](https://danfeldman89.github.io/exodigo-task)

---

## Features

### 1. Cocktail Management
- **View Cocktails**:
    - Unified display of cocktails from both **LocalStorage** (user-added) and an **external API**.
    - Fully transparent to the user.

- **Add Cocktails**:
    - Add custom cocktails with fields like name, ingredients, category, and more.
    - Newly added cocktails are automatically saved to **LocalStorage** and persist across application sessions.

- **Delete Cocktails**:
    - Locally added cocktails can be deleted, with immediate visual updates.

- **View Cocktail Details**:
    - Detailed cocktail information includes:
        - Name, category, type (alcoholic or non-alcoholic), glass type, preparation instructions, ingredients, and an optional image.

---

### 2. Dynamic Pagination
- **Custom Pagination Hook**:
    - Efficiently handles listing cocktails in pages.
    - Dynamically adjusts when filtering, adding, deleting, or modifying items.
    - Ensures no empty pages even after deletions.

---

### 3. Search and Filtering
- **Search Bar**:
    - Live search functionality enables filtering cocktails by name.
    - Debounced input ensures smooth, real-time performance without overwhelming the API.

- **URL State Management**:
    - Stores the search term (`search`) and pagination state (`page`) in the URL.
    - Allows users to bookmark or share specific views.
    - Ensures consistency across refreshes.

---

### 4. Multiple Data Sources
- **LocalStorage Integration**:
    - Locally added cocktails are persisted in LocalStorage to ensure they remain available even after refreshing or closing the browser.

- **API Integration**:
    - The app transparently blends data from an external API with local cocktails into a single unified collection.

---

### 5. Persistent State
- Local cocktails are automatically stored and retrieved from **LocalStorage**.
- On every app load:
    - LocalStorage cocktails are fetched first.
    - Live API cocktails are retrieved and appended to the local collection.

---

## Running the App Locally

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. Install dependencies using **npm**:
   ```bash
   npm install
   ```

### Development Server
Run the app using Vite's development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Build for Production
To create a production build:
```bash
npm run build
```

### Previews
Preview the production build locally:
```bash
npm run preview
```

---

## GitHub Pages

This app is hosted on **GitHub Pages**. You can view the live demo here:

> **Live Demo**: [GitHub Pages Link](https://danfeldman89.github.io/exodigo-task)

---

## How to Work with the App

### Viewing and Searching Cocktails
1. **Search** using the toolbar at the top.
    - Results update live as you type.
    - Cocktails are filtered from both local and API data sources seamlessly.

2. Use **pagination** to navigate through the available cocktails, dynamically adjusted based on search results.

### Adding Cocktails
1. Click the **"Add"** button in the toolbar.
2. Fill out the form with cocktail details (e.g., name, ingredients, instructions).
3. Submit the form to add the cocktail to the collection.

### Viewing Cocktail Details
1. Click on any cocktail card from the collection screen.
2. View detailed information, such as preparation steps, ingredients, and more.

### Deleting Cocktails
1. Locally added cocktails can be deleted directly in the list.
2. Deleted cocktails are removed from the interface and LocalStorage instantly.

---

## Technical Details

### Pagination Hook
- The `usePagination` hook handles all paginated views.
- Ensures consistent and smooth navigation even when items are filtered or deleted.

### Search and URL Management
- Search states are stored in the URL for:
    - Persistent filtering across refreshes.
    - Easy sharing of specific searches.
- **Debouncing** is applied to delay API requests until users stop typing, improving performance.

### Local and API Data Integration
- Locally stored cocktails are maintained separately from API data but presented transparently in the same list.
- LocalStorage is used for persistent storage of user-added cocktails, while API content is fetched asynchronously.
