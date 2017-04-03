Imports Newtonsoft.Json

Public Class Adm_UsuarioAjax
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

                Case "cargar_Rol"
                    Cargar_Rol()

                Case "Documento"
                    CargarDocumento()

                Case "PoliticasSeguridad"
                    CargarPoliticasSeguridad()

                Case "GrupoReportes"
                    CargarGrupoReportes()

                Case "GrupoDocumentos"
                    CargarGrupoDocumentos()

                Case "consulta"
                    Consulta_User()

                Case "crear"
                    InsertUser()

                Case "modificar"
                    UpdateUser()

                Case "Buscar_Persona"
                    Search_People()


            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Usuarios (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_User()

        Dim SQL_User As New Adm_UsuarioSQLClass
        Dim ObjListUser As New List(Of Adm_UsuarioClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")

        ObjListUser = SQL_User.Read_AllUser(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)
        Response.Write(JsonConvert.SerializeObject(ObjListUser.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Usuarios (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertUser()

        Dim objUser As New Adm_UsuarioClass
        Dim SQL_User As New Adm_UsuarioSQLClass
        Dim ObjListUser As New List(Of Adm_UsuarioClass)
        Dim encriptar As New EncriptarClass

        Dim result As String
        Dim vl_s_IDxiste As String
        Dim vl_S_passEncrip As String

        objUser.Nit_ID = Request.Form("NIT")
        objUser.Usuario_ID = Request.Form("UsuarioID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_User.Consulta_Repetido(objUser)

        If vl_s_IDxiste = 0 Then

            objUser.TypeDocument = Request.Form("TypeDocument")
            objUser.Documento = Request.Form("Documento")
            objUser.Nombre = Request.Form("Nombre")
            objUser.Rol_Nit_ID = Request.Form("Rol_NIT_ID")
            objUser.Rol_ID = Request.Form("RolID")
            objUser.Estado = Request.Form("Estado")
            objUser.Acceso_Informacion = Request.Form("AccessInformation")
            objUser.Nivel_Politica_Seguridad_Grupo = Request.Form("PolSegurityGroup")
            objUser.Politica_Seguridad = Request.Form("PoliticaSeguridad")
            objUser.Acceso_Documentos = Request.Form("AccessDocumentos")
            objUser.Grupo_Documentos_Nit_ID = Request.Form("GroupDocuments_Nit_ID")
            objUser.Grupo_Documentos = Request.Form("GroupDocuments")
            objUser.Acceso_Informacion_Documentos = Request.Form("AccessInfoDocument")
            objUser.Acceso_Reportes = Request.Form("AccessReportes")
            objUser.Grupo_Reportes_Nit_ID = Request.Form("GroupReports_Nit_ID")
            objUser.Grupo_Reportes = Request.Form("GroupReports")
            objUser.Acceso_Informacion_Reportes = Request.Form("AccessInfoReportes")
            objUser.Token = Request.Form("Token")
            objUser.Intentos_Fallidos = Request.Form("Intentos_Fallidos")
            objUser.Tipo_Acceso = Request.Form("TypeAccess")
            vl_S_passEncrip = UCase(Request.Form("UsuarioID"))
            vl_S_passEncrip = encriptar.Encriptacion_MD5(vl_S_passEncrip)
            objUser.Password = vl_S_passEncrip
            objUser.Huella = Request.Form("Huella")
            objUser.UsuarioCreacion = Request.Form("user")
            objUser.FechaCreacion = Date.Now
            objUser.UsuarioActualizacion = Request.Form("user")
            objUser.FechaActualizacion = Date.Now

            ObjListUser.Add(objUser)

            result = SQL_User.InsertUser(objUser)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Usuarios (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateUser()

        Dim objUser As New Adm_UsuarioClass
        Dim SQL_User As New Adm_UsuarioSQLClass
        Dim ObjListUser As New List(Of Adm_UsuarioClass)
        Dim encriptar As New EncriptarClass

        Dim result As String

        objUser.Nit_ID = Request.Form("NIT")
        objUser.Usuario_ID = Request.Form("UsuarioID")
        objUser.TypeDocument = Request.Form("TypeDocument")
        objUser.Documento = Request.Form("Documento")
        objUser.Nombre = Request.Form("Nombre")
        objUser.Rol_Nit_ID = Request.Form("Rol_NIT_ID")
        objUser.Rol_ID = Request.Form("RolID")
        objUser.Estado = Request.Form("Estado")
        objUser.Acceso_Informacion = Request.Form("AccessInformation")
        objUser.Nivel_Politica_Seguridad_Grupo = Request.Form("PolSegurityGroup")
        objUser.Politica_Seguridad = Request.Form("PoliticaSeguridad")
        objUser.Acceso_Documentos = Request.Form("AccessDocumentos")
        objUser.Grupo_Documentos_Nit_ID = Request.Form("GroupDocuments_Nit_ID")
        objUser.Grupo_Documentos = Request.Form("GroupDocuments")
        objUser.Acceso_Informacion_Documentos = Request.Form("AccessInfoDocument")
        objUser.Acceso_Reportes = Request.Form("AccessReportes")
        objUser.Grupo_Reportes_Nit_ID = Request.Form("GroupReports_Nit_ID")
        objUser.Grupo_Reportes = Request.Form("GroupReports")
        objUser.Acceso_Informacion_Reportes = Request.Form("AccessInfoReportes")
        objUser.Token = Request.Form("Token")
        objUser.Intentos_Fallidos = Request.Form("Intentos_Fallidos")
        objUser.Tipo_Acceso = Request.Form("TypeAccess")
        objUser.Huella = Request.Form("Huella")
        objUser.UsuarioActualizacion = Request.Form("user")
        objUser.FechaActualizacion = Date.Now

        ObjListUser.Add(objUser)

        result = SQL_User.UpdateUser(objUser)

        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL opcion rol
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_User As New Adm_UsuarioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_User.ReadCharge_DropList(vl_S_Tabla)
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
    Protected Sub CargarPoliticasSeguridad()

        Dim SQL As New Adm_Politicas_SeguridadSQLClass
        Dim ObjListDroplist As New List(Of Adm_Politicas_SeguridadClass)

        Dim Nit_ID_Form As String = Request.Form("NIT")

        ObjListDroplist = SQL.MatrixAll_PoliticasSeguridad(Nit_ID_Form)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarGrupoReportes()

        Dim SQL As New Adm_Grupo_ReportesSQLClass
        Dim ObjListDroplist As New List(Of Adm_Grupo_ReportesClass)

        Dim Nit_ID_Form As String = Request.Form("NIT")

        ObjListDroplist = SQL.MatrixAll_GrupoReportes(Nit_ID_Form)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarGrupoDocumentos()

        Dim SQL As New Adm_Grupo_DocumentosSQLClass
        Dim ObjListDroplist As New List(Of Adm_Grupo_DocumentosClass)

        Dim Nit_ID_Form As String = Request.Form("NIT")

        ObjListDroplist = SQL.MatrixAll_GrupoDocumentos(Nit_ID_Form)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDocumento()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListDocumento(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL rol
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_Rol()

        Dim SQL_User As New Adm_RolesSQLClass
        Dim ObjListDroplist As New List(Of Adm_RolesClass)

        Dim Obj As New ClienteClass

        Obj.Nit_ID = Request.Form("Nit")
        Obj.TipoSQL = "Usuario"
       
        ObjListDroplist = SQL_User.MatrixAll_Roles(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' consulta si existe la persona digitada 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_People()

        Dim SQL As New ClienteSQLClass
        Dim Obj As New ClienteClass

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")

        Obj.TipoSQL = "S_Nit"

        Dim Str_People As String = SQL.SearchPeople_Exists(Obj)
        Response.Write(Str_People)

    End Sub

#End Region

End Class