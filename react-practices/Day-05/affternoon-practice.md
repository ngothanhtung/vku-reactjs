# Event Handing Practices

## Exercise 1: Button Click Counter

**Task**: Build a component with a button and a counter display. Each time the button is clicked, increase the counter by 1.  
**Expected Output**: A button labeled "Click Me" and text below showing "Clicked: X times" (where X is the number of clicks).  

---

## Exercise 2: Input Field Tracker

**Task**: Create a component with a text input. As the user types, show the current input value below the input field.  
**Expected Output**: A text input with a paragraph below displaying "You typed: [input value]". If the input is empty, show "You typed: nothing".  

---

## Exercise 3: Toggle Switch

**Task**: Make a component with a button that toggles between "ON" and "OFF" states. Display the current state below the button.  
**Expected Output**: A button that switches its label between "Turn ON" and "Turn OFF", with text below showing "State: ON" or "State: OFF".  

---

## Exercise 4: Hover Highlight

**Task**: Create a component with a `div` element. When the mouse hovers over it, change the background color to yellow. When the mouse leaves, revert to white.  
**Expected Output**: A `div` with text (e.g., "Hover me!") that turns yellow on hover and returns to white when the mouse leaves.  

---

## Exercise 5: Form Submission Alert

**Task**: Build a form with a text input and a submit button. On submission, show an alert with the input value and clear the input field.  
**Expected Output**: A form with a text input and a "Submit" button. On submit, an alert displays "You submitted: [input value]" and the input resets.  

---

## Exercise 6: Key Press Display

**Task**: Create a component with a text input. Show the name of the last key pressed below the input (e.g., "Enter" for the Enter key).  
**Expected Output**: A text input and a paragraph below showing "Last key: [key name]".  

---

## Exercise 7: Double Click Message

**Task**: Build a component with a button. On double-click, display "Double-clicked!" for 2 seconds before hiding it.  
**Expected Output**: A button that, when double-clicked, shows "Double-clicked!" for 2 seconds, then hides the message.  

---

## Exercise 8: Dropdown Selection

**Task**: Create a component with a `<select>` dropdown containing options like "Apple", "Banana", and "Orange". Show the selected option below the dropdown.  
**Expected Output**: A dropdown with fruit options and text below showing "Selected fruit: [fruit name]".  

---

## Exercise 9: Checkbox Toggle

**Task**: Create a component with a checkbox. Display whether the checkbox is checked or unchecked below it.  
**Expected Output**: A checkbox with a label (e.g., "Toggle me") and text below showing "Checkbox is: checked" or "Checkbox is: unchecked".  

---

## Exercise 10: SearchFilter

* **Task**: Filter and display matching items from a predefined list based on a user's search input.

* **Input**: An array of strings, for example:

  ```js
  const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];
  ```

* **Output**:

  * A text input field for entering a search term.
  * A list showing only the items from the array that include the search term (case-insensitive).
  * The list updates in real-time as the user types.

