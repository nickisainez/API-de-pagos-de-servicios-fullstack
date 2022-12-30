async function deleteTodo() {
    const id = new URLSearchParams(window.location.search).get("id");
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://127.0.0.1:8000/servicios/todos/${id}/`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }   
        }).then((response) => {
          if (response.ok) {
            if (response.ok) {
              Swal.fire(
                "¡Eliminado!",
                "El servicio se eliminó correctamente",
                "success"
              ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  window.location.replace("./detail.html");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Ocurrió un error!",
              });
            }
          }
        });
      }
    });
  }
