# Afternoon Practice

## Multi-Page Product Listing App

Build a responsive product listing web page using **React TypeScript** that includes:

* A **navigation header**
* A **product filter sidebar**
* A **paginated product list**

Demo Like this:

![demo](./afternoon.png)
---

### 📦 **Requirements:**

#### 1. Header Navigation (🔼 Area 1 in picture)

* Show brand name (e.g., "Magazines")
* Navigation links: Home, Blog, Category, Product, Login, Customer
  * Show component `<HomePage/>` when click Home link
  * Show component `<BlogPage/>` when click Blog link
  * Show component `<CategoryPage/>` when click Category link
  * Show component `<ProductPage/>` when click Product link
  * Show component `<LoginPage/>` when click Login link
  * Show component `<CustomerPage/>` when click Customer link
* Cart icon (no functionality required)

#### 2. Filter Sidebar (🔼 Area 2 in picture)

* Import to `<ProductPage/>`
* Checkbox filters: Display List categories
* When a checkbox is selected, only show products in that category.
* APIs: <https://fakeapi.platzi.com/en/rest/categories/>

#### 3. Product Grid  (🔼 Area 3 in picture)

* Import to `<ProductPage/>`
* Products should display: 4 items for Desktop, 3 items for Tablet and 2 items for Mobile
* APIs get Product by category: <https://fakeapi.platzi.com/en/rest/categories/#get-all-products-by-category>

#### 4. Pagination (🔼 Area 4 in picture)

* Import to `<ProductPage/>`
* Show **4 products per page**
* Show numbered pagination below the product grid
* Clicking a page number should display the respective set of products
* Request for Pagination: (<https://api.escuelajs.co/api/v1/categories/1/products?offset=0&limit=4>)
  * `offset=0`:  It controls where to start fetching the items
  * `limit=4`: It controls how many items to fetch

---

### ⚙️ **Technical Requirements:**

* Use `useState` and `useEffect`
* Use `CSS Module` or `Tailwind`
* Use `React Router`
