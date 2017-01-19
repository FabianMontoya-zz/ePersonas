Imports Newtonsoft.Json

Public Class HuellasAjax
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
                    Consulta_Huellas()

                Case "crear"
                    InsertHuellas()

                Case "modificar"
                    UpdateLHuellas()

                Case "elimina"
                    DeleteHuellas()
            End Select

        End If
    End Sub


#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla ROLES (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Huellas()

        Dim SQL_Huellas As New HuellasSQLClass
        Dim ObjList As New List(Of HuellasClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL_Huellas.Read_AllHuellas(vl_S_filtro, vl_S_opcion, vl_S_contenido)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Huellas (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertHuellas()

        Dim obj As New HuellasClass
        Dim SQL_Huellas As New HuellasSQLClass


        Dim ObjList As New List(Of HuellasClass)
        Dim result As String
        Dim vl_s_IDxiste As String

        obj.Huellas_ID = Request.Form("ID")
        obj.Nit_ID = Request.Form("NIT")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Huellas.Consulta_Repetido(obj)

        If vl_s_IDxiste = 0 Then

            obj.Descripcion = Request.Form("descripcion")
            obj.UsuarioCreacion = Request.Form("user")
            obj.FechaCreacion = Date.Now
            obj.UsuarioActualizacion = Request.Form("user")
            obj.FechaActualizacion = Date.Now

            ObjList.Add(obj)

            result = SQL_Huellas.InsertHuellas(obj)

        Else
            result = "Existe"
        End If

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que cambia el estado a inhabilitado en la tabla ROLES (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteHuellas()

        Dim obj As New HuellasClass
        Dim SQL_Huellas As New HuellasSQLClass
        Dim ObjList As New List(Of HuellasClass)
        Dim result As String

        obj.Huellas_ID = Request.Form("ID")
        obj.Nit_ID = Request.Form("NIT")
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL_Huellas.DeleteHuellas(obj)
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla ROLES (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateLHuellas()

        Dim obj_Huellas As New HuellasClass
        Dim SQL_Huellas As New HuellasSQLClass
        Dim ObjList As New List(Of HuellasClass)
        Dim result As String

        obj_Huellas.Nit_ID = Request.Form("NIT")
        obj_Huellas.Huellas_ID = Request.Form("ID")
        obj_Huellas.Descripcion = Request.Form("descripcion")
        obj_Huellas.UsuarioActualizacion = Request.Form("user")
        obj_Huellas.FechaActualizacion = Date.Now

        ObjList.Add(obj_Huellas)

        result = SQL_Huellas.UpdateHuellas(obj_Huellas)

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