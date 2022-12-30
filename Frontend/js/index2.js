const main2 = document.querySelector(".row1");
const body2 = document.querySelector(".body1");

async function getTask2() {
  
const response2 = await fetch('http://127.0.0.1:8000/servicios/expiraciones/', {
    method: "GET",
    mode: "cors",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token[token.length-2].access}`,
      }
    });

    
    const data2 = await response2.json();
    renderTasks2(data2);
}

function renderTasks2(data2) {
main2.innerHTML = "<h3>Pagos vencidos</h3>";
data2.results.forEach((task) => {
const {payment_service_logo, payment_service_name, payment_service_expiration, payment_service_amount,penalty_fee} = task;
main2.innerHTML += `    
<div class="col-13">
    <div class="card mb-2" id="inside">
        <div class="card-body" id="outside" >
            <table class="table2">
                <tr>
                    <th scope="col"> <img src="${payment_service_logo}"/> <th>
                    <p>${payment_service_name}</p>
                    <th> 
                    <p class="fecha">${payment_service_expiration}</th>
                    <th>
                    <p class="monto1">${payment_service_amount} USD</p>
                    <th>
                    <p class="monto2">${penalty_fee} USD</p>
                </tr>          
            </table>
        </div>
    </div>
</div>`;
  });
}

getTask2();
