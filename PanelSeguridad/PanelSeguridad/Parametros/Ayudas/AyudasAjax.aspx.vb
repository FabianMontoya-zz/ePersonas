Imports Newtonsoft.Json

Public Class AyudasAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Ayudas()

                Case "crear"
                    InsertAyudas()

                Case "modificar"
                    UpdateAyudas()

                Case "elimina"
                    EraseAyudas()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Ayudas (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Ayudas()

        Dim SQL_Ayudas As New AyudasSQLClass
        Dim ObjListAyudas As New List(Of AyudasClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListAyudas = SQL_Ayudas.Read_AllAyudas(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListAyudas Is Nothing Then

            Dim objAyudas As New AyudasClass
            ObjListAyudas = New List(Of AyudasClass)

            objAyudas.Descripcion = ""
            objAyudas.FechaActualizacion = ""
            objAyudas.Usuario = ""

            ObjListAyudas.Add(objAyudas)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListAyudas.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Ayudas (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertAyudas()

        Dim objAyudas As New AyudasClass
        Dim SQL_Ayudas As New AyudasSQLClass
        Dim ObjListAyudas As New List(Of AyudasClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objAyudas.Ayudas_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objAyudas.Ayudas_ID)

        If vl_s_IDxiste = 0 Then

            objAyudas.Nombre = Request.Form("nombre")
            objAyudas.Descripcion = Request.Form("descripcion")
            objAyudas.FechaActualizacion = Date.Now
            objAyudas.Usuario = Request.Form("user")

            ObjListAyudas.Add(objAyudas)

            result = SQL_Ayudas.InsertAyudas(objAyudas)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Ayudas (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateAyudas()

        Dim objAyudas As New AyudasClass
        Dim SQL_Ayudas As New AyudasSQLClass
        Dim ObjListAyudas As New List(Of AyudasClass)

        Dim result As String

        objAyudas.Ayudas_ID = Request.Form("ID")
        objAyudas.Nombre = Request.Form("nombre")
        objAyudas.Descripcion = Request.Form("descripcion")
        objAyudas.FechaActualizacion = Date.Now
        objAyudas.Usuario = Request.Form("user")

        ObjListAyudas.Add(objAyudas)

        result = SQL_Ayudas.UpdateAyudas(objAyudas)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Ayudas (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseAyudas()

        Dim objAyudas As New AyudasClass
        Dim SQL_Ayudas As New AyudasSQLClass
        Dim ObjListAyudas As New List(Of AyudasClass)

        Dim result As String

        objAyudas.Ayudas_ID = Request.Form("ID")
        ObjListAyudas.Add(objAyudas)

        result = SQL_Ayudas.EraseAyudas(objAyudas)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Ayudas As New AyudasSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Ayudas.ReadCharge_DropList(vl_S_Tabla)
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

        result = SQL_General.ReadExist("AYUDAS", vp_S_ID, "AY_Codigo_ID", "", "2")
        Return result

    End Function

#End Region

End Class