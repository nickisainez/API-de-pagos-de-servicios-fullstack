const token = JSON.parse(localStorage.getItem("token.users")) ?? [];

const main = document.querySelector(".row");
const body = document.querySelector(".body");

async function getTask3() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(`http://127.0.0.1:8000/servicios/todos/${extra}`, {
      method: "GET",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token[token.length-2].access}`,
      }
      });
    const data = await response.json();
    id ? renderTodo(data) : renderTasks(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTasks(data) {
  main.innerHTML = "";
 
  data.results.forEach((task) => {
    const fechaInicio = new Date(task.created_at).getTime();
    const fechaFin = new Date().getTime();
    const diff = fechaFin - fechaInicio;
    const format_date = Math.round(diff / (1000 * 60 * 60 * 24));
    const {name, description, logo, id} = task;
    main.innerHTML += `
    <div class="col-4">
      <div class="card mb-2">
        <div class="card-body">
          <h4>${name}</h2>
          <p align="justify">
            ${description}
          </p>
          <img src="${logo}" width="310" height="163"/>

          <div class="mt-2">
          <a href="./detail.html?id=${id}" class="btn btn-primary">Revisar</a>
          </div>
        </div>
      </div>
    </div>`;
  });
}

function renderTodo(data) {
  const {name, description : bodyTodo, logo,  id} = data;
  body.innerHTML = `
  <div class="col-lg-8 mx-auto p-4 py-md-5">
    <main>
      <h1>Detalle</h1>
      
      <p class="fs-5 col-md-8">
        Servicio: ${name}
      </p>
      <p class="fs-5 col-md-8" align="justify">
        Descripción: <div class="mt-1"> ${bodyTodo} 
      </p>
      <img src="${logo}" width="310" height="163"/>
    
      <div class="mt-2">
      <div class="mb-5">
        <a href="/" class="btn btn-primary">Regresar</a>
        <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
        <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
      </div>
    </main>
  </div>`;
}


getTask3();
