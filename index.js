

class Tienda{

    productos = []
    carrito = []

    async agregarProductos(productos = []){

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

        $('.btn_carrito').on('click', e => this.agregadosAlCarrito(e.currentTarget.dataset.productId))
    }

    vaciarProductos(){ 
        document.querySelector('#contenedor_libros').innerHTML = ''
    }

    filtrarPrecio(){
        var minimo = document.querySelector("#min").value;
        var maximo = document.querySelector("#max").value;
        var valoresAceptados = /^[0-9]+$/;

        minimo ? parseFloat(minimo) : 0;
        maximo ? parseFloat(maximo) : 10000;

        if(maximo.match(valoresAceptados) && minimo.match(valoresAceptados)){
            const filtrado = this.productos.filter((filtro) => {
                let precio = parseFloat(filtro.precio)
                if (precio > maximo) return;
                if (precio < minimo) return;

                return filtro
            });
            console.log(filtrado)
            this.vaciarProductos();
            this.agregarProductos(filtrado);
        }

        



    }

    agregadosAlCarrito(id){
        console.log(id)
        const producto = this.productos.find(producto => producto.id == id);
        this.carrito.push(producto);
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

            const producto = this.productos.find(producto => producto.id == id);
            this.carrito.splice(producto,1)
            
            localStorage.removeItem(producto.id);

        }

        precioFinal(){

            var precio = 0;
            
            for(const producto of this.carrito){
                console.log(precio)
                precio += parseFloat(producto.precio)
            }

            return precio

            
        }

        pagar(){

            alert(`Su total es de $${this.precioFinal()}`)
            alert("No es necesario que nos diga donde vive ya lo sabemos")

            let padre = document.querySelector(".contenedor_carrito");
            while (padre.firstChild) {
                padre.removeChild(padre.firstChild);
            }
            
            localStorage.clear()
            this.carrito = []

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
                    this.carrito.push(objeto)
                 });
                for(const producto of this.carrito){
                    this.agregarCarrito(producto)
                }
            }
            
        }

        async funcionalidad(){

            $('.nav_cat').on('click', e => this.filtrarCategoria(e.currentTarget.innerText))
            $('.btn_busca').on('click' , e => this.filtrarPrecio())
            $('.btn_pagar').on('click' , e => this.pagar(this.carrito))
            $(document).on('load',this.recargarCarrito())
        }

        async obtenerApi(){
            var myHeaders = new Headers();
            myHeaders.append("X-RapidAPI-Key", "bd3fc8722cmshc00419a393c679cp18243fjsnf5422668b624");
            myHeaders.append("X-RapidAPI-Host", "bookshelves.p.rapidapi.com");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://bookshelves.p.rapidapi.com/books", requestOptions)
            .then(response => response.text())
            .then(result => 
                 JSON.parse(result).Books)
            .then(libros => {
                for(const libro of libros){
                    const {id,title,price,imgUrl} = libro;
                    
                    let newPrice = price.slice(1,-1)

                    let book = new Libro(id,title,newPrice,imgUrl)

                    
                    
                    this.productos.push(book)
                    
                }
            })
            .then(resp =>{
                this.agregarProductos(this.productos)
            })
        }


        
}

class Libro{
    id;
    nombre;
    categoria;
    precio;
    imagen;

    constructor(id,nombre,precio,imagen){

        this.id = id;
        this.nombre = nombre;
        this.categoria = 'Api';
        this.precio = precio;
        this.imagen = imagen;

    }
}


const main = async()=>{
    var tienda = new Tienda();
    await tienda.funcionalidad();
    await tienda.obtenerApi();
    await tienda.agregarProductos(this.productos)

}

main();
