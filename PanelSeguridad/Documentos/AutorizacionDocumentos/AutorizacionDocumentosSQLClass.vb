Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class AutorizacionDocumentosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla AutorizacionDocumentos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllAutorizacionDocumentos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListAutorizacionDocumentos As New List(Of AutorizacionDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_AutorizacionDocumentoss_ID, " & _
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
                        "       ROW_NUMBER() OVER(ORDER BY DOC_AutorizacionDocumentoss_ID ASC) AS Index_AutorizacionDocumentos " & _
                        "  FROM AutorizacionDocumentosS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'AutorizacionDocumentosS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_AutorizacionDocumentoss_ID, " & _
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
                        "       ROW_NUMBER() OVER(ORDER BY DOC_AutorizacionDocumentoss_ID ASC) AS Index_AutorizacionDocumentos " & _
                        "  FROM AutorizacionDocumentosS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'AutorizacionDocumentosS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))")
            Else
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_AutorizacionDocumentoss_ID, " & _
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
                        "       ROW_NUMBER() OVER(ORDER BY DOC_AutorizacionDocumentoss_ID ASC) AS Index_AutorizacionDocumentos " & _
                        "  FROM AutorizacionDocumentosS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'AutorizacionDocumentosS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListAutorizacionDocumentos = listAutorizacionDocumentos(StrQuery, Conexion, "List")

        Return ObjListAutorizacionDocumentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo AutorizacionDocumentos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_AutorizacionDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAutorizacionDocumentos(ByVal vp_Obj_AutorizacionDocumentos As AutorizacionDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT AutorizacionDocumentosS (" & _
            "DOC_Nit_ID," & _
            "DOC_AutorizacionDocumentoss_ID," & _
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
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.AutorizacionDocumentos_ID & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.TipoContenido & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Formato & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.TipoVersion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Ruta_ID & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Indicativo & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.Ruta_ID_Plantilla & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.NombrePlantilla & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.DiasVigencia & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.RequiereVerificacion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_AutorizacionDocumentos.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del AutorizacionDocumentos (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_AutorizacionDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateDocumentos_Existentes(ByVal vp_Obj_AutorizacionDocumentos As DocumentoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE DOCUMENTOS_EXISTENTES SET " & _
                       " DE_Verificado='" & vp_Obj_AutorizacionDocumentos.Verificado & "', " & _
                       " DE_Fecha_Verifico='" & vp_Obj_AutorizacionDocumentos.Fecha_Verifico & "', " & _
                       " DE_Observaciones_Validacion='" & vp_Obj_AutorizacionDocumentos.Observaciones_Validacion & "', " & _
                       " DE_Usuario_Verifico ='" & vp_Obj_AutorizacionDocumentos.Usuario_Verifico & "', " & _
                       " DE_Usuario_Actualizacion ='" & vp_Obj_AutorizacionDocumentos.UsuarioActualizacion & "', " & _
                       " DE_FechaActualizacion ='" & vp_Obj_AutorizacionDocumentos.FechaActualizacion & "' " & _
                       " WHERE  DE_Nombre_Save = '" & vp_Obj_AutorizacionDocumentos.DescripVerificacion & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del AutorizacionDocumentos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_AutorizacionDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseAutorizacionDocumentos(ByVal vp_Obj_AutorizacionDocumentos As AutorizacionDocumentosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE AutorizacionDocumentosS WHERE DOC_Nit_ID = '" & vp_Obj_AutorizacionDocumentos.Nit_ID & "' AND DOC_AutorizacionDocumentoss_ID = '" & vp_Obj_AutorizacionDocumentos.AutorizacionDocumentos_ID & "'")
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
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListVerificacion()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID, DDL_ID +' - ' + DDLL_Descripcion AS DESCRIPCION FROM TC_DDL_TIPO WHERE DDL_Tabla = 'VERIFICACION' AND DDL_ID <> 0")
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
    Public Function Charge_DropListAutorizacionDocumentosDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_AutorizacionDocumentos_ID AS ID,CAST(A_AutorizacionDocumentos_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM AutorizacionDocumentos " & _
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

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'AutorizacionDocumentosS' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de AutorizacionDocumentos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listAutorizacionDocumentos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListAutorizacionDocumentos As New List(Of AutorizacionDocumentosClass)

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

                    Dim objAutorizacionDocumentos As New AutorizacionDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objAutorizacionDocumentos.Nit_ID = ReadConsulta.GetValue(0)
                    objAutorizacionDocumentos.AutorizacionDocumentos_ID = ReadConsulta.GetValue(1)
                    objAutorizacionDocumentos.Descripcion = ReadConsulta.GetValue(2)

                    objAutorizacionDocumentos.TipoContenido = ReadConsulta.GetValue(3)
                    objAutorizacionDocumentos.Formato = ReadConsulta.GetValue(4)
                    objAutorizacionDocumentos.TipoVersion = ReadConsulta.GetValue(5)
                    objAutorizacionDocumentos.Ruta_ID = ReadConsulta.GetValue(6)
                    objAutorizacionDocumentos.Indicativo = ReadConsulta.GetValue(7)
                    objAutorizacionDocumentos.Ruta_ID_Plantilla = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objAutorizacionDocumentos.NombrePlantilla = ReadConsulta.GetValue(9) Else objAutorizacionDocumentos.NombrePlantilla = ""

                    objAutorizacionDocumentos.UsuarioCreacion = ReadConsulta.GetValue(10)
                    objAutorizacionDocumentos.FechaCreacion = ReadConsulta.GetValue(11)
                    objAutorizacionDocumentos.UsuarioActualizacion = ReadConsulta.GetValue(12)
                    objAutorizacionDocumentos.FechaActualizacion = ReadConsulta.GetValue(13)

                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objAutorizacionDocumentos.ChequeaVigencias = ReadConsulta.GetValue(14) Else objAutorizacionDocumentos.ChequeaVigencias = "N"
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objAutorizacionDocumentos.DiasVigencia = ReadConsulta.GetValue(15) Else objAutorizacionDocumentos.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objAutorizacionDocumentos.RequiereVerificacion = ReadConsulta.GetValue(16) Else objAutorizacionDocumentos.RequiereVerificacion = "N"

                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objAutorizacionDocumentos.DescripContenido = ReadConsulta.GetValue(17) Else objAutorizacionDocumentos.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objAutorizacionDocumentos.DescripFormato = ReadConsulta.GetValue(18) Else objAutorizacionDocumentos.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objAutorizacionDocumentos.DescripVersion = ReadConsulta.GetValue(19) Else objAutorizacionDocumentos.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objAutorizacionDocumentos.DescripRuta = ReadConsulta.GetValue(20) Else objAutorizacionDocumentos.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objAutorizacionDocumentos.DescripRutaPlantilla = ReadConsulta.GetValue(21) Else objAutorizacionDocumentos.RequiereVerificacion = ""

                    objAutorizacionDocumentos.DescripEmpresa = ReadConsulta.GetValue(22)
                    objAutorizacionDocumentos.Index = ReadConsulta.GetValue(23)

                    'agregamos a la lista
                    ObjListAutorizacionDocumentos.Add(objAutorizacionDocumentos)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objAutorizacionDocumentos As New AutorizacionDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objAutorizacionDocumentos.AutorizacionDocumentos_ID = ReadConsulta.GetValue(0)
                    objAutorizacionDocumentos.Descripcion = ReadConsulta.GetValue(1)
                    objAutorizacionDocumentos.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListAutorizacionDocumentos.Add(objAutorizacionDocumentos)

                End While

        End Select


        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListAutorizacionDocumentos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As AutorizacionDocumentosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM AutorizacionDocumentosS " & _
                       " WHERE DOC_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND DOC_AutorizacionDocumentoss_ID = '" & vp_O_Obj.AutorizacionDocumentos_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de AutorizacionDocumentoss
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_AutorizacionDocumentos()

        Dim ObjListAutorizacionDocumentos As New List(Of AutorizacionDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT DOC_AutorizacionDocumentoss_ID AS ID, CAST(DOC_AutorizacionDocumentoss_ID AS NVARCHAR(10)) + ' - ' + DOC_Descripcion AS Descripcion, DOC_Nit_ID  FROM AutorizacionDocumentosS ")

        StrQuery = sql.ToString

        ObjListAutorizacionDocumentos = listAutorizacionDocumentos(StrQuery, Conexion, "Matrix")

        Return ObjListAutorizacionDocumentos

    End Function

#End Region

End Class
