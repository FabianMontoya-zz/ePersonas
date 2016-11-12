Imports Newtonsoft.Json

Public Class MonedaCodAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_MonedaCod()

                Case "crear"
                    InsertMonedaCod()

                Case "modificar"
                    UpdateMonedaCod()

                Case "elimina"
                    EraseMonedaCod()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla MonedaCod (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_MonedaCod()

        Dim SQL_MonedaCod As New MonedaCodSQLClass
        Dim ObjListMonedaCod As New List(Of MonedaCodClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListMonedaCod = SQL_MonedaCod.Read_AllMonedaCod(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListMonedaCod Is Nothing Then

            Dim objMonedaCod As New MonedaCodClass
            ObjListMonedaCod = New List(Of MonedaCodClass)

            objMonedaCod.Descripcion = ""
            objMonedaCod.FechaActualizacion = ""

            ObjListMonedaCod.Add(objMonedaCod)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListMonedaCod.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla MonedaCod (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertMonedaCod()

        Dim objMonedaCod As New MonedaCodClass
        Dim SQL_MonedaCod As New MonedaCodSQLClass
        Dim ObjListMonedaCod As New List(Of MonedaCodClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objMonedaCod.MonedaCod_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objMonedaCod.MonedaCod_ID)

        If vl_s_IDxiste = 0 Then

            objMonedaCod.Descripcion = Request.Form("descripcion")
            objMonedaCod.Sigla = Request.Form("sigla")
            objMonedaCod.UsuarioCreacion = Request.Form("user")
            objMonedaCod.FechaCreacion = Date.Now
            objMonedaCod.UsuarioActualizacion = Request.Form("user")
            objMonedaCod.FechaActualizacion = Date.Now

            ObjListMonedaCod.Add(objMonedaCod)

            result = SQL_MonedaCod.InsertMonedaCod(objMonedaCod)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla MonedaCod (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateMonedaCod()

        Dim objMonedaCod As New MonedaCodClass
        Dim SQL_MonedaCod As New MonedaCodSQLClass
        Dim ObjListMonedaCod As New List(Of MonedaCodClass)

        Dim result As String

        objMonedaCod.MonedaCod_ID = Request.Form("ID")
        objMonedaCod.Descripcion = Request.Form("descripcion")

        objMonedaCod.Sigla = Request.Form("sigla")
         objMonedaCod.UsuarioActualizacion = Request.Form("user")
        objMonedaCod.FechaActualizacion = Date.Now

        ObjListMonedaCod.Add(objMonedaCod)

        result = SQL_MonedaCod.UpdateMonedaCod(objMonedaCod)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla MonedaCod (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseMonedaCod()

        Dim objMonedaCod As New MonedaCodClass
        Dim SQL_MonedaCod As New MonedaCodSQLClass
        Dim ObjListMonedaCod As New List(Of MonedaCodClass)

        Dim result As String

        objMonedaCod.MonedaCod_ID = Request.Form("ID")
        ObjListMonedaCod.Add(objMonedaCod)

        result = SQL_MonedaCod.EraseMonedaCod(objMonedaCod)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_MonedaCod As New MonedaCodSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_MonedaCod.ReadCharge_DropList(vl_S_Tabla)
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

        result = SQL_General.ReadExist("MONEDA_COD", vp_S_ID, "CM_Cod_Moneda_ID", "", "2")
        Return result

    End Function

#End Region

End Class