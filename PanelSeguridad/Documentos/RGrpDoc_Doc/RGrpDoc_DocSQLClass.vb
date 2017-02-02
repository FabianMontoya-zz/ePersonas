Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class RGrpDoc_DocSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla RGrpDoc_Doc parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllRGrpDoc_Doc(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListRGrpDoc_Doc As New List(Of RGrpDoc_DocClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  RGD_Nit_ID, " & _
                                    " 			   RGD_Grp_Documento_ID, " & _
                                    " 			   RGD_Documentos_ID, " & _
                                    " 			   RGD_Usuario_Creacion, " & _
                                    " 			   RGD_FechaCreacion, " & _
                                    " 			   RGD_Usuario_Actualizacion, " & _
                                    " 			   RGD_FechaActualizacion, " & _
                                    " 			   GD.GD_Descripcion, " & _
                                    " 			   D.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RGD_Nit_ID DESC) AS Index_RGrpDoc_Doc " & _
                                    " FROM R_GRPDOC_DOCUMENTOS RGD " & _
                                    " INNER JOIN GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = RGD.RGD_Grp_Documento_ID AND RGD.RGD_Nit_ID = GD.GD_Nit_ID " & _
                                    " INNER JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = RGD.RGD_Documentos_ID AND RGD.RGD_Nit_ID = D.DOC_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID))   " & _
                                    " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT  RGD_Nit_ID, " & _
                                    " 			   RGD_Grp_Documento_ID, " & _
                                    " 			   RGD_Documentos_ID, " & _
                                    " 			   RGD_Usuario_Creacion, " & _
                                    " 			   RGD_FechaCreacion, " & _
                                    " 			   RGD_Usuario_Actualizacion, " & _
                                    " 			   RGD_FechaActualizacion, " & _
                                    " 			   GD.GD_Descripcion, " & _
                                    " 			   D.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RGD_Nit_ID DESC) AS Index_RGrpDoc_Doc " & _
                                    " FROM R_GRPDOC_DOCUMENTOS RGD " & _
                                    " INNER JOIN GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = RGD.RGD_Grp_Documento_ID AND RGD.RGD_Nit_ID = GD.GD_Nit_ID " & _
                                    " INNER JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = RGD.RGD_Documentos_ID  AND RGD.RGD_Nit_ID = D.DOC_Nit_ID  " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID))   " & _
                                    " END ")
            Else
                sql.Append(" SELECT  RGD_Nit_ID, " & _
                                    " 			   RGD_Grp_Documento_ID, " & _
                                    " 			   RGD_Documentos_ID, " & _
                                    " 			   RGD_Usuario_Creacion, " & _
                                    " 			   RGD_FechaCreacion, " & _
                                    " 			   RGD_Usuario_Actualizacion, " & _
                                    " 			   RGD_FechaActualizacion, " & _
                                    " 			   GD.GD_Descripcion, " & _
                                    " 			   D.DOC_Descripcion, " & _
                                    "              C.CLI_Nombre, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RGD_Nit_ID DESC) AS Index_RGrpDoc_Doc " & _
                                    " FROM R_GRPDOC_DOCUMENTOS RGD " & _
                                    " INNER JOIN GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = RGD.RGD_Grp_Documento_ID  AND RGD.RGD_Nit_ID = GD.GD_Nit_ID" & _
                                    " INNER JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = RGD.RGD_Documentos_ID AND RGD.RGD_Nit_ID = D.DOC_Nit_ID  " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    "  CASE	 SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RGD.RGD_Nit_ID,0,LEN(RGD.RGD_Nit_ID))   " & _
                                    " END " & _
                                    " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append(" WHERE  RGD_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY RGD_Nit_ID, RGD_Grp_Documento_ID, RGD_Documentos_ID ASC")
            Else
                vl_sql_filtro.Append(" AND  RGD_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY RGD_Nit_ID, RGD_Grp_Documento_ID, RGD_Documentos_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY RGD_Nit_ID, RGD_Grp_Documento_ID, RGD_Documentos_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListRGrpDoc_Doc = listRGrpDoc_Doc(StrQuery, Conexion, "List")

        Return ObjListRGrpDoc_Doc

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo RGrpDoc_Doc (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_RGrpDoc_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertRGrpDoc_Doc(ByVal vp_Obj_RGrpDoc_Doc As RGrpDoc_DocClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_GRPDOC_DOCUMENTOS (" & _
            "RGD_Nit_ID," & _
            "RGD_Grp_Documento_ID," & _
            "RGD_Documentos_ID," & _
            "RGD_Usuario_Creacion," & _
            "RGD_FechaCreacion," & _
            "RGD_Usuario_Actualizacion," & _
            "RGD_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.GrpDoc_ID & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.Doc_ID & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_RGrpDoc_Doc.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del RGrpDoc_Doc (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_RGrpDoc_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseRGrpDoc_Doc(ByVal vp_Obj_RGrpDoc_Doc As RGrpDoc_DocClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE R_GRPDOC_DOCUMENTOS WHERE RGD_Nit_ID = '" & vp_Obj_RGrpDoc_Doc.Nit_ID & "' AND RGD_Grp_Documento_ID = '" & vp_Obj_RGrpDoc_Doc.GrpDoc_ID & "' AND RGD_Documentos_ID ='" & vp_Obj_RGrpDoc_Doc.Doc_ID & "'")
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
    Public Function Charge_DropListRGrpDoc_DocDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_RGrpDoc_Doc_ID AS ID,CAST(A_RGrpDoc_Doc_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM RGrpDoc_Doc " & _
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
    ''' funcion que trae el listado de RGrpDoc_Doc para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listRGrpDoc_Doc(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListRGrpDoc_Doc As New List(Of RGrpDoc_DocClass)

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

                    Dim objRGrpDoc_Doc As New RGrpDoc_DocClass
                    'cargamos datos sobre el objeto de login
                    objRGrpDoc_Doc.Nit_ID = ReadConsulta.GetValue(0)
                    objRGrpDoc_Doc.GrpDoc_ID = ReadConsulta.GetValue(1)
                    objRGrpDoc_Doc.Doc_ID = ReadConsulta.GetValue(2)

                    objRGrpDoc_Doc.UsuarioCreacion = ReadConsulta.GetValue(3)
                    objRGrpDoc_Doc.FechaCreacion = ReadConsulta.GetValue(4)
                    objRGrpDoc_Doc.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    objRGrpDoc_Doc.FechaActualizacion = ReadConsulta.GetValue(6)

                    objRGrpDoc_Doc.DescripGrupoDoc = ReadConsulta.GetValue(7)
                    objRGrpDoc_Doc.DescripDoc = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objRGrpDoc_Doc.DescripEmpresa = ReadConsulta.GetValue(9) Else objRGrpDoc_Doc.DescripEmpresa = ""
                    objRGrpDoc_Doc.Index = ReadConsulta.GetValue(10)

                    'agregamos a la lista
                    ObjListRGrpDoc_Doc.Add(objRGrpDoc_Doc)

                End While

            Case "Matrix"


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListRGrpDoc_Doc

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As RGrpDoc_DocClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_GRPDOC_DOCUMENTOS " & _
                       " WHERE RGD_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RGD_Grp_Documento_ID = '" & vp_O_Obj.GrpDoc_ID & "'" & _
                       " AND RGD_Documentos_ID = '" & vp_O_Obj.Doc_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

#End Region

End Class
