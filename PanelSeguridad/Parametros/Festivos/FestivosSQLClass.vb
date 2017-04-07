Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class FestivosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Festivos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllFestivos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListFestivos As New List(Of FestivosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim CONEXION As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT F_Nit_ID, F_Calendario_ID, F_Año, F_Mes_Dia, F_FechaCreacion, F_UsuarioCreacion, " &
                       " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2," &
                       " CA.CA_Descripcion," &
                       " SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 1, 2)as Mes, SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 3, 4)as Dia, ROW_NUMBER()OVER(ORDER BY F_Año,F_Mes_Dia ASC) AS Index_Festivo " &
                       " FROM Festivos F " &
                       " LEFT JOIN CALENDARIOS CA ON F.F_Nit_ID = CA.CA_Nit_ID AND F.F_Calendario_ID = CA.CA_Calendario_ID " &
                       " LEFT JOIN CLIENTE C ON C.CLI_Document_ID =  CASE	 SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) WHEN '' THEN 0  ELSE SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT F_Nit_ID, F_Calendario_ID, F_Año, F_Mes_Dia, F_FechaCreacion, F_UsuarioCreacion, " &
                           " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2," &
                           " CA.CA_Descripcion," &
                           " SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 1, 2)as Mes, SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 3, 4)as Dia, ROW_NUMBER()OVER(ORDER BY F_Año,F_Mes_Dia ASC) AS Index_Festivo " &
                           " FROM Festivos F " &
                           " LEFT JOIN CALENDARIOS CA ON F.F_Nit_ID = CA.CA_Nit_ID AND F.F_Calendario_ID = CA.CA_Calendario_ID " &
                           " LEFT JOIN CLIENTE C ON C.CLI_Document_ID =  CASE	 SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) WHEN '' THEN 0  ELSE SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) END ")
            Else

                sql.Append("SELECT F_Nit_ID, F_Calendario_ID, F_Año, F_Mes_Dia, F_FechaCreacion, F_UsuarioCreacion, " &
                       " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2," &
                       " CA.CA_Descripcion," &
                       " SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 1, 2)as Mes, SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 3, 4)as Dia, ROW_NUMBER()OVER(ORDER BY F_Año,F_Mes_Dia ASC) AS Index_Festivo " &
                       " FROM Festivos F " &
                       " LEFT JOIN CALENDARIOS CA ON F.F_Nit_ID = CA.CA_Nit_ID AND F.F_Calendario_ID = CA.CA_Calendario_ID " &
                       " LEFT JOIN CLIENTE C ON C.CLI_Document_ID =  CASE	 SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) WHEN '' THEN 0  ELSE SUBSTRING(F.F_Nit_ID,0,LEN(F.F_Nit_ID)) END " &
                       "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append(" WHERE  F_Nit_ID ='" & vp_S_Nit_User & "' ")
            Else
                vl_sql_filtro.Append(" AND  F_Nit_ID ='" & vp_S_Nit_User & "' ")
            End If
        Else

        End If

        vl_sql_filtro.Append(" ORDER BY F_Año,F_Mes_Dia ASC")



        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListFestivos = listFestivos(StrQuery, CONEXION, "Consulta")

        Return ObjListFestivos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Festivos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Festivos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertFestivos(ByVal vp_Obj_Festivos As FestivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INTO Festivos (" &
            "F_Nit_ID," &
            "F_Calendario_ID," &
            "F_Año," &
            "F_Mes_Dia," &
            "F_FechaCreacion," &
            "F_UsuarioCreacion" &
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Festivos.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Festivos.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj_Festivos.Year & "',")
        sql.AppendLine("'" & vp_Obj_Festivos.Mes_Dia & "',")
        sql.AppendLine("'" & vp_Obj_Festivos.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Festivos.UsuarioCreacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Festivos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Festivos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseFestivos(ByVal vp_Obj_Festivos As FestivosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Festivos WHERE F_Nit_ID = '" & vp_Obj_Festivos.Nit_ID & "' AND F_Calendario_ID = '" & vp_Obj_Festivos.Calendario_ID & "' AND F_Año = " & vp_Obj_Festivos.Year & " AND F_Mes_Dia =" & vp_Obj_Festivos.Mes_Dia)
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function


#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " &
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Festivos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listFestivos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListFestivos As New List(Of FestivosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "Consulta"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objFestivos As New FestivosClass
                    'cargamos datos sobre el objeto de login
                    objFestivos.Nit_ID = ReadConsulta.GetValue(0)
                    objFestivos.Calendario_ID = ReadConsulta.GetValue(1)
                    objFestivos.Year = ReadConsulta.GetValue(2)
                    objFestivos.Mes_Dia = ReadConsulta.GetValue(3)
                    objFestivos.FechaCreacion = ReadConsulta.GetString(4)
                    objFestivos.UsuarioCreacion = ReadConsulta.GetString(5)
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objFestivos.DescripcionEmpresa = ReadConsulta.GetValue(6) Else objFestivos.DescripcionEmpresa = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objFestivos.DescripcionCalendario = ReadConsulta.GetValue(7) Else objFestivos.DescripcionCalendario = ""
                    objFestivos.StrMes = ReadConsulta.GetValue(8)
                    objFestivos.StrDia = ReadConsulta.GetValue(9)
                    objFestivos.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListFestivos.Add(objFestivos)

                End While

            Case "MatrizAll"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objFestivos As New FestivosClass
                    'cargamos datos sobre el objeto de login
                    objFestivos.Year = ReadConsulta.GetValue(0)
                    objFestivos.StrMes = ReadConsulta.GetValue(1)
                    objFestivos.StrDia = ReadConsulta.GetValue(2)
                    'agregamos a la lista
                    ObjListFestivos.Add(objFestivos)
                End While
        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListFestivos

    End Function


#End Region

#Region "OTRAS CONSULTAS"
    ''' <summary>
    ''' Función que Consulta todos los festivos que se crearion para el calendario de una empresa
    ''' </summary>
    ''' <returns></returns>
    Public Function Read_All_Festivos(ByVal vp_O_Festivos As FestivosClass)

        Dim ObjList As New List(Of FestivosClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append("SELECT F_Año, SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 1, 2)as Mes, SUBSTRING(convert(nvarchar(4),F_Mes_Dia), 3, 4)as Dia " &
                   " FROM Festivos " &
                   " WHERE F_Nit_ID = '" & vp_O_Festivos.Nit_ID & "' " &
                   " AND F_Calendario_ID = '" & vp_O_Festivos.Calendario_ID & "'")
        Dim StrQuery As String = sql.ToString

        ObjList = listFestivos(StrQuery, Conexion, "MatrizAll")

        Return ObjList

    End Function
#End Region
End Class
