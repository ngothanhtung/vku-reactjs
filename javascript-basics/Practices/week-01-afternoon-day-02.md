# 🧪 JavaScript DOM Practices

## 🎯 Objective

Enhance your skills in manipulating the **Document Object Model (DOM)** using plain JavaScript.

---

## ✅ Requirements

### 1. Change text content of a `div`

* Use the `innerText` property to update text.

### 2. Toggle a CSS class on a button click

* Use `classList.toggle()` inside an event listener.

### 3. Add new list item to a `<ul>`

* Use `createElement()` and `appendChild()`.

### 4. Remove an element from the DOM

* Use `.remove()` to delete a specific DOM node.

### 5. Update image source dynamically

* Use `setAttribute('src', 'newImage.jpg')`.

### 6. Get input value from a form field

* Use the `.value` property.

### 7. Add event listener to multiple elements

* Use `querySelectorAll()` and `forEach()` to apply an event.

### 8. Change background color on mouseover

* Use `addEventListener('mouseover')` on a `div`.

### 9. Display current time in a paragraph

* Use `setInterval()` and `Date()`.

### 10. Validate form input and show error message

* Use `checkValidity()` and `innerHTML`.

---

## ✏️ Practice Projects

### 11. Make a Calculator

Create a basic calculator using **HTML**, **CSS**, and **JavaScript** that can:

* Perform addition, subtraction, multiplication, and division.
* Display results dynamically on screen.

---

### 12. Create a User Registration Form

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

