Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class InvPuertaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla InvPuerta parametrizada (READ)
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All_Tarjetas(ByVal vp_S_Nit As String, ByVal vp_S_Nit_User As String)

        Dim ObjListCliente As New List(Of InvPuertaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Nit = "ALL" Then

            sql.Append(" SELECT  IT_Nit_ID, " & _
                                  "               IT_Tarjeta_ID, " & _
                                  "               IT_Estado, " & _
                                  "               IT_MotivoBloqueo, " & _
                                  "               IT_ChequeaVigencias, " & _
                                  "               IT_Fecha_Inicio_Vigencia, " & _
                                  "               IT_Fecha_Fin_Vigencia, " & _
                                  "               IT_Nit_ID_Custodia, " & _
                                  "               IT_TypeDocument_ID_Custodia, " & _
                                  "               IT_Document_ID_Custodia, " & _
                                  "               IT_FechaCustodia, " & _
                                  "               IT_Nit_ID_Asigna, " & _
                                  "               IT_TypeDocument_Asigna, " & _
                                  "               IT_Document_ID_Asigna, " & _
                                  "               IT_FechaAsignacion, " & _
                                  "               IT_Nit_ID_Entrega, " & _
                                  "               IT_TypeDocument_Entrega, " & _
                                  "               IT_Document_ID_Entrega, " & _
                                  "               IT_FechaEntrega, " & _
                                  "               IT_Observaciones, " & _
                                  "               IT_Usuario_Creacion, " & _
                                  "               IT_FechaCreacion, " & _
                                  "               IT_Usuario_Actualizacion, " & _
                                  "               IT_FechaActualizacion, " & _
                                  "               ET.DDLL_Descripcion, " & _
                                  "               BT.DDLL_Descripcion, " & _
                                  "               EC.CLI_Nombre + ' ' + EC.CLI_Nombre_2 + ' ' + EC.CLI_Apellido_1 + ' ' + EC.CLI_Apellido_2 AS Emp_Custodia, " & _
                                  "               PC.CLI_Nombre + ' ' + PC.CLI_Nombre_2 + ' ' + PC.CLI_Apellido_1 + ' ' + PC.CLI_Apellido_2 AS P_Custodia, " & _
                                  "               EA.CLI_Nombre + ' ' + EA.CLI_Nombre_2 + ' ' + EA.CLI_Apellido_1 + ' ' + EA.CLI_Apellido_2 AS Emp_Asignada, " & _
                                  "               PA.CLI_Nombre + ' ' + PA.CLI_Nombre_2 + ' ' + PA.CLI_Apellido_1 + ' ' + PA.CLI_Apellido_2 AS P_Asignada, " & _
                                  "               EE.CLI_Nombre + ' ' + EE.CLI_Nombre_2 + ' ' + EE.CLI_Apellido_1 + ' ' + EE.CLI_Apellido_2 AS Emp_Entrega, " & _
                                  "               PE.CLI_Nombre + ' ' + PE.CLI_Nombre_2 + ' ' + PE.CLI_Apellido_1 + ' ' + PE.CLI_Apellido_2 AS P_Entrega, " & _
                                  "               ROW_NUMBER() OVER(ORDER BY IT.IT_Tarjeta_ID ASC) AS Index_Tarjeta " & _
                                  " FROM INVENTARIO_TARJETAS IT " & _
                                  "     LEFT JOIN TC_DDL_TIPO ET ON ET.DDL_ID =IT.IT_Estado AND ET.DDL_Tabla = 'ESTADO_TARJETA' " & _
                                  "     LEFT JOIN TC_DDL_TIPO BT ON BT.DDL_ID =IT.IT_MotivoBloqueo AND BT.DDL_Tabla = 'BLOQUEO' " & _
                                  "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PC ON PC.CLI_Nit_ID = IT.IT_Nit_ID_Custodia AND PC.CLI_TypeDocument_ID =IT.IT_TypeDocument_ID_Custodia AND PC.CLI_Document_ID = IT.IT_Document_ID_Custodia " & _
                                  "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PA ON PA.CLI_Nit_ID = IT.IT_Nit_ID_Asigna AND PA.CLI_TypeDocument_ID =IT.IT_TypeDocument_Asigna AND PA.CLI_Document_ID = IT.IT_Document_ID_Asigna " & _
                                  "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PE ON PE.CLI_Nit_ID = IT.IT_Nit_ID_Entrega AND PE.CLI_TypeDocument_ID =IT.IT_TypeDocument_Entrega AND PE.CLI_Document_ID = IT.IT_Document_ID_Entrega " & _
                                  "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE EC ON EC.CLI_Document_ID = " & _
                                  "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Custodia),0,LEN(IT.IT_Nit_ID_Custodia)) " & _
                                  "                                                                                  WHEN '' THEN 0  " & _
                                  "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Custodia),0,LEN(IT.IT_Nit_ID_Custodia)) " & _
                                  "                                                                     END " & _
                                  "    LEFT JOIN " & BD_Param & ".dbo.CLIENTE EA ON EA.CLI_Document_ID =  " & _
                                  "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Asigna),0,LEN(IT.IT_Nit_ID_Asigna)) " & _
                                  "                                                                                  WHEN '' THEN 0  " & _
                                  "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Asigna),0,LEN(IT.IT_Nit_ID_Asigna)) " & _
                                  "                                                                     END " & _
                                  "    LEFT JOIN " & BD_Param & ".dbo.CLIENTE EE ON EE.CLI_Document_ID =   " & _
                                  "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Entrega),0,LEN(IT.IT_Nit_ID_Entrega)) " & _
                                  "                                                                                  WHEN '' THEN 0  " & _
                                  "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Entrega),0,LEN(IT.IT_Nit_ID_Entrega)) " & _
                                  "                                                                     END " & _
                                  " ")

        Else

            sql.Append(" SELECT  IT_Nit_ID, " & _
                              "               IT_Tarjeta_ID, " & _
                              "               IT_Estado, " & _
                              "               IT_MotivoBloqueo, " & _
                              "               IT_ChequeaVigencias, " & _
                              "               IT_Fecha_Inicio_Vigencia, " & _
                              "               IT_Fecha_Fin_Vigencia, " & _
                              "               IT_Nit_ID_Custodia, " & _
                              "               IT_TypeDocument_ID_Custodia, " & _
                              "               IT_Document_ID_Custodia, " & _
                              "               IT_FechaCustodia, " & _
                              "               IT_Nit_ID_Asigna, " & _
                              "               IT_TypeDocument_Asigna, " & _
                              "               IT_Document_ID_Asigna, " & _
                              "               IT_FechaAsignacion, " & _
                              "               IT_Nit_ID_Entrega, " & _
                              "               IT_TypeDocument_Entrega, " & _
                              "               IT_Document_ID_Entrega, " & _
                              "               IT_FechaEntrega, " & _
                              "               IT_Observaciones, " & _
                              "               IT_Usuario_Creacion, " & _
                              "               IT_FechaCreacion, " & _
                              "               IT_Usuario_Actualizacion, " & _
                              "               IT_FechaActualizacion, " & _
                              "               ET.DDLL_Descripcion, " & _
                              "               BT.DDLL_Descripcion, " & _
                              "               EC.CLI_Nombre + ' ' + EC.CLI_Nombre_2 + ' ' + EC.CLI_Apellido_1 + ' ' + EC.CLI_Apellido_2 AS Emp_Custodia, " & _
                              "               PC.CLI_Nombre + ' ' + PC.CLI_Nombre_2 + ' ' + PC.CLI_Apellido_1 + ' ' + PC.CLI_Apellido_2 AS P_Custodia, " & _
                              "               EA.CLI_Nombre + ' ' + EA.CLI_Nombre_2 + ' ' + EA.CLI_Apellido_1 + ' ' + EA.CLI_Apellido_2 AS Emp_Asignada, " & _
                              "               PA.CLI_Nombre + ' ' + PA.CLI_Nombre_2 + ' ' + PA.CLI_Apellido_1 + ' ' + PA.CLI_Apellido_2 AS P_Asignada, " & _
                              "               EE.CLI_Nombre + ' ' + EE.CLI_Nombre_2 + ' ' + EE.CLI_Apellido_1 + ' ' + EE.CLI_Apellido_2 AS Emp_Entrega, " & _
                              "               PE.CLI_Nombre + ' ' + PE.CLI_Nombre_2 + ' ' + PE.CLI_Apellido_1 + ' ' + PE.CLI_Apellido_2 AS P_Entrega, " & _
                              "               ROW_NUMBER() OVER(ORDER BY IT.IT_Tarjeta_ID ASC) AS Index_Tarjeta " & _
                              " FROM INVENTARIO_TARJETAS IT " & _
                              "     LEFT JOIN TC_DDL_TIPO ET ON ET.DDL_ID =IT.IT_Estado AND ET.DDL_Tabla = 'ESTADO_TARJETA' " & _
                              "     LEFT JOIN TC_DDL_TIPO BT ON BT.DDL_ID =IT.IT_MotivoBloqueo AND BT.DDL_Tabla = 'BLOQUEO' " & _
                              "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PC ON PC.CLI_Nit_ID = IT.IT_Nit_ID_Custodia AND PC.CLI_TypeDocument_ID =IT.IT_TypeDocument_ID_Custodia AND PC.CLI_Document_ID = IT.IT_Document_ID_Custodia " & _
                              "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PA ON PA.CLI_Nit_ID = IT.IT_Nit_ID_Asigna AND PA.CLI_TypeDocument_ID =IT.IT_TypeDocument_Asigna AND PA.CLI_Document_ID = IT.IT_Document_ID_Asigna " & _
                              "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE PE ON PE.CLI_Nit_ID = IT.IT_Nit_ID_Entrega AND PE.CLI_TypeDocument_ID =IT.IT_TypeDocument_Entrega AND PE.CLI_Document_ID = IT.IT_Document_ID_Entrega " & _
                              "     LEFT JOIN " & BD_Param & ".dbo.CLIENTE EC ON EC.CLI_Document_ID = " & _
                              "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Custodia),0,LEN(IT.IT_Nit_ID_Custodia)) " & _
                              "                                                                                  WHEN '' THEN 0  " & _
                              "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Custodia),0,LEN(IT.IT_Nit_ID_Custodia)) " & _
                              "                                                                     END " & _
                              "    LEFT JOIN " & BD_Param & ".dbo.CLIENTE EA ON EA.CLI_Document_ID =  " & _
                              "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Asigna),0,LEN(IT.IT_Nit_ID_Asigna)) " & _
                              "                                                                                  WHEN '' THEN 0  " & _
                              "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Asigna),0,LEN(IT.IT_Nit_ID_Asigna)) " & _
                              "                                                                     END " & _
                              "    LEFT JOIN " & BD_Param & ".dbo.CLIENTE EE ON EE.CLI_Document_ID =   " & _
                              "                                                                     CASE	 SUBSTRING((IT.IT_Nit_ID_Entrega),0,LEN(IT.IT_Nit_ID_Entrega)) " & _
                              "                                                                                  WHEN '' THEN 0  " & _
                              "                                                                                  ELSE SUBSTRING((IT.IT_Nit_ID_Entrega),0,LEN(IT.IT_Nit_ID_Entrega)) " & _
                              "                                                                     END " & _
                              "  WHERE IT_Nit_ID = '" & vp_S_Nit & "' " & _
                              "  ")
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Nit = "ALL" Then
                vl_sql_filtro.Append(" WHERE  IT_Nit_ID ='" & vp_S_Nit & "' ORDER BY IT_Nit_ID, IT_Tarjeta_ID ASC")
            Else
                vl_sql_filtro.Append(" ORDER BY IT_Nit_ID, IT_Tarjeta_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY IT_Nit_ID, IT_Tarjeta_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjListCliente = listInvPuerta(StrQuery, Conexion, "List")

        Return ObjListCliente

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo InvPuerta (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertInvPuerta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INVENTARIO_TARJETAS (" & _
            "IT_Nit_ID," & _
            "IT_Tarjeta_ID," & _
            "IT_Estado," & _
            "IT_MotivoBloqueo," & _
            "IT_ChequeaVigencias," & _
            "IT_Fecha_Inicio_Vigencia," & _
            "IT_Fecha_Fin_Vigencia," & _
            "IT_Nit_ID_Custodia," & _
            "IT_TypeDocument_ID_Custodia," & _
            "IT_Document_ID_Custodia," & _
            "IT_FechaCustodia," & _
            "IT_Usuario_Creacion," & _
            "IT_FechaCreacion," & _
            "IT_Usuario_Actualizacion," & _
            "IT_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Estado & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.MotivoBloqueo & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Fecha_Inicio_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Fecha_Final_Vigencia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Nit_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.TypeDocument_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.Document_ID_Custodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaCustodia & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_InvPuerta.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' actualizacion por Asignacion de tarjeta a una persona
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateAsignacionTarjeta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE INVENTARIO_TARJETAS SET " & _
                    " IT_Estado ='" & vp_Obj_InvPuerta.Estado & "', " & _
                    " IT_Nit_ID_Asigna ='" & vp_Obj_InvPuerta.Nit_ID_Asigna & "', " & _
                    " IT_TypeDocument_Asigna ='" & vp_Obj_InvPuerta.TypeDocument_ID_Asigna & "', " & _
                    " IT_Document_ID_Asigna ='" & vp_Obj_InvPuerta.Document_ID_Asigna & "', " & _
                    " IT_FechaAsignacion ='" & vp_Obj_InvPuerta.FechaAsignacion & "', " & _
                    " IT_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                    " IT_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                    " WHERE IT_Tarjeta_ID = '" & vp_Obj_InvPuerta.Tarjeta_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' actualizacion por Entrega de tarjeta a una persona
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateEntregaTarjeta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE INVENTARIO_TARJETAS SET " & _
                    " IT_Estado ='" & vp_Obj_InvPuerta.Estado & "', " & _
                    " IT_Nit_ID_Entrega ='" & vp_Obj_InvPuerta.Nit_ID_Entrega & "', " & _
                    " IT_TypeDocument_Entrega ='" & vp_Obj_InvPuerta.TypeDocument_ID_Entrega & "', " & _
                    " IT_Document_ID_Entrega ='" & vp_Obj_InvPuerta.Document_ID_Entrega & "', " & _
                    " IT_FechaEntrega ='" & vp_Obj_InvPuerta.FechaEntrega & "', " & _
                    " IT_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                    " IT_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                    " WHERE IT_Tarjeta_ID = '" & vp_Obj_InvPuerta.Tarjeta_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' actualizacion por bloqueo de tarjeta a una persona
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateBloqueoTarjeta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE INVENTARIO_TARJETAS SET " & _
                    " IT_Estado ='" & vp_Obj_InvPuerta.Estado & "', " & _
                    " IT_MotivoBloqueo ='" & vp_Obj_InvPuerta.MotivoBloqueo & "', " & _
                    " IT_Observaciones ='" & vp_Obj_InvPuerta.Observaciones & "', " & _
                    " IT_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                    " IT_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                    " WHERE IT_Tarjeta_ID = '" & vp_Obj_InvPuerta.Tarjeta_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' actualizacion por Desbloqueo de tarjeta por recuperacion
    ''' </summary>
    ''' <param name="vp_Obj_InvPuerta"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateDesBloqueoTarjeta(ByVal vp_Obj_InvPuerta As InvPuertaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""

        sql.AppendLine("UPDATE INVENTARIO_TARJETAS SET " & _
                    " IT_Estado ='" & vp_Obj_InvPuerta.Estado & "', " & _
                    " IT_MotivoBloqueo ='" & vp_Obj_InvPuerta.MotivoBloqueo & "', " & _
                    " IT_Nit_ID_Custodia ='" & vp_Obj_InvPuerta.Nit_ID_Custodia & "', " & _
                    " IT_TypeDocument_ID_Custodia ='" & vp_Obj_InvPuerta.TypeDocument_ID_Custodia & "', " & _
                    " IT_Document_ID_Custodia ='" & vp_Obj_InvPuerta.Document_ID_Custodia & "', " & _
                    " IT_FechaCustodia ='" & vp_Obj_InvPuerta.FechaCustodia & "', " & _
                    " IT_Nit_ID_Asigna ='', " & _
                    " IT_TypeDocument_Asigna ='0', " & _
                    " IT_Document_ID_Asigna ='0', " & _
                    " IT_FechaAsignacion ='', " & _
                    " IT_Nit_ID_Entrega ='', " & _
                    " IT_TypeDocument_Entrega ='0', " & _
                    " IT_Document_ID_Entrega ='0', " & _
                    " IT_FechaEntrega ='', " & _
                    " IT_Observaciones ='" & vp_Obj_InvPuerta.Observaciones & "', " & _
                    " IT_Usuario_Actualizacion ='" & vp_Obj_InvPuerta.UsuarioActualizacion & "', " & _
                    " IT_FechaActualizacion ='" & vp_Obj_InvPuerta.FechaActualizacion & "' " & _
                    " WHERE IT_Tarjeta_ID = '" & vp_Obj_InvPuerta.Tarjeta_ID & "'")
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
    Public Function Charge_DropListBloqueo()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID, CAST(DDL_ID AS NVARCHAR(2)) + ' - '  +  DDLL_Descripcion AS descripcion FROM TC_DDL_TIPO WHERE DDL_Tabla='BLOQUEO' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de InvPuerta para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listInvPuerta(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

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

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.Nit_ID = ReadConsulta.GetValue(0)
                    objInvPuerta.Tarjeta_ID = ReadConsulta.GetValue(1)
                    objInvPuerta.Estado = ReadConsulta.GetValue(2)
                    objInvPuerta.MotivoBloqueo = ReadConsulta.GetValue(3)
                    objInvPuerta.ChequeaVigencias = ReadConsulta.GetValue(4)

                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objInvPuerta.Fecha_Inicio_Vigencia = ReadConsulta.GetValue(5) Else objInvPuerta.Fecha_Inicio_Vigencia = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objInvPuerta.Fecha_Final_Vigencia = ReadConsulta.GetValue(6) Else objInvPuerta.Fecha_Final_Vigencia = ""

                    objInvPuerta.Nit_ID_Custodia = ReadConsulta.GetValue(7)
                    objInvPuerta.TypeDocument_ID_Custodia = ReadConsulta.GetValue(8)
                    objInvPuerta.Document_ID_Custodia = ReadConsulta.GetValue(9)
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objInvPuerta.FechaCustodia = ReadConsulta.GetValue(10) Else objInvPuerta.FechaCustodia = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objInvPuerta.Nit_ID_Asigna = ReadConsulta.GetValue(11) Else objInvPuerta.Nit_ID_Asigna = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objInvPuerta.TypeDocument_ID_Asigna = ReadConsulta.GetValue(12) Else objInvPuerta.TypeDocument_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objInvPuerta.Document_ID_Asigna = ReadConsulta.GetValue(13) Else objInvPuerta.Document_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objInvPuerta.FechaAsignacion = ReadConsulta.GetValue(14) Else objInvPuerta.FechaAsignacion = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objInvPuerta.Nit_ID_Entrega = ReadConsulta.GetValue(15) Else objInvPuerta.Nit_ID_Entrega = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objInvPuerta.TypeDocument_ID_Entrega = ReadConsulta.GetValue(16) Else objInvPuerta.TypeDocument_ID_Entrega = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objInvPuerta.Document_ID_Entrega = ReadConsulta.GetValue(17) Else objInvPuerta.Document_ID_Entrega = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objInvPuerta.FechaEntrega = ReadConsulta.GetValue(18) Else objInvPuerta.FechaEntrega = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objInvPuerta.Observaciones = ReadConsulta.GetValue(19) Else objInvPuerta.Observaciones = ""

                    objInvPuerta.UsuarioCreacion = ReadConsulta.GetValue(20)
                    objInvPuerta.FechaCreacion = ReadConsulta.GetValue(21)
                    objInvPuerta.UsuarioActualizacion = ReadConsulta.GetValue(22)
                    objInvPuerta.FechaActualizacion = ReadConsulta.GetValue(23)

                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objInvPuerta.DescripEstado = ReadConsulta.GetValue(24) Else objInvPuerta.DescripEstado = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objInvPuerta.DescripBloqueo = ReadConsulta.GetValue(25) Else objInvPuerta.DescripBloqueo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objInvPuerta.DescripEmpresaCustodia = ReadConsulta.GetValue(26) Else objInvPuerta.DescripEmpresaCustodia = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objInvPuerta.DescripPersonaCustodia = ReadConsulta.GetValue(27) Else objInvPuerta.DescripPersonaCustodia = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objInvPuerta.DescripEmpresaAsigna = ReadConsulta.GetValue(28) Else objInvPuerta.DescripEmpresaAsigna = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objInvPuerta.DescripPersonaAsigna = ReadConsulta.GetValue(29) Else objInvPuerta.DescripPersonaAsigna = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then objInvPuerta.DescripEmpresaEntrega = ReadConsulta.GetValue(30) Else objInvPuerta.DescripEmpresaEntrega = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then objInvPuerta.DescripPersonaEntrega = ReadConsulta.GetValue(31) Else objInvPuerta.DescripPersonaEntrega = ""

                    objInvPuerta.Index = ReadConsulta.GetValue(32)

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While

            Case "Matrix_Asigna"
                While ReadConsulta.Read

                    Dim objInvPuerta As New InvPuertaClass
                    'cargamos datos sobre el objeto de login
                    objInvPuerta.Tarjeta_ID = ReadConsulta.GetValue(0)
                    objInvPuerta.Nit_ID_Custodia = ReadConsulta.GetValue(1)

                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objInvPuerta.TypeDocument_ID_Asigna = ReadConsulta.GetValue(2) Else objInvPuerta.TypeDocument_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objInvPuerta.Document_ID_Asigna = ReadConsulta.GetValue(3) Else objInvPuerta.Document_ID_Asigna = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objInvPuerta.TypeDocument_ID_Entrega = ReadConsulta.GetValue(4) Else objInvPuerta.TypeDocument_ID_Entrega = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objInvPuerta.Document_ID_Entrega = ReadConsulta.GetValue(5) Else objInvPuerta.Document_ID_Entrega = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objInvPuerta.Nit_ID_Asigna = ReadConsulta.GetValue(6) Else objInvPuerta.Nit_ID_Asigna = 0

                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objInvPuerta.Estado = ReadConsulta.GetValue(7) Else objInvPuerta.Estado = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objInvPuerta.MotivoBloqueo = ReadConsulta.GetValue(8) Else objInvPuerta.MotivoBloqueo = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objInvPuerta.Observaciones = ReadConsulta.GetValue(9) Else objInvPuerta.Observaciones = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objInvPuerta.DescripBloqueo = ReadConsulta.GetValue(10) Else objInvPuerta.DescripBloqueo = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objInvPuerta.DescripPersonaEntrega = ReadConsulta.GetValue(11) Else objInvPuerta.DescripPersonaEntrega = 0

                    'agregamos a la lista
                    ObjListInvPuerta.Add(objInvPuerta)

                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListInvPuerta

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As InvPuertaClass)

        Dim StrQuery As String = ""
        Dim ResultTarjeta As String = ""
        Dim ResultEmpresa As String = ""
        Dim ResultFinal As String = "Nuevo"
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM INVENTARIO_TARJETAS" & _
                    " WHERE IT_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                    " AND IT_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")
        StrQuery = sql.ToString
        ResultEmpresa = conex.IDis(StrQuery, "1")

        If ResultEmpresa >= 1 Then
            ResultFinal = "Existe"
        Else

            sql = New StringBuilder()

            sql.AppendLine(" SELECT COUNT(1) FROM INVENTARIO_TARJETAS" & _
                    " WHERE IT_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")

            StrQuery = sql.ToString
            ResultTarjeta = conex.IDis(StrQuery, "1")

            If ResultTarjeta >= 1 Then
                ResultFinal = "Asignada"
            End If
        End If

        Return ResultFinal
    End Function

    ''' <summary>
    ''' consulta que trae los datos de asignar tarjeta
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixTarjeta()

        Dim ObjListCrud_Doc As New List(Of InvPuertaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.Append(" SELECT  IT_Tarjeta_ID, " & _
                                  "           IT_Nit_ID_Custodia, " & _
                                  "           IT_TypeDocument_Asigna, " & _
                                  "           IT_Document_ID_Asigna, " & _
                                  "           IT_TypeDocument_Entrega, " & _
                                  "           IT_Document_ID_Entrega, " & _
                                  "           IT_Nit_ID_Asigna, " & _
                                  "           IT_Estado, " & _
                                  "           IT_MotivoBloqueo, " & _
                                  "           IT_Observaciones, " & _
                                  "           BT.DDLL_Descripcion, " & _
                                  "           PE.CLI_Nombre + ' ' + PE.CLI_Nombre_2 + ' ' + PE.CLI_Apellido_1 + ' ' + PE.CLI_Apellido_2 AS P_Entrega " & _
                                  "  FROM INVENTARIO_TARJETAS IT " & _
                                  "  LEFT JOIN TC_DDL_TIPO BT ON BT.DDL_ID =IT.IT_MotivoBloqueo AND BT.DDL_Tabla = 'BLOQUEO' " & _
                                  " LEFT JOIN PARAMETRIZACION_D.dbo.CLIENTE PE ON PE.CLI_Nit_ID = IT.IT_Nit_ID_Entrega AND PE.CLI_TypeDocument_ID =IT.IT_TypeDocument_Entrega AND PE.CLI_Document_ID = IT.IT_Document_ID_Entrega ")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listInvPuerta(StrQuery, Conexion, "Matrix_Asigna")

        Return ObjListCrud_Doc

    End Function

#End Region

End Class
