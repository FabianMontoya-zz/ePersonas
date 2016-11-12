Imports Newtonsoft.Json

Public Class C_AccesoPreAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

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

                Case "consulta"
                    Consulta_C_AccesoPre()

                Case "crear"
                    InsertC_AccesoPre()

                Case "modificar"
                    UpdateC_AccesoPre()

                Case "elimina"
                    EraseC_AccesoPre()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla R_PuertaAcc_Area (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_C_AccesoPre()

        Dim SQL As New C_AccesoPreSQLClass
        Dim ObjList As New List(Of C_AccesoPreClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL.Read_AllC_AccesoPre(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjList Is Nothing Then

            Dim objR_PuertaAcc_Area As New C_AccesoPreClass
            ObjList = New List(Of C_AccesoPreClass)

            objR_PuertaAcc_Area.PuertaAcceso_ID = 0
            objR_PuertaAcc_Area.FechaActualizacion = ""
            objR_PuertaAcc_Area.UsuarioCreacion = ""

            ObjList.Add(objR_PuertaAcc_Area)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

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
        objC_AccesoPre.Nit_ID_EmpVisita = Request.Form("Nit_Ing_ID")
        objC_AccesoPre.PuertaAcceso_ID = Request.Form("PuertaAcceso_ID")
        objC_AccesoPre.Area_ID = Request.Form("AreaAcceso_ID")
        objC_AccesoPre.TypeDocument_ID_Per_Encargada = Request.Form("TDoc_Enc")
        objC_AccesoPre.Document_ID_Per_Encargada = Request.Form("Doc_Enc")
      
        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_AccesoPre.Consulta_Repetido(objC_AccesoPre)

        If vl_s_IDxiste = 0 Then

            objC_AccesoPre.FechaInicio_Vigencia = Request.Form("FI")
            objC_AccesoPre.HoraInicio = Request.Form("HI")
            objC_AccesoPre.ControlVigencia = Request.Form("CheckVigencia")
            objC_AccesoPre.FechaFin_Vigencia = Request.Form("FF")
            objC_AccesoPre.HoraFin = Request.Form("HF")
            objC_AccesoPre.TipoIngreso = Request.Form("TypeIngreso")
            objC_AccesoPre.Estado = 1

            objC_AccesoPre.UsuarioCreacion = Request.Form("user")
            objC_AccesoPre.FechaCreacion = Date.Now
            objC_AccesoPre.UsuarioActualizacion = Request.Form("user")
            objC_AccesoPre.FechaActualizacion = Date.Now

            ObjListC_AccesoPre.Add(objC_AccesoPre)

            result = SQL_C_AccesoPre.InsertC_AccesoPre(objC_AccesoPre)
            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla C_AccesoPre (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateC_AccesoPre()

        Dim objC_AccesoPre As New C_AccesoPreClass
        Dim SQL_C_AccesoPre As New C_AccesoPreSQLClass
        Dim ObjListC_AccesoPre As New List(Of C_AccesoPreClass)

        Dim result As String
        objC_AccesoPre.Nit_ID = Request.Form("Nit_ID")
        objC_AccesoPre.TypeDocument_ID = Request.Form("TDoc")
        objC_AccesoPre.Document_ID = Request.Form("Doc")
        objC_AccesoPre.Tarjeta_ID = Request.Form("Tarjeta")
        objC_AccesoPre.Nit_ID_EmpVisita = Request.Form("Nit_Ing_ID")
        objC_AccesoPre.PuertaAcceso_ID = Request.Form("PuertaAcceso_ID")
        objC_AccesoPre.Area_ID = Request.Form("AreaAcceso_ID")
        objC_AccesoPre.TypeDocument_ID_Per_Encargada = Request.Form("TDoc_Enc")
        objC_AccesoPre.Document_ID_Per_Encargada = Request.Form("Doc_Enc")
        objC_AccesoPre.FechaInicio_Vigencia = Request.Form("FI")
        objC_AccesoPre.HoraInicio = Request.Form("HI")

        objC_AccesoPre.ControlVigencia = Request.Form("CheckVigencia")
        objC_AccesoPre.FechaFin_Vigencia = Request.Form("FF")
        objC_AccesoPre.HoraFin = Request.Form("HF")
        objC_AccesoPre.TipoIngreso = Request.Form("TypeIngreso")
        objC_AccesoPre.Estado = 1

        objC_AccesoPre.UsuarioActualizacion = Request.Form("user")
        objC_AccesoPre.FechaActualizacion = Date.Now

        ObjListC_AccesoPre.Add(objC_AccesoPre)

        result = SQL_C_AccesoPre.UpdateC_AccesoPre(objC_AccesoPre)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla C_AccesoPre (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseC_AccesoPre()

        Dim objC_AccesoPre As New C_AccesoPreClass
        Dim SQL_C_AccesoPre As New C_AccesoPreSQLClass
        Dim ObjListC_AccesoPre As New List(Of C_AccesoPreClass)

        Dim result As String

        objC_AccesoPre.Nit_ID = Request.Form("Nit_ID")
        objC_AccesoPre.TypeDocument_ID = Request.Form("TDoc")
        objC_AccesoPre.Document_ID = Request.Form("Doc")
        objC_AccesoPre.Tarjeta_ID = Request.Form("Tarjeta")
        objC_AccesoPre.Nit_ID_EmpVisita = Request.Form("Nit_Ing_ID")
        objC_AccesoPre.PuertaAcceso_ID = Request.Form("PuertaAcceso_ID")
        objC_AccesoPre.Area_ID = Request.Form("AreaAcceso_ID")
        objC_AccesoPre.TypeDocument_ID_Per_Encargada = Request.Form("TDoc_Enc")
        objC_AccesoPre.Document_ID_Per_Encargada = Request.Form("Doc_Enc")

        objC_AccesoPre.Estado = 2

        objC_AccesoPre.UsuarioEliminacion = Request.Form("user")
        objC_AccesoPre.FechaEliminacion = Date.Now

        result = SQL_C_AccesoPre.EraseC_AccesoPre(objC_AccesoPre)

        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_R_PuertaAcc_Area As New R_PuertaAcc_AreaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_R_PuertaAcc_Area.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

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