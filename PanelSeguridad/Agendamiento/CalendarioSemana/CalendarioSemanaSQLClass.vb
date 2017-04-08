Imports System.Data.SqlClient
Imports System.Data.OleDb
Imports Newtonsoft.Json

Public Class CalendarioSemanaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo CALENDARIO_SEMANAS (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert_C_Semana(ByVal vp_Obj As CalendarioSemanaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("INSERT CALENDARIO_SEMANAS (" &
            "CAS_Nit_ID," &
            "CAS_Calendario_ID," &
            "CAS_Dia," &
            "CAS_IndicativoFestivo," &
            "CAS_HoraInicial," &
            "CAS_HoraFinal," &
            "CAS_Usuario_Creacion," &
            "CAS_FechaCreacion," &
            "CAS_Usuario_Actualizacion," &
            "CAS_FechaActualizacion" &
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj.Dia & "',")
        sql.AppendLine("'" & vp_Obj.IndicativoFestivo & "',")
        sql.AppendLine("'" & vp_Obj.HoraInicial & "',")
        sql.AppendLine("'" & vp_Obj.HoraFinal & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        Dim StrQuery As String = sql.ToString()
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' Función que elimina los calendarios en Calendario Semanas
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    Public Function Delete_C_Semana(ByVal vp_Obj As CalendarioSemanaClass)
        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        sql.AppendLine("DELETE FROM CALENDARIO_SEMANAS " &
            " WHERE CAS_Nit_ID = '" & vp_Obj.Nit_ID & "'" &
            " AND CAS_Calendario_ID = '" & vp_Obj.Calendario_ID & "'")

        Dim StrQuery As String = sql.ToString()

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result
    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' Función que genera las listas resultantes de las consultas efectuadas segun el CASE que se requiera
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <param name="vp_S_TypeList"></param>
    ''' <returns></returns>
    Public Function listCalendarioSemana(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCalendarioSemana As New List(Of CalendarioSemanaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "AllHorarios"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCalendarioSemana As New CalendarioSemanaClass
                    'cargamos datos sobre el objeto de login
                    objCalendarioSemana.Dia = ReadConsulta.GetValue(0)
                    objCalendarioSemana.HoraInicial = ReadConsulta.GetValue(1)
                    objCalendarioSemana.HoraFinal = ReadConsulta.GetValue(2)
                    objCalendarioSemana.IndicativoFestivo = ReadConsulta.GetValue(3)
                    'agregamos a la lista
                    ObjListCalendarioSemana.Add(objCalendarioSemana)

                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCalendarioSemana

    End Function
#End Region

#Region "OTRAS CONSULTAS"
    ''' <summary>
    ''' Función que consulta todos horarios de todos los días de un calendario en especifico
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    Public Function Consult_AllHorarioDias(ByVal vp_Obj As CalendarioSemanaClass)

        Dim ObjListCalendarioSemana As New List(Of CalendarioSemanaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine("SELECT CAS_Dia, CAS_HoraInicial, CAS_HoraFinal, CAS_IndicativoFestivo " &
            "FROM CALENDARIO_SEMANAS " &
            "WHERE CAS_Nit_ID = '" & vp_Obj.Nit_ID & "' AND CAS_Calendario_ID = '" & vp_Obj.Calendario_ID & "' " &
            "ORDER BY CAS_Nit_ID, CAS_Calendario_ID, CAS_Dia, CAS_HoraInicial")

        StrQuery = sql.ToString()

        ObjListCalendarioSemana = listCalendarioSemana(StrQuery, Conexion, "AllHorarios")

        Return ObjListCalendarioSemana

    End Function

    ''' <summary>
    ''' Función que consulta los horarios de un día en especifico, de un calendario en especifico
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    Public Function Consult_HorarioDia(ByVal vp_Obj As CalendarioSemanaClass)

        Dim ObjListCalendarioSemana As New List(Of CalendarioSemanaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine("SELECT CAS_Dia, CAS_HoraInicial, CAS_HoraFinal, CAS_IndicativoFestivo " &
            "FROM CALENDARIO_SEMANAS " &
            "WHERE CAS_Nit_ID = '" & vp_Obj.Nit_ID & "' AND CAS_Calendario_ID = '" & vp_Obj.Calendario_ID & "' AND CAS_Dia = '" & vp_Obj.Dia & "' " &
            "ORDER BY CAS_Nit_ID, CAS_Calendario_ID, CAS_Dia, CAS_HoraInicial")

        StrQuery = sql.ToString()

        ObjListCalendarioSemana = listCalendarioSemana(StrQuery, Conexion, "AllHorarios")

        Return ObjListCalendarioSemana

    End Function

#End Region

End Class
