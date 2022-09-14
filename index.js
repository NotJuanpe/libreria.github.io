let productos = [
                {id:1,nombre:"The Lord of The Rings", categoria:"Fantasia", precio: 130, imagen:"./media/lotr.jpg"},
                {id:2,nombre:"Mistborn", categoria:"Fantasia", precio: 122, imagen:"./media/mistborn.jpg"},
                {id:3,nombre:"Bajo la Misma Estrella", categoria:"Romance", precio: 73, imagen:"./media/star.png"},
                {id:4,nombre:"Dune", categoria:"SciFi", precio: 93, imagen:"./media/dune.jpg"},
                {id:5,nombre:"IT", categoria:"Terror", precio: 68, imagen:"./media/it.jpg"},
                {id:6,nombre:"Death Note", categoria:"Otros", precio: 40, imagen:"./media/ded.jpg"},
                {id:7,nombre:"A Dos Metros de Ti", categoria:"Romance", precio: 64, imagen:"./media/2m.png"},
                {id:8,nombre:"Squadron", categoria:"SciFi", precio: 72, imagen:"./media/sander.jpg"},
                ]

let carrito = []

class Tienda{

    agregarProductos(productos){

        for(const producto of productos){
            let contenedor = document.createElement("div");
            contenedor.classList.add("card","col-sm-12","animacion","producto");
            contenedor.style.width = "18rem";

            contenedor.innerHTML = `    <img src=${producto.imagen} class="card-img-top" alt="${producto.nombre}>
                                        <div class = "card-body">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <h6 class="card-title">Categoria: ${producto.categoria}</h6>
                                            <h6 class="card-title">Precio: <strong>$${producto.precio}</strong></h6>
                                            <h6 class="card-title id">Id: ${producto.id}</h6>
                                            <div class="boton_carrito" onclick="tienda.agregadosAlCarrito(${producto.id},productos,carrito)">
                                                <button type="button" class="btn btn-light">Add</button>
                                            </div>
                                        </div>`
            let padre = document.querySelector(".contenedor");

            padre.appendChild(contenedor);
        }
    }

    vaciarProductos(){
        let padre = document.querySelector(".contenedor");
        while (padre.firstChild) {
            padre.removeChild(padre.firstChild);
        }
    }

    filtrarCategoria(productos,categorias){

        if(categorias == "Home"){
            this.agregarProductos(productos);
        }else{ 
            const filtrado = productos.filter((filtro) => filtro.categoria.includes(categorias));
            this.vaciarProductos();
            this.agregarProductos(filtrado);
        }
    }

    filtrarPrecio(productos){
        var minimo = document.querySelector("#min").value;
        var maximo = document.querySelector("#max").value;
        var valoresAceptados = /^[0-9]+$/;

        if(minimo == "") minimo = 0;
        if(maximo == "") maximo = 10000;

        if(maximo.match(valoresAceptados) && minimo.match(valoresAceptados)){
            const filtrado = productos.filter((filtro) => (filtro.precio <= maximo) && (filtro.precio >= minimo));
            this.vaciarProductos();
            this.agregarProductos(filtrado);
        }


    }

    agregadosAlCarrito(id,productos,carrito){
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        this.agregarCarrito(producto);
    }

    agregarCarrito(producto){

            let row = document.createElement("div");
            row.classList.add("row","lista");

            let contenedor1 = document.createElement("div");
            contenedor1.classList.add("col-6");
            contenedor1.innerHTML = `<div class="prod_cart">
                                            <img src=${producto.imagen} alt="${producto.nombre}">
                                            <h3 class="ml-3 mb-0">${producto.nombre}</h3>
                                        </div>`
            
            let contenedor2 = document.createElement("div");
            contenedor2.classList.add("col-2");
            contenedor2.innerHTML=`<div>
                                        <h3>$${producto.precio}</h3>
                                    </div>`

            let contenedor3 = document.createElement("div");
            contenedor3.classList.add("col-3");

            let contenedor4 = document.createElement("div");
            contenedor4.classList.add("col-1");
            contenedor4.innerHTML=`<div onclick="tienda.borrarItem(${producto.id},productos,carrito,event)">
                                        <button type="button" class="btn btn-danger eliminar">X</button>
                                    </div>`
            
            row.appendChild(contenedor1);
            row.appendChild(contenedor2);
            row.appendChild(contenedor3);
            row.appendChild(contenedor4);

            let padre = document.querySelector(".contenedor_carrito");
            padre.appendChild(row);
            console.log(carrito)
        }

        borrarItem(id,productos,carrito,event){

            const producto = productos.find(producto => producto.id === id);
            carrito.splice(producto,1)

            const botonClickeado = event.target;
            botonClickeado.closest('.lista').remove()
            console.log(carrito)
        }

        precioFinal(productos){

            var precio = 0;
            
            for(const producto of productos){
                precio += producto.precio
            }

            return precio

            
        }

        pagar(){

            alert(`Su total es de $${this.precioFinal(carrito)}`)
            alert("No es necesario que nos diga donde vive ya lo sabemos")
            

        }

        
}

var tienda = new Tienda();
tienda.agregarProductos(productos);
