/*--------------- region de variables globales --------------------*/
var Estructura = [];

var HtmlTree;
var HtmlTree_Interno = "";
var Json_Arbol_carpetas;
/*--------------- region de variables globales --------------------*/

//evento load del menu
$(document).ready(function () {
    VentanasEmergentes();
    ConsultaParametrosURL();
 });

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//instancia dialogos jquey
function VentanasEmergentes() {
    $("#Dialog_Warning").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        show: {
            effect: 'fade',
            duration: 600
        },
        hide: {
            effect: 'fade',
            duration: 600
        },
        modal: true
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CONTRUCCION MENU ARBOL                                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//hace el menu dinamico desde la consulta de la BD
function arbol() {

    //Raiz del arbol
    for (itemArray in ArrayMenu) {
        if (ArrayMenu[itemArray].Tipo == 1) {
            //creamos json para guardarlos en un array
            Json_Arbol_carpetas = { "Padre": ArrayMenu[itemArray].IDRol, "Hijo": ArrayMenu[itemArray].Sub_Rol };
            Estructura.push(Json_Arbol_carpetas);
        }
        //raiz del arbol
        if (ArrayMenu[itemArray].Usuario === User.toUpperCase()) {
            HtmlTree = "<ol class='tree'><li><span class='cssToolTip_ver'><label for='C_" + ArrayMenu[itemArray].Sigla + "' >" + ArrayMenu[itemArray].Sigla + "</label><span>" + ArrayMenu[itemArray].DescripcionRol + "</span></span><input type='checkbox' id='C_" + ArrayMenu[itemArray].Sigla + "'/><ol><li id='Container_" + ArrayMenu[itemArray].Sigla + "'></li></ol></li></ol>";
            $("#Name_User").html(ArrayMenu[itemArray].Nombre);
        }
    }
    //pintar Raiz
    $("#container_menu").html(HtmlTree);

    var contP = 0;
    var IDInicial = "";
    var IDFinal = "";
    var cont = 0;
    var SubInicial = "";
    var SubFinal = "";

    for (itemArray in ArrayMenu) {

        switch (ArrayMenu[itemArray].Tipo) {

            case "1":   //construir Carpetas 
                if (contP == 0) {
                    IDInicial = ArrayMenu[itemArray].IDRol;
                    IDFinal = ArrayMenu[itemArray].IDRol;
                }
                else
                    IDFinal = ArrayMenu[itemArray].IDRol;

                if (IDInicial != IDFinal) {
                    contP = 0;
                    IDInicial = ArrayMenu[itemArray].IDRol;
                    IDFinal = ArrayMenu[itemArray].IDRol;
                    HtmlTree_Interno = "";
                }
                HtmlTree_Interno += "<ol><li><span class='cssToolTip_ver'><label for='C_" + ArrayMenu[itemArray].Sub_Rol + "'>" + ArrayMenu[itemArray].Sub_Sigla + "</label><span>" + ArrayMenu[itemArray].DescripcionSubRol + "</span></span><input type='checkbox' id='C_" + ArrayMenu[itemArray].Sub_Rol + "' /><ol><li id='Container_" + ArrayMenu[itemArray].Sub_Rol + "'></li></ol></li></ol>";
                contP = contP + 1;
                //pintar carpetas
                $("#Container_" + ArrayMenu[itemArray].IDRol).html(HtmlTree_Interno);
                break;

            case "2": //construir links
                if (cont == 0) {
                    SubInicial = ArrayMenu[itemArray].Sub_Rol;
                    SubFinal = ArrayMenu[itemArray].Sub_Rol;
                    HtmlTree_Interno = "";
                }
                else
                    SubFinal = ArrayMenu[itemArray].Sub_Rol;

                if (SubInicial != SubFinal) {
                    cont = 0;
                    SubInicial = ArrayMenu[itemArray].Sub_Rol;
                    SubFinal = ArrayMenu[itemArray].Sub_Rol;
                    HtmlTree_Interno = "";
                }

                HtmlTree_Interno += "<li class='file'><span class='cssToolTip_ver'><a class='Pagina' href='" + ArrayMenu[itemArray].Ruta + User + "&Key=" + ArrayMenu[itemArray].Nit + "&LINK=" + ArrayMenu[itemArray].IDlink + "'>" + ArrayMenu[itemArray].DescripcionLink + "</a><span>" + ArrayMenu[itemArray].DescripcionLink + "</span></span></li>";
                cont = cont + 1;
                //pintar links
                $("#Container_" + ArrayMenu[itemArray].Sub_Rol).html(HtmlTree_Interno);
                break;
        }
    }

    $('.Pagina').unbind('click');

    setTimeout("Ruta_Menu()", 400);
}

//posiciona el menu
function Ruta_Menu() {

    var ArrayRuta = [];
    var L_Estruc = Estructura.length;
    var Padre = Estructura[0].Padre;
    var Num = 0;
    var Hijo;

    for (item in ArrayMenu) {
        if (Link == ArrayMenu[item].IDlink) {
            Hijo = ArrayMenu[item].IDOpcionRol;
            ArrayRuta[Num] = Hijo;
            Num = Num + 1;
        }
    }

    for (index = L_Estruc - 1; index >= 0; index--) {
        if (Hijo == Estructura[index].Hijo) {
            ArrayRuta[Num] = Estructura[index].Padre;
            Hijo = Estructura[index].Padre;
            Num = Num + 1;
        }
    }

    var L_Ruta = ArrayRuta.length;

    for (index = L_Ruta - 1; index >= 0; index--) {
        $("#C_" + ArrayRuta[index]).prop("checked", true);
    }
    Advertencia();
}

//Informa el bloque del menu
function Advertencia() {

    $("#Tree_Menu").mouseenter(function () {
        $("#Dialog_Warning").dialog("open");
        $("#Mensaje_Warning").html("No puede cambiar de pagina hasta no cerrar (" + $("#Title_form").html() + ")");
    });

    $("#Tree_Menu").mouseout(function () {
        $("#Dialog_Warning").dialog("close");
    });
}
