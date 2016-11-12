Imports Newtonsoft.Json

Public Class MensajesAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Mensajes()

                Case "crear"
                    InsertMensajes()

                Case "modificar"
                    UpdateMensajes()

                Case "elimina"
                    EraseMensajes()
            End Select

        End If
    End Sub


#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Mensajes (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Mensajes()

        Dim SQL_Mensajes As New MensajesSQLClass
        Dim ObjListMensajes As New List(Of MensajesClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListMensajes = SQL_Mensajes.Read_AllMensajes(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListMensajes Is Nothing Then

            Dim objMensajes As New MensajesClass
            ObjListMensajes = New List(Of MensajesClass)

            objMensajes.Descripcion = ""
            objMensajes.FechaActualizacion = ""
            objMensajes.Usuario = ""

            ObjListMensajes.Add(objMensajes)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListMensajes.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Mensajes (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertMensajes()

        Dim objMensajes As New MensajesClass
        Dim SQL_Mensajes As New MensajesSQLClass
        Dim ObjListMensajes As New List(Of MensajesClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objMensajes.Mensajes_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objMensajes.Mensajes_ID)

        If vl_s_IDxiste = 0 Then

            objMensajes.Nombre = Request.Form("nombre")
            objMensajes.Descripcion = Request.Form("descripcion")
            objMensajes.FechaActualizacion = Date.Now
            objMensajes.Usuario = Request.Form("user")

            ObjListMensajes.Add(objMensajes)

            result = SQL_Mensajes.InsertMensajes(objMensajes)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Mensajes (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateMensajes()

        Dim objMensajes As New MensajesClass
        Dim SQL_Mensajes As New MensajesSQLClass
        Dim ObjListMensajes As New List(Of MensajesClass)

        Dim result As String

        objMensajes.Mensajes_ID = Request.Form("ID")
        objMensajes.Nombre = Request.Form("nombre")
        objMensajes.Descripcion = Request.Form("descripcion")
        objMensajes.FechaActualizacion = Date.Now
        objMensajes.Usuario = Request.Form("user")

        ObjListMensajes.Add(objMensajes)

        result = SQL_Mensajes.UpdateMensajes(objMensajes)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Mensajes (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseMensajes()

        Dim objMensajes As New MensajesClass
        Dim SQL_Mensajes As New MensajesSQLClass
        Dim ObjListMensajes As New List(Of MensajesClass)

        Dim result As String

        objMensajes.Mensajes_ID = Request.Form("ID")
        ObjListMensajes.Add(objMensajes)

        result = SQL_Mensajes.EraseMensajes(objMensajes)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Mensajes As New MensajesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Mensajes.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' funcion que valida si el id esta en la BD
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function Consulta_Repetido(ByVal vp_S_ID As String)

        Dim SQL_General As New GeneralSQLClass
        Dim result As String

        result = SQL_General.ReadExist("MENSAJES", vp_S_ID, "M_Codigo_ID", "", "2")
        Return result

    End Function

#End Region
End Class