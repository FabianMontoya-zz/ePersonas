Imports Newtonsoft.Json

Public Class FestivosAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Festivos()

                Case "Cliente"
                    CargarCliente()

                Case "MatrixCalendarios"
                    CargarCalendarios()

                Case "crear"
                    InsertFestivos()

                Case "elimina"
                    EraseFestivos()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Festivos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Festivos()

        Dim SQL_Festivos As New FestivosSQLClass
        Dim ObjListFestivos As New List(Of FestivosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_ID As String = Request.Form("Nit_User")

        ObjListFestivos = SQL_Festivos.Read_AllFestivos(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_ID)

        If ObjListFestivos Is Nothing Then

            Dim objFestivos As New FestivosClass
            ObjListFestivos = New List(Of FestivosClass)

            objFestivos.Year = 0
            objFestivos.Mes_Dia = 0
            objFestivos.UsuarioCreacion = ""

            ObjListFestivos.Add(objFestivos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListFestivos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Festivos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertFestivos()

        Dim objFestivos As New FestivosClass
        Dim SQL_Festivos As New FestivosSQLClass

        Dim result As String
        Dim vl_s_IDxiste As String

        objFestivos.Nit_ID = Request.Form("Nit_ID")
        objFestivos.Calendario_ID = Request.Form("Calendario_ID")
        objFestivos.Year = Request.Form("Year")
        objFestivos.Mes_Dia = Request.Form("mes_dia")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objFestivos)

        If vl_s_IDxiste = 0 Then

            objFestivos.FechaCreacion = Date.Now
            objFestivos.UsuarioCreacion = Request.Form("user")

            result = SQL_Festivos.InsertFestivos(objFestivos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Festivos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseFestivos()

        Dim objFestivos As New FestivosClass
        Dim SQL_Festivos As New FestivosSQLClass

        Dim result As String

        objFestivos.Nit_ID = Request.Form("Nit_ID")
        objFestivos.Calendario_ID = Request.Form("Calendario_ID")
        objFestivos.Year = Request.Form("Year")
        objFestivos.Mes_Dia = Request.Form("Mes_Dia")

        result = SQL_Festivos.EraseFestivos(objFestivos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Festivos As New FestivosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Festivos.ReadCharge_DropList(vl_S_Tabla)
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
    Protected Sub CargarCalendarios()

        Dim SQL As New CalendarioSQLClass
        Dim ObjListDroplist As New List(Of CalendarioClass)
        Dim obj As New CalendarioClass

        obj.Nit_ID = Request.Form("Nit")

        ObjListDroplist = SQL.Read_Matrix_Calendarios_NIT(obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub
#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' Validamos si ya existe en la BD
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    Protected Function Consulta_Repetido(ByVal vp_O_Obj As FestivosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM FESTIVOS " &
                       " WHERE F_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" &
                       " AND F_Calendario_ID = '" & vp_O_Obj.Calendario_ID & "'" &
                       " AND F_Año = '" & vp_O_Obj.Year & "'" &
                       " AND F_Mes_Dia = '" & vp_O_Obj.Mes_Dia & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result

    End Function

#End Region


End Class