Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Porcen_DescuentosSQLClass

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
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListPais(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT  P_Cod AS ID, CAST(P_Cod  AS NVARCHAR(10)) + ' - ' + P_Name AS descripcion FROM PAISES ")
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
    Public Function Charge_DropListImpuesto(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT IM_Impuesto_Gasto_ID AS ID,CAST(IM_Impuesto_Gasto_ID AS NVARCHAR(10)) + ' - ' + IM_Descripcion AS DESCRIPCION FROM IMPUESTO_GASTO ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Porcen_Descuentos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim vg_l_BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT  DIM_Cod_ID, " & _
                        "         DIM_Ciudad_ID, " & _
                        "         DIM_Impuesto_Gasto_ID, " & _
                        "         DIM_RangoInicial_ID, " & _
                        "         DIM_MesDia_1, " & _
                        "         DIM_MesDia_2, " & _
                        "         DIM_MesDia_3, " & _
                        "         DIM_MesDia_4, " & _
                        "         DIM_Porcentaje_1, " & _
                        "         DIM_Porcentaje_2, " & _
                        "         DIM_Porcentaje_3, " & _
                        "         DIM_Porcentaje_4, " & _
                        "         DIM_Valor_Vencimiento_1, " & _
                        "         DIM_Valor_Vencimiento_2, " & _
                        "         DIM_Valor_Vencimiento_3, " & _
                        "         DIM_Valor_Vencimiento_4, " & _
                        "         DIM_FechaActualizacion, " & _
                        "         DIM_Usuario, " & _
                        "         P.P_Name, " & _
                        " 		C.C_Descripcion, " & _
                        " 		IM_G.IM_Descripcion, " & _
                        " 		DIM_RangoFinal_ID, " & _
                        " 		DIM_Type_Limit, " & _
                        " 		DIM_Limit_Min, " & _
                        " 		DIM_Limit_Max, " & _
                        " 		DDL.DDLL_Descripcion " & _
                        " FROM PORCEN_DESCUENTOS PD  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = PD.DIM_Cod_ID  " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = PD.DIM_Ciudad_ID  " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = PD.DIM_Impuesto_Gasto_ID " & _
                        " INNER JOIN " & vg_l_BD_Admin & ".dbo.TC_DDL_TIPO DDL ON DDL.DDL_ID = PD.DIM_Type_Limit " & _
                        " WHERE DDL.DDL_Tabla ='PORCENTAJE' ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT  DIM_Cod_ID, " & _
                        "         DIM_Ciudad_ID, " & _
                        "         DIM_Impuesto_Gasto_ID, " & _
                        "         DIM_RangoInicial_ID, " & _
                        "         DIM_MesDia_1, " & _
                        "         DIM_MesDia_2, " & _
                        "         DIM_MesDia_3, " & _
                        "         DIM_MesDia_4, " & _
                        "         DIM_Porcentaje_1, " & _
                        "         DIM_Porcentaje_2, " & _
                        "         DIM_Porcentaje_3, " & _
                        "         DIM_Porcentaje_4, " & _
                        "         DIM_Valor_Vencimiento_1, " & _
                        "         DIM_Valor_Vencimiento_2, " & _
                        "         DIM_Valor_Vencimiento_3, " & _
                        "         DIM_Valor_Vencimiento_4, " & _
                        "         DIM_FechaActualizacion, " & _
                        "         DIM_Usuario, " & _
                        "         P.P_Name, " & _
                        " 		C.C_Descripcion, " & _
                        " 		IM_G.IM_Descripcion, " & _
                        " 		DIM_RangoFinal_ID, " & _
                        " 		DIM_Type_Limit, " & _
                        " 		DIM_Limit_Min, " & _
                        " 		DIM_Limit_Max, " & _
                        " 		DDL.DDLL_Descripcion " & _
                        " FROM PORCEN_DESCUENTOS PD  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = PD.DIM_Cod_ID  " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = PD.DIM_Ciudad_ID  " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = PD.DIM_Impuesto_Gasto_ID " & _
                        " INNER JOIN " & vg_l_BD_Admin & ".dbo.TC_DDL_TIPO DDL ON DDL.DDL_ID = PD.DIM_Type_Limit " & _
                        " WHERE DDL.DDL_Tabla ='PORCENTAJE' ")
            Else
                sql.Append(" SELECT  DIM_Cod_ID, " & _
                        "         DIM_Ciudad_ID, " & _
                        "         DIM_Impuesto_Gasto_ID, " & _
                        "         DIM_RangoInicial_ID, " & _
                        "         DIM_MesDia_1, " & _
                        "         DIM_MesDia_2, " & _
                        "         DIM_MesDia_3, " & _
                        "         DIM_MesDia_4, " & _
                        "         DIM_Porcentaje_1, " & _
                        "         DIM_Porcentaje_2, " & _
                        "         DIM_Porcentaje_3, " & _
                        "         DIM_Porcentaje_4, " & _
                        "         DIM_Valor_Vencimiento_1, " & _
                        "         DIM_Valor_Vencimiento_2, " & _
                        "         DIM_Valor_Vencimiento_3, " & _
                        "         DIM_Valor_Vencimiento_4, " & _
                        "         DIM_FechaActualizacion, " & _
                        "         DIM_Usuario, " & _
                        "         P.P_Name, " & _
                        " 		C.C_Descripcion, " & _
                        " 		IM_G.IM_Descripcion, " & _
                        " 		DIM_RangoFinal_ID, " & _
                        " 		DIM_Type_Limit, " & _
                        " 		DIM_Limit_Min, " & _
                        " 		DIM_Limit_Max, " & _
                        " 		DDL.DDLL_Descripcion " & _
                        " FROM PORCEN_DESCUENTOS PD  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = PD.DIM_Cod_ID  " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = PD.DIM_Ciudad_ID  " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = PD.DIM_Impuesto_Gasto_ID " & _
                        " INNER JOIN " & vg_l_BD_Admin & ".dbo.TC_DDL_TIPO DDL ON DDL.DDL_ID = PD.DIM_Type_Limit " & _
                        " WHERE DDL.DDL_Tabla ='PORCENTAJE' " & _
                        " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListPorcen_Descuentos = List(StrQuery, Conexion)

        Return ObjListPorcen_Descuentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo  Porcen_Descuentos (INSERT)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_O_Obj As Porcen_DescuentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PORCEN_DESCUENTOS (" & _
            " DIM_Cod_ID," & _
            " DIM_Ciudad_ID," & _
            " DIM_Impuesto_Gasto_ID," & _
            " DIM_RangoInicial_ID," & _
            " DIM_RangoFinal_ID," & _
            " DIM_Type_Limit," & _
            " DIM_Limit_Min," & _
            " DIM_Limit_Max," & _
            " DIM_MesDia_1," & _
            " DIM_MesDia_2," & _
            " DIM_MesDia_3," & _
            " DIM_MesDia_4," & _
            " DIM_Porcentaje_1," & _
            " DIM_Porcentaje_2," & _
            " DIM_Porcentaje_3," & _
            " DIM_Porcentaje_4," & _
            " DIM_Valor_Vencimiento_1," & _
            " DIM_Valor_Vencimiento_2," & _
            " DIM_Valor_Vencimiento_3," & _
            " DIM_Valor_Vencimiento_4," & _
            " DIM_FechaActualizacion," & _
            " DIM_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_O_Obj.Cod_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Ciudad_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Impuesto_Gasto_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.RangoInicial_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.RangoFinal_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Type_Limit & "',")
        sql.AppendLine("'" & vp_O_Obj.Limit_Min & "',")
        sql.AppendLine("'" & vp_O_Obj.Limit_Max & "',")
        sql.AppendLine("'" & vp_O_Obj.MesDia_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.MesDia_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.MesDia_3 & "',")
        sql.AppendLine("'" & vp_O_Obj.MesDia_4 & "',")
        sql.AppendLine("'" & vp_O_Obj.Porcentaje_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Porcentaje_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Porcentaje_3 & "',")
        sql.AppendLine("'" & vp_O_Obj.Porcentaje_4 & "',")
        sql.AppendLine("'" & vp_O_Obj.Valor_Vencimiento_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Valor_Vencimiento_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Valor_Vencimiento_3 & "',")
        sql.AppendLine("'" & vp_O_Obj.Valor_Vencimiento_4 & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_O_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Porcen_Descuentos (UPDATE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_O_Obj As Porcen_DescuentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine(" SET DATEFORMAT mdy " & _
                          " UPDATE PORCEN_DESCUENTOS  SET " & _
                          " DIM_MesDia_1 = '" & vp_O_Obj.MesDia_1 & "', " & _
                          " DIM_MesDia_2 = '" & vp_O_Obj.MesDia_2 & "', " & _
                          " DIM_MesDia_3 = '" & vp_O_Obj.MesDia_3 & "', " & _
                          " DIM_MesDia_4 = '" & vp_O_Obj.MesDia_4 & "', " & _
                          " DIM_Porcentaje_1 ='" & vp_O_Obj.Porcentaje_1 & "', " & _
                          " DIM_Porcentaje_2 ='" & vp_O_Obj.Porcentaje_2 & "', " & _
                          " DIM_Porcentaje_3 ='" & vp_O_Obj.Porcentaje_3 & "', " & _
                          " DIM_Porcentaje_4 ='" & vp_O_Obj.Porcentaje_4 & "', " & _
                          " DIM_Valor_Vencimiento_1 ='" & vp_O_Obj.Valor_Vencimiento_1 & "', " & _
                          " DIM_Valor_Vencimiento_2 ='" & vp_O_Obj.Valor_Vencimiento_2 & "', " & _
                          " DIM_Valor_Vencimiento_3 ='" & vp_O_Obj.Valor_Vencimiento_3 & "', " & _
                          " DIM_Valor_Vencimiento_4 ='" & vp_O_Obj.Valor_Vencimiento_4 & "', " & _
                          " DIM_FechaActualizacion ='" & vp_O_Obj.FechaActualizacion & "', " & _
                          " DIM_Usuario ='" & vp_O_Obj.Usuario & "'" & _
                    " WHERE DIM_Cod_ID = '" & vp_O_Obj.Cod_ID & "'" & _
                        " AND DIM_Ciudad_ID = '" & vp_O_Obj.Ciudad_ID & "'" & _
                        " AND DIM_Impuesto_Gasto_ID = '" & vp_O_Obj.Impuesto_Gasto_ID & "'" & _
                        " AND DIM_RangoInicial_ID = '" & vp_O_Obj.RangoInicial_ID & "'" & _
                        " AND DIM_RangoFinal_ID = '" & vp_O_Obj.RangoFinal_ID & "'" & _
                        " AND DIM_Type_Limit = '" & vp_O_Obj.Type_Limit & "'" & _
                        " AND DIM_Limit_Min = '" & vp_O_Obj.Limit_Min & "'" & _
                        " AND DIM_Limit_Max = '" & vp_O_Obj.Limit_Max & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Porcen_Descuentos (DELETE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete(ByVal vp_O_Obj As Porcen_DescuentosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine(" SET DATEFORMAT mdy " & _
                       " DELETE PORCEN_DESCUENTOS " & _
                       " WHERE DIM_Cod_ID = '" & vp_O_Obj.Cod_ID & "'" & _
                       " AND DIM_Ciudad_ID = '" & vp_O_Obj.Ciudad_ID & "'" & _
                       " AND DIM_Impuesto_Gasto_ID = '" & vp_O_Obj.Impuesto_Gasto_ID & "'" & _
                       " AND DIM_RangoInicial_ID = '" & vp_O_Obj.RangoInicial_ID & "'" & _
                       " AND DIM_RangoFinal_ID = '" & vp_O_Obj.RangoFinal_ID & "'" & _
                       " AND DIM_Type_Limit = '" & vp_O_Obj.Type_Limit & "'" & _
                       " AND DIM_Limit_Min = '" & vp_O_Obj.Limit_Min & "'" & _
                       " AND DIM_Limit_Max = '" & vp_O_Obj.Limit_Max & "'")

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Porcen_Descuentos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objPorcen_Descuentos As New Porcen_DescuentosClass
            'cargamos datos sobre el objeto de login
            objPorcen_Descuentos.Cod_ID = ReadConsulta.GetValue(0)
            objPorcen_Descuentos.Ciudad_ID = ReadConsulta.GetValue(1)
            objPorcen_Descuentos.Impuesto_Gasto_ID = ReadConsulta.GetValue(2)
            objPorcen_Descuentos.RangoInicial_ID = ReadConsulta.GetValue(3)

            If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objPorcen_Descuentos.MesDia_1 = ReadConsulta.GetValue(4) Else objPorcen_Descuentos.MesDia_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objPorcen_Descuentos.MesDia_2 = ReadConsulta.GetValue(5) Else objPorcen_Descuentos.MesDia_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objPorcen_Descuentos.MesDia_3 = ReadConsulta.GetValue(6) Else objPorcen_Descuentos.MesDia_3 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objPorcen_Descuentos.MesDia_4 = ReadConsulta.GetValue(7) Else objPorcen_Descuentos.MesDia_4 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objPorcen_Descuentos.Porcentaje_1 = ReadConsulta.GetValue(8) Else objPorcen_Descuentos.Porcentaje_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objPorcen_Descuentos.Porcentaje_2 = ReadConsulta.GetValue(9) Else objPorcen_Descuentos.Porcentaje_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objPorcen_Descuentos.Porcentaje_3 = ReadConsulta.GetValue(10) Else objPorcen_Descuentos.Porcentaje_3 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objPorcen_Descuentos.Porcentaje_4 = ReadConsulta.GetValue(11) Else objPorcen_Descuentos.Porcentaje_4 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objPorcen_Descuentos.Valor_Vencimiento_1 = ReadConsulta.GetValue(12) Else objPorcen_Descuentos.Valor_Vencimiento_1 = 0
            If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objPorcen_Descuentos.Valor_Vencimiento_2 = ReadConsulta.GetValue(13) Else objPorcen_Descuentos.Valor_Vencimiento_2 = 0
            If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objPorcen_Descuentos.Valor_Vencimiento_3 = ReadConsulta.GetValue(14) Else objPorcen_Descuentos.Valor_Vencimiento_3 = 0
            If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objPorcen_Descuentos.Valor_Vencimiento_4 = ReadConsulta.GetValue(15) Else objPorcen_Descuentos.Valor_Vencimiento_4 = 0

            objPorcen_Descuentos.FechaActualizacion = ReadConsulta.GetValue(16)
            objPorcen_Descuentos.Usuario = ReadConsulta.GetValue(17)
            objPorcen_Descuentos.DescripCod = ReadConsulta.GetValue(18)
            objPorcen_Descuentos.DescripCiudad = ReadConsulta.GetValue(19)
            objPorcen_Descuentos.DescripImpuesto_Gasto = ReadConsulta.GetValue(20)

            objPorcen_Descuentos.RangoFinal_ID = ReadConsulta.GetValue(21)

            objPorcen_Descuentos.Type_Limit = ReadConsulta.GetValue(22)
            objPorcen_Descuentos.Limit_Min = ReadConsulta.GetValue(23)
            objPorcen_Descuentos.Limit_Max = ReadConsulta.GetValue(24)
            objPorcen_Descuentos.DescripTipo = ReadConsulta.GetValue(25)

            'agregamos a la lista
            ObjListPorcen_Descuentos.Add(objPorcen_Descuentos)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListPorcen_Descuentos

    End Function

#End Region

#Region "OTRAS CONSULTAS"
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Porcen_DescuentosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SET DATEFORMAT mdy " & _
                       " SELECT COUNT(1) FROM PORCEN_DESCUENTOS " & _
                       " WHERE DIM_Cod_ID = '" & vp_O_Obj.Cod_ID & "'" & _
                       " AND DIM_Ciudad_ID = '" & vp_O_Obj.Ciudad_ID & "'" & _
                       " AND DIM_Impuesto_Gasto_ID = '" & vp_O_Obj.Impuesto_Gasto_ID & "'" & _
                       " AND DIM_RangoInicial_ID = '" & vp_O_Obj.RangoInicial_ID & "'" & _
                       " AND DIM_RangoFinal_ID = '" & vp_O_Obj.RangoFinal_ID & "'" & _
                       " AND DIM_Type_Limit = '" & vp_O_Obj.Type_Limit & "'" & _
                       " AND DIM_Limit_Min = '" & vp_O_Obj.Limit_Min & "'" & _
                       " AND DIM_Limit_Max = '" & vp_O_Obj.Limit_Max & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region

End Class
