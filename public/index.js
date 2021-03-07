
document.getElementById("panelCategoria").style.display = "none";
document.getElementById("panelCreate").style.display = "none";
document.getElementById("panelButtons").style.display = "none";
document.getElementById("panelSearch").style.display = "none";
document.getElementById("panelCategoria2").style.display = "none";
document.getElementById("mostrarEventos").style.display = "none";
document.getElementById("panelModifyEvent").style.display = "none";



let userhidden = "";
let _idhidden = "";


function mostrar(id) {
    document.getElementById(id).style.display = "block";
}

function ocultar(id) {
    document.getElementById(id).style.display = "none";
}

function ocultarMostrar(ocultar, mostrar) {
    this.ocultar(ocultar);
    this.mostrar(mostrar);
    document.getElementById("event").value = "";
}

function registrarUsuario() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("userhidden").value = username;
    userhidden = document.getElementById("userhidden").value;
    const usuario = {
        username,
        password
    };

    fetch("/usuarios/nuevoUsuario/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            if (datos === false) {
                alert("Ese nombre de usuario esta registrado")
            } else {
                ocultarMostrar("login-box", "panelCategoria");
            }
        });
}


function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("userhidden").value = username;
    userhidden = document.getElementById("userhidden").value;
    const usuario = {
        username,
        password
    };

    fetch("/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            if (datos.length > 0) {
                //console.log(datos);
                ocultarMostrar("login-box", "panelButtons");
                mostrarEvent();
            } else {
                alert("Usuario o contraseña incorrecto")
            }

        });

}

function crearCategory() {
    const name = document.getElementById("userhidden").value;
    const category = document.getElementById("category").value;
    const categoria = {
        name,
        category
    };

    fetch("/categorias/nuevaCategoria/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //console.log(datos);
        });
    ocultarMostrar("panelCategoria", "panelCreate");
    loadSelect("selectCategory");
}

function crearCategory2() {
    
    //document.getElementById("selectCategory").innerHTML = "";
    const name = document.getElementById("userhidden").value;
    const category = document.getElementById("category2").value;
    const categoria = {
        name,
        category
    };

    fetch("/categorias/nuevaCategoria/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //console.log(datos); 
        });
    ocultarMostrar("panelCategoria2", "panelCreate");
    loadSelectCategoty2();
}

function crearEvent() {
    const name = document.getElementById("userhidden").value;
    const eventName = document.getElementById("crearEvent").value;
    const category = document.getElementById("selectCategory").value;
    const fechaCategory = document.getElementById("dateEvent").value;
    const event = {
        name,
        eventName,
        category,
        fechaCategory
    };

    fetch("/eventos/nuevoEvento/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //console.log(datos);
        });
    ocultarMostrar("panelCreate", "panelButtons");
    mostrarEvent();
    document.getElementById("crearEvent").value = "";
    document.getElementById("dateEvent").value = "";
}

function mostrarEvent() {
    document.getElementById("mostrarEventos").style.display = "flex";
    fetch(`/eventos/${userhidden}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //console.log(datos)
            let mostrar = "";
            for (let i = 0; i < datos.length; i++) {
                mostrar += `
            <div class="mostrarMasEventos">
                <div class="datos">
                    <h3> <span>${datos[i].eventName}</span></h3>
                    <hr>      
                    <h5>Categoría: <span>${datos[i].category}</span></h5>
                    <p>Fecha: <span>${datos[i].fechaCategory}</span></p>
                    <div class="mostrarMasEventosButton">
                        <button class="mostrarMasEventosbutton" onclick="ocultarMostrarGetSelect('panelButtons', 'panelModifyEvent','${datos[i]._id}','selectModidyCategory')" class="">Modificar</button>      
                        <button class="mostrarMasEventosbutton" onclick="deleteEvent('${datos[i]._id}')" class="">Eliminar</button>
                    </div>      
                </div>
            </div>
            `;

            }
            document.getElementById("mostrarEventos").innerHTML = mostrar;

        });
}

function getForID(_id) {
    fetch(`/eventos/id/${_id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            document.getElementById("nameModifyEvent").value = datos[0].eventName;
            document.getElementById("selectModidyCategory").value = datos[0].category;
            document.getElementById("dateModifyEvent").value = datos[0].fechaCategory;
        });
}


