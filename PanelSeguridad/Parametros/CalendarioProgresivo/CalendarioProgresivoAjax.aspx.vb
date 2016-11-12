Imports Newtonsoft.Json

Public Class CalendarioProgresivoAjax
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
                    Consulta_CalendarioProgresivo()

                Case "crear"
                    InsertCalendarioProgresivo()

                Case "modificar"
                    UpdateCalendarioProgresivo()

                Case "elimina"
                    EraseCalendarioProgresivo()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla CalendarioProgresivo (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_CalendarioProgresivo()

        Dim SQL_CalendarioProgresivo As New CalendarioProgresivoSQLClass
        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListCalendarioProgresivo = SQL_CalendarioProgresivo.Read_AllCalendarioProgresivo(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListCalendarioProgresivo Is Nothing Then

            Dim objCalendarioProgresivo As New CalendarioProgresivoClass
            ObjListCalendarioProgresivo = New List(Of CalendarioProgresivoClass)

            objCalendarioProgresivo.Descripcion = ""
            objCalendarioProgresivo.FechaActualizacion = ""
            objCalendarioProgresivo.UsuarioCreacion = ""

            ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListCalendarioProgresivo.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla CalendarioProgresivo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCalendarioProgresivo()

        Dim objCalendarioProgresivo As New CalendarioProgresivoClass
        Dim SQL_CalendarioProgresivo As New CalendarioProgresivoSQLClass
        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objCalendarioProgresivo.Nit_ID = Request.Form("Nit_ID")
        objCalendarioProgresivo.CalendarioProgresivo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_CalendarioProgresivo.Consulta_Repetido(objCalendarioProgresivo)

        If vl_s_IDxiste = 0 Then

            objCalendarioProgresivo.Descripcion = Request.Form("descripcion")
            objCalendarioProgresivo.TipoCalendarioProgresivo = Request.Form("TipoCalendarioProgresivo")

            objCalendarioProgresivo.UsuarioCreacion = Request.Form("user")
            objCalendarioProgresivo.FechaCreacion = Date.Now
            objCalendarioProgresivo.UsuarioActualizacion = Request.Form("user")
            objCalendarioProgresivo.FechaActualizacion = Date.Now

            ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)

            result = SQL_CalendarioProgresivo.InsertCalendarioProgresivo(objCalendarioProgresivo)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla CalendarioProgresivo (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateCalendarioProgresivo()

        Dim objCalendarioProgresivo As New CalendarioProgresivoClass
        Dim SQL_CalendarioProgresivo As New CalendarioProgresivoSQLClass
        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)

        Dim result As String

        objCalendarioProgresivo.Nit_ID = Request.Form("Nit_ID")
        objCalendarioProgresivo.CalendarioProgresivo_ID = Request.Form("ID")
        objCalendarioProgresivo.Descripcion = Request.Form("descripcion")

        objCalendarioProgresivo.Descripcion = Request.Form("descripcion")
        objCalendarioProgresivo.TipoCalendarioProgresivo = Request.Form("TipoCalendarioProgresivo")

        objCalendarioProgresivo.UsuarioActualizacion = Request.Form("user")
        objCalendarioProgresivo.FechaActualizacion = Date.Now

        ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)

        result = SQL_CalendarioProgresivo.UpdateCalendarioProgresivo(objCalendarioProgresivo)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla CalendarioProgresivo (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseCalendarioProgresivo()

        Dim objCalendarioProgresivo As New CalendarioProgresivoClass
        Dim SQL_CalendarioProgresivo As New CalendarioProgresivoSQLClass
        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)

        Dim result As String

        objCalendarioProgresivo.Nit_ID = Request.Form("Nit_ID")
        objCalendarioProgresivo.CalendarioProgresivo_ID = Request.Form("ID")
        ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)

        result = SQL_CalendarioProgresivo.EraseCalendarioProgresivo(objCalendarioProgresivo)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_CalendarioProgresivo As New CalendarioProgresivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_CalendarioProgresivo.ReadCharge_DropList(vl_S_Tabla)
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