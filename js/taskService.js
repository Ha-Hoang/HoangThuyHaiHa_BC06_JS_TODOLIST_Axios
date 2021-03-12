function TaskService() {
    this.getListTaskService = function () {
        return axios({
            url: `https://60443193a20ace001728ebb1.mockapi.io/api/todo`,
            method: "GET",
        });
    };
    this.deleteTaskService = function (id) {
        return axios({
            url: `https://60443193a20ace001728ebb1.mockapi.io/api/todo/${id}`,
            method: "DELETE",
        });
    };
    this.addTaskService = function (task) {
        return axios({
            url: `https://60443193a20ace001728ebb1.mockapi.io/api/todo`,
            method: "POST",
            data: task,
        });
    };
    this.getTaskByIdService = function (id) {
        return axios({
            url: `https://60443193a20ace001728ebb1.mockapi.io/api/todo/${id}`,
            method: "GET",
        });
    };
    this.updateTask = function (task) {
        return axios({
            url: `https://60443193a20ace001728ebb1.mockapi.io/api/todo/${task.id}`,
            method: "PUT",
            data: task,
        });
    };
}