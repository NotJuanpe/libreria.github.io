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

class Tienda{

    agregarProductos(productos){

        for(const producto of productos){
            let contenedor = document.createElement("div");
            contenedor.classList.add("card","col-sm-12","animacion");
            contenedor.style.width = "18rem";

            contenedor.innerHTML = `    <img src=${producto.imagen} class="card-img-top" alt="${producto.nombre}>
                                        <div class = "card-body">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                            <h6 class="card-title">Categoria: ${producto.categoria}</h6>
                                            <h6 class="card-title">Precio: ${producto.precio}</h6>
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

        const filtrado = productos.filter((filtro) => filtro.categoria.includes(categorias));
    
        this.vaciarProductos();
        this.agregarProductos(filtrado);

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
}

var tienda = new Tienda();
tienda.agregarProductos(productos);


