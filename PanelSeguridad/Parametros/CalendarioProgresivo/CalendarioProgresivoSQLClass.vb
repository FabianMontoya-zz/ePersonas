Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CalendarioProgresivoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla CalendarioProgresivo parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCalendarioProgresivo(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_CalendarioProgresivo_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendarioProgresivo, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2,  " & _
                             " TC.DDLL_Descripcion, " & _
                             " ROW_NUMBER() OVER(ORDER BY CA_CalendarioProgresivo_ID ASC) AS Index_CalendarioProgresivo " & _
                        " FROM CalendarioProgresivoS CA " & _
                      "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendarioProgresivo AND TC.DDL_Tabla = 'TIPO_CalendarioProgresivo' " & _
                       " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_CalendarioProgresivo_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendarioProgresivo, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2,  " & _
                             " TC.DDLL_Descripcion, " & _
                              " ROW_NUMBER() OVER(ORDER BY CA_CalendarioProgresivo_ID ASC) AS Index_CalendarioProgresivo " & _
                      " FROM CalendarioProgresivoS CA " & _
                      "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendarioProgresivo AND TC.DDL_Tabla = 'TIPO_CalendarioProgresivo' " & _
                      " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END ")
            Else
                sql.Append(" SELECT CA_Nit_ID, " & _
                             " CA_CalendarioProgresivo_ID, " & _
                             " CA_Descripcion, " & _
                             " CA_TipoCalendarioProgresivo, " & _
                              " CA_Usuario_Creacion, " & _
                             " CA_FechaCreacion, " & _
                             " CA_Usuario_Actualizacion, " & _
                             " CA_FechaActualizacion, " & _
                             " C.CLI_Nombre +' '+ C.CLI_Nombre_2  +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2 , " & _
                       " TC.DDLL_Descripcion, " & _
                       " ROW_NUMBER() OVER(ORDER BY CA_CalendarioProgresivo_ID ASC) AS Index_CalendarioProgresivo " & _
                      " FROM CalendarioProgresivoS CA " & _
                       "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = CA.CA_TipoCalendarioProgresivo AND TC.DDL_Tabla = 'TIPO_CalendarioProgresivo' " & _
                      " LEFT JOIN CLIENTE C ON C.CLI_Document_ID = " & _
                             " CASE	 SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID))" & _
                             " WHEN '' THEN 0 " & _
                             " ELSE SUBSTRING(CA.CA_Nit_ID,0,LEN(CA.CA_Nit_ID)) " & _
                       " END " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListCalendarioProgresivo = listCalendarioProgresivo(StrQuery, Conexion, "List")

        Return ObjListCalendarioProgresivo

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo CalendarioProgresivo (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_CalendarioProgresivo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCalendarioProgresivo(ByVal vp_Obj_CalendarioProgresivo As CalendarioProgresivoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CalendarioProgresivoS(" & _
            "CA_Nit_ID," & _
            "CA_CalendarioProgresivo_ID," & _
            "CA_Descripcion," & _
            "CA_TipoCalendarioProgresivo," & _
            "CA_Usuario_Creacion," & _
            "CA_FechaCreacion," & _
            "CA_Usuario_Actualizacion," & _
            "CA_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.CalendarioProgresivo_ID & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.TipoCalendarioProgresivo & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_CalendarioProgresivo.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del CalendarioProgresivo (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_CalendarioProgresivo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateCalendarioProgresivo(ByVal vp_Obj_CalendarioProgresivo As CalendarioProgresivoClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE CalendarioProgresivoS SET " & _
                       " CA_Descripcion ='" & vp_Obj_CalendarioProgresivo.Descripcion & "', " & _
                       " CA_TipoCalendarioProgresivo ='" & vp_Obj_CalendarioProgresivo.TipoCalendarioProgresivo & "', " & _
                       " CA_Usuario_Actualizacion ='" & vp_Obj_CalendarioProgresivo.UsuarioActualizacion & "', " & _
                       " CA_FechaActualizacion ='" & vp_Obj_CalendarioProgresivo.FechaActualizacion & "' " & _
                       " WHERE  CA_Nit_ID = '" & vp_Obj_CalendarioProgresivo.Nit_ID & "' AND CA_CalendarioProgresivo_ID = '" & vp_Obj_CalendarioProgresivo.CalendarioProgresivo_ID & "'")
        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del CalendarioProgresivo (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_CalendarioProgresivo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseCalendarioProgresivo(ByVal vp_Obj_CalendarioProgresivo As CalendarioProgresivoClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE CalendarioProgresivoS WHERE CA_Nit_ID = '" & vp_Obj_CalendarioProgresivo.Nit_ID & "' AND CA_CalendarioProgresivo_ID = '" & vp_Obj_CalendarioProgresivo.CalendarioProgresivo_ID & "'")
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
    Public Function Charge_DropListCalendarioProgresivoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_CalendarioProgresivo_ID AS ID,CAST(A_CalendarioProgresivo_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM CalendarioProgresivo " & _
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
    ''' funcion que trae el listado de CalendarioProgresivo para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCalendarioProgresivo(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCalendarioProgresivo As New List(Of CalendarioProgresivoClass)

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

                    Dim objCalendarioProgresivo As New CalendarioProgresivoClass
                    'cargamos datos sobre el objeto de login
                    objCalendarioProgresivo.Nit_ID = ReadConsulta.GetValue(0)
                    objCalendarioProgresivo.CalendarioProgresivo_ID = ReadConsulta.GetValue(1)
                    objCalendarioProgresivo.Descripcion = ReadConsulta.GetValue(2)
                    objCalendarioProgresivo.TipoCalendarioProgresivo = ReadConsulta.GetValue(3)

                    objCalendarioProgresivo.UsuarioCreacion = ReadConsulta.GetValue(4)
                    objCalendarioProgresivo.FechaCreacion = ReadConsulta.GetValue(5)
                    objCalendarioProgresivo.UsuarioActualizacion = ReadConsulta.GetValue(6)
                    objCalendarioProgresivo.FechaActualizacion = ReadConsulta.GetValue(7)

                    objCalendarioProgresivo.DescripEmpresa = ReadConsulta.GetValue(8)
                    objCalendarioProgresivo.DescripTipoCalendarioProgresivo = ReadConsulta.GetValue(9)
                    objCalendarioProgresivo.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCalendarioProgresivo As New CalendarioProgresivoClass
                    'cargamos datos sobre el objeto de login
                    objCalendarioProgresivo.CalendarioProgresivo_ID = ReadConsulta.GetValue(0)
                    objCalendarioProgresivo.Descripcion = ReadConsulta.GetValue(1)
                    objCalendarioProgresivo.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListCalendarioProgresivo.Add(objCalendarioProgresivo)

                End While

        End Select




        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCalendarioProgresivo

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As CalendarioProgresivoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CalendarioProgresivoS " & _
                       " WHERE CA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CA_CalendarioProgresivo_ID = '" & vp_O_Obj.CalendarioProgresivo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de CalendarioProgresivos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_CalendarioProgresivo()

        Dim ObjList As New List(Of CalendarioProgresivoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT CA_CalendarioProgresivo_ID AS ID,CAST(CA_CalendarioProgresivo_ID AS NVARCHAR(5)) + ' - ' + CA_Descripcion AS DESCRIPCION, A_Nit_ID FROM CalendarioProgresivoS  " & _
                   " ORDER BY CA_CalendarioProgresivo_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listCalendarioProgresivo(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
