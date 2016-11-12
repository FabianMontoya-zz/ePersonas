
$(document).ready(function () {
  
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#info_C").css("display", "none");
	$("#T_Documentos").css("display", "none");
    $("#T_DocEmpresa").css("display", "none");
    $("#Complete").css("display", "none");
	$("#ImgMen").css("display", "none");
    $("#ImgWomen").css("display", "none");
    
	
	$("#A1").css("display", "none");
    $("#A2").css("display", "none");
    $("#A3").css("display", "none");
    $("#A4").css("display", "none");
    $("#A5").css("display", "none");
    $("#A6").css("display", "none");
    $("#I1").css("display", "none");
    $("#I2").css("display", "none");
    $("#I3").css("display", "none");
    $("#I4").css("display", "none");
    $("#I5").css("display", "none");
    $("#I6").css("display", "none");
    
});

function BtnConsulta(){
	
	var validate = Campos();
	if(validate == 0){
		VerificarDatos();
    }
		
}

function Campos(){
	
	var Campo_1 = $("#Select_TD").val();
    var Campo_2 = $("#TxtDoc").val();
    
    var validar = 0;

    if ( Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
       
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
}

function VerificarDatos(){
	
	var Cedula = $("#TxtDoc").val();
   
   switch(Cedula){
	   case "12":
	    P_12();
	    break;
	   
	   case "34":
	    P_34();
	    break;
	   
	   default:
	    $("#info_C").css("display", "none");
		$("#T_Documentos").css("display", "none");
        $("#T_DocEmpresa").css("display", "none");
        $("#Complete").css("display", "none");
        alert("Proveedor NO Existe!");
	    break;
   }
}

function P_12(){
	
	$("#info_C").css("display", "block");
	$("#T_Documentos").css("display", "block");
    $("#T_DocEmpresa").css("display", "block");
	$("#Complete").css("display", "block");
	
	$("#ImgMen").css("display", "block");
    $("#ImgWomen").css("display", "none");
        
	$("#T_Doc").html("Documentación Completa");
	
	$("#L_Nombre").html("Alexander Castaño");
	$("#L_Empresa").html("D1 Bogota");
	$("#L_Area").html("Ventas");
	$("#L_Cargo").html("Vendedor");
	
	$("#TxtPF_F").html("2016-08-10");
	$("#TxtRA_F").html("2016-08-06");
	$("#TxtO_F").html("2016-08-15");
	
	$("#TxtPR_F").html("2016-08-11");
	$("#TxtPC_F").html("2016-08-02");
	$("#TxtO2_F").html("2016-08-10");
		
	$("#L_AV").html("Recursos Humanos");
	$("#L_PV").html("Diana Milena Garavito");
	$("#L_MV").html("Visita domiciliaria para ingreso");
	
	$("#FH_I").html("2016-08-07 9:00:00 a.m.");
	$("#TE").html("120 minutos");
	$("#FHS_P").html("2016-08-07 11:00:00 a.m.");
	$("#FHS_R").html("2016-08-07 12:56:13 p.m.");
	
	$("#A1").css("display", "block");
    $("#A2").css("display", "block");
    $("#A3").css("display", "block");
    $("#A4").css("display", "block");
    $("#A5").css("display", "block");
    $("#A6").css("display", "block");
    $("#I1").css("display", "none");
    $("#I2").css("display", "none");
    $("#I3").css("display", "none");
    $("#I4").css("display", "none");
    $("#I5").css("display", "none");
    $("#I6").css("display", "none");
    
   
}

function P_34(){
	$("#info_C").css("display", "block");
	$("#T_Documentos").css("display", "block");
    $("#T_DocEmpresa").css("display", "block");
    $("#Complete").css("display", "none");

	$("#ImgMen").css("display", "none");
    $("#ImgWomen").css("display", "block");
    
	$("#T_Doc").html("Documentación Imcompleta");
  	
	$("#L_Nombre").html("Maria Puertas");
	$("#L_Empresa").html("Alkosto");
	$("#L_Area").html("Administración");
	$("#L_Cargo").html("Asesora");

	$("#TxtPF_F").html("2016-08-12");
	$("#TxtRA_F").html("No Registra");
	$("#TxtO_F").html("2016-08-16");
		
	$("#TxtPR_F").html("2015-01-11");
	$("#TxtPC_F").html("2016-08-02");
	$("#TxtO2_F").html("2016-08-10");
		
		
    $("#A1").css("display", "block");
    $("#A2").css("display", "none");
    $("#A3").css("display", "block");
    $("#A4").css("display", "none");
    $("#A5").css("display", "block");
    $("#A6").css("display", "block");
    $("#I1").css("display", "none");
    $("#I2").css("display", "block");
    $("#I3").css("display", "none");
    $("#I4").css("display", "block");
    $("#I5").css("display", "none");
    $("#I6").css("display", "none");
    	
}