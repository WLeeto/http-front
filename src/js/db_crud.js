import { createNewTask } from "./app";

const { staticHost, xhr } = require("./settings");
const { refreshElement, refreshElementText } = require("./app");

export function addNewTask(taskName, taskDescription) {
  const body = {
    name: taskName,
    description: taskDescription,
  };
  xhr.open("POST", staticHost + "?method=createTicket");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  xhr.onload = function () {
    if (xhr.status == 201) {
      createNewTask(JSON.parse(xhr.response)[0]);
    }
  };
}

export function checkTask(element, li) {
  let body = null;
  if (element.status) {
    body = {
      status: false,
    };
  } else {
    body = {
      status: true,
    };
  }
  xhr.open("PATCH", staticHost + `?method=patchTicket&id=${element.id}`);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(body));
  xhr.onload = function () {
    if (xhr.status == 200) {
      refreshElement(li, JSON.parse(xhr.response)[0]);
    }
  };
}

export function deleteTask(element, li) {
  xhr.open("DELETE", staticHost + `?method=deleteTicket&id=${element.id}`);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status == 204) {
      li.remove();
    }
  };
}

export function editTicket(element, li) {
  const modal = document.querySelector(".edit-ticket-modal");
  modal.style.display = "block";
  const taskName = document.getElementById("editNameInput1");
  taskName.value = element.name;
  const taskDiscription = document.getElementById("editDescriptionInput2");
  taskDiscription.value = element.description;

  const cancelBtn = modal.querySelector(".edit-ticket-cancelBtn");
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const okBtn = modal.querySelector(".edit-ticket-okBtn");
  okBtn.addEventListener("click", () => {
    const body = {
      name: taskName.value,
      description: taskDiscription.value,
    };
    xhr.open("PATCH", staticHost + `?method=patchTicket&id=${element.id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body));
    xhr.onload = function () {
      if (xhr.status == 200) {
        refreshElementText(li, JSON.parse(xhr.response)[0]);
      }
    };
    modal.style.display = "none";
  });
}
