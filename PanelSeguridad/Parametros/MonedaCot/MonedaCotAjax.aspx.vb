Imports Newtonsoft.Json

Public Class MonedaCotAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Moneda"
                    CargarMoneda()

                Case "consulta"
                    Consulta_MonedaCot()

                Case "crear"
                    InsertMonedaCot()

                Case "modificar"
                    UpdateMonedaCot()

                Case "elimina"
                    EraseMonedaCot()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla MonedaCot (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_MonedaCot()

        Dim SQL_MonedaCot As New MonedaCotSQLClass
        Dim ObjListMonedaCot As New List(Of MonedaCotClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListMonedaCot = SQL_MonedaCot.Read_AllMonedaCot(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListMonedaCot Is Nothing Then

            Dim objMonedaCot As New MonedaCotClass
            ObjListMonedaCot = New List(Of MonedaCotClass)

            objMonedaCot.FechaActualizacion = ""

            ObjListMonedaCot.Add(objMonedaCot)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListMonedaCot.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla MonedaCot (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertMonedaCot()

        Dim objMonedaCot As New MonedaCotClass
        Dim SQL_MonedaCot As New MonedaCotSQLClass
        Dim ObjListMonedaCot As New List(Of MonedaCotClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objMonedaCot.MonedaCot_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objMonedaCot.MonedaCot_ID)

        If vl_s_IDxiste = 0 Then

            objMonedaCot.Fecha = Request.Form("Fecha")
            objMonedaCot.ValorCotizacion = Request.Form("Valor")
            objMonedaCot.UsuarioCreacion = Request.Form("user")
            objMonedaCot.FechaCreacion = Date.Now
            objMonedaCot.UsuarioActualizacion = Request.Form("user")
            objMonedaCot.FechaActualizacion = Date.Now

            ObjListMonedaCot.Add(objMonedaCot)

            result = SQL_MonedaCot.InsertMonedaCot(objMonedaCot)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla MonedaCot (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateMonedaCot()

        Dim objMonedaCot As New MonedaCotClass
        Dim SQL_MonedaCot As New MonedaCotSQLClass
        Dim ObjListMonedaCot As New List(Of MonedaCotClass)

        Dim result As String

        objMonedaCot.MonedaCot_ID = Request.Form("ID")
        objMonedaCot.Fecha = Request.Form("Fecha")
        objMonedaCot.ValorCotizacion = Request.Form("Valor")
        objMonedaCot.UsuarioActualizacion = Request.Form("user")
        objMonedaCot.FechaActualizacion = Date.Now

        ObjListMonedaCot.Add(objMonedaCot)

        result = SQL_MonedaCot.UpdateMonedaCot(objMonedaCot)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla MonedaCot (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseMonedaCot()

        Dim objMonedaCot As New MonedaCotClass
        Dim SQL_MonedaCot As New MonedaCotSQLClass
        Dim ObjListMonedaCot As New List(Of MonedaCotClass)

        Dim result As String

        objMonedaCot.MonedaCot_ID = Request.Form("ID")
        ObjListMonedaCot.Add(objMonedaCot)

        result = SQL_MonedaCot.EraseMonedaCot(objMonedaCot)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_MonedaCot As New MonedaCotSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_MonedaCot.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMoneda()

        Dim SQL As New MonedaCotSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Index As String = Request.Form("Index")

        ObjListDroplist = SQL.Charge_DropListMoneda(vl_S_Index)
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

        result = SQL_General.ReadExist("MONEDA_COTIZA", vp_S_ID, "COTM_Cod_Moneda_ID", "", "2")
        Return result

    End Function

#End Region

End Class