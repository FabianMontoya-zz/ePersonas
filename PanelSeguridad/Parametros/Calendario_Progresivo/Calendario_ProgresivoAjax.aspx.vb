Imports Newtonsoft.Json

Public Class Calendario_ProgresivoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_Calendario()

                Case "crear"
                    InsertCalendarioProgresivo()

                Case "modificar"
                    UpdateCalendario()

                Case "elimina"
                    EraseFullCalendario()

                Case "MatrixCalendarios"
                    CargarCalendarios()

                Case "MatrizFestivos"
                    CargarFestivos()

                Case "MatrizDiasSemana"
                    CargarMatrizDiasSemana()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Calendario (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Calendario()

        Dim SQL_Calendario As New CalendarioSQLClass
        Dim ObjListCalendario As New List(Of CalendarioClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")
        Dim vl_S_TipoCalendario As String = Request.Form("TipoCalendario")

        ObjListCalendario = SQL_Calendario.Read_AllCalendario(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User, vl_S_TipoCalendario)

        If ObjListCalendario Is Nothing Then

            Dim objCalendario As New CalendarioClass
            ObjListCalendario = New List(Of CalendarioClass)

            objCalendario.Descripcion = ""
            objCalendario.FechaActualizacion = ""
            objCalendario.UsuarioCreacion = ""

            ObjListCalendario.Add(objCalendario)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListCalendario.ToArray()))

    End Sub


    ''' <summary>
    ''' funcion que inserta en la tabla Calendario (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCalendarioProgresivo()

        Dim objCalendario As New CalendarioClass
        Dim SQL_Calendario As New CalendarioSQLClass

        Dim result, result_HCalendario As String
        Dim vl_s_IDxiste As String

        objCalendario.Nit_ID = Request.Form("Nit_ID")
        objCalendario.Calendario_ID = Request.Form("ID_Calendario")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Calendario.Consulta_Repetido(objCalendario)

        If vl_s_IDxiste = 0 Then
            objCalendario.Descripcion = Request.Form("Descripcion")
            objCalendario.TipoCalendario = Request.Form("TipoCalendario")
            objCalendario.UsuarioCreacion = Request.Form("user")
            objCalendario.FechaCreacion = Date.Now
            objCalendario.UsuarioActualizacion = Request.Form("user")
            objCalendario.FechaActualizacion = Date.Now
            result = SQL_Calendario.InsertCalendario(objCalendario)
            If result = "Exito" Then
                result_HCalendario = Insert_HorariosCalendario()
                If result_HCalendario = "Exito" Then
                    result = "Exito"
                Else
                    EraseFullCalendario()
                    result = "Error"
                End If
            End If
        Else
            result = "Existe"
        End If
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' Función encargada de la inserción de los horarios del calendario progresivo
    ''' </summary>
    ''' <remarks></remarks>
    Private Function Insert_HorariosCalendario()

        Dim Result_list As String = ""
        Dim vl_S_list As String = Request.Form("ListH_Calendario").ToString

        Dim vl_L_DaysList = JsonConvert.DeserializeObject(Of List(Of Calendario_ProgresivoClass))(vl_S_list)

        For Each item As Calendario_ProgresivoClass In vl_L_DaysList

            Dim objCalendarioHSemana As New Calendario_ProgresivoClass
            Dim SQL As New Calendario_ProgresivoSQLClass

            objCalendarioHSemana.Nit_ID = Request.Form("Nit_ID")
            objCalendarioHSemana.Calendario_ID = Request.Form("ID_Calendario")
            objCalendarioHSemana.Calendario_Base_ID = Request.Form("ID_Calendario_Base")
            ''
            objCalendarioHSemana.Fecha = item.Fecha
            objCalendarioHSemana.HoraIni = item.HoraIni
            objCalendarioHSemana.HoraFin = item.HoraFin
            ''
            objCalendarioHSemana.UsuarioCreacion = Request.Form("user")
            objCalendarioHSemana.FechaCreacion = Date.Now
            objCalendarioHSemana.UsuarioActualizacion = Request.Form("user")
            objCalendarioHSemana.FechaActualizacion = Date.Now
            ''
            Dim Result As String = SQL.InsertH_Calendario(objCalendarioHSemana)

            If Result = "Exito" Then
                Result_list = "Exito"
            Else
                Result_list = "Error"
                Exit For
            End If
        Next

        Return Result_list
    End Function




    ''' <summary>
    ''' funcion que actualiza en la tabla Calendario (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateCalendario()

        Dim objCalendario As New CalendarioClass
        Dim SQL_Calendario As New CalendarioSQLClass

        Dim objCalendarioSemana As New Calendario_ProgresivoClass
        Dim SQL_CalendarioSemana As New Calendario_ProgresivoSQLClass

        Dim result As String

        objCalendarioSemana.Nit_ID = Request.Form("Nit_ID")
        objCalendarioSemana.Calendario_ID = Request.Form("ID")

        result = SQL_CalendarioSemana.EraseH_Calendario(objCalendarioSemana)

        If result.Equals("Exito") Then
            objCalendario.Nit_ID = Request.Form("Nit_ID")
            objCalendario.Calendario_ID = Request.Form("ID")

            objCalendario.Descripcion = Request.Form("descripcion")
            objCalendario.TipoCalendario = Request.Form("TipoCalendario")

            objCalendario.UsuarioActualizacion = Request.Form("user")
            objCalendario.FechaActualizacion = Date.Now


            If result = "Exito" Then
                Insert_HorariosCalendario()
            End If

        End If
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Calendario (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseFullCalendario()

        Dim objCalendario As New CalendarioClass
        Dim SQL_Calendario As New CalendarioSQLClass

        Dim result As String

        objCalendario.Nit_ID = Request.Form("Nit_ID")
        objCalendario.Calendario_ID = Request.Form("ID")
        objCalendario.TipoCalendario = Request.Form("TipoCalendario")

        result = SQL_Calendario.EraseCalendario(objCalendario)

        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Calendario As New CalendarioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

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

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarFestivos()

        Dim SQL As New FestivosSQLClass
        Dim ObjListDroplist As New List(Of FestivosClass)
        Dim obj As New FestivosClass

        ObjListDroplist = SQL.Read_All_Festivos
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"
    ''' <summary>
    ''' Función que se encarga de traer el horario que se ha asignado a un calendario normal
    ''' </summary>
    Protected Sub CargarMatrizDiasSemana()
        Dim SQL As New CalendarioSemanaSQLClass
        Dim ObjListDroplist As New List(Of CalendarioSemanaClass)
        Dim obj As New CalendarioSemanaClass
        obj.Nit_ID = Request.Form("Nit_ID")
        obj.Calendario_ID = Request.Form("ID_Calendario")

        ObjListDroplist = SQL.Consult_AllHorarioDias(obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))
    End Sub
#End Region

End Class