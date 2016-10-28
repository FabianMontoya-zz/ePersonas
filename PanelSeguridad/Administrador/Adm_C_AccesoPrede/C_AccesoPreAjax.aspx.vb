Imports Newtonsoft.Json

Public Class C_AccesoPreAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_TARJETA"
                    Cargar_MatrixTarjeta()

                Case "MATRIX_PERSONA"
                    CargarMPersonaDep()

                Case "MATRIX_RTP"
                    CargarMRTP()

                Case "MATRIX_PACCESOS"
                    CargarMPAccesos()

                Case "MATRIX_PACCESO_AREA"
                    CargarMPAccesos_Area()

                Case "Cliente"
                    CargarCliente()

                Case "Tipo_Ing"
                    CargarTipo_Ingreso()

                Case "crear"
                    InsertC_AccesoPre()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla C_AccesoPre (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_AccesoPre()

        Dim objC_AccesoPre As New C_AccesoPreClass
        Dim SQL_C_AccesoPre As New C_AccesoPreSQLClass
        Dim ObjListC_AccesoPre As New List(Of C_AccesoPreClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_AccesoPre.Nit_ID = Request.Form("Nit_ID")
        objC_AccesoPre.TypeDocument_ID = Request.Form("TDoc")
        objC_AccesoPre.Document_ID = Request.Form("Doc")
        objC_AccesoPre.Tarjeta_ID = Request.Form("Tarjeta")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_AccesoPre.Consulta_Repetido(objC_AccesoPre)

        If vl_s_IDxiste = 0 Then

            objC_AccesoPre.UsuarioCreacion = Request.Form("user")
            objC_AccesoPre.FechaCreacion = Date.Now
            objC_AccesoPre.UsuarioActualizacion = Request.Form("user")
            objC_AccesoPre.FechaActualizacion = Date.Now

            ObjListC_AccesoPre.Add(objC_AccesoPre)

            result = SQL_C_AccesoPre.InsertC_AccesoPre(objC_AccesoPre)

            'ACTUALIZAMOS NIVENTARIO DE TARJETA
            Dim SQLInvPuerta As New InvPuertaSQLClass
            Dim ObjListInvPuerta As New List(Of InvPuertaClass)
            Dim ObjInvPuerta As New InvPuertaClass

            ObjInvPuerta.Nit_ID = Request.Form("Nit_ID")
            ObjInvPuerta.Tarjeta_ID = Request.Form("Tarjeta")
            ObjInvPuerta.Estado = 1

            ObjInvPuerta.Nit_ID_Asigna = Request.Form("Nit_ID")
            ObjInvPuerta.TypeDocument_ID_Asigna = Request.Form("TDoc")
            ObjInvPuerta.Document_ID_Asigna = Request.Form("Doc")
            ObjInvPuerta.FechaAsignacion = Date.Now

            ObjInvPuerta.UsuarioActualizacion = Request.Form("user")
            ObjInvPuerta.FechaActualizacion = Date.Now

            ObjListInvPuerta.Add(ObjInvPuerta)

            result = SQLInvPuerta.UpdateAsignacionTarjeta(ObjInvPuerta)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga  Matrix PERSONAS 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMPersonaDep()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)

        ObjList = SQL.Matrix_PersonasDep()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixTarjeta()

        Dim SQL As New InvPuertaSQLClass
        Dim ObjList As New List(Of InvPuertaClass)

        ObjList = SQL.MatrixTarjeta()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMRTP()

        Dim SQL As New C_AccesoPreSQLClass
        Dim ObjList As New List(Of C_AccesoPreClass)

        ObjList = SQL.Matrix_RTP()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMPAccesos()

        Dim SQL As New PuertaAccesoSQLClass
        Dim ObjList As New List(Of PuertaAccesoClass)

        ObjList = SQL.Matrix_PuertaAcceso()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMPAccesos_Area()

        Dim SQL As New R_PuertaAcc_AreaSQLClass
        Dim ObjList As New List(Of R_PuertaAcc_AreaClass)

        ObjList = SQL.Matrix_R_PuertaAcceso_Area()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

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
    Protected Sub CargarTipo_Ingreso()

        Dim SQL As New C_AccesoPreSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTipo_Ingreso()
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class