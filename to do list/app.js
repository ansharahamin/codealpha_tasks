    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    window.onload = loadTasks;

    // Add New Task
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      createTaskElement(taskText);
      taskInput.value = "";
      saveTasks();
    }

    // Create Task Item
    function createTaskElement(text, completed = false) {
      const li = document.createElement("li");
      li.textContent = text;
      if (completed) li.classList.add("completed");

      // Click to mark as done
      li.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") li.classList.toggle("completed");
        saveTasks();
      });

      // Actions container
      const actions = document.createElement("div");
      actions.classList.add("actions");

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = (e) => {
        e.stopPropagation();
        editTask(li);
      };

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
      };

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
      taskList.appendChild(li);
    }

    // Edit existing task
    function editTask(li) {
      const currentText = li.firstChild.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.style.flex = "1";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("save-btn");

      const actions = li.querySelector(".actions");
      li.textContent = "";
      li.appendChild(input);
      li.appendChild(saveBtn);

      saveBtn.onclick = () => {
        if (input.value.trim() === "") {
          alert("Task cannot be empty!");
          return;
        }
        li.textContent = input.value.trim();
        li.appendChild(actions);
        saveTasks();
      };
    }

    // Save to localStorage
    function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
          text: li.firstChild.textContent,
          completed: li.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load from localStorage
    function loadTasks() {
      const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
      saved.forEach((task) => {
        createTaskElement(task.text, task.completed);
      });
    }