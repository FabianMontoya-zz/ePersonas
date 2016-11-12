Imports Newtonsoft.Json

Public Class AreaAjax
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

                Case "Area_Dep"
                    CargarAreaDep()

                Case "Seguridad"
                    CargarSeguridad()

                Case "consulta"
                    Consulta_Area()

                Case "crear"
                    InsertArea()

                Case "modificar"
                    UpdateArea()

                Case "elimina"
                    EraseArea()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Area (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Area()

        Dim SQL_Area As New AreaSQLClass
        Dim ObjListArea As New List(Of AreaClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListArea = SQL_Area.Read_AllArea(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListArea Is Nothing Then

            Dim objArea As New AreaClass
            ObjListArea = New List(Of AreaClass)

            objArea.Descripcion = ""
            objArea.FechaActualizacion = ""
            objArea.UsuarioCreacion = ""

            ObjListArea.Add(objArea)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListArea.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Area (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertArea()

        Dim objArea As New AreaClass
        Dim SQL_Area As New AreaSQLClass
        Dim ObjListArea As New List(Of AreaClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objArea.Nit_ID = Request.Form("Nit_ID")
        objArea.Area_ID = Request.Form("ID")
        
        'validamos si la llave existe
        vl_s_IDxiste = SQL_Area.Consulta_Repetido(objArea)

        If vl_s_IDxiste = 0 Then

            objArea.Descripcion = Request.Form("descripcion")
            objArea.AreaDependencia = Request.Form("AreaDependencia")
            objArea.Politica_ID = Request.Form("Politica")

            objArea.UsuarioCreacion = Request.Form("user")
            objArea.FechaCreacion = Date.Now
            objArea.UsuarioActualizacion = Request.Form("user")
            objArea.FechaActualizacion = Date.Now

            ObjListArea.Add(objArea)

            result = SQL_Area.InsertArea(objArea)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Area (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateArea()

        Dim objArea As New AreaClass
        Dim SQL_Area As New AreaSQLClass
        Dim ObjListArea As New List(Of AreaClass)

        Dim result As String

        objArea.Nit_ID = Request.Form("Nit_ID")
        objArea.Area_ID = Request.Form("ID")
        objArea.Descripcion = Request.Form("descripcion")

        objArea.Descripcion = Request.Form("descripcion")
        objArea.AreaDependencia = Request.Form("AreaDependencia")
        objArea.Politica_ID = Request.Form("Politica")

        objArea.UsuarioActualizacion = Request.Form("user")
        objArea.FechaActualizacion = Date.Now

        ObjListArea.Add(objArea)

        result = SQL_Area.UpdateArea(objArea)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Area (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseArea()

        Dim objArea As New AreaClass
        Dim SQL_Area As New AreaSQLClass
        Dim ObjListArea As New List(Of AreaClass)

        Dim result As String

        objArea.Nit_ID = Request.Form("Nit_ID")
        objArea.Area_ID = Request.Form("ID")
        ObjListArea.Add(objArea)

        result = SQL_Area.EraseArea(objArea)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Area As New AreaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Area.ReadCharge_DropList(vl_S_Tabla)
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
    Protected Sub CargarAreaDep()

        Dim SQL As New AreaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Index As String = Request.Form("Index")

        ObjListDroplist = SQL.Charge_DropListAreaDepend(vl_S_Index)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSeguridad()

        Dim SQL As New AreaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListSeguridad(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class