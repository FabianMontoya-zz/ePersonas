Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CalendarioSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Calendario parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCalendario(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListCalendario As New List(Of CalendarioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_Calendario_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendario, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2,  " & _
                             " TC.DDLL_Descripcion, " & _
                             " ROW_NUMBER() OVER(ORDER BY CA_Calendario_ID ASC) AS Index_Calendario " & _
                        " FROM CALENDARIOS CA " & _
                      "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendario AND TC.DDL_Tabla = 'TIPO_CALENDARIO' " & _
                       " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_Calendario_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendario, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2,  " & _
                             " TC.DDLL_Descripcion, " & _
                              " ROW_NUMBER() OVER(ORDER BY CA_Calendario_ID ASC) AS Index_Calendario " & _
                      " FROM CALENDARIOS CA " & _
                      "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendario AND TC.DDL_Tabla = 'TIPO_CALENDARIO' " & _
                      " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END ")
            Else
                sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_Calendario_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendario, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2 , " & _
                       " TC.DDLL_Descripcion, " & _
                       " ROW_NUMBER() OVER(ORDER BY CA_Calendario_ID ASC) AS Index_Calendario " & _
                      " FROM CALENDARIOS CA " & _
                       "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendario AND TC.DDL_Tabla = 'TIPO_CALENDARIO' " & _
                      " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  CA_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY CA_Nit_ID, CA_Calendario_ID ASC")
            Else
                vl_sql_filtro.Append("AND  CA_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY CA_Nit_ID, CA_Calendario_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY CA_Nit_ID, CA_Calendario_ID ASC")
        End If


        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListCalendario = listCalendario(StrQuery, Conexion, "List")

        Return ObjListCalendario

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Calendario (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Calendario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCalendario(ByVal vp_Obj_Calendario As CalendarioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CALENDARIOS(" & _
            "CA_Nit_ID," & _
            "CA_Calendario_ID," & _
            "CA_Descripcion," & _
            "CA_TipoCalendario," & _
            "CA_Usuario_Creacion," & _
            "CA_FechaCreacion," & _
            "CA_Usuario_Actualizacion," & _
            "CA_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Calendario.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.TipoCalendario & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Calendario.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Calendario (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Calendario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateCalendario(ByVal vp_Obj_Calendario As CalendarioClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE CALENDARIOS SET " & _
                       " CA_Descripcion ='" & vp_Obj_Calendario.Descripcion & "', " & _
                       " CA_TipoCalendario ='" & vp_Obj_Calendario.TipoCalendario & "', " & _
                       " CA_Usuario_Actualizacion ='" & vp_Obj_Calendario.UsuarioActualizacion & "', " & _
                       " CA_FechaActualizacion ='" & vp_Obj_Calendario.FechaActualizacion & "' " & _
                       " WHERE  CA_Nit_ID = '" & vp_Obj_Calendario.Nit_ID & "' AND CA_Calendario_ID = '" & vp_Obj_Calendario.Calendario_ID & "'")
        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Calendario (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Calendario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseCalendario(ByVal vp_Obj_Calendario As CalendarioClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE CALENDARIOS WHERE CA_Nit_ID = '" & vp_Obj_Calendario.Nit_ID & "' AND CA_Calendario_ID = '" & vp_Obj_Calendario.Calendario_ID & "'")
        StrQuery = sql.ToString
        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

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

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCalendarioDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Calendario_ID AS ID,CAST(A_Calendario_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Calendario " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListSeguridad(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT PS_Politica_ID AS ID,CAST(PS_Politica_ID AS NVARCHAR(5)) + ' - ' + PS_Descripcion AS DESCRIPCION FROM POLITICA_SEGURIDAD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Calendario para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCalendario(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCalendario As New List(Of CalendarioClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCalendario As New CalendarioClass
                    'cargamos datos sobre el objeto de login
                    objCalendario.Nit_ID = ReadConsulta.GetValue(0)
                    objCalendario.Calendario_ID = ReadConsulta.GetValue(1)
                    objCalendario.Descripcion = ReadConsulta.GetValue(2)
                    objCalendario.TipoCalendario = ReadConsulta.GetValue(3)

                    objCalendario.UsuarioCreacion = ReadConsulta.GetValue(4)
                    objCalendario.FechaCreacion = ReadConsulta.GetValue(5)
                    objCalendario.UsuarioActualizacion = ReadConsulta.GetValue(6)
                    objCalendario.FechaActualizacion = ReadConsulta.GetValue(7)

                    'objCalendario.DescripEmpresa = ReadConsulta.GetValue(8)
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objCalendario.DescripEmpresa = ReadConsulta.GetValue(8) Else objCalendario.DescripEmpresa = ""
                    objCalendario.DescripTipoCalendario = ReadConsulta.GetValue(9)
                    objCalendario.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListCalendario.Add(objCalendario)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCalendario As New CalendarioClass
                    'cargamos datos sobre el objeto de login
                    objCalendario.Calendario_ID = ReadConsulta.GetValue(0)
                    objCalendario.Descripcion = ReadConsulta.GetValue(1)
                    objCalendario.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListCalendario.Add(objCalendario)

                End While

            Case "MatrixGenericos"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCalendario As New CalendarioClass
                    'cargamos datos sobre el objeto de login
                    objCalendario.Calendario_ID = ReadConsulta.GetValue(0)
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objCalendario.Descripcion = ReadConsulta.GetValue(1) Else objCalendario.Descripcion = ""
                    objCalendario.TipoCalendario = ReadConsulta.GetValue(2)
                    objCalendario.Index = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListCalendario.Add(objCalendario)

                End While

        End Select




        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCalendario

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As CalendarioClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CALENDARIOS " & _
                       " WHERE CA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CA_Calendario_ID = '" & vp_O_Obj.Calendario_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Calendarios
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Calendario()

        Dim ObjList As New List(Of CalendarioClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT CA_Calendario_ID AS ID,CAST(CA_Calendario_ID AS NVARCHAR(5)) + ' - ' + CA_Descripcion AS DESCRIPCION, A_Nit_ID FROM CALENDARIOS  " & _
                   " ORDER BY CA_Calendario_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listCalendario(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

    ''' <summary>
    ''' Traemos los Calendarios para Empresa Genérica
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Calendarios_Genericos()

        Dim ObjList As New List(Of CalendarioClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT c.CA_Calendario_ID, " & _
                   " c.CA_Descripcion, " & _
                   " c.CA_TipoCalendario, " & _
                   " ROW_NUMBER() OVER(ORDER BY c.CA_Nit_ID, c.CA_Calendario_ID ASC) AS Index_Calendario " & _
                   " FROM CALENDARIOS c " & _
                   " WHERE c.CA_Nit_ID = '0' " & _
                   " ORDER BY c.CA_Nit_ID, c.CA_Calendario_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listCalendario(StrQuery, Conexion, "MatrixGenericos")

        Return ObjList

    End Function

#End Region

End Class
