Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class DocumentoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Documento parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllDocumento(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END ")

        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END ")
            Else
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Documentos_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                        "  FROM DOCUMENTOS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))  " & _
                        " END " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  DOC_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY DOC_Nit_ID, DOC_Documentos_ID ASC")
            Else
                vl_sql_filtro.Append("AND  DOC_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY DOC_Nit_ID, DOC_Documentos_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY DOC_Nit_ID, DOC_Documentos_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjListDocumento = listDocumento(StrQuery, Conexion, "List")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' creala consulta para la tabla Releciones Financieras parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Nit As String, ByVal vp_S_TypeDoc As String, ByVal vp_S_Doc As String)

        Dim ObjList As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Nit_ID," & _
                   "       A_TypeDocument_ID, " & _
                   "       A_Document_ID, " & _
                   "       A_Secuencia_ID, " & _
                   "       DE_Documento_ID, " & _
                   "       DE_RutaDocumento, " & _
                   "       DE_Formato, " & _
                   "       DE_Trama, " & _
                   "       DE_Usuario_Creacion, " & _
                   "       DE_FechaCreacion, " & _
                   "       DE_Usuario_Actualizacion, " & _
                   "       DE_FechaActualizacion, " & _
                   "       D.DOC_Descripcion, " & _
                   "       D1.DDLL_Descripcion  " & _
                   " FROM " & BD_Documentos & ".dbo.ASOCIACION_DOCUMENTOS A" & _
                   " INNER JOIN " & BD_Documentos & ".dbo.DOCUMENTOS_EXISTENTES DE ON DE.DE_Secuencia_ID = A.A_Secuencia_ID " & _
                   " INNER JOIN " & BD_Documentos & ".dbo.DOCUMENTOS D ON D.DOC_Documentos_ID =DE.DE_Documento_ID " & _
                   " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                  " WHERE A_Nit_ID = '" & vp_S_Nit & "' " & _
                   " AND A_TypeDocument_ID = '" & vp_S_TypeDoc & "' " & _
                   " AND A_Document_ID = '" & vp_S_Doc & "' ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion, "R")

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Documento (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT DOCUMENTOS (" & _
            "DOC_Nit_ID," & _
            "DOC_Documentos_ID," & _
            "DOC_Descripcion," & _
            "DOC_TipoContenido," & _
            "DOC_Formato," & _
            "DOC_TipoVersion," & _
            "DOC_Ruta_ID," & _
            "DOC_IndicativoFoto," & _
            "DOC_Ruta_ID_Plantilla," & _
            "DOC_NombrePlantilla," & _
            "DOC_ChequeaVigencias," & _
            "DOC_DiasVigencia," & _
            "DOC_RequiereVerificacion," & _
            "DOC_Usuario_Creacion," & _
            "DOC_FechaCreacion," & _
            "DOC_Usuario_Actualizacion," & _
            "DOC_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Documento.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Documento_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.TipoContenido & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Formato & "',")
        sql.AppendLine("'" & vp_Obj_Documento.TipoVersion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Ruta_ID & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Indicativo & "',")
        sql.AppendLine("'" & vp_Obj_Documento.Ruta_ID_Plantilla & "',")
        sql.AppendLine("'" & vp_Obj_Documento.NombrePlantilla & "',")
        sql.AppendLine("'" & vp_Obj_Documento.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_Documento.DiasVigencia & "',")
        sql.AppendLine("'" & vp_Obj_Documento.RequiereVerificacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Documento.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Documento (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE DOCUMENTOS SET " & _
                       " DOC_Descripcion ='" & vp_Obj_Documento.Descripcion & "', " & _
                       " DOC_TipoContenido ='" & vp_Obj_Documento.TipoContenido & "', " & _
                       " DOC_Formato ='" & vp_Obj_Documento.Formato & "', " & _
                       " DOC_TipoVersion ='" & vp_Obj_Documento.TipoVersion & "', " & _
                       " DOC_Ruta_ID ='" & vp_Obj_Documento.Ruta_ID & "', " & _
                       " DOC_IndicativoFoto ='" & vp_Obj_Documento.Indicativo & "', " & _
                       " DOC_Ruta_ID_Plantilla ='" & vp_Obj_Documento.Ruta_ID_Plantilla & "', " & _
                       " DOC_NombrePlantilla ='" & vp_Obj_Documento.NombrePlantilla & "', " & _
                       " DOC_ChequeaVigencias ='" & vp_Obj_Documento.ChequeaVigencias & "', " & _
                       " DOC_DiasVigencia ='" & vp_Obj_Documento.DiasVigencia & "', " & _
                       " DOC_RequiereVerificacion ='" & vp_Obj_Documento.RequiereVerificacion & "', " & _
                       " DOC_Usuario_Actualizacion ='" & vp_Obj_Documento.UsuarioActualizacion & "', " & _
                       " DOC_FechaActualizacion ='" & vp_Obj_Documento.FechaActualizacion & "' " & _
                       " WHERE  DOC_Nit_ID = '" & vp_Obj_Documento.Nit_ID & "' AND DOC_Documentos_ID = '" & vp_Obj_Documento.Documento_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Documento (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseDocumento(ByVal vp_Obj_Documento As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE DOCUMENTOS WHERE DOC_Nit_ID = '" & vp_Obj_Documento.Nit_ID & "' AND DOC_Documentos_ID = '" & vp_Obj_Documento.Documento_ID & "'")
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
    Public Function Charge_DropListDocumentoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Documento_ID AS ID,CAST(A_Documento_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Documento " & _
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
    Public Function Charge_DropListFormato(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'DOCUMENTOS' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Documento para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listDocumento(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListDocumento As New List(Of DocumentoClass)

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

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Nit_ID = ReadConsulta.GetValue(0)
                    objDocumento.Documento_ID = ReadConsulta.GetValue(1)
                    objDocumento.Descripcion = ReadConsulta.GetValue(2)

                    objDocumento.TipoContenido = ReadConsulta.GetValue(3)
                    objDocumento.Formato = ReadConsulta.GetValue(4)
                    objDocumento.TipoVersion = ReadConsulta.GetValue(5)
                    objDocumento.Ruta_ID = ReadConsulta.GetValue(6)
                    objDocumento.Indicativo = ReadConsulta.GetValue(7)
                    objDocumento.Ruta_ID_Plantilla = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objDocumento.NombrePlantilla = ReadConsulta.GetValue(9) Else objDocumento.NombrePlantilla = ""

                    objDocumento.UsuarioCreacion = ReadConsulta.GetValue(10)
                    objDocumento.FechaCreacion = ReadConsulta.GetValue(11)
                    objDocumento.UsuarioActualizacion = ReadConsulta.GetValue(12)
                    objDocumento.FechaActualizacion = ReadConsulta.GetValue(13)

                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objDocumento.ChequeaVigencias = ReadConsulta.GetValue(14) Else objDocumento.ChequeaVigencias = "N"
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objDocumento.DiasVigencia = ReadConsulta.GetValue(15) Else objDocumento.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objDocumento.RequiereVerificacion = ReadConsulta.GetValue(16) Else objDocumento.RequiereVerificacion = "N"

                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objDocumento.DescripContenido = ReadConsulta.GetValue(17) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objDocumento.DescripFormato = ReadConsulta.GetValue(18) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objDocumento.DescripVersion = ReadConsulta.GetValue(19) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objDocumento.DescripRuta = ReadConsulta.GetValue(20) Else objDocumento.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objDocumento.DescripRutaPlantilla = ReadConsulta.GetValue(21) Else objDocumento.RequiereVerificacion = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objDocumento.DescripEmpresa = ReadConsulta.GetValue(22) Else objDocumento.DescripEmpresa = ""
                    objDocumento.Index = ReadConsulta.GetValue(23)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Documento_ID = ReadConsulta.GetValue(0)
                    objDocumento.Descripcion = ReadConsulta.GetValue(1)
                    objDocumento.Nit_ID = ReadConsulta.GetValue(2)
                    objDocumento.ChequeaVigencias = ReadConsulta.GetValue(3)
                    objDocumento.DiasVigencia = ReadConsulta.GetValue(4)
                    objDocumento.RutaDocumentoDestino = ReadConsulta.GetValue(5)
                    objDocumento.RequiereVerificacion = ReadConsulta.GetValue(6)
                    objDocumento.Formato = ReadConsulta.GetValue(7)
                    objDocumento.Indicativo = ReadConsulta.GetValue(8)
                    objDocumento.DescripFormato = ReadConsulta.GetValue(9)
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objDocumento.Consecutivo = ReadConsulta.GetValue(10) Else objDocumento.Consecutivo = 0

                    objDocumento.Index = ReadConsulta.GetValue(11)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

            Case "Matrix_Secuencia"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    objDocumento.Documento_ID = ReadConsulta.GetValue(0)
                    objDocumento.Descripcion = ReadConsulta.GetValue(1)
                    objDocumento.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

            Case "RutasOpe"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objDocumento As New DocumentoClass
                    'cargamos datos sobre el objeto de login
                    If Not (IsDBNull(ReadConsulta.GetValue(0))) Then objDocumento.TypeRuta = ReadConsulta.GetValue(0) Else objDocumento.TypeRuta = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objDocumento.RutaDocumentoTemporal = ReadConsulta.GetValue(1) Else objDocumento.RutaDocumentoTemporal = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objDocumento.RutaRelativaDocumento = ReadConsulta.GetValue(2) Else objDocumento.RutaRelativaDocumento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objDocumento.RutaDocumentoVisualizacion = ReadConsulta.GetValue(3) Else objDocumento.RutaDocumentoVisualizacion = ""

                    'agregamos a la lista
                    ObjListDocumento.Add(objDocumento)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' funcion que trae el listado de Releciones Financieras para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_TypeCosult As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of DocumentoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_TypeCosult

            Case "R"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentoClass
                    'cargamos datos sobre el objeto de login

                End While

            Case "F"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentoClass
                    'cargamos datos sobre el objeto de login

                    obj.RutaDocumento = ReadConsulta.GetValue(0)
                    obj.Formato = ReadConsulta.GetValue(1)
                    obj.Nombre_Save = ReadConsulta.GetValue(2)
                    obj.DescripFormato = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While

            Case "MatrixDocWork"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentoClass
                    'cargamos datos sobre el objeto de login

                    If Not (IsDBNull(ReadConsulta.GetValue(0))) Then obj.Secuencia_ID = ReadConsulta.GetValue(0) Else obj.Secuencia_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then obj.Documento_ID = ReadConsulta.GetValue(1) Else obj.Documento_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then obj.Nombre_Save = ReadConsulta.GetValue(2) Else obj.Nombre_Save = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.RutaDocumento = ReadConsulta.GetValue(3) Else obj.RutaDocumento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then obj.Formato = ReadConsulta.GetValue(4) Else obj.Formato = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then obj.Trama = ReadConsulta.GetValue(5) Else obj.Trama = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then obj.Indicativo = ReadConsulta.GetValue(6) Else obj.Indicativo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then obj.Verificado = ReadConsulta.GetValue(7) Else obj.Verificado = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then obj.Usuario_Verifico = ReadConsulta.GetValue(8) Else obj.Usuario_Verifico = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then obj.Fecha_Verifico = ReadConsulta.GetValue(9) Else obj.Fecha_Vencimiento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then obj.Observaciones_Captura = ReadConsulta.GetValue(10) Else obj.Observaciones_Captura = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then obj.Observaciones_Validacion = ReadConsulta.GetValue(11) Else obj.Observaciones_Validacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then obj.Fecha_Vencimiento = ReadConsulta.GetValue(12) Else obj.Fecha_Vencimiento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then obj.Fecha_Inicio_Vigencia = ReadConsulta.GetValue(13) Else obj.Fecha_Inicio_Vigencia = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then obj.DiasVigencia = ReadConsulta.GetValue(14) Else obj.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then obj.Nit_ID = ReadConsulta.GetValue(15) Else obj.Nit_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then obj.TypeDocument_ID = ReadConsulta.GetValue(16) Else obj.TypeDocument_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then obj.Document_ID = ReadConsulta.GetValue(17) Else obj.Document_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then obj.Contrato_ID = ReadConsulta.GetValue(18) Else obj.Contrato_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then obj.Ref_1 = ReadConsulta.GetValue(19) Else obj.Ref_1 = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then obj.Factura_ID = ReadConsulta.GetValue(20) Else obj.Factura_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then obj.Descripcion = ReadConsulta.GetValue(21) Else obj.Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then obj.TipoContenido = ReadConsulta.GetValue(22) Else obj.TipoContenido = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then obj.TipoVersion = ReadConsulta.GetValue(23) Else obj.TipoVersion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then obj.Ruta_ID_Plantilla = ReadConsulta.GetValue(24) Else obj.Ruta_ID_Plantilla = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then obj.NombrePlantilla = ReadConsulta.GetValue(25) Else obj.NombrePlantilla = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then obj.ChequeaVigencias = ReadConsulta.GetValue(26) Else obj.ChequeaVigencias = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then obj.DiasVigencia = ReadConsulta.GetValue(27) Else obj.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then obj.RequiereVerificacion = ReadConsulta.GetValue(28) Else obj.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then obj.DescripFormato = ReadConsulta.GetValue(29) Else obj.DescripFormato = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then obj.DescripContenido = ReadConsulta.GetValue(30) Else obj.DescripContenido = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then obj.DescripVersion = ReadConsulta.GetValue(31) Else obj.DescripVersion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(32))) Then obj.UsuarioCreacion = ReadConsulta.GetValue(32) Else obj.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(33))) Then obj.FechaCreacion = ReadConsulta.GetValue(33) Else obj.FechaCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(34))) Then obj.UsuarioActualizacion = ReadConsulta.GetValue(34) Else obj.UsuarioActualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(35))) Then obj.FechaActualizacion = ReadConsulta.GetValue(35) Else obj.FechaActualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(36))) Then obj.RutaRelativaDocumento = ReadConsulta.GetValue(36) Else obj.RutaRelativaDocumento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(37))) Then obj.RutaDocumentoTemporal = ReadConsulta.GetValue(37) Else obj.RutaDocumentoTemporal = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(38))) Then obj.RutaDocumentoVisualizacion = ReadConsulta.GetValue(38) Else obj.RutaDocumentoVisualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(39))) Then obj.DescripVerificacion = ReadConsulta.GetValue(39) Else obj.DescripVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(40))) Then obj.DescripEmpresa = ReadConsulta.GetValue(40) Else obj.DescripEmpresa = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(41))) Then obj.Consecutivo = ReadConsulta.GetValue(41) Else obj.Consecutivo = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(42))) Then obj.Secuencia_Doc = ReadConsulta.GetValue(42) Else obj.Secuencia_Doc = 0
                    'if Not (IsDBNull(ReadConsulta.GetValue(43))) Then obj.DescripEmpresa = ReadConsulta.GetValue(43) Else obj.DescripEmpresa = ""

                    Dim StrArchivo As String = obj.Nombre_Save & "." & obj.DescripFormato

                    obj.Copy_Document_Folder_View(obj.RutaDocumento, obj.RutaDocumentoVisualizacion, StrArchivo, "", "READ")

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function


