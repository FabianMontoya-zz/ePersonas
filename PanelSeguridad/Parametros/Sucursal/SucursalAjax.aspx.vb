Imports Newtonsoft.Json

Public Class SucursalAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_Sucursal()

                Case "crear"
                    InsertSucursal()

                Case "modificar"
                    UpdateLSucursal()

                Case "elimina"
                    DeleteSucursal()
            End Select

        End If
    End Sub


#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla ROLES (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Sucursal()

        Dim SQL_Sucursal As New SucursalSQLClass
        Dim ObjList As New List(Of SucursalClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL_Sucursal.Read_AllSucursal(vl_S_filtro, vl_S_opcion, vl_S_contenido)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Sucursal (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertSucursal()

        Dim obj As New SucursalClass
        Dim SQL_Sucursal As New SucursalSQLClass


        Dim ObjList As New List(Of SucursalClass)
        Dim result As String
        Dim vl_s_IDxiste As String

        obj.Sucursal_ID = Request.Form("ID")
        obj.Nit_ID = Request.Form("NIT")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Sucursal.Consulta_Repetido(obj)

        If vl_s_IDxiste = 0 Then

            obj.Descripcion = Request.Form("descripcion")
            obj.UsuarioCreacion = Request.Form("user")
            obj.FechaCreacion = Date.Now
            obj.UsuarioActualizacion = Request.Form("user")
            obj.FechaActualizacion = Date.Now

            ObjList.Add(obj)

            result = SQL_Sucursal.InsertSucursal(obj)

        Else
            result = "Existe"
        End If

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que cambia el estado a inhabilitado en la tabla ROLES (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteSucursal()

        Dim obj As New SucursalClass
        Dim SQL_Sucursal As New SucursalSQLClass
        Dim ObjList As New List(Of SucursalClass)
        Dim result As String

        obj.Sucursal_ID = Request.Form("ID")
        obj.Nit_ID = Request.Form("NIT")
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL_Sucursal.DeleteSucursal(obj)
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla ROLES (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateLSucursal()

        Dim obj_sucursal As New SucursalClass
        Dim SQL_Sucursal As New SucursalSQLClass
        Dim ObjList As New List(Of SucursalClass)
        Dim result As String

        obj_Sucursal.Nit_ID = Request.Form("NIT")
        obj_sucursal.Sucursal_ID = Request.Form("ID")
        obj_Sucursal.Descripcion = Request.Form("descripcion")
        obj_Sucursal.UsuarioActualizacion = Request.Form("user")
        obj_Sucursal.FechaActualizacion = Date.Now

        ObjList.Add(obj_sucursal)

        result = SQL_Sucursal.UpdateSucursal(obj_sucursal)

        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_links As New Adm_LinksSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_links.ReadCharge_DropList(vl_S_Tabla)
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

#End Region



End Class