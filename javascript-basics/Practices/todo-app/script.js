const clock = document.getElementById('clock');
    const greeting = document.getElementById('greeting');
    const themeToggle = document.getElementById('themeToggle');
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const todoError = document.getElementById('todoError');
    const filters = document.querySelectorAll('.filters button');
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteError = document.getElementById('noteError');
    const notesContainer = document.getElementById('notesContainer');

    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString();
      clock.innerText = time;
      const hours = now.getHours();
      let greet = '';
      if (hours >= 5 && hours < 12) greet = 'Good morning';
      else if (hours >= 12 && hours < 18) greet = 'Good afternoon';
      else if (hours >= 18 && hours < 22) greet = 'Good evening';
      else greet = 'Good night';
      greeting.innerText = greet;
    }
    setInterval(updateClock, 1000);
    updateClock();

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });

    // Helper functions for localStorage
    function saveTodosToLocalStorage() {
      const todos = Array.from(todoList.children).map(item => ({
        text: item.querySelector('span').innerText,
        completed: item.classList.contains('completed')
      }));
      localStorage.setItem('todoListLocal', JSON.stringify(todos));
    }

    function loadTodosFromLocalStorage() {
      const todos = JSON.parse(localStorage.getItem('todoListLocal') || '[]');
      todos.forEach(todo => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
          li.classList.toggle('completed', checkbox.checked);
          saveTodosToLocalStorage();
        });
        const span = document.createElement('span');
        span.innerText = todo.text;
        const delBtn = document.createElement('button');
        delBtn.innerText = 'Delete';
        delBtn.addEventListener('click', () => {
          li.remove();
          saveTodosToLocalStorage();
        });
        li.append(checkbox, span, delBtn);
        if (todo.completed) li.classList.add('completed');
        todoList.appendChild(li);
      });
    }

    addTodoBtn.addEventListener('click', () => {
      const value = todoInput.value.trim();
      if (!value) return (todoError.innerText = 'Task cannot be empty');
      todoError.innerText = '';
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTodosToLocalStorage();
      });
      const span = document.createElement('span');
      span.innerText = value;
      const delBtn = document.createElement('button');
      delBtn.innerText = 'Delete';
      delBtn.addEventListener('click', () => {
        li.remove();
        saveTodosToLocalStorage();
      });
      li.append(checkbox, span, delBtn);
      todoList.appendChild(li);
      saveTodosToLocalStorage();
      todoInput.value = '';
    });

    // Load todos on page load
    loadTodosFromLocalStorage();

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        Array.from(todoList.children).forEach(item => {
          const isCompleted = item.classList.contains('completed');
          item.style.display =
            filter === 'all' ||
            (filter === 'completed' && isCompleted) ||
            (filter === 'incomplete' && !isCompleted)
              ? ''
              : 'none';
        });
      });
    });

    const noteColors = ['#fff59d', '#ffcc80', '#a5d6a7', '#90caf9', '#ce93d8'];

    // Helper functions for notes localStorage
    function saveNotesToLocalStorage() {
      const notes = Array.from(notesContainer.children).map(note => ({
        text: note.childNodes[0].nodeValue || '',
        color: note.style.backgroundColor
      }));
      localStorage.setItem('noteListLocal', JSON.stringify(notes));
    }

    function loadNotesFromLocalStorage() {
      const notes = JSON.parse(localStorage.getItem('noteListLocal') || '[]');
      notes.forEach(noteObj => {
        const note = document.createElement('div');
        note.className = 'note';
        note.style.backgroundColor = noteObj.color;
        note.innerText = noteObj.text;
        const btn = document.createElement('button');
        btn.innerText = '×';
        btn.addEventListener('click', () => {
          note.remove();
          saveNotesToLocalStorage();
        });
        note.appendChild(btn);
        notesContainer.appendChild(note);
      });
    }

    addNoteBtn.addEventListener('click', () => {
      const value = noteInput.value.trim();
      if (!value) return (noteError.innerText = 'Note cannot be empty');
      noteError.innerText = '';
      const note = document.createElement('div');
      note.className = 'note';
      note.style.backgroundColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      note.innerText = value;
      const btn = document.createElement('button');
      btn.innerText = '×';
      btn.addEventListener('click', () => {
        note.remove();
        saveNotesToLocalStorage();
      });
      note.appendChild(btn);
      notesContainer.appendChild(note);
      saveNotesToLocalStorage();
      noteInput.value = '';
    });

    // Load notes on page load
    loadNotesFromLocalStorage();