# 🧪 JavaScript DOM Practices

## 🎯 Objective

Enhance your skills in manipulating the **Document Object Model (DOM)** using plain JavaScript.

---

## ✅ mini Tasks

### 1. **Change Text Content of a Div**

* **Input**: A button with id `#changeTextBtn`.
* **Target**: A `<div>` with id `#textDisplay`.
* **Action**: When the button is clicked, change the text inside the div to `"Hello, JavaScript!"`.

---

### 2. **Toggle a CSS Class on an Element**

* **Input**: A button with id `#toggleHighlightBtn`.
* **Target**: A box with class `.box`.
* **Action**: On each click, toggle the class `highlight` on the `.box` element.
* **Expected**: The box should visually change (e.g., yellow background) when the class is added.

---

### 3. **Add New List Item**

* **Input**: A text input with id `#itemInput` and button `#addItemBtn`.
* **Target**: An unordered list with id `#itemList`.
* **Action**: On click, append the typed value as a new `<li>`.

---

### 4. **Remove an Element**

* **Input**: A list of items, each with a "Delete" button (`.deleteBtn`).
* **Action**: When a delete button is clicked, remove its parent `<li>` from the DOM.

---

### 5. **Update Image Source Dynamically**

* **Input**: Button `#changeImageBtn`.
* **Target**: An `<img>` with id `#mainImage`.
* **Action**: On click, change the image source to `dog.jpg`.

---

### 6. **Get Input Value**

* **Input**: A text field `#usernameInput` and button `#submitUsername`.
* **Action**: When button is clicked, show an alert with the entered username.

---

### 7. **Event Listener on Multiple Elements**

* **Input**: Multiple buttons with class `.colorBtn`.
* **Action**: When any button is clicked, alert its text content.

---

### 8. **Change Background on Hover**

* **Target**: A div with class `.hoverBox`.
* **Action**: When hovered, change its background to lightblue. Revert on mouse leave.

---

### 9. **Live Clock**

* **Target**: A paragraph with id `#clockDisplay`.
* **Action**: Show current time (HH\:MM\:SS) and update every second.

---

### 10. **Validate Form Field**

* **Input**: Text input `#emailInput`, button `#validateBtn`.
* **Action**: On click, check if input is a valid email. If not, show error in `#errorMessage`.

---

### 11. **Hide Element**

* **Input**: A button with id `#hideParaBtn`.
* **Target**: Paragraph with id `#infoPara`.
* **Action**: Hide the paragraph when button is clicked.

---

### 12. **Greeting Based on Time**

* **Target**: Paragraph with id `#greetingText`.
* **Action**: On page load, show greeting message like "Good Morning" based on current time.

---

### 13. **Field Border Highlight on Error**

* **Input**: Form input `#nameInput` and submit button `#formSubmit`.
* **Action**: If field is empty, show red border and error message in `#nameError`.

---

### 14. **Disable Button After Click**

* **Target**: Button with id `#onceBtn`.
* **Action**: After first click, disable the button.

---

### 15. **Textarea Character Counter**

* **Input**: A textarea with id `#bioInput`.
* **Target**: Paragraph `#charCount` showing remaining characters (max 200).
* **Action**: Update remaining count as user types.

---

### 16. **Add Colored Boxes**

* **Input**: Button with id `#addBoxBtn`.
* **Target**: Container `#boxContainer`.
* **Action**: On click, add a colored square box inside the container.

---

### 17. **Strike Through Completed Items**

* **Target**: A list of items inside `#todoList`.
* **Action**: When a list item is clicked, strike through its text.

---

### 18. **Show/Hide Password**

* **Input**: Password input `#passwordInput` and checkbox `#togglePassword`.
* **Action**: Toggle input type between `"text"` and `"password"` when checkbox is toggled.

---

### 19. **Count Checked Checkboxes**

* **Input**: A group of checkboxes with class `.optionBox`.
* **Target**: Display count in `#checkedCount`.
* **Action**: Update number whenever checkbox state changes.

---

### 20. **Image Gallery with Thumbnails**

* **Input**: A set of thumbnail images with class `.thumbnail`.
* **Target**: Large display image with id `#mainPhoto`.
* **Action**: When thumbnail is clicked, show it in the main display.

---



## ✏️ Practice Projects

### 1. Make a Calculator

Create a basic calculator using **HTML**, **CSS**, and **JavaScript** that can:

* Perform addition, subtraction, multiplication, and division.
* Display results dynamically on screen.

---

### 2. Create a User Registration Form

Create a user registration form using HTML, CSS, and plain JavaScript that includes various types of input fields and performs client-side validation

#### 📄 Form Fields:

| Field            | Input Type | Validation Requirements                       |
| ---------------- | ---------- | --------------------------------------------- |
| Full Name        | Text       | Required, min 3 characters                    |
| Email            | Email      | Required, valid format                        |
| Password         | Password   | Required, min 8 characters, letters & numbers |
| Confirm Password | Password   | Must match Password                           |
| Phone Number     | Tel        | Required, digits only, min 10 digits          |
| Gender           | Radio      | Required (Male/Female/Other)                  |
| Date of Birth    | Date       | Required, user must be over 18 years old      |
| Country          | Dropdown   | Required                                      |
| Hobbies          | Checkbox   | At least one must be selected                 |
| Profile Picture  | File       | Optional, image file (.jpg, .jpeg, .png)      |
| Bio / About You  | Textarea   | Optional, max 300 characters                  |

#### 🧪 Validation (JavaScript only):

* Prevent submission if any required field is invalid.
* Show custom error messages near each field.
* Use DOM methods like `addEventListener`, `classList`, `value`, `setAttribute`, etc.
* Highlight invalid fields using CSS classes.


## 📦 **Deliverables:**

* A folder containing:

  * `index.html`
  * `style.css`
  * `script.js`
* Or Google Driver / a GitHub repo link