const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

///api/v1/tasksからデータを取得する。
const showTasks = async () => {
  try {
    //自作のAPIを叩く
    const { data: tasks } = await axios.get("/api/v1/tasks");
    // console.log(tasks);
    // タスクが一つもないとき。
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありませんよ！アンタ！</5>`;
      return;
    }
    //
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;

        return `<div class="single-task ${completed && "task-completed"}">
      <h5>
        <span><i class="fas fa-check-circle"></i></span>${name}
      </h5>
      <div calss="task-links">
        <!-- 編集リンク -->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <!-- ゴミ箱リンク -->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join("");
    // console.log(allTasks);
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

// タスクを新規作成する。
formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post("/api/v1/tasks", { name: name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "無効です。もう少し短く！";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// タスクを削除する。
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target;
  if (element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
