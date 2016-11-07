Imports Newtonsoft.Json

Public Class CargoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "Cargo_Dep"
                    CargarCargoDep()

                Case "Seguridad"
                    CargarSeguridad()

                Case "consulta"
                    Consulta_Cargo()

                Case "crear"
                    InsertCargo()

                Case "modificar"
                    UpdateCargo()

                Case "elimina"
                    EraseCargo()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Cargo (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Cargo()

        Dim SQL_Cargo As New CargoSQLClass
        Dim ObjListCargo As New List(Of CargoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListCargo = SQL_Cargo.Read_AllCargo(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListCargo Is Nothing Then

            Dim objCargo As New CargoClass
            ObjListCargo = New List(Of CargoClass)

            objCargo.Descripcion = ""
            objCargo.FechaActualizacion = ""
            objCargo.UsuarioCreacion = ""

            ObjListCargo.Add(objCargo)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListCargo.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Cargo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCargo()

        Dim objCargo As New CargoClass
        Dim SQL_Cargo As New CargoSQLClass
        Dim ObjListCargo As New List(Of CargoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objCargo.Nit_ID = Request.Form("Nit_ID")
        objCargo.Cargo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Cargo.Consulta_Repetido(objCargo)

        If vl_s_IDxiste = 0 Then

            objCargo.Descripcion = Request.Form("descripcion")
            objCargo.CargoDependencia = Request.Form("CargoDependencia")
            objCargo.Politica_ID = Request.Form("Politica")

            objCargo.UsuarioCreacion = Request.Form("user")
            objCargo.FechaCreacion = Date.Now
            objCargo.UsuarioActualizacion = Request.Form("user")
            objCargo.FechaActualizacion = Date.Now

            ObjListCargo.Add(objCargo)

            result = SQL_Cargo.InsertCargo(objCargo)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Cargo (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateCargo()

        Dim objCargo As New CargoClass
        Dim SQL_Cargo As New CargoSQLClass
        Dim ObjListCargo As New List(Of CargoClass)

        Dim result As String

        objCargo.Nit_ID = Request.Form("Nit_ID")
        objCargo.Cargo_ID = Request.Form("ID")
        objCargo.Descripcion = Request.Form("descripcion")

        objCargo.Descripcion = Request.Form("descripcion")
        objCargo.CargoDependencia = Request.Form("CargoDependencia")
        objCargo.Politica_ID = Request.Form("Politica")

        objCargo.UsuarioActualizacion = Request.Form("user")
        objCargo.FechaActualizacion = Date.Now

        ObjListCargo.Add(objCargo)

        result = SQL_Cargo.UpdateCargo(objCargo)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Cargo (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseCargo()

        Dim objCargo As New CargoClass
        Dim SQL_Cargo As New CargoSQLClass
        Dim ObjListCargo As New List(Of CargoClass)

        Dim result As String

        objCargo.Nit_ID = Request.Form("Nit_ID")
        objCargo.Cargo_ID = Request.Form("ID")
        ObjListCargo.Add(objCargo)

        result = SQL_Cargo.EraseCargo(objCargo)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Cargo As New CargoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Cargo.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCliente()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListCliente(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCargoDep()

        Dim SQL As New CargoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Index As String = Request.Form("Index")

        ObjListDroplist = SQL.Charge_DropListCargoDepend(vl_S_Index)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSeguridad()

        Dim SQL As New CargoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListSeguridad(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class