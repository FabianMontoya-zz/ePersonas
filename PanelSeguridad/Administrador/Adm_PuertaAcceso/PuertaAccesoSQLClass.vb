Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class PuertaAccesoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla PuertaAcceso parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllPuertaAcceso(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_PuertaAcceso_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_PuertaAcceso " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_PuertaAcceso_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_PuertaAcceso " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END ")
            Else
                sql.Append(" SELECT PA_Nit_ID, " & _
                        "      PA_PuertaAcceso_ID, " & _
                        "      PA_Descripcion, " & _
                        "      PA_Cod_Numeric, " & _
                        "      PA_Cod_AlfaNumeric, " & _
                        "      PA_Usuario_Creacion, " & _
                        "      PA_FechaCreacion, " & _
                        "      PA_Usuario_Actualizacion, " & _
                        "      PA_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY PA_Nit_ID DESC) AS Index_PuertaAcceso " & _
                        " FROM PUERTAS_ACCESO PA " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((PA.PA_Nit_ID),0,LEN(PA.PA_Nit_ID ))   " & _
                        " END " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  PA_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY PA_Nit_ID, PA_PuertaAcceso_ID ASC")
            Else
                vl_sql_filtro.Append("AND  PA_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY PA_Nit_ID, PA_PuertaAcceso_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY PA_Nit_ID, PA_PuertaAcceso_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListPuertaAcceso = listPuertaAcceso(StrQuery, Conexion, "List")

        Return ObjListPuertaAcceso

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo PuertaAcceso (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_PuertaAcceso"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertPuertaAcceso(ByVal vp_Obj_PuertaAcceso As PuertaAccesoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PUERTAS_ACCESO (" & _
            "PA_Nit_ID," & _
            "PA_PuertaAcceso_ID," & _
            "PA_Descripcion," & _
            "PA_Cod_Numeric," & _
            "PA_Cod_AlfaNumeric," & _
            "PA_Usuario_Creacion," & _
            "PA_FechaCreacion," & _
            "PA_Usuario_Actualizacion," & _
            "PA_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.PuertaAcceso_ID & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.Cod_Numeric & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.Cod_AlfaNumeric & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_PuertaAcceso.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del PuertaAcceso (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_PuertaAcceso"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdatePuertaAcceso(ByVal vp_Obj_PuertaAcceso As PuertaAccesoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE PUERTAS_ACCESO SET " & _
                       " PA_Descripcion ='" & vp_Obj_PuertaAcceso.Descripcion & "', " & _
                       " PA_Cod_Numeric ='" & vp_Obj_PuertaAcceso.Cod_Numeric & "', " & _
                       " PA_Cod_AlfaNumeric ='" & vp_Obj_PuertaAcceso.Cod_AlfaNumeric & "', " & _
                       " PA_Usuario_Actualizacion ='" & vp_Obj_PuertaAcceso.UsuarioActualizacion & "', " & _
                       " PA_FechaActualizacion ='" & vp_Obj_PuertaAcceso.FechaActualizacion & "' " & _
                       " WHERE  PA_Nit_ID = '" & vp_Obj_PuertaAcceso.Nit_ID & "' AND PA_PuertaAcceso_ID = '" & vp_Obj_PuertaAcceso.PuertaAcceso_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del PuertaAcceso (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_PuertaAcceso"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ErasePuertaAcceso(ByVal vp_Obj_PuertaAcceso As PuertaAccesoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE PUERTAS_ACCESO WHERE PA_Nit_ID = '" & vp_Obj_PuertaAcceso.Nit_ID & "' AND PA_PuertaAcceso_ID = '" & vp_Obj_PuertaAcceso.PuertaAcceso_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

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
    Public Function Charge_DropListPuertaAccesoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_PuertaAcceso_ID AS ID,CAST(A_PuertaAcceso_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM PuertaAcceso " & _
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
    ''' funcion que trae el listado de PuertaAcceso para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listPuertaAcceso(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objPuertaAcceso As New PuertaAccesoClass
                    'cargamos datos sobre el objeto de login
                    objPuertaAcceso.Nit_ID = ReadConsulta.GetValue(0)
                    objPuertaAcceso.PuertaAcceso_ID = ReadConsulta.GetValue(1)

                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objPuertaAcceso.Descripcion = ReadConsulta.GetValue(2) Else objPuertaAcceso.Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objPuertaAcceso.Cod_Numeric = ReadConsulta.GetValue(3) Else objPuertaAcceso.Cod_Numeric = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objPuertaAcceso.Cod_AlfaNumeric = ReadConsulta.GetValue(4) Else objPuertaAcceso.Cod_AlfaNumeric = ""

                    objPuertaAcceso.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objPuertaAcceso.FechaCreacion = ReadConsulta.GetValue(6)
                    objPuertaAcceso.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objPuertaAcceso.FechaActualizacion = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objPuertaAcceso.DescripEmpresa = ReadConsulta.GetValue(9) Else objPuertaAcceso.DescripEmpresa = ""
                    objPuertaAcceso.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListPuertaAcceso.Add(objPuertaAcceso)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objPuertaAcceso As New PuertaAccesoClass
                    'cargamos datos sobre el objeto de login
                    objPuertaAcceso.PuertaAcceso_ID = ReadConsulta.GetValue(0)
                    objPuertaAcceso.Descripcion = ReadConsulta.GetValue(1)
                    objPuertaAcceso.Nit_ID = ReadConsulta.GetValue(2)
                
                    'agregamos a la lista
                    ObjListPuertaAcceso.Add(objPuertaAcceso)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListPuertaAcceso

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As PuertaAccesoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM PUERTAS_ACCESO" & _
                       " WHERE PA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND PA_PuertaAcceso_ID = '" & vp_O_Obj.PuertaAcceso_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de puertas de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_PuertaAcceso()

        Dim ObjList As New List(Of PuertaAccesoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.Append(" SELECT PA_PuertaAcceso_ID AS ID,CAST(PA_PuertaAcceso_ID AS NVARCHAR(5)) + ' - ' + PA_Descripcion AS DESCRIPCION, PA_Nit_ID FROM PUERTAS_ACCESO " & _
                   " ORDER BY PA_PuertaAcceso_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listPuertaAcceso(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee la matriz de puertas de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function List_PuertaAcceso(ByVal vp_S_Nit_ID As String)

        Dim ObjList As New List(Of PuertaAccesoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.Append(" SELECT PA_PuertaAcceso_ID AS ID,CAST(PA_PuertaAcceso_ID AS NVARCHAR(5)) + ' - ' + PA_Descripcion AS DESCRIPCION, PA_Nit_ID FROM PUERTAS_ACCESO " & _
                               "  WHERE PA_Nit_ID ='" & vp_S_Nit_ID & "'" & _
                              " ORDER BY PA_PuertaAcceso_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listPuertaAcceso(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
