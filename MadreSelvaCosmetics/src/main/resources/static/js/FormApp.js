const url_link = "http://129.151.124.157:8080/api/user/";
const url_linkProducts = "http://129.151.124.157:8080/api/hairproducts/";

function getUser(){
    var userEmail = localStorage.getItem('userEmail');
    var userPass = localStorage.getItem('userPass');
    console.log(userEmail);
    console.log(userPass);
    $.ajax({
        url: url_link+userEmail+"/"+userPass,
        method: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
            console.log(response.id);
             if(response.id!=null) {

                let type = '';
                switch(response.type) {
                    case 'COORD':
                        type = "Coordinador de zona";
                        break;
                    case 'ADM':
                        type = "Administrador";
                        break;
                    case 'ASE':
                        type = "Asesor comerciales";
                        break;
                    default:
                        type = "Perfil no definido";
                        break;
                }
                addRow(response.identification,response.name,
                    response.address,response.cellPhone,
                    response.zone,response.email,type);
             }
        }
    });
}

function getProducts(){
    $("#contenedorProductos tr").remove();
    $.ajax({
        type: "GET",
        url: url_linkProducts+"all",
        dataType: "json",
        success: function(data){
            if(data.length > 0){
                
                for(i=0;i<data.length;i++){
                    var $row = $('<tr>');
                    $row.append($('<td>').text(data[i].reference));
                    $row.append($('<td>').text(data[i].brand));
                    $row.append($('<td>').text(data[i].category));
                    $row.append($('<td>').text(data[i].name));
                    $row.append($('<td>').text(data[i].description));
                    $row.append($('<td>').text(data[i].availability));
                    $row.append($('<td>').text(data[i].price));
                    $row.append($('<td>').text(data[i].quantity));
                    $row.append($('<td>').text(data[i].photography));
                    $("#contenedorProductos").append($row);
                }
            }else{
                var $row = $('<tr>');
                $row.append($('<td colspan="9" class="text-center">').text('No hay ordenes'));
                $("#contenedorProductos").append($row);
            }
            
            
        },error: function(data){
            var $row = $('<tr>');
            $row.append($('<td colspan=9" class="text-center">').text('No hay ordenes'));
            $("#contenedorProductos").append($row);
        }
    })
}

function getProductsModal(){
    $.ajax({
        type: "GET",
        url: url_linkProducts+"all",
        dataType: "json",
        success: function(data){
            
            $("#listaproductos tr").remove();
            for(i=0;i<data.length;i++){
                var $filas = $('<tr>');
                $filas.append($('<td>').text(data[i].reference));
                $filas.append($('<td>').text(data[i].brand));
                $filas.append($('<td>').text(data[i].category));
                $filas.append($('<td>').text(data[i].name));
                $filas.append($('<td>').text(data[i].description));
                $filas.append($('<td>').text(data[i].availability));
                $filas.append($('<td>').text(data[i].price));
                $filas.append($('<td>').text(data[i].quantity));
                $filas.append($('<td>').text(data[i].photography));
                $filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-warning" onclick="editProducto()">Editar producto</button>'));
                $filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-danger" onclick="deleteProducto()">Eliminar producto</button>'));
                $("#listaproductos").append($filas);
            }
            $filas = $('<tr>');
            $filas.append($('<td>').append("<input type='text' placeholder='REFERENCIA' id='reference'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='MARCA' id='brand'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='CATEGORÍA' id='category'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='NOMBRE' id='name'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='DESCRIPCIÓN' id='description'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='DISPONIBILIDAD' id='availability'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='PRECIO' id='price'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='CANTIDAD' id='quantity'/>"));
            $filas.append($('<td>').append("<input type='text' placeholder='FOTOGRAFÍA' id='photography'/>"));
            $("#listaproductos").append($filas);
            
        }
    })
}


