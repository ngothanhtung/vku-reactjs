
# User Registration Form in React + TypeScript + React Hook Form

Build a **responsive and accessible user registration form UI** using **React**, **TypeScript**, and **React Hook Form**

!['form'](./register-form.jpeg)
---

### 📋 Form Field Requirements

| **Field**        | **Type**    | **Validation Rules**                                                       |
| ---------------- | ----------- | -------------------------------------------------------------------------- |
| Full Name        | Text        | At least **3 characters**                                                  |
| Email            | Email       | Must be a **valid email format**                                           |
| Password         | Password    | At least **8 characters** and must contain **letters and numbers**         |
| Confirm Password | Password    | Must **match** the password                                                |
| Phone Number     | Tel         | Must be at least **10 digits**                                             |
| Gender           | Radio       | Must select one: **Male / Female / Other**                                 |
| Date of Birth    | Date        | User must be at least **18 years old**                                     |
| Country          | Select      | Must select a country from the dropdown                                    |
| Hobbies          | Checkbox    | Must select **at least one hobby** (Reading / Traveling / Gaming)          |
| Profile Picture  | File Upload | Must be a valid **.jpg, .jpeg, or .png** image file                        |
| Bio              | Textarea    | Optional, max length **300 characters** (bonus: show remaining characters) |

---

### ❗ Error Display Requirements

* Show validation error messages **in red**, **below each field**.
* Example: `“Full Name must be at least 3 characters.”`
