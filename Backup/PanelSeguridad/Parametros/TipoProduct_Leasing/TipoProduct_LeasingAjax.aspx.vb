Imports Newtonsoft.Json

Public Class TipoProduct_LeasingAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_TP_Leasing()

                Case "crear"
                    InsertTP_Leasing()

                Case "modificar"
                    UpdateTP_Leasing()

                Case "elimina"
                    EraseTP_Leasing()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla TP_Leasing (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_TP_Leasing()

        Dim SQL_TP_Leasing As New TipoProduct_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of TipoProduct_LeasingClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListTP_Leasing = SQL_TP_Leasing.Read_AllTP_Leasing(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListTP_Leasing Is Nothing Then

            Dim objTP_Leasing As New TipoProduct_LeasingClass
            ObjListTP_Leasing = New List(Of TipoProduct_LeasingClass)

            objTP_Leasing.Descripcion = ""
            objTP_Leasing.FechaActualizacion = ""
            objTP_Leasing.Usuario = ""

            ObjListTP_Leasing.Add(objTP_Leasing)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListTP_Leasing.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla TP_Leasing (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertTP_Leasing()

        Dim objTP_Leasing As New TipoProduct_LeasingClass
        Dim SQL_TP_Leasing As New TipoProduct_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of TipoProduct_LeasingClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objTP_Leasing.TP_Leasing_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objTP_Leasing.TP_Leasing_ID)

        If vl_s_IDxiste = 0 Then

            objTP_Leasing.Descripcion = Request.Form("descripcion")
            objTP_Leasing.FechaActualizacion = Date.Now
            objTP_Leasing.Usuario = Request.Form("user")

            ObjListTP_Leasing.Add(objTP_Leasing)

            result = SQL_TP_Leasing.InsertTP_Leasing(objTP_Leasing)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla TP_Leasing (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateTP_Leasing()

        Dim objTP_Leasing As New TipoProduct_LeasingClass
        Dim SQL_TP_Leasing As New TipoProduct_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of TipoProduct_LeasingClass)

        Dim result As String

        objTP_Leasing.TP_Leasing_ID = Request.Form("ID")
        objTP_Leasing.Descripcion = Request.Form("descripcion")
        objTP_Leasing.FechaActualizacion = Date.Now
        objTP_Leasing.Usuario = Request.Form("user")

        ObjListTP_Leasing.Add(objTP_Leasing)

        result = SQL_TP_Leasing.UpdateTP_Leasing(objTP_Leasing)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla TP_Leasing (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseTP_Leasing()

        Dim objTP_Leasing As New TipoProduct_LeasingClass
        Dim SQL_TP_Leasing As New TipoProduct_LeasingSQLClass
        Dim ObjListTP_Leasing As New List(Of TipoProduct_LeasingClass)

        Dim result As String

        objTP_Leasing.TP_Leasing_ID = Request.Form("ID")
        ObjListTP_Leasing.Add(objTP_Leasing)

        result = SQL_TP_Leasing.EraseTP_Leasing(objTP_Leasing)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_TP_Leasing As New TipoProduct_LeasingSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_TP_Leasing.ReadCharge_DropList(vl_S_Tabla)
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

        result = SQL_General.ReadExist("TIPOPRODUCTO_LEASING", vp_S_ID, "TPL_ID", "", "2")
        Return result

    End Function

#End Region

End Class