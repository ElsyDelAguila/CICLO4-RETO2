$("#login").click(function(){
    if($("#email").val() == "" || $.trim($("#contrasena").val()) == ""){
        alert("Por favor ingrese el correo y/o la contraseña");
    }else{
        let data = {
            email: $("#email").val(),
            password: $("#contrasena").val()
        };
        $.ajax({
            url:"http://129.151.124.157:8080/api/user/"+data.email+"/"+data.password,
            method: "GET",
            dataType: "json",
            success: function(response){
                console.log(response);
            }
        });
    }
});

$("#registrar").click(function(){
    if($("#emailRegistro").val() == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#userRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == ""){
        alert("Por favor complete todos los campos");
    }else{
        if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
            alert("Las contraseñas no coinciden");
        }else{
            let datos = {
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                name: $("#userRegistro").val()
            };
            $.ajax({
                url:"http://129.151.124.157:8080/api/user/new",
                method: "POST",
                dataType: "json",
                data: JSON.stringify(datos),
                contentType: "application/json",
                Headers: {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function(response){
                       console.log(response);
                    },
                    400: function(response){
                        console.log("Bad Request");
                    }
                }
            });
        }
    }
});

$("#contrasenaRegistro2").change(function(){
    if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
        $("#contrasenaRegistro2").css("border-color", "red");
        $("#contrasenaRegistro").css("border-color", "red");
    } else {
        $("#contrasenaRegistro2").css("border-color", "");
        $("#contrasenaRegistro").css("border-color", "");
    }
});