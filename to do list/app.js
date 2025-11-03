 const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    window.onload = loadTasks;

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      const li = document.createElement("li");
      li.textContent = taskText;
      li.onclick = () => li.classList.toggle("completed");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
      };

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
      taskInput.value = "";
      saveTasks();
    }

    function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
          text: li.firstChild.textContent,
          completed: li.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
      saved.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");
        li.onclick = () => li.classList.toggle("completed");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => {
          li.remove();
          saveTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }

    window.onbeforeunload = saveTasks;