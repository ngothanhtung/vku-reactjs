# React Hook Form Practices

## Build Forms UI following pictures

### 1. Form Sign in and Sign up

Create two user interface forms — **Sign Up** and **Sign In** — using **React + TypeScript + React Hook Form** that mimic the layout shown in the provided image.

![form-1](./Form01.png)

🧩 Requirements:

#### 1. **Sign Up Form**

* Fields:

  * Name (required)
  * Email (required, must be valid format)
  * Password (required, min length 8 characters)
* Password input must include a toggle to **show/hide** the password (e.g., “View” button).
* Show a message like:

  ```
  Looks like you don't have an account.
  Let's create a new account for [email].
  ```
* Include a checkbox or text confirmation that says:

  * "By selecting Agree and continue below, I agree to Terms of Service and Privacy Policy."
* Button: **Agree and continue**
* Validate all inputs with React Hook Form.

---

#### 2. **Sign In Form**

* Fields:

  * Email (pre-filled or editable)
  * Password (required, with show/hide toggle)
* Show the user's profile picture and name (can be mocked).
* Button: **Continue**
* Include a "Forgot your password?" link (just display it; no functionality needed).

---


### 2 Form Register

![form-2](./Form02.png)

Create a **responsive registration form** using **React + TypeScript + React Hook Form** based on the design provided.

---
🧩 Form Requirements:

#### 1. Fields & Validation Rules for Register Form

| Field Name            | Input Type | Required | Validation Rules                                                                   | Example Placeholder                                   |
| --------------------- | ---------- | -------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **First Name**        | text       | ✅ Yes    | - Must not be empty<br>- Min length: 2 characters                                  | "John"                                                |
| **Last Name**         | text       | ✅ Yes    | - Must not be empty<br>- Min length: 2 characters                                  | "Doe"                                                 |
| **Phone Number**      | tel        | ✅ Yes    | - Must be a valid phone number (10–15 digits)<br>- Digits only                     | "0987654321"                                          |
| **Email**             | email      | ✅ Yes    | - Must be a valid email format                                                     | "[john.doe@example.com](mailto:john.doe@example.com)" |
| **Password**          | password   | ✅ Yes    | - Min 8 characters<br>- At least 1 uppercase, 1 lowercase, 1 number<br>- No spaces | "Secret123"                                           |
| **Confirm Password**  | password   | ✅ Yes    | - Must match the `Password` field exactly                                          | "Secret123"                                           |
| **Newsletter Opt-in** | checkbox   | ❌ No     | Optional – used for marketing consent                                              | N/A                                                   |
| **Terms Agreement**   | checkbox   | ✅ Yes    | - Must be checked to proceed                                                       | N/A                                                   |

---

### 📌 Notes:

* You should display inline validation errors using `formState.errors`.
* The **Confirm Password** field requires access to the current value of `Password`, which can be done using `watch()` in React Hook Form.
* If using **Yup** for validation, the Confirm Password rule can be written like:

  ```ts
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
  ```

---


#### 2. **Checkboxes**

* `Yes, I want to receive Lottery Display emails.` (optional)
* `I agree to all the Terms, Privacy Policy, and Fees.` (required)

#### 3. **Buttons and Links**

* A **Create Account** button (disabled until form is valid and terms checkbox is checked)
* A **"Log in"** link if the user already has an account

---

### 🔐 Password Feature

* Password and Confirm Password fields must include **show/hide** toggles (eye icon or “View” button)
* If passwords don’t match, show an inline error message

---


### 3. Form Login

Build a professional-looking **Login Form** UI using **React, TypeScript, and React Hook Form**, based on the provided design.

![form-3](./Form03.png)

🧩 Functional Requirements

#### 1. **Form Fields**

* **Username** (Email or Phone Number)
* **Password**
* **Remember Me** (checkbox)
* **Reset Password?** link
* **Sign In** button

#### 2. **Links**

* "Reset Password?" should be visible (clickable but not functional).
* "Join Grovia Now!" should be a registration link (fake or real route).

#### 3. **Password Field**

* Include a toggle to **show/hide password** (button or icon).

#### 4. **Remember Me**

* Optional checkbox
* When checked, console log or simulate saving the user (you can mock localStorage logic).

---

### 📋 Fields & Validation Rules

| Field Name      | Input Type | Required | Validation Rules                                                      | Example Placeholder                                        |
| --------------- | ---------- | -------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Username**    | text       | ✅ Yes    | - Must be a valid **email** or **phone number**<br>- Min 5 characters | "[you@example.com](mailto:you@example.com)" / "0123456789" |
| **Password**    | password   | ✅ Yes    | - Min 8 characters<br>- No spaces<br>- At least 1 letter              | "GroviaPass123"                                            |
| **Remember Me** | checkbox   | ❌ No     | Optional                                                              | N/A                                                        |
