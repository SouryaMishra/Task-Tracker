import {url} from "../appConstants";

export const fetchAllTasks = () => {
  return fetch(url).then(res => res.json());
}

export const addTask = (task) => {

    return fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(res => res.json())
}

export const updateTask = (task) => {
    return fetch(`${url}/${task.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      .then(res => res.json())

}

export const updateTasks = (tasks) => {
  return Promise.all(tasks.map(task =>fetch(`${url}/${task.id}`, {method: "PUT", headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(task)
}
  )
  .then(res => res.json())
  ))
}

export const removeTask = (taskId) => {
  return fetch(`${url}/${taskId}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}

export const removeTasks = (taskIds) => {
  return Promise.all(taskIds.map(taskId =>fetch(`${url}/${taskId}`, {method: "DELETE",}).then(res =>res.json())))
                 

}