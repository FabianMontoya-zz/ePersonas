Imports Newtonsoft.Json

Public Class R_PuertaAcc_AreaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_PACCESO"
                    Cargar_MatrixPAcceso()

                Case "MATRIX_AREA"
                    Cargar_MatrixArea()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_R_PuertaAcc_Area()

                Case "crear"
                    InsertR_PuertaAcc_Area()

                Case "elimina"
                    EraseR_PuertaAcc_Area()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla R_PuertaAcc_Area (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_R_PuertaAcc_Area()

        Dim SQL_R_PuertaAcc_Area As New R_PuertaAcc_AreaSQLClass
        Dim ObjListR_PuertaAcc_Area As New List(Of R_PuertaAcc_AreaClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListR_PuertaAcc_Area = SQL_R_PuertaAcc_Area.Read_AllR_PuertaAcc_Area(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListR_PuertaAcc_Area Is Nothing Then

            Dim objR_PuertaAcc_Area As New R_PuertaAcc_AreaClass
            ObjListR_PuertaAcc_Area = New List(Of R_PuertaAcc_AreaClass)

            objR_PuertaAcc_Area.PuertaAcceso_ID = 0
            objR_PuertaAcc_Area.FechaActualizacion = ""
            objR_PuertaAcc_Area.UsuarioCreacion = ""

            ObjListR_PuertaAcc_Area.Add(objR_PuertaAcc_Area)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListR_PuertaAcc_Area.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla R_PuertaAcc_Area (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertR_PuertaAcc_Area()

        Dim objR_PuertaAcc_Area As New R_PuertaAcc_AreaClass
        Dim SQL_R_PuertaAcc_Area As New R_PuertaAcc_AreaSQLClass
        Dim ObjListR_PuertaAcc_Area As New List(Of R_PuertaAcc_AreaClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objR_PuertaAcc_Area.Nit_ID = Request.Form("Nit_ID")
        objR_PuertaAcc_Area.PuertaAcceso_ID = Request.Form("PAcceso")
        objR_PuertaAcc_Area.Area_ID = Request.Form("Area")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_R_PuertaAcc_Area.Consulta_Repetido(objR_PuertaAcc_Area)

        If vl_s_IDxiste = 0 Then

            objR_PuertaAcc_Area.UsuarioCreacion = Request.Form("user")
            objR_PuertaAcc_Area.FechaCreacion = Date.Now
            objR_PuertaAcc_Area.UsuarioActualizacion = Request.Form("user")
            objR_PuertaAcc_Area.FechaActualizacion = Date.Now

            ObjListR_PuertaAcc_Area.Add(objR_PuertaAcc_Area)

            result = SQL_R_PuertaAcc_Area.InsertR_PuertaAcc_Area(objR_PuertaAcc_Area)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla R_PuertaAcc_Area (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseR_PuertaAcc_Area()

        Dim objR_PuertaAcc_Area As New R_PuertaAcc_AreaClass
        Dim SQL_R_PuertaAcc_Area As New R_PuertaAcc_AreaSQLClass
        Dim ObjListR_PuertaAcc_Area As New List(Of R_PuertaAcc_AreaClass)

        Dim result As String

        objR_PuertaAcc_Area.Nit_ID = Request.Form("Nit_ID")
        objR_PuertaAcc_Area.PuertaAcceso_ID = Request.Form("PAcceso")
        objR_PuertaAcc_Area.Area_ID = Request.Form("Area")
        ObjListR_PuertaAcc_Area.Add(objR_PuertaAcc_Area)

        result = SQL_R_PuertaAcc_Area.EraseR_PuertaAcc_Area(objR_PuertaAcc_Area)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"
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