const formTodo = document.getElementById('form');
const expirationdate = document.getElementById('expirationdate');
const service_id = document.getElementById('service_id');
const amount = document.getElementById('amount');
const user_id = document.getElementById('user_id');
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});


let formValidation = () => {
  if (expirationdate.value === "") {
    msg.classList.remove("d-none");
  }
  if(service_id.value === ""){
    msg1.classList.remove("d-none");
  }
  if (expirationdate.value !== "" && service_id.value !== ""){
    msg.classList.add("d-none");
    msg1.classList.add("d-none");
    acceptData();
  }
};

async function acceptData(){
    const data = {
      expirationdate: expirationdate.value,
      service_id: service_id.value,
      user_id : user_id.value,
      amount: amount.value,
      }
    await fetch("http://127.0.0.1:8000/servicios/pagos/", {
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