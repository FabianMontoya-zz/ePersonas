Imports Newtonsoft.Json

Public Class AccesoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_PERSONAS"
                    CargarM_Personas()

                Case "MATIRXDOC_WORK"
                    Carga_Matrix_DocWork()

                Case "MATRIX_PERSONAS_DOC"
                    Carga_Matrix_Personas_Doc()

                Case "MATRIX_ACCESOPREDETER"
                    Cargar_Matrix_AccesoPredeterminado()

                Case "MATRIX_PACCESO"
                    Cargar_MatrixPAcceso()

                Case "MATRIX_AREA"
                    Cargar_MatrixArea()

                Case "MATRIX_PERSONA"
                    CargarMPersonaDep()

                Case "MATRIX_PACCESO_AREA"
                    CargarMPAccesos_Area()


                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "Documento"
                    CargarDocumento()

                Case "consulta"
                    Consulta_Acceso()

                Case "crear"
                    InsertAcceso()

                Case "elimina"
                    EraseAcceso()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Acceso (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Acceso()

        Dim SQL_Acceso As New AccesoSQLClass
        Dim ObjListAcceso As New List(Of AccesoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListAcceso = SQL_Acceso.Read_AllAcceso(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListAcceso Is Nothing Then

            Dim objAcceso As New AccesoClass
            ObjListAcceso = New List(Of AccesoClass)

            objAcceso.PuertaAcceso_ID = 0
            objAcceso.FechaActualizacion = ""
            objAcceso.UsuarioCreacion = ""

            ObjListAcceso.Add(objAcceso)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListAcceso.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Acceso (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertAcceso()

        Dim objAcceso As New AccesoClass
        Dim SQL_Acceso As New AccesoSQLClass
        Dim ObjListAcceso As New List(Of AccesoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objAcceso.Nit_ID = Request.Form("Nit_ID")
        objAcceso.PuertaAcceso_ID = Request.Form("PAcceso")
        objAcceso.Area_ID = Request.Form("Area")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Acceso.Consulta_Repetido(objAcceso)

        If vl_s_IDxiste = 0 Then

            objAcceso.UsuarioCreacion = Request.Form("user")
            objAcceso.FechaCreacion = Date.Now
            objAcceso.UsuarioActualizacion = Request.Form("user")
            objAcceso.FechaActualizacion = Date.Now

            ObjListAcceso.Add(objAcceso)

            result = SQL_Acceso.InsertAcceso(objAcceso)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Acceso (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseAcceso()

        Dim objAcceso As New AccesoClass
        Dim SQL_Acceso As New AccesoSQLClass
        Dim ObjListAcceso As New List(Of AccesoClass)

        Dim result As String

        objAcceso.Nit_ID = Request.Form("Nit_ID")
        objAcceso.PuertaAcceso_ID = Request.Form("PAcceso")
        objAcceso.Area_ID = Request.Form("Area")
        ObjListAcceso.Add(objAcceso)

        result = SQL_Acceso.EraseAcceso(objAcceso)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarM_Personas()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)

        ObjList = SQL.Matrix_DatosPagAcceso()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

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
    ''' cara la matriz de documento para trabajo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Matrix_DocWork()

        Dim SQL As New DocumentosSQLClass
        Dim ObjList As New List(Of DocumentosClass)

        ObjList = SQL.MatrixDocumentWork()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' cara la matriz de documento para trabajo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Matrix_Personas_Doc()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of DocumentosClass)

        ObjList = SQL.Matrix_Personas_Documentos()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_Matrix_AccesoPredeterminado()

        Dim SQL As New C_AccesoPreSQLClass
        Dim ObjList As New List(Of C_AccesoPreClass)

        ObjList = SQL.Matrix_TAccesoPreddeterminado()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixArea()

        Dim SQL As New AreaSQLClass
        Dim ObjList As New List(Of AreaClass)

        ObjList = SQL.Read_Matrix_Area()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixPAcceso()

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
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Acceso As New AccesoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Acceso.ReadCharge_DropList(vl_S_Tabla)
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

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDocumento()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListDocumento(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class