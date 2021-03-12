var service = new TaskService();

getListTask();

function getListTask() {
    getEle("loader").style.display = "block";
    service
        .getListTaskService()
        .then(function (result) {
            getEle("loader").style.display = "none";
            taoList(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function taoList(arr) {
    var contentTodo = "";
    var contentCompleted = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].status === "todo") {
            contentTodo += `
                <li>
                    <span>${arr[i].textTask}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask(${arr[i].id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${arr[i].id})">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        } else if (arr[i].status === "completed") {
            contentCompleted += `
                <li>
                    <span>${arr[i].textTask}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask(${arr[i].id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${arr[i].id})">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
        }
    }
    getEle("todo").innerHTML = contentTodo;
    getEle("completed").innerHTML = contentCompleted;
}

/**
 * Thêm task
 */
function addTask() {
    var _textTask = getEle("newTask").value;
    if (_textTask === "") {
        alert("Task Empty!");
    } else {
        var task = new Task(
            "",
            _textTask,
            "todo"
        );
        service
            .addTaskService(task)
            .then(function (result) {
                getListTask();
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

/**
 * Xóa task
 */
function deleteTask(id) {
    service
        .deleteTaskService(id)
        .then(function (result) {
            alert("Delete success");
            getListTask();
        })
        .catch(function (err) {
            console.log(err);
        });
}

/**
 * Change Status
 */
function changeStatus(id) {
    service
        .getTaskByIdService(id)
        .then(function (result) {
            var status = ""
            if (result.data.status == "completed") {
                status = "todo"
            }
            else if (result.data.status == "todo") {
                status = "completed"
            }
            var task = new Task(
                result.data.id,
                result.data.textTask,
                status,
            )
            service
                .updateTask(task)
                .then(function (result) {
                    alert("Change Status Success!");
                    getListTask();
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}
function getEle(id) {
    return document.getElementById(id);
}

