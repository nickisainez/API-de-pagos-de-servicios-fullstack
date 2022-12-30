const formTodo = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
  if (username.value === "") {
    msg.classList.remove("d-none");
  }
  if(password.value === ""){
    msg1.classList.remove("d-none");
  }
  if (username.value !== "" && password.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const data = {
      username: username.value,
      password: password.value,
      }
    await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
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