// function ocultarMostrarGet(id, id1, _id) {
//     ocultar(id);
//     mostrar(id1);
//     getForID(_id);
// }

function ocultarMostrarGetSelect(id, id1, _id, cargar) {
    ocultar(id);
    mostrar(id1);
    getForID(_id);
    loadSelect(cargar)
    document.getElementById("_idhidden").value = _id;
    _idhidden = document.getElementById("_idhidden").value;
}

function modifyEvent() {
    const _id = _idhidden;
    const category = document.getElementById("selectModidyCategory").value;
    const eventName = document.getElementById("nameModifyEvent").value;
    const fechaCategory = document.getElementById("dateModifyEvent").value;
    const event = {
        _id,
        category,
        eventName,
        fechaCategory
    }
    fetch("/eventos/modificarEvento/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            mostrarEvent();
        });
}

function loadSelect(cargar) {
    fetch(`/categorias/${userhidden}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //Ordenamos los sets por orden alfabético
            function compare(a, b) {
                if (a.category < b.category) {
                    return -1;
                }
                if (a.category > b.category) {
                    return 1;
                }
                return 0;
            }
            datos.sort(compare);
            let mostrar = "";
            for (let i = 0; i < datos.length; i++) {
                mostrar += `<option class="selects" value=${datos[i].category}>${datos[i].category}</option>`
            }
            document.getElementById(cargar).innerHTML = mostrar;

        });
}

function loadSelectCategoty2() {
    document.getElementById("category2").innerHTML = "";
    fetch(`/categorias/${userhidden}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            //Ordenamos los sets por orden alfabético
            function compare(a, b) {
                if (a.category < b.category) {
                    return -1;
                }
                if (a.category > b.category) {
                    return 1;
                }
                return 0;
            }
            datos.sort(compare);
            let mostrar = "";
            for (let i = 0; i < datos.length; i++) {
                mostrar += `<option class="selects" value=${datos[i].category}>${datos[i].category}</option>`
            }
            document.getElementById("selectCategory").innerHTML = mostrar;

        });
}

function ocultarMostrarLoadSelect(ocultar, mostrar, cargar) {
    this.ocultar(ocultar);
    this.mostrar(mostrar);
    loadSelect(cargar);
}

function deleteEvent(_id) {
    fetch(`/eventos/deleteEvent/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            mostrarEvent();
        });
}

function ocultarMostrarLogOut(ocultar, mostrar) {
    this.ocultar(ocultar);
    this.mostrar(mostrar);
    document.getElementById("userhidden").value = "";
    document.getElementById("mostrarEventos").innerHTML = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function searchEvent() {
    document.getElementById("mostrarEventos").innerHTML = "";
    const username = document.getElementById("userhidden").value;
    const category = document.getElementById("selectCategorySearch").value;
    const eventName = document.getElementById("event").value;
    const event = {
        username,
        eventName,
        category
    };
    fetch("/eventos/buscar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (datos) {
            let mostrar = "";
            for (let i = 0; i < datos.length; i++) {
                mostrar += `
                <div class="mostrarMasEventos">
                    <div class="datos">
                        
                    <h3><span>${datos[i].eventName}</span></h3>    
                    <hr>  
                        <h5>Categoría: <span>${datos[i].category}</span></h5>
                        <p>Fecha: <span>${datos[i].fechaCategory}</span></p>
                        <div class="mostrarMasEventosButton">
                        <button class="mostrarMasEventosbutton" onclick="ocultarMostrarGetSelect('panelButtons', 'panelModifyEvent','${datos[i]._id}','selectModidyCategory')" class="">Modificar</button>      
                        <button class="mostrarMasEventosbutton" onclick="deleteEvent('${datos[i]._id}')" class="">Eliminar</button>
                        </div>      
                    </div>
                </div>
                `;
            }
            document.getElementById("mostrarEventos").innerHTML = mostrar;
        });
}

function showAll() {
    document.getElementById("mostrarEventos").innerHTML = "";
    mostrarEvent();
}