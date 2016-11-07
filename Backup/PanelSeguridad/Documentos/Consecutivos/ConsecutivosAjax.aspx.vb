Imports Newtonsoft.Json

Public Class ConsecutivosAjax
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

                Case "consulta"
                    Consulta_Consecutivos()

                Case "crear"
                    InsertConsecutivos()

                Case "modificar"
                    UpdateConsecutivos()

                Case "elimina"
                    EraseConsecutivos()

                Case "consulta_G"
                    Consulta_Consecutivos_G()

                Case "crear_G"
                    InsertConsecutivos_G()

                Case "modificar_G"
                    UpdateConsecutivos_G()

                Case "elimina_G"
                    EraseConsecutivos_G()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Consecutivos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Consecutivos()

        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListConsecutivos = SQL_Consecutivos.Read_AllConsecutivos(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListConsecutivos Is Nothing Then

            Dim objConsecutivos As New ConsecutivosClass
            ObjListConsecutivos = New List(Of ConsecutivosClass)

             objConsecutivos.FechaActualizacion = ""
            objConsecutivos.UsuarioCreacion = ""

            ObjListConsecutivos.Add(objConsecutivos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListConsecutivos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Consecutivos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertConsecutivos()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objConsecutivos.Nit_ID = Request.Form("Nit_ID")
        objConsecutivos.Consecutivo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Consecutivos.Consulta_Repetido(objConsecutivos)

        If vl_s_IDxiste = 0 Then

            objConsecutivos.Descripcion = Request.Form("descripcion")
            objConsecutivos.Consecutivo = Request.Form("Consecutivo")

            objConsecutivos.UsuarioCreacion = Request.Form("user")
            objConsecutivos.FechaCreacion = Date.Now
            objConsecutivos.UsuarioActualizacion = Request.Form("user")
            objConsecutivos.FechaActualizacion = Date.Now

            ObjListConsecutivos.Add(objConsecutivos)

            result = SQL_Consecutivos.InsertConsecutivos(objConsecutivos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Consecutivos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateConsecutivos()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String

        objConsecutivos.Nit_ID = Request.Form("Nit_ID")
        objConsecutivos.Consecutivo_ID = Request.Form("ID")
        objConsecutivos.Descripcion = Request.Form("descripcion")
        objConsecutivos.Consecutivo = Request.Form("Consecutivo")

        objConsecutivos.UsuarioActualizacion = Request.Form("user")
        objConsecutivos.FechaActualizacion = Date.Now

        ObjListConsecutivos.Add(objConsecutivos)

        result = SQL_Consecutivos.UpdateConsecutivos(objConsecutivos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Consecutivos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseConsecutivos()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String

        objConsecutivos.Nit_ID = Request.Form("Nit_ID")
        objConsecutivos.Consecutivo_ID = Request.Form("ID")
        ObjListConsecutivos.Add(objConsecutivos)

        result = SQL_Consecutivos.EraseConsecutivos(objConsecutivos)
        Response.Write(result)
    End Sub

#End Region

#Region "CRUD_CONSECUTIVOS GENERALES"

    ''' <summary>
    ''' traemos todos los datos para tabla Consecutivos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Consecutivos_G()

        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListConsecutivos = SQL_Consecutivos.Read_AllConsecutivos_Generales(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListConsecutivos Is Nothing Then

            Dim objConsecutivos As New ConsecutivosClass
            ObjListConsecutivos = New List(Of ConsecutivosClass)

            objConsecutivos.FechaActualizacion = ""
            objConsecutivos.UsuarioCreacion = ""

            ObjListConsecutivos.Add(objConsecutivos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListConsecutivos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Consecutivos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertConsecutivos_G()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

          objConsecutivos.Consecutivo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Consecutivos.Consulta_Repetido_General(objConsecutivos)

        If vl_s_IDxiste = 0 Then

            objConsecutivos.Descripcion = Request.Form("descripcion")
            objConsecutivos.Consecutivo = Request.Form("Consecutivo")

            objConsecutivos.UsuarioCreacion = Request.Form("user")
            objConsecutivos.FechaCreacion = Date.Now
            objConsecutivos.UsuarioActualizacion = Request.Form("user")
            objConsecutivos.FechaActualizacion = Date.Now

            ObjListConsecutivos.Add(objConsecutivos)

            result = SQL_Consecutivos.InsertConsecutivos_Generales(objConsecutivos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Consecutivos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateConsecutivos_G()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String

        objConsecutivos.Consecutivo_ID = Request.Form("ID")
        objConsecutivos.Descripcion = Request.Form("descripcion")
        objConsecutivos.Consecutivo = Request.Form("Consecutivo")

        objConsecutivos.UsuarioActualizacion = Request.Form("user")
        objConsecutivos.FechaActualizacion = Date.Now

        ObjListConsecutivos.Add(objConsecutivos)

        result = SQL_Consecutivos.UpdateConsecutivos_Generales(objConsecutivos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Consecutivos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseConsecutivos_G()

        Dim objConsecutivos As New ConsecutivosClass
        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListConsecutivos As New List(Of ConsecutivosClass)

        Dim result As String

        objConsecutivos.Consecutivo_ID = Request.Form("ID")
        ObjListConsecutivos.Add(objConsecutivos)

        result = SQL_Consecutivos.EraseConsecutivos_Generales(objConsecutivos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Consecutivos As New ConsecutivosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Consecutivos.ReadCharge_DropList(vl_S_Tabla)
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