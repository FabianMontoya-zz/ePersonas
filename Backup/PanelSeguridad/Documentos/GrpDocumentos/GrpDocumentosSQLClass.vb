Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class GrpDocumentosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla GrpDocumentos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllGrpDocumentos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT GD_Nit_ID," & _
                       "       GD_Grp_Documento_ID," & _
                       "       GD_Descripcion," & _
                       "       GD_TipoGrupo, " & _
                       "       GD_Usuario_Creacion, " & _
                       "       GD_FechaCreacion, " & _
                       "       GD_Usuario_Actualizacion, " & _
                       "       GD_FechaActualizacion, " & _
                       "       D1.DDLL_Descripcion AS DescripTGrupo, " & _
                       "       C.CLI_Nombre ," & _
                       "       ROW_NUMBER() OVER(ORDER BY GD_Nit_ID DESC) AS Index_GrpDocumentos " & _
                       " FROM GRUPO_DOCUMENTO GD" & _
                       " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = GD.GD_TipoGrupo AND D1.DDL_Tabla = 'TIPO_GRUPO' " & _
                       " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                       " CASE	 SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID))  " & _
                        " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT GD_Nit_ID," & _
                           "       GD_Grp_Documento_ID," & _
                           "       GD_Descripcion," & _
                           "       GD_TipoGrupo, " & _
                           "       GD_Usuario_Creacion, " & _
                           "       GD_FechaCreacion, " & _
                           "       GD_Usuario_Actualizacion, " & _
                           "       GD_FechaActualizacion, " & _
                           "       D1.DDLL_Descripcion AS DescripTGrupo, " & _
                           "       C.CLI_Nombre ," & _
                           "       ROW_NUMBER() OVER(ORDER BY GD_Nit_ID DESC) AS Index_GrpDocumentos " & _
                           " FROM GRUPO_DOCUMENTO GD" & _
                           " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = GD.GD_TipoGrupo AND D1.DDL_Tabla = 'TIPO_GRUPO' " & _
                           " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                           " CASE	 SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID)) " & _
                            "                 WHEN '' THEN 0 " & _
                            "                ELSE SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID))  " & _
                            " END ")
            Else
                sql.Append(" SELECT GD_Nit_ID," & _
                           "       GD_Grp_Documento_ID," & _
                           "       GD_Descripcion," & _
                           "       GD_TipoGrupo, " & _
                           "       GD_Usuario_Creacion, " & _
                           "       GD_FechaCreacion, " & _
                           "       GD_Usuario_Actualizacion, " & _
                           "       GD_FechaActualizacion, " & _
                           "       D1.DDLL_Descripcion AS DescripTGrupo, " & _
                           "       C.CLI_Nombre ," & _
                           "       ROW_NUMBER() OVER(ORDER BY GD_Nit_ID DESC) AS Index_GrpDocumentos " & _
                           " FROM GRUPO_DOCUMENTO GD" & _
                           " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = GD.GD_TipoGrupo AND D1.DDL_Tabla = 'TIPO_GRUPO' " & _
                           " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                           " CASE	 SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID)) " & _
                            "                 WHEN '' THEN 0 " & _
                            "                ELSE SUBSTRING(GD.GD_Nit_ID,0,LEN(GD.GD_Nit_ID))  " & _
                            " END " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListGrpDocumentos = listGrpDocumentos(StrQuery, Conexion, "List")

        Return ObjListGrpDocumentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo GrpDocumentos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_GrpDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertGrpDocumentos(ByVal vp_Obj_GrpDocumentos As GrpDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT GRUPO_DOCUMENTO (" & _
            "GD_Nit_ID," & _
            "GD_Grp_Documento_ID," & _
            "GD_Descripcion," & _
            "GD_TipoGrupo," & _
            "GD_Usuario_Creacion," & _
            "GD_FechaCreacion," & _
            "GD_Usuario_Actualizacion," & _
            "GD_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.GrpDocumentos_ID & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.TipoGrupo & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_GrpDocumentos.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del GrpDocumentos (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_GrpDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateGrpDocumentos(ByVal vp_Obj_GrpDocumentos As GrpDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE GRUPO_DOCUMENTO SET " & _
                       " GD_Descripcion ='" & vp_Obj_GrpDocumentos.Descripcion & "', " & _
                       " GD_TipoGrupo ='" & vp_Obj_GrpDocumentos.TipoGrupo & "', " & _
                       " GD_Usuario_Actualizacion ='" & vp_Obj_GrpDocumentos.UsuarioActualizacion & "', " & _
                       " GD_FechaActualizacion ='" & vp_Obj_GrpDocumentos.FechaActualizacion & "' " & _
                       " WHERE  GD_Nit_ID = '" & vp_Obj_GrpDocumentos.Nit_ID & "' AND GD_Grp_Documento_ID = '" & vp_Obj_GrpDocumentos.GrpDocumentos_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del GrpDocumentos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_GrpDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseGrpDocumentos(ByVal vp_Obj_GrpDocumentos As GrpDocumentosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE GRUPO_DOCUMENTO WHERE GD_Nit_ID = '" & vp_Obj_GrpDocumentos.Nit_ID & "' AND GD_Grp_Documento_ID = '" & vp_Obj_GrpDocumentos.GrpDocumentos_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

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
    Public Function Charge_DropListGrpDocumentosDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_GrpDocumentos_ID AS ID,CAST(A_GrpDocumentos_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM GrpDocumentos " & _
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
    ''' funcion que trae el listado de GrpDocumentos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listGrpDocumentos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListGrpDocumentos As New List(Of GrpDocumentosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objGrpDocumentos As New GrpDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objGrpDocumentos.Nit_ID = ReadConsulta.GetValue(0)
                    objGrpDocumentos.GrpDocumentos_ID = ReadConsulta.GetValue(1)
                    objGrpDocumentos.Descripcion = ReadConsulta.GetValue(2)
                    objGrpDocumentos.TipoGrupo = ReadConsulta.GetValue(3)

                    objGrpDocumentos.UsuarioCreacion = ReadConsulta.GetValue(4)
                    objGrpDocumentos.FechaCreacion = ReadConsulta.GetValue(5)
                    objGrpDocumentos.UsuarioActualizacion = ReadConsulta.GetValue(6)
                    objGrpDocumentos.FechaActualizacion = ReadConsulta.GetValue(7)

                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objGrpDocumentos.DescripTipoGrupo = ReadConsulta.GetValue(8) Else objGrpDocumentos.DescripTipoGrupo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objGrpDocumentos.DescripEmpresa = ReadConsulta.GetValue(9) Else objGrpDocumentos.DescripEmpresa = ""

                    objGrpDocumentos.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListGrpDocumentos.Add(objGrpDocumentos)

                End While

            Case "Matrix"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objGrpDocumentos As New GrpDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objGrpDocumentos.GrpDocumentos_ID = ReadConsulta.GetValue(0)
                    objGrpDocumentos.Descripcion = ReadConsulta.GetValue(1)
                    objGrpDocumentos.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListGrpDocumentos.Add(objGrpDocumentos)

                End While
        End Select


        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListGrpDocumentos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As GrpDocumentosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM GRUPO_DOCUMENTO " & _
                       " WHERE GD_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND GD_Grp_Documento_ID = '" & vp_O_Obj.GrpDocumentos_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_GrpDocumento()

        Dim ObjList As New List(Of GrpDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT GD_Grp_Documento_ID AS ID, CAST(GD_Grp_Documento_ID AS NVARCHAR(10)) + ' - ' + GD_Descripcion AS Descripcion, GD_Nit_ID  FROM GRUPO_DOCUMENTO ")

        StrQuery = sql.ToString

        ObjList = listGrpDocumentos(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function
#End Region

End Class
