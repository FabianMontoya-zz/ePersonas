Imports Newtonsoft.Json

Public Class CalendarioAjax
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
                    InsertCalendario()

                Case "modificar"
                    UpdateCalendario()

                Case "elimina"
                    EraseCalendario()

                Case "MatrixCalendarios"
                    CargarCalendarios()

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

        ObjListCalendario = SQL_Calendario.Read_AllCalendario(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)

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
    Protected Sub InsertCalendario()

        Dim objCalendario As New CalendarioClass
        Dim SQL_Calendario As New CalendarioSQLClass

        Dim result, result_CSemana As String
        Dim vl_s_IDxiste As String

        objCalendario.Nit_ID = Request.Form("Nit_ID")
        objCalendario.Calendario_ID = Request.Form("ID")

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
                result_CSemana = Insert_CaledarioSemana()
            End If
        Else
            result = "Existe"
        End If
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' crea metodo de insercion en la tabla CALENDARIO_SEMANAS
    ''' </summary>
    ''' <remarks></remarks>
    Private Function Insert_CaledarioSemana()

        Dim Result_list As String = ""
        Dim vl_S_list As String = Request.Form("List_Semana").ToString

        Dim vl_L_DaysList = JsonConvert.DeserializeObject(Of List(Of CalendarioSemanaClass))(vl_S_list)

        For Each item As CalendarioSemanaClass In vl_L_DaysList

            Dim objCalendarioSemana As New CalendarioSemanaClass
            Dim SQL As New CalendarioSemanaSQLClass

            objCalendarioSemana.Nit_ID = Request.Form("Nit_ID")
            objCalendarioSemana.Calendario_ID = Request.Form("ID")
            ''
            objCalendarioSemana.Dia = item.Dia
            objCalendarioSemana.IndicativoFestivo = item.IndicativoFestivo
            objCalendarioSemana.HoraInicial = item.HoraInicial
            objCalendarioSemana.HoraFinal = item.HoraFinal
            ''
            objCalendarioSemana.UsuarioCreacion = Request.Form("user")
            objCalendarioSemana.FechaCreacion = Date.Now
            objCalendarioSemana.UsuarioActualizacion = Request.Form("user")
            objCalendarioSemana.FechaActualizacion = Date.Now
            ''
            Dim Result As String = SQL.Insert_C_Semana(objCalendarioSemana)

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

        Dim objCalendarioSemana As New CalendarioSemanaClass
        Dim SQL_CalendarioSemana As New CalendarioSemanaSQLClass

        Dim result As String

        objCalendarioSemana.Nit_ID = Request.Form("Nit_ID")
        objCalendarioSemana.Calendario_ID = Request.Form("ID")

        result = SQL_CalendarioSemana.Delete_C_Semana(objCalendarioSemana)

        If result.Equals("Exito") Then
            objCalendario.Nit_ID = Request.Form("Nit_ID")
            objCalendario.Calendario_ID = Request.Form("ID")

            objCalendario.Descripcion = Request.Form("descripcion")
            objCalendario.TipoCalendario = Request.Form("TipoCalendario")

            objCalendario.UsuarioActualizacion = Request.Form("user")
            objCalendario.FechaActualizacion = Date.Now
            result = SQL_Calendario.UpdateCalendario(objCalendario)

            If result = "Exito" Then
                Insert_CaledarioSemana()
            End If

        End If
        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Calendario (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseCalendario()

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

        ObjListDroplist = SQL_Calendario.ReadCharge_DropList(vl_S_Tabla)
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
        Dim obj As New ClienteClass
        obj.Nit_ID = Request.Form("Nit")
        obj.TipoSQL = "Calendar"

        ObjListDroplist = SQL.Read_Matrix_Calendarios(obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"
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