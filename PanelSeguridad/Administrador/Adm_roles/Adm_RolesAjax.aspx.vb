Imports Newtonsoft.Json

Public Class Adm_RolesAjax
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
                    Consulta_Roles()

                Case "crear"
                    InsertRol()

                Case "modificar"
                    UpdateLRol()

                Case "elimina"
                    DeleteRol()
            End Select

        End If

    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla ROLES (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Roles()

        Dim SQL_Rol As New Adm_RolesSQLClass
        Dim ObjListRol As New List(Of Adm_RolesClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")


        ObjListRol = SQL_Rol.Read_AllRoles(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)
        Response.Write(JsonConvert.SerializeObject(ObjListRol.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Roles (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertRol()

        Dim objRol As New Adm_RolesClass
        Dim SQL_Rol As New Adm_RolesSQLClass


        Dim ObjListRol As New List(Of Adm_RolesClass)
        Dim result As String
        Dim vl_s_IDxiste As String

        objRol.Rol_ID = Request.Form("ID")
        objRol.Nit_ID = Request.Form("NIT")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Rol.Consulta_Repetido(objRol)

        If vl_s_IDxiste = 0 Then

            objRol.Descripcion = Request.Form("descripcion")
            objRol.Sigla = Request.Form("sigla")
            objRol.UsuarioCreacion = Request.Form("user")
            objRol.FechaCreacion = Date.Now
            objRol.UsuarioActualizacion = Request.Form("user")
            objRol.FechaActualizacion = Date.Now

            ObjListRol.Add(objRol)
            result = SQL_Rol.InsertRol(objRol)

        Else
            result = "Existe"
        End If
        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que cambia el estado a inhabilitado en la tabla ROLES (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteRol()

        Dim objRol As New Adm_RolesClass
        Dim SQL_Rol As New Adm_RolesSQLClass
        Dim ObjListRol As New List(Of Adm_RolesClass)
        Dim result As String

        objRol.Rol_ID = Request.Form("ID")
        objRol.Nit_ID = Request.Form("NIT")
        objRol.UsuarioActualizacion = Request.Form("user")
        objRol.FechaActualizacion = Date.Now

        ObjListRol.Add(objRol)

        result = SQL_Rol.DeleteRol(objRol)
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla ROLES (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateLRol()

        Dim objRol As New Adm_RolesClass
        Dim SQL_Rol As New Adm_RolesSQLClass
        Dim ObjListRol As New List(Of Adm_RolesClass)
        Dim result As String

        objRol.Nit_ID = Request.Form("NIT")
        objRol.Rol_ID = Request.Form("ID")
        objRol.Descripcion = Request.Form("descripcion")
        objRol.Sigla = Request.Form("sigla")
        objRol.UsuarioActualizacion = Request.Form("user")
        objRol.FechaActualizacion = Date.Now

        ObjListRol.Add(objRol)

        result = SQL_Rol.UpdateRol(objRol)

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

#Region "FUNCIONES"


#End Region

End Class