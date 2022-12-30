const token = JSON.parse(localStorage.getItem("token.users")) ?? [];

const formTodo = document.getElementById('form');
const name = document.getElementById('name');
const description = document.getElementById('description');
const logo = document.getElementById('logo');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
const id = new URLSearchParams(window.location.search).get("id");

formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
  if (name.value === "") {
    msg.classList.remove("d-none");
  }
  if(description.value === ""){
    msg1.classList.remove("d-none");
  }
  if (name.value !== "" && description.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const data = {
        name: name.value,
        description: description.value,
        logo: logo.value,
   }
    await fetch(`http://127.0.0.1:8000/servicios/todos/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token[token.length-2].access}`,
      },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    returnTodo();
                }
            }) 
        }
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
}

async function setData(){
    try {
        const response = await fetch(`http://127.0.0.1:8000/servicios/todos/${id}/`, {
          method: "GET",
          mode: "cors",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNDM2MjU5LCJpYXQiOjE2NzIzNDk4NTksImp0aSI6ImUxOWVkMTRjODZiZDRkOTRhMzBjYTY3NmQxYThkY2UxIiwidXNlcl9pZCI6Mn0.qyCcw2G1f3LMD9pJGhBYkPb7Xh2joMr0ks0UOHg1X-I"
            }
          });
        const data = await response.json();
        name.value = data.name;
        description.value = data.description;
        logo.value = data.logo;
      } catch (error) {
        console.log(error);
      }
}

function returnTodo(){
    window.location.replace(`./detail.html?id=${id}`);
}

setData();
