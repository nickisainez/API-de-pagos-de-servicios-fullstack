localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNDM2MjU5LCJpYXQiOjE2NzIzNDk4NTksImp0aSI6ImUxOWVkMTRjODZiZDRkOTRhMzBjYTY3NmQxYThkY2UxIiwidXNlcl9pZCI6Mn0.qyCcw2G1f3LMD9pJGhBYkPb7Xh2joMr0ks0UOHg1X-I');

const main = document.querySelector(".row");
const body = document.querySelector("body");

async function getTask() {
 
  const response = await fetch('http://127.0.0.1:8000/servicios/pagos/', {
    method: "GET",
    mode: "cors",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
  const data = await response.json();
  renderTasks(data);
}

function renderTasks(data) {
main.innerHTML = "<h3 >Pagos realizados</h3>";
data.results.forEach((task) => {
const {logo, service_id, paymentdate, amount} = task;
main.innerHTML += `    
<div class="col-13">
    <div class="card mb-2" id="inside">
        <div class="card-body" id="outside">
            <table>
                <tr>
                    <th scope="col"> <img src="${logo}"/> <th>
                    <p> ${service_id}</p>
                    <th> 
                    <p class="fecha">${paymentdate}</th>
                    <th>
                    <p class="monto">${amount} USD</p>
                </tr>          
            </table>
        </div>
    </div>
</div>`;
  });
}

getTask()