#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As DocumentoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM DOCUMENTOS " & _
                       " WHERE DOC_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND DOC_Documentos_ID = '" & vp_O_Obj.Documento_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de documentos eliminar
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Documento()

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT DOC_Documentos_ID AS ID, " & _
                                         " CAST(DOC_Documentos_ID AS NVARCHAR(10)) + ' - ' + DOC_Descripcion AS Descripcion, " & _
                                         " DOC_Nit_ID, " & _
                                         " DOC_ChequeaVigencias, " & _
                                         " DOC_DiasVigencia, " & _
                                         " R.R_DESCRIPCION, " & _
                                         " DOC_RequiereVerificacion, " & _
                                         " DOC_Formato, " & _
                                         " DOC_IndicativoFoto, " & _
                                         " F.DDLL_Descripcion, " & _
                                         " C.CLI_N_Consecutivo, " & _
                                         " ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                                         " FROM DOCUMENTOS D " & _
                                         " INNER JOIN RUTA R ON R.R_Ruta_ID = D.DOC_Ruta_ID  AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                                         " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                                         " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID  = " & _
                                          "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                                          "                 WHEN '' THEN 0 " & _
                                          "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))   " & _
                                          " END ")

        StrQuery = sql.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "Matrix")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' Carga matrix de documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Documento_Filtro(ByVal vp_Obj_persona As ClienteClass)

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        sql.AppendLine(" SELECT DOC_Documentos_ID AS ID, " & _
                                         " CAST(DOC_Documentos_ID AS NVARCHAR(10)) + ' - ' + DOC_Descripcion AS Descripcion, " & _
                                         " DOC_Nit_ID, " & _
                                         " DOC_ChequeaVigencias, " & _
                                         " DOC_DiasVigencia, " & _
                                         " R.R_DESCRIPCION, " & _
                                         " DOC_RequiereVerificacion, " & _
                                         " DOC_Formato, " & _
                                         " DOC_IndicativoFoto, " & _
                                         " F.DDLL_Descripcion, " & _
                                         " C.CLI_N_Consecutivo, " & _
                                         " ROW_NUMBER() OVER(ORDER BY DOC_Documentos_ID ASC) AS Index_Documento " & _
                                         " FROM DOCUMENTOS D " & _
                                         " INNER JOIN RUTA R ON R.R_Ruta_ID = D.DOC_Ruta_ID  AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                                         " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'DOCUMENTOS' " & _
                                         " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID  = " & _
                                          "  CASE	 SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                                          "                 WHEN '' THEN 0 " & _
                                          "                ELSE SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))   " & _
                                          " END ")

        Select Case vp_Obj_persona.TipoSQL

            Case "Documento"
                vl_sql_filtro.Append(" WHERE DOC_Nit_ID ='" & vp_Obj_persona.Nit_ID & "'" & _
                                                     " ORDER BY DOC_Nit_ID ASC  ")
        End Select

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "Matrix")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' Carga matrix de documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_SecuenciaPadre(ByVal vp_Obj_persona As ClienteClass)

        Dim ObjListDocumento As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        sql.AppendLine(" SELECT  D.DE_Secuencia_ID, " & _
                                        " CAST(A.A_TypeDocument_ID AS NVARCHAR(2)) +' - '+ CAST(A.A_Document_ID AS NVARCHAR(20))+' - '+ CAST(D.DE_Secuencia_ID AS NVARCHAR(5)) as descripcion, " & _
                                        " A_Nit_ID " & _
                                        " FROM DOCUMENTOS_EXISTENTES D " & _
                                        " INNER JOIN ASOCIACION_DOCUMENTOS A ON A.A_Secuencia_ID = D.DE_Secuencia_ID ")
        Select Case vp_Obj_persona.TipoSQL

            Case "Documento"
                vl_sql_filtro.Append(" WHERE A_Nit_ID ='" & vp_Obj_persona.Nit_ID & "'" & _
                                                     " ORDER BY A_Nit_ID ASC  ")
        End Select

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListDocumento = listDocumento(StrQuery, Conexion, "Matrix_Secuencia")

        Return ObjListDocumento

    End Function

    ''' <summary>
    ''' trae las rutas de trabajo del ambiente
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function RutasOpe()

        Dim ObjList As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT TR_Ruta_ID, TR_Ruta_Temporal,  TR_Ruta_Relativa, TR_Ruta_Visualizacion FROM RUTAS_OPERACION ")
        StrQuery = sql.ToString

        ObjList = listDocumento(StrQuery, Conexion, "RutasOpe")

        Return ObjList

    End Function


    ''' <summary>
    ''' creala consulta para la tabla documentos para averiguar si tiene foto
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ExistFoto(ByVal vp_Obj_persona As ClienteClass)

        Dim ObjList As New List(Of DocumentoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        sql.Append(" SELECT DE_RutaDocumento," & _
                                   "       DE_Formato, " & _
                                   "       DE.DE_Nombre_Save, " & _
                                   "       D1.DDLL_Descripcion   " & _
                                   " FROM DOCUMENTOS_EXISTENTES DE " & _
                                   " INNER JOIN ASOCIACION_DOCUMENTOS AD ON AD.A_Secuencia_ID = DE.DE_Secuencia_ID  AND DE.DE_Nit_ID =AD.A_Nit_ID " & _
                                   " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' ")

        Select Case vp_Obj_persona.TipoSQL
            Case "Cliente"
                vl_sql_filtro.Append(" WHERE A_Nit_ID = '" & vp_Obj_persona.Nit_ID & "' " & _
                                                     " AND A_TypeDocument_ID = '" & vp_Obj_persona.TypeDocument_ID & "' " & _
                                                     " AND A_Document_ID = '" & vp_Obj_persona.Document_ID & "' AND DE_IndicativoFoto = 'S' ")

            Case "TipoServicio"
                vl_sql_filtro.Append(" WHERE A_Nit_ID = '" & vp_Obj_persona.Nit_ID & "' " & _
                                                     " AND A_TypeDocument_ID = '" & vp_Obj_persona.TypeDocument_ID & "' " & _
                                                     " AND A_Document_ID = '" & vp_Obj_persona.Document_ID & "' AND DE_IndicativoFoto = 'S' ")

        End Select

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjList = list(StrQuery, Conexion, "F")

        Return ObjList

    End Function

    ''' <summary>
    ''' carga documentos de la persona seleccionada
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function SearchDocument_People(ByVal vp_Obj_persona As ClienteClass)

        Dim ObjList As New List(Of DocumentoClass)
        Dim sql As New StringBuilder()
        Dim vl_sql_filtro As New StringBuilder

        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")
        Dim StrQuery As String = ""

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        sql.Append(" SELECT DE_Secuencia_ID, " & _
                                                " DE_Documento_ID, " & _
                                                " DE_Nombre_Save, " & _
                                                " DE_RutaDocumento, " & _
                                                " DE_Formato, " & _
                                                " DE_Trama, " & _
                                                " DE_IndicativoFoto, " & _
                                                " DE_Verificado, " & _
                                                " DE_Usuario_Verifico, " & _
                                                " DE_Fecha_Verifico," & _
                                                " DE_Observaciones_Captura, " & _
                                                " DE_Observaciones_Validacion, " & _
                                                " DE_Fecha_Vencimiento, " & _
                                                " DE_Fecha_Inicio_Vigencia," & _
                                                " DE_Dias_Vigencia, " & _
                                                " A_Nit_ID, " & _
                                                " A_TypeDocument_ID, " & _
                                                " A_Document_ID, " & _
                                                " A_Contrato_ID, " & _
                                                " A_Ref_1, " & _
                                                " A_Factura_ID, " & _
                                                " DOC_Descripcion, " & _
                                                " DOC_TipoContenido, " & _
                                                " DOC_TipoVersion, " & _
                                                " DOC_Ruta_ID_Plantilla, " & _
                                                " DOC_NombrePlantilla, " & _
                                                " DOC_ChequeaVigencias, " & _
                                                " DOC_DiasVigencia, " & _
                                                " DOC_RequiereVerificacion, " & _
                                                " D1.DDLL_Descripcion, " & _
                                                " D2.DDLL_Descripcion, " & _
                                                " D3.DDLL_Descripcion, " & _
                                                " DE_Usuario_Creacion, " & _
                                                " DE_FechaCreacion, " & _
                                                " DE_Usuario_Actualizacion, " & _
                                                " DE_FechaActualizacion, " & _
                                                " R.TR_Ruta_Relativa," & _
                                                " R.TR_Ruta_Temporal, " & _
                                               "  R.TR_Ruta_Visualizacion, " & _
                                                " D4.DDLL_Descripcion, " & _
                                                " C.CLI_Nombre + ' ' + C.CLI_Nombre_2  + ' ' +C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2 AS Nombre, " & _
                                                " C.CLI_N_Consecutivo, " & _
                                                " A_Secuencia_Doc " & _
                                 " FROM DOCUMENTOS_EXISTENTES DE " & _
                                " INNER JOIN ASOCIACION_DOCUMENTOS AD ON AD.A_Secuencia_ID = DE.DE_Secuencia_ID AND DE.DE_Nit_ID =AD.A_Nit_ID " & _
                                " LEFT JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = DE.DE_Documento_ID " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = D.DOC_TipoContenido AND D2.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D3 ON D3.DDL_ID = D.DOC_TipoVersion AND D3.DDL_Tabla = 'TIPO_VERSION' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D4 ON D4.DDL_ID = DE.DE_Verificado AND D4.DDL_Tabla = 'VERIFICACION' " & _
                                " LEFT JOIN RUTAS_OPERACION R ON R.TR_Ruta_ID = 'D' " & _
                                " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = AD.A_Document_ID AND DE.DE_Nit_ID = C.CLI_Nit_ID ")

        Select Case vp_Obj_persona.TipoSQL
            Case "Cliente"
                vl_sql_filtro.Append(" WHERE C.CLI_Nit_ID ='" & vp_Obj_persona.Nit_ID & "'" & _
                                                     " AND C.CLI_TypeDocument_ID ='" & vp_Obj_persona.TypeDocument_ID & "'" & _
                                                     " AND C.CLI_Document_ID = '" & vp_Obj_persona.Document_ID & "'" & _
                                                     " ORDER BY DE_Secuencia_ID ASC  ")
            Case "Pagina"
                vl_sql_filtro.Append(" WHERE C.CLI_TypeDocument_ID ='" & vp_Obj_persona.TypeDocument_ID & "'" & _
                                                     " AND C.CLI_Document_ID = '" & vp_Obj_persona.Document_ID & "' AND DE.DE_IndicativoFoto = 'S'  " & _
                                                     " ORDER BY DE_Secuencia_ID ASC  ")

            Case "Verificacion"
                vl_sql_filtro.Append(" WHERE C.CLI_Nit_ID ='" & vp_Obj_persona.Nit_ID & "'" & _
                                                     " ORDER BY DE_Secuencia_ID ASC  ")
        End Select

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjList = list(StrQuery, Conexion, "MatrixDocWork")

        Return ObjList
    End Function

    ''' <summary>
    ''' carga lista de documentos de la persona o empresa solicitada
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function List_Document_Work(ByVal vp_Obj_persona As ClienteClass)

        Dim ObjList As New List(Of DocumentoClass)

        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql_estruc As New StringBuilder
        Dim sql_order As New StringBuilder
        Dim sql_where As New StringBuilder

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        sql_estruc.Append(" SELECT DE_Secuencia_ID, " & _
                                                " DE_Documento_ID, " & _
                                                " DE_Nombre_Save, " & _
                                                " DE_RutaDocumento, " & _
                                                " DE_Formato, " & _
                                                " DE_Trama, " & _
                                                " DE_IndicativoFoto, " & _
                                                " DE_Verificado, " & _
                                                " DE_Usuario_Verifico, " & _
                                                " DE_Fecha_Verifico," & _
                                                " DE_Observaciones_Captura, " & _
                                                " DE_Observaciones_Validacion, " & _
                                                " DE_Fecha_Vencimiento, " & _
                                                " DE_Fecha_Inicio_Vigencia," & _
                                                " DE_Dias_Vigencia, " & _
                                                " A_Nit_ID, " & _
                                                " A_TypeDocument_ID, " & _
                                                " A_Document_ID, " & _
                                                " A_Contrato_ID, " & _
                                                " A_Ref_1, " & _
                                                " A_Factura_ID, " & _
                                                " DOC_Descripcion, " & _
                                                " DOC_TipoContenido, " & _
                                                " DOC_TipoVersion, " & _
                                                " DOC_Ruta_ID_Plantilla, " & _
                                                " DOC_NombrePlantilla, " & _
                                                " DOC_ChequeaVigencias, " & _
                                                " DOC_DiasVigencia, " & _
                                                " DOC_RequiereVerificacion, " & _
                                                " D1.DDLL_Descripcion, " & _
                                                " D2.DDLL_Descripcion, " & _
                                                " D3.DDLL_Descripcion, " & _
                                                " DE_Usuario_Creacion, " & _
                                                " DE_FechaCreacion, " & _
                                                " DE_Usuario_Actualizacion, " & _
                                                " DE_FechaActualizacion, " & _
                                                " R.TR_Ruta_Relativa," & _
                                                " R.TR_Ruta_Temporal, " & _
                                               "  R.TR_Ruta_Visualizacion, " & _
                                                " D4.DDLL_Descripcion, " & _
                                                " C.CLI_Nombre + ' ' + C.CLI_Nombre_2  + ' ' +C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2 AS Nombre, " & _
                                                " C.CLI_N_Consecutivo, " & _
                                                " A_Secuencia_Doc " & _
                                 " FROM DOCUMENTOS_EXISTENTES DE " & _
                                " INNER JOIN ASOCIACION_DOCUMENTOS AD ON AD.A_Secuencia_ID = DE.DE_Secuencia_ID AND DE.DE_Nit_ID =AD.A_Nit_ID " & _
                                " LEFT JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = DE.DE_Documento_ID " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = D.DOC_TipoContenido AND D2.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D3 ON D3.DDL_ID = D.DOC_TipoVersion AND D3.DDL_Tabla = 'TIPO_VERSION' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D4 ON D4.DDL_ID = DE.DE_Verificado AND D4.DDL_Tabla = 'VERIFICACION' " & _
                                " LEFT JOIN RUTAS_OPERACION R ON R.TR_Ruta_Temporal <> DE.DE_RutaDocumento " & _
                                " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = AD.A_Document_ID AND DE.DE_Nit_ID = C.CLI_Nit_ID ")

        If vp_Obj_persona.TipoSQL = "Persona" Then
            sql_where.Append(" WHERE  " & _
                                                " C.CLI_TypeDocument_ID = '" & vp_Obj_persona.TypeDocument_ID & "' AND " & _
                                                " C.CLI_Document_ID = '" & vp_Obj_persona.Document_ID & "' AND " & _
                                                " C.CLI_Nit_ID = '" & vp_Obj_persona.Nit_ID & "'")

        Else
            sql_where.Append(" WHERE  " & _
                                                        " C.CLI_Document_ID = CASE SUBSTRING('" & vp_Obj_persona.Nit_ID & "',0,LEN('" & vp_Obj_persona.Nit_ID & "')) " & _
                                                        "                                                 WHEN '' THEN 0 " & _
                                                        "                                                 ELSE SUBSTRING('" & vp_Obj_persona.Nit_ID & "',0,LEN('" & vp_Obj_persona.Nit_ID & "')) " & _
                                                        "                                                 END ")
        End If

        sql_order.Append(" ORDER BY DE_Secuencia_ID ASC  ")

        Dim StrQuery As String = sql_estruc.ToString & sql_where.ToString & sql_order.ToString

        ObjList = list(StrQuery, Conexion, "MatrixDocWork")

        Return ObjList
    End Function

#End Region

End Class
