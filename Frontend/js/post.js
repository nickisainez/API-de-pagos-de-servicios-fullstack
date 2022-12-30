const formTodo = document.getElementById('form');
const name = document.getElementById('name');
const description = document.getElementById('description');
const logo = document.getElementById('logo');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
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
    await fetch("http://127.0.0.1:8000/servicios/todos/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./index.html");
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