$(document).ready(function() {
    getUser();
    getProducts();

    var myModal = document.getElementById("registarproducto");
    
    myModal.addEventListener('shown.bs.modal', function(e){
        
        $.ajax({
            type: "GET",
            url: url_linkProducts+"all",
            dataType: "json",
            success: function(data){
                
                $("#listaproductos tr").remove();
                for(i=0;i<data.length;i++){
                    var $filas = $('<tr class="test">');
                    $filas.append($('<td>').text(data[i].reference));
                    $filas.append($('<td>').text(data[i].brand));
                    $filas.append($('<td>').text(data[i].category));
                    $filas.append($('<td>').text(data[i].name));
                    $filas.append($('<td>').text(data[i].description));
                    $filas.append($('<td>').text(data[i].availability));
                    $filas.append($('<td>').text(data[i].price));
                    $filas.append($('<td>').text(data[i].quantity));
                    $filas.append($('<td>').text(data[i].photography));
                    $filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-warning" onclick="editProducto('+i+')">Editar producto</button>'));
                    $filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-danger" onclick="deleteProducto('+i+')">Eliminar producto</button>'));
                    $("#listaproductos").append($filas);
                }
                $filas = $('<tr>');
                $filas.append($('<td>').append("<input type='text' placeholder='REFERENCIA' id='reference'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='MARCA' id='brand'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='CATEGORÍA' id='category'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='NOMBRE' id='name'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='DESCRIPCIÓN' id='description'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='DISPONIBILIDAD' id='availability'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='PRECIO' id='price'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='CANTIDAD' id='quantity'/>"));
                $filas.append($('<td>').append("<input type='text' placeholder='FOTOGRAFÍA' id='photography'/>"));
                $("#listaproductos").append($filas);
                
            }
        })
    });

});

$("#btnLogout").click(function(e) {
    let sesionInit = localStorage.getItem("sesionInit");
    sesionInit=false;
    localStorage.setItem("sesionInit",sesionInit);
    location.href="index.html";
})

function editProducto(id){
    console.log("Editar producto");
    let rows = document.getElementsByClassName("test");
    let reference = rows[id].childNodes[0].textContent;   
}

function deleteProducto(id){
    let rows = document.getElementsByClassName("test");
    let elemToDelete = rows[id].childNodes[0].textContent;   
    console.log(elemToDelete);
    setTimeout(function() {
        $.ajax({
            url:url_linkProducts+elemToDelete,
            method: "DELETE",
            dataType: "json",
            statusCode: {
                204: function(response){  
                    getProducts();
                    getProductsModal();
                    console.log("Ha borrado el producto: "+ elemToDelete);
                },
                400: function(response){
                    console.log("Bad Request");
                }
            }
        });
    },100)
}

$("#saveProduct").click(function(){
    if($.trim($("#reference").val()) == "" || $.trim($("#brand").val()) == "" ||
         $.trim($("#category").val()) == ""|| $.trim($("#name").val()) == "" ||
         $.trim($("#description").val()) == ""||$.trim($("#availability").val()) == "" ||
         $.trim($("#price").val()) == "" || $.trim($("#quantity").val()) == "" || $.trim($("#photography").val()) == ""){

        alert("Por favor complete todos los campos");
    }else{
        setTimeout(function() {
            let datos = {
                reference: $("#reference").val(),
                brand: $("#brand").val(),
                category: $("#category").val(),
                name : $("#name").val(),
                description: $("#description").val(),
                availability: ($("#availability").val() === 'true'),
                price: $("#price").val(),
                quantity : $("#quantity").val(),
                photography : $("#photography").val()
            };
            console.log(datos);
            $.ajax({
                url:url_linkProducts+"new",
                method: "POST",
                dataType: "json",
                data: JSON.stringify(datos),
                 contentType: "application/json",
                Headers: {
                    "Content-Type": "application/json"
                }, 
                statusCode: {
                    201: function(response){  
                        getProducts();
                        getProductsModal();
                        $("#registarproducto").modal('hide');
                        console.log("Ha creado un producto");
                    },
                    400: function(response){
                        console.log("Bad Request");
                    }
                }
            });
        },100)
    }

    

})

function createRowColumn(row){
    var column = document.createElement("td");
    row.appendChild(column);
    return column;
}

function addRow(identification,name,address,cellPhone,zone,email,type){
    var newrow = document.createElement("tr");

    var Columnidentification = createRowColumn(newrow);
    var Columnname = createRowColumn(newrow);
    var Columnaddress = createRowColumn(newrow);
    var ColumncellPhone = createRowColumn(newrow);
    var Columnzone = createRowColumn(newrow);
    var Columnemail = createRowColumn(newrow);
    var Columntype = createRowColumn(newrow);

    Columnidentification.innerText=identification;
    Columnname.innerText=name;
    Columnaddress.innerText=address;
    ColumncellPhone.innerText=cellPhone;
    Columnzone.innerText=zone;
    Columnemail.innerText=email;
    Columntype.innerText=type;


    var table = document.getElementById("tablaPerfil");
    var tbody = table.querySelector("tbody") || table;
    var count = tbody.getElementsByTagName("tr").length;
    
    console.log(newrow);
    tbody.appendChild(newrow);
}