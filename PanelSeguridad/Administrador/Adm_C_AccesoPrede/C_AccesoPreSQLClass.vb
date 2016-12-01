Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_AccesoPreSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla C_AccesoPre parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllC_AccesoPre(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListR_PuertaAcc_Area As New List(Of C_AccesoPreClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  RPAP_Nit_ID, " & _
                                    " 			   RPAP_TypeDocument_ID, " & _
                                    " 			   RPAP_Document_ID, " & _
                                    " 			   RPAP_Tarjeta_ID, " & _
                                    " 			   RPAP_Nit_ID_EmpVisita, " & _
                                    " 			   RPAP_PuertaAcceso_ID, " & _
                                    " 			   RPAP_Area_ID, " & _
                                    " 			   RPAP_TypeDocument_ID_Per_Encargada, " & _
                                    " 			   RPAP_Document_ID_Per_Encargada, " & _
                                    " 			   RPAP_CotrolVigencia, " & _
                                    " 			   RPAP_FechaInicio_Vigencia, " & _
                                    " 			   RPAP_HoraInicio, " & _
                                    " 			   RPAP_FechaFin_Vigencia, " & _
                                    " 			   RPAP_HoraFin, " & _
                                    " 			   RPAP_Estado, " & _
                                    " 			   RPAP_Usuario_Creacion, " & _
                                    " 			   RPAP_FechaCreacion, " & _
                                    " 			   RPAP_Usuario_Actualizacion, " & _
                                    " 			   RPAP_FechaActualizacion, " & _
                                    " 			   RPAP_Usuario_Eliminacion, " & _
                                    " 			   RPAP_FechaEliminacion, " & _
                                    "              C.CLI_Nombre + ' ' + C.CLI_Nombre_2 + ' ' + C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2, " & _
                                    "              RPAP_HorarioIngreso, " & _
                                    "              C2.CLI_Nombre + ' ' + C2.CLI_Nombre_2 + ' ' + C2.CLI_Apellido_1 + ' ' + C2.CLI_Apellido_2 AS P_ING, " & _
                                    "              C3.CLI_Nombre + ' ' + C3.CLI_Nombre_2 + ' ' + C3.CLI_Apellido_1 + ' ' + C3.CLI_Apellido_2 AS EMP_ING, " & _
                                    "              C4.CLI_Nombre + ' ' + C4.CLI_Nombre_2 + ' ' + C4.CLI_Apellido_1 + ' ' + C4.CLI_Apellido_2 AS P_ENC, " & _
                                    "              PA.PA_Descripcion, " & _
                                    "              A.A_Descripcion, " & _
                                    "              DDL.DDLL_Descripcion, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPAP_Nit_ID  DESC) AS Index_C_AccesoPre " & _
                                    " FROM R_PERSONAS_ACCESOS_PREDETER  RPAP " & _
                                    " LEFT JOIN  PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPAP.RPAP_PuertaAcceso_ID AND PA.PA_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN   TC_DDL_TIPO DDL ON DDL.DDL_ID = RPAP.RPAP_HorarioIngreso AND DDL.DDL_Tabla='TIPO_INGRESO' " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C2 ON C2.CLI_Document_ID = RPAP.RPAP_Document_ID AND C2.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C4 ON C4.CLI_Document_ID = RPAP.RPAP_Document_ID_Per_Encargada  AND C4.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita" & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPAP.RPAP_Area_ID AND A.A_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID))   " & _
                                    " END " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C3 ON C3.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita)) " & _
                                    "   WHEN '' THEN 0 " & _
                                    "   ELSE SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita))  " & _
                                    " END  AND C3.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " WHERE RPAP_Estado = '1'")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT  RPAP_Nit_ID, " & _
                                    " 			   RPAP_TypeDocument_ID, " & _
                                    " 			   RPAP_Document_ID, " & _
                                    " 			   RPAP_Tarjeta_ID, " & _
                                    " 			   RPAP_Nit_ID_EmpVisita, " & _
                                    " 			   RPAP_PuertaAcceso_ID, " & _
                                    " 			   RPAP_Area_ID, " & _
                                    " 			   RPAP_TypeDocument_ID_Per_Encargada, " & _
                                    " 			   RPAP_Document_ID_Per_Encargada, " & _
                                    " 			   RPAP_CotrolVigencia, " & _
                                    " 			   RPAP_FechaInicio_Vigencia, " & _
                                    " 			   RPAP_HoraInicio, " & _
                                    " 			   RPAP_FechaFin_Vigencia, " & _
                                    " 			   RPAP_HoraFin, " & _
                                    " 			   RPAP_Estado, " & _
                                    " 			   RPAP_Usuario_Creacion, " & _
                                    " 			   RPAP_FechaCreacion, " & _
                                    " 			   RPAP_Usuario_Actualizacion, " & _
                                    " 			   RPAP_FechaActualizacion, " & _
                                    " 			   RPAP_Usuario_Eliminacion, " & _
                                    " 			   RPAP_FechaEliminacion, " & _
                                    "              C.CLI_Nombre + ' ' + C.CLI_Nombre_2 + ' ' + C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2, " & _
                                    "              RPAP_HorarioIngreso, " & _
                                    "              C2.CLI_Nombre + ' ' + C2.CLI_Nombre_2 + ' ' + C2.CLI_Apellido_1 + ' ' + C2.CLI_Apellido_2 AS P_ING, " & _
                                    "              C3.CLI_Nombre + ' ' + C3.CLI_Nombre_2 + ' ' + C3.CLI_Apellido_1 + ' ' + C3.CLI_Apellido_2 AS EMP_ING, " & _
                                    "              C4.CLI_Nombre + ' ' + C4.CLI_Nombre_2 + ' ' + C4.CLI_Apellido_1 + ' ' + C4.CLI_Apellido_2 AS P_ENC, " & _
                                    "              PA.PA_Descripcion, " & _
                                    "              A.A_Descripcion, " & _
                                    "              DDL.DDLL_Descripcion, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPAP_Nit_ID  DESC) AS Index_C_AccesoPre " & _
                                    " FROM R_PERSONAS_ACCESOS_PREDETER  RPAP " & _
                                    " LEFT JOIN  PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPAP.RPAP_PuertaAcceso_ID AND PA.PA_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN   TC_DDL_TIPO DDL ON DDL.DDL_ID = RPAP.RPAP_HorarioIngreso AND DDL.DDL_Tabla='TIPO_INGRESO' " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C2 ON C2.CLI_Document_ID = RPAP.RPAP_Document_ID AND C2.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C4 ON C4.CLI_Document_ID = RPAP.RPAP_Document_ID_Per_Encargada  AND C4.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita" & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPAP.RPAP_Area_ID AND A.A_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID))   " & _
                                    " END " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C3 ON C3.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita)) " & _
                                    "   WHEN '' THEN 0 " & _
                                    "   ELSE SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita))  " & _
                                    " END  AND C3.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " WHERE RPAP_Estado = '1'")
            Else
                sql.Append(" SELECT  RPAP_Nit_ID, " & _
                                    " 			   RPAP_TypeDocument_ID, " & _
                                    " 			   RPAP_Document_ID, " & _
                                    " 			   RPAP_Tarjeta_ID, " & _
                                    " 			   RPAP_Nit_ID_EmpVisita, " & _
                                    " 			   RPAP_PuertaAcceso_ID, " & _
                                    " 			   RPAP_Area_ID, " & _
                                    " 			   RPAP_TypeDocument_ID_Per_Encargada, " & _
                                    " 			   RPAP_Document_ID_Per_Encargada, " & _
                                    " 			   RPAP_CotrolVigencia, " & _
                                    " 			   RPAP_FechaInicio_Vigencia, " & _
                                    " 			   RPAP_HoraInicio, " & _
                                    " 			   RPAP_FechaFin_Vigencia, " & _
                                    " 			   RPAP_HoraFin, " & _
                                    " 			   RPAP_Estado, " & _
                                    " 			   RPAP_Usuario_Creacion, " & _
                                    " 			   RPAP_FechaCreacion, " & _
                                    " 			   RPAP_Usuario_Actualizacion, " & _
                                    " 			   RPAP_FechaActualizacion, " & _
                                    " 			   RPAP_Usuario_Eliminacion, " & _
                                    " 			   RPAP_FechaEliminacion, " & _
                                    "              C.CLI_Nombre + ' ' + C.CLI_Nombre_2 + ' ' + C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2, " & _
                                    "              RPAP_HorarioIngreso, " & _
                                    "              C2.CLI_Nombre + ' ' + C2.CLI_Nombre_2 + ' ' + C2.CLI_Apellido_1 + ' ' + C2.CLI_Apellido_2 AS P_ING, " & _
                                    "              C3.CLI_Nombre + ' ' + C3.CLI_Nombre_2 + ' ' + C3.CLI_Apellido_1 + ' ' + C3.CLI_Apellido_2 AS EMP_ING, " & _
                                    "              C4.CLI_Nombre + ' ' + C4.CLI_Nombre_2 + ' ' + C4.CLI_Apellido_1 + ' ' + C4.CLI_Apellido_2 AS P_ENC, " & _
                                    "              PA.PA_Descripcion, " & _
                                    "              A.A_Descripcion, " & _
                                    "              DDL.DDLL_Descripcion, " & _
                                    " 			  ROW_NUMBER() OVER(ORDER BY RPAP_Nit_ID  DESC) AS Index_C_AccesoPre " & _
                                    " FROM R_PERSONAS_ACCESOS_PREDETER  RPAP " & _
                                    " LEFT JOIN  PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPAP.RPAP_PuertaAcceso_ID AND PA.PA_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN   TC_DDL_TIPO DDL ON DDL.DDL_ID = RPAP.RPAP_HorarioIngreso AND DDL.DDL_Tabla='TIPO_INGRESO' " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C2 ON C2.CLI_Document_ID = RPAP.RPAP_Document_ID AND C2.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C4 ON C4.CLI_Document_ID = RPAP.RPAP_Document_ID_Per_Encargada  AND C4.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita" & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPAP.RPAP_Area_ID AND A.A_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                    " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID)) " & _
                                    "                 WHEN '' THEN 0 " & _
                                    "                ELSE SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID))   " & _
                                    " END " & _
                                    " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C3 ON C3.CLI_Document_ID =  " & _
                                    " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita)) " & _
                                    "   WHEN '' THEN 0 " & _
                                    "   ELSE SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita))  " & _
                                    " END  AND C3.CLI_Nit_ID  = RPAP.RPAP_Nit_ID_EmpVisita " & _
                                    " WHERE RPAP_Estado = '1'" & _
                                    " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListR_PuertaAcc_Area = listC_AccesoPre(StrQuery, Conexion, "List")

        Return ObjListR_PuertaAcc_Area

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_AccesoPre (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_C_AccesoPre"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_AccesoPre(ByVal vp_Obj_C_AccesoPre As C_AccesoPreClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_PERSONAS_ACCESOS_PREDETER (" & _
            "RPAP_Nit_ID," & _
            "RPAP_TypeDocument_ID," & _
            "RPAP_Document_ID," & _
            "RPAP_Tarjeta_ID," & _
            "RPAP_Nit_ID_EmpVisita," & _
            "RPAP_PuertaAcceso_ID," & _
            "RPAP_Area_ID," & _
            "RPAP_TypeDocument_ID_Per_Encargada," & _
            "RPAP_Document_ID_Per_Encargada," & _
            "RPAP_CotrolVigencia," & _
            "RPAP_FechaInicio_Vigencia," & _
            "RPAP_HoraInicio," & _
            "RPAP_FechaFin_Vigencia," & _
            "RPAP_HoraFin," & _
            "RPAP_Estado," & _
            "RPAP_HorarioIngreso, " & _
            "RPAP_Usuario_Creacion," & _
            "RPAP_FechaCreacion," & _
            "RPAP_Usuario_Actualizacion," & _
            "RPAP_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Nit_ID_EmpVisita & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.PuertaAcceso_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Area_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.TypeDocument_ID_Per_Encargada & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Document_ID_Per_Encargada & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.ControlVigencia & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaInicio_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.HoraInicio & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaFin_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.HoraFin & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Estado & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.TipoIngreso & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del C_AccesoPre (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_C_AccesoPre"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateC_AccesoPre(ByVal vp_Obj_C_AccesoPre As C_AccesoPreClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE R_PERSONAS_ACCESOS_PREDETER SET " & _
                       " RPAP_CotrolVigencia ='" & vp_Obj_C_AccesoPre.ControlVigencia & "', " & _
                       " RPAP_FechaInicio_Vigencia ='" & vp_Obj_C_AccesoPre.FechaInicio_Vigencia & "', " & _
                       " RPAP_HoraInicio ='" & vp_Obj_C_AccesoPre.HoraInicio & "', " & _
                       " RPAP_FechaFin_Vigencia ='" & vp_Obj_C_AccesoPre.FechaFin_Vigencia & "', " & _
                       " RPAP_HoraFin ='" & vp_Obj_C_AccesoPre.HoraFin & "', " & _
                       " RPAP_HorarioIngreso ='" & vp_Obj_C_AccesoPre.TipoIngreso & "', " & _
                        " RPAP_Usuario_Actualizacion ='" & vp_Obj_C_AccesoPre.UsuarioActualizacion & "', " & _
                       " RPAP_FechaActualizacion ='" & vp_Obj_C_AccesoPre.FechaActualizacion & "' " & _
                       " WHERE RPAP_Nit_ID = '" & vp_Obj_C_AccesoPre.Nit_ID & "'" & _
                       " AND RPAP_TypeDocument_ID = '" & vp_Obj_C_AccesoPre.TypeDocument_ID & "'" & _
                       " AND RPAP_Document_ID = '" & vp_Obj_C_AccesoPre.Document_ID & "'" & _
                       " AND RPAP_Tarjeta_ID = '" & vp_Obj_C_AccesoPre.Tarjeta_ID & "'" & _
                       " AND RPAP_Nit_ID_EmpVisita = '" & vp_Obj_C_AccesoPre.Nit_ID_EmpVisita & "'" & _
                       " AND RPAP_PuertaAcceso_ID = '" & vp_Obj_C_AccesoPre.PuertaAcceso_ID & "'" & _
                       " AND RPAP_Area_ID = '" & vp_Obj_C_AccesoPre.Area_ID & "'" & _
                       " AND RPAP_TypeDocument_ID_Per_Encargada = '" & vp_Obj_C_AccesoPre.TypeDocument_ID_Per_Encargada & "'" & _
                       " AND RPAP_Document_ID_Per_Encargada = '" & vp_Obj_C_AccesoPre.Document_ID_Per_Encargada & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del C_AccesoPre (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_C_AccesoPre"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseC_AccesoPre(ByVal vp_Obj_C_AccesoPre As C_AccesoPreClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("UPDATE R_PERSONAS_ACCESOS_PREDETER SET " & _
                       " RPAP_Estado ='" & vp_Obj_C_AccesoPre.Estado & "', " & _
                       " RPAP_Usuario_Eliminacion ='" & vp_Obj_C_AccesoPre.UsuarioEliminacion & "', " & _
                       " RPAP_FechaEliminacion ='" & vp_Obj_C_AccesoPre.FechaEliminacion & "' " & _
                       " WHERE RPAP_Nit_ID = '" & vp_Obj_C_AccesoPre.Nit_ID & "'" & _
                       " AND RPAP_TypeDocument_ID = '" & vp_Obj_C_AccesoPre.TypeDocument_ID & "'" & _
                       " AND RPAP_Document_ID = '" & vp_Obj_C_AccesoPre.Document_ID & "'" & _
                       " AND RPAP_Tarjeta_ID = '" & vp_Obj_C_AccesoPre.Tarjeta_ID & "'" & _
                       " AND RPAP_Nit_ID_EmpVisita = '" & vp_Obj_C_AccesoPre.Nit_ID_EmpVisita & "'" & _
                       " AND RPAP_PuertaAcceso_ID = '" & vp_Obj_C_AccesoPre.PuertaAcceso_ID & "'" & _
                       " AND RPAP_Area_ID = '" & vp_Obj_C_AccesoPre.Area_ID & "'" & _
                       " AND RPAP_TypeDocument_ID_Per_Encargada = '" & vp_Obj_C_AccesoPre.TypeDocument_ID_Per_Encargada & "'" & _
                       " AND RPAP_Document_ID_Per_Encargada = '" & vp_Obj_C_AccesoPre.Document_ID_Per_Encargada & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTipo_Ingreso()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'TIPO_INGRESO' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de C_AccesoPre para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listC_AccesoPre(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListC_AccesoPre As New List(Of C_AccesoPreClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"
                While ReadConsulta.Read

                    Dim objC_AccesoPre As New C_AccesoPreClass
                    'cargamos datos sobre el objeto de login
                    objC_AccesoPre.Nit_ID = ReadConsulta.GetValue(0)
                    objC_AccesoPre.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objC_AccesoPre.Document_ID = ReadConsulta.GetValue(2)
                    objC_AccesoPre.Tarjeta_ID = ReadConsulta.GetValue(3)
                    objC_AccesoPre.Nit_ID_EmpVisita = ReadConsulta.GetValue(4)
                    objC_AccesoPre.PuertaAcceso_ID = ReadConsulta.GetValue(5)
                    objC_AccesoPre.Area_ID = ReadConsulta.GetValue(6)
                    objC_AccesoPre.TypeDocument_ID_Per_Encargada = ReadConsulta.GetValue(7)
                    objC_AccesoPre.Document_ID_Per_Encargada = ReadConsulta.GetValue(8)
                    objC_AccesoPre.ControlVigencia = ReadConsulta.GetValue(9)
                    objC_AccesoPre.FechaInicio_Vigencia = ReadConsulta.GetValue(10)
                    objC_AccesoPre.HoraInicio = ReadConsulta.GetValue(11)
                    objC_AccesoPre.FechaFin_Vigencia = ReadConsulta.GetValue(12)
                    objC_AccesoPre.HoraFin = ReadConsulta.GetValue(13)
                    objC_AccesoPre.Estado = ReadConsulta.GetValue(14)

                    objC_AccesoPre.UsuarioCreacion = ReadConsulta.GetValue(15)
                    objC_AccesoPre.FechaCreacion = ReadConsulta.GetValue(16)
                    objC_AccesoPre.UsuarioActualizacion = ReadConsulta.GetValue(17)
                    objC_AccesoPre.FechaActualizacion = ReadConsulta.GetValue(18)

                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objC_AccesoPre.UsuarioEliminacion = ReadConsulta.GetValue(19) Else objC_AccesoPre.UsuarioEliminacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objC_AccesoPre.FechaEliminacion = ReadConsulta.GetValue(20) Else objC_AccesoPre.FechaEliminacion = ""

                    objC_AccesoPre.DescripEmpresa = ReadConsulta.GetValue(21)
                    objC_AccesoPre.TipoIngreso = ReadConsulta.GetValue(22)

                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objC_AccesoPre.DescripPersona_Ing = ReadConsulta.GetValue(23) Else objC_AccesoPre.DescripPersona_Ing = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objC_AccesoPre.DescripEmpresa_Ing = ReadConsulta.GetValue(24) Else objC_AccesoPre.DescripEmpresa_Ing = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objC_AccesoPre.DescripPersona_Enc = ReadConsulta.GetValue(25) Else objC_AccesoPre.DescripPersona_Enc = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objC_AccesoPre.DescripPuertaAcceso = ReadConsulta.GetValue(26) Else objC_AccesoPre.DescripPuertaAcceso = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objC_AccesoPre.DescripAreaAcceso = ReadConsulta.GetValue(27) Else objC_AccesoPre.DescripAreaAcceso = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objC_AccesoPre.DescripTipoIngreso = ReadConsulta.GetValue(28) Else objC_AccesoPre.DescripTipoIngreso = ""
                    objC_AccesoPre.Index = ReadConsulta.GetValue(29)

                    'agregamos a la lista
                    ObjListC_AccesoPre.Add(objC_AccesoPre)
                End While

            Case "Matrix_RTP"
                While ReadConsulta.Read

                    Dim objC_AccesoPre As New C_AccesoPreClass
                    'cargamos datos sobre el objeto de login
                    objC_AccesoPre.Nit_ID = ReadConsulta.GetValue(0)
                    objC_AccesoPre.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objC_AccesoPre.Document_ID = ReadConsulta.GetValue(2)
                    objC_AccesoPre.Tarjeta_ID = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListC_AccesoPre.Add(objC_AccesoPre)
                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListC_AccesoPre

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_AccesoPreClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_PERSONAS_ACCESOS_PREDETER " & _
                       " WHERE RPAP_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RPAP_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND RPAP_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                       " AND RPAP_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'" & _
                       " AND RPAP_Nit_ID_EmpVisita = '" & vp_O_Obj.Nit_ID_EmpVisita & "'" & _
                       " AND RPAP_PuertaAcceso_ID = '" & vp_O_Obj.PuertaAcceso_ID & "'" & _
                       " AND RPAP_Area_ID = '" & vp_O_Obj.Area_ID & "'" & _
                       " AND RPAP_TypeDocument_ID_Per_Encargada = '" & vp_O_Obj.TypeDocument_ID_Per_Encargada & "'" & _
                       " AND RPAP_Document_ID_Per_Encargada = '" & vp_O_Obj.Document_ID_Per_Encargada & "'")
        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' consulta que trae los datos de asignar tarjeta
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_RTP()

        Dim ObjListCrud_Doc As New List(Of C_AccesoPreClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  RTP_Nit_ID, RTP_TypeDocument_ID, RTP_Document_ID, RTP_Tarjeta_ID  FROM  R_TARJETA_PERSONA")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listC_AccesoPre(StrQuery, Conexion, "Matrix_RTP")

        Return ObjListCrud_Doc

    End Function

    ''' <summary>
    ''' consulta que trae todos los datos de accesos predeterminados
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_TAccesoPreddeterminado()

        Dim ObjListCrud_Doc As New List(Of C_AccesoPreClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT  RPAP_Nit_ID, " & _
                                 " 			   RPAP_TypeDocument_ID, " & _
                                 " 			   RPAP_Document_ID, " & _
                                 " 			   RPAP_Tarjeta_ID, " & _
                                 " 			   RPAP_Nit_ID_EmpVisita, " & _
                                 " 			   RPAP_PuertaAcceso_ID, " & _
                                 " 			   RPAP_Area_ID, " & _
                                 " 			   RPAP_TypeDocument_ID_Per_Encargada, " & _
                                 " 			   RPAP_Document_ID_Per_Encargada, " & _
                                 " 			   RPAP_CotrolVigencia, " & _
                                 " 			   RPAP_FechaInicio_Vigencia, " & _
                                 " 			   RPAP_HoraInicio, " & _
                                 " 			   RPAP_FechaFin_Vigencia, " & _
                                 " 			   RPAP_HoraFin, " & _
                                 " 			   RPAP_Estado, " & _
                                 " 			   RPAP_Usuario_Creacion, " & _
                                 " 			   RPAP_FechaCreacion, " & _
                                 " 			   RPAP_Usuario_Actualizacion, " & _
                                 " 			   RPAP_FechaActualizacion, " & _
                                 " 			   RPAP_Usuario_Eliminacion, " & _
                                 " 			   RPAP_FechaEliminacion, " & _
                                 "              C.CLI_Nombre + ' ' + C.CLI_Nombre_2 + ' ' + C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2, " & _
                                 "              RPAP_HorarioIngreso, " & _
                                 "              C2.CLI_Nombre + ' ' + C2.CLI_Nombre_2 + ' ' + C2.CLI_Apellido_1 + ' ' + C2.CLI_Apellido_2 AS P_ING, " & _
                                 "              C3.CLI_Nombre + ' ' + C3.CLI_Nombre_2 + ' ' + C3.CLI_Apellido_1 + ' ' + C3.CLI_Apellido_2 AS EMP_ING, " & _
                                 "              C4.CLI_Nombre + ' ' + C4.CLI_Nombre_2 + ' ' + C4.CLI_Apellido_1 + ' ' + C4.CLI_Apellido_2 AS P_ENC, " & _
                                 "              PA.PA_Descripcion, " & _
                                 "              A.A_Descripcion, " & _
                                 "              DDL.DDLL_Descripcion, " & _
                                 " 			  ROW_NUMBER() OVER(ORDER BY RPAP_Nit_ID  DESC) AS Index_C_AccesoPre " & _
                                 " FROM R_PERSONAS_ACCESOS_PREDETER  RPAP " & _
                                 " LEFT JOIN  PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = RPAP.RPAP_PuertaAcceso_ID AND PA.PA_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                 " LEFT JOIN   TC_DDL_TIPO DDL ON DDL.DDL_ID = RPAP.RPAP_HorarioIngreso AND DDL.DDL_Tabla='TIPO_INGRESO' " & _
                                 " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C2 ON C2.CLI_Document_ID = RPAP.RPAP_Document_ID  AND C2.CLI_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                 " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C4 ON C4.CLI_Document_ID = RPAP.RPAP_Document_ID_Per_Encargada AND C4.CLI_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                 " LEFT JOIN  " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = RPAP.RPAP_Area_ID AND A.A_Nit_ID = RPAP.RPAP_Nit_ID " & _
                                 " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID =  " & _
                                 " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID)) " & _
                                 "                 WHEN '' THEN 0 " & _
                                 "                ELSE SUBSTRING(RPAP.RPAP_Nit_ID,0,LEN(RPAP.RPAP_Nit_ID))   " & _
                                 " END " & _
                                 " LEFT JOIN  " & BD_Param & ".dbo.CLIENTE C3 ON C3.CLI_Document_ID =  " & _
                                 " CASE	 SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita)) " & _
                                 "   WHEN '' THEN 0 " & _
                                 "   ELSE SUBSTRING(RPAP.RPAP_Nit_ID_EmpVisita,0,LEN(RPAP.RPAP_Nit_ID_EmpVisita))  " & _
                                 " END  ")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listC_AccesoPre(StrQuery, Conexion, "List")

        Return ObjListCrud_Doc
    End Function

#End Region

End Class
