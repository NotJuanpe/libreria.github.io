let productos = [
                {id:1,nombre:"The Lord of The Rings", categoria:"Fantasia", precio: 130, imagen:"./media/lotr.jpg"},
                {id:2,nombre:"Mistborn", categoria:"Fantasia", precio: 122, imagen:"./media/mistborn.jpg"},
                {id:3,nombre:"Bajo la Misma Estrella", categoria:"Romance", precio: 73, imagen:"./media/star.png"},
                {id:4,nombre:"Dune", categoria:"Science Fiction", precio: 93, imagen:"./media/dune.jpg"},
                {id:5,nombre:"IT", categoria:"Terror", precio: 68, imagen:"./media/it.jpg"},
                {id:6,nombre:"Death Note", categoria:"Otros", precio: 40, imagen:"./media/ded.jpg"},
                {id:7,nombre:"A Dos Metros de Ti", categoria:"Romance", precio: 64, imagen:"./media/2m.png"},
                {id:8,nombre:"Squadron", categoria:"Science Fiction", precio: 72, imagen:"./media/sander.jpg"},
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
                                            <div class="boton_carrito">
                                                <button type="button" class="btn btn-light btn_carrito" data-product-id="${producto.id}">Add</button>
                                            </div>
                                        </div>`
            let padre = $(".contenedor")[0];

            padre.appendChild(contenedor);
        }
    }

    vaciarProductos(){
        let padre = document.querySelector(".contenedor");
        while (padre.firstChild) {
            padre.removeChild(padre.firstChild);
        }
    }

    filtrarCategoria(categorias){

        if(categorias == "Home"){
            this.vaciarProductos();
            this.agregarProductos(productos);
        }else{ 
            const filtrado = productos.filter((filtro) => filtro.categoria.includes(categorias));
            this.vaciarProductos();
            this.agregarProductos(filtrado);
        }
    }

    filtrarPrecio(){
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

    agregadosAlCarrito(id){
        console.log(id)
        const producto = productos.find(producto => producto.id == id);
        carrito.push(producto);
        this.agregarCarrito(producto);
        this.guardaEnStorage(producto)
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
            contenedor4.innerHTML=`<div>
                                        <button type="button" class="btn btn-danger eliminar" data-product-id="${producto.id}">X</button>
                                    </div>`
            
            row.appendChild(contenedor1);
            row.appendChild(contenedor2);
            row.appendChild(contenedor3);
            row.appendChild(contenedor4);

            let padre = document.querySelector(".contenedor_carrito");
            padre.appendChild(row);

            $('.btn-danger').on('click', e => { 
                this.borrarItem(producto.id)
                e.currentTarget.closest('.lista').remove()
            })
        }

        borrarItem(id){

            const producto = productos.find(producto => producto.id == id);
            carrito.splice(producto,1)
            
            localStorage.removeItem(producto.id);

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

            let padre = document.querySelector(".contenedor_carrito");
            while (padre.firstChild) {
                padre.removeChild(padre.firstChild);
            }
            
            localStorage.clear()

        }

        guardaEnStorage(producto){
            const guardarLocal = (clave,valor) => {localStorage.setItem(clave,valor)}   
            guardarLocal(producto.id,JSON.stringify(producto))
        }

        recargarCarrito(){
            let carrito = []

            const local = (localStorage.length != 0) ? true : false
            
            local ? this.local(carrito) : alert('Bienvenido');
           
        }

        local(){

            alert('Hay un carrito previo');
            let cargar = prompt('Desea recargar el carrito viejo? Introduzca Si (Especificamente Si) para recargarlo')+'';

            const cargardo = (cargar.toLowerCase() == 'si') ? true : false;

            if(cargardo){
                Object.keys(localStorage).forEach(function(key){
                    
                    let objeto = JSON.parse(localStorage.getItem(key));
                    carrito.push(objeto)
                 });
                for(const producto of carrito){
                    this.agregarCarrito(producto)
                }
            }
            
        }

        funcionalidad(){

            $('.nav_cat').on('click', e => this.filtrarCategoria(e.currentTarget.innerText))
            $('.btn_carrito').on('click', e => this.agregadosAlCarrito(e.currentTarget.dataset.productId))
            $('.btn_busca').on('click' , e => this.filtrarPrecio())
            $('.btn_pagar').on('click' , e => this.pagar(carrito))
            $(document).on('load',this.recargarCarrito())
        }
        
}

var tienda = new Tienda();
tienda.agregarProductos(productos);
tienda.funcionalidad();
