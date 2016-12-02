Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class FinanciacionSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Financiacion parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllFinanciacion(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListFinanciacion As New List(Of FinanciacionClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_Tran_ID_1," & _
                                  "PRO_Tran_ID_2," & _
                                  "PRO_Tran_ID_3," & _
                                  "PRO_Cuenta_1," & _
                                  "PRO_Cuenta_2," & _
                                  "PRO_Cuenta_3," & _
                                  "PRO_Cuenta_4," & _
                                  "PRO_Cuenta_5," & _
                                  "PRO_Cuenta_6," & _
                                  "PRO_Cuenta_7," & _
                                  "PRO_Cuenta_8," & _
                                  "PRO_Cuenta_9," & _
                                  "PRO_Cuenta_10," & _
                                  "PRO_Cuenta_11," & _
                                  "PRO_Cuenta_12," & _
                                  "PRO_Cuenta_13," & _
                                  "PRO_Cuenta_14," & _
                                  "PRO_Cuenta_15," & _
                                  "PRO_Cuenta_16," & _
                                  "PRO_Cuenta_17," & _
                                  "PRO_Cuenta_18," & _
                                  "PRO_Cuenta_19," & _
                                  "PRO_Cuenta_20," & _
                                  "PRO_Cuenta_21," & _
                                  "PRO_Cuenta_22," & _
                                  "PRO_Cuenta_23," & _
                                  "PRO_Cuenta_24," & _
                                  "PRO_Cuenta_25," & _
                                  "PRO_Cuenta_26," & _
                                  "PRO_Cuenta_27," & _
                                  "PRO_Cuenta_28," & _
                                  "PRO_Cuenta_29," & _
                                  "PRO_Cuenta_30," & _
                                  "PRO_Cuenta_31," & _
                                  "PRO_Cuenta_32," & _
                                  "PRO_Cuenta_33," & _
                                  "PRO_Cuenta_34," & _
                                  "PRO_Cuenta_35," & _
                                  "PRO_Cuenta_36," & _
                                  "PRO_Cuenta_37," & _
                                  "PRO_Cuenta_38," & _
                                  "PRO_Cuenta_39," & _
                                  "PRO_Cuenta_40," & _
                                  "PRO_Cuenta_41," & _
                                  "PRO_Cuenta_42," & _
                                  "PRO_Cuenta_43," & _
                                  "PRO_Cuenta_44," & _
                                  "PRO_Cuenta_45," & _
                                  "PRO_Cuenta_46," & _
                                  "PRO_Cuenta_47," & _
                                  "PRO_Cuenta_48," & _
                                  "PRO_Cuenta_49," & _
                                  "PRO_Cuenta_50," & _
                                  "PRO_FechaActualizacion," & _
                                  "PRO_Usuario," & _
                                  "PRO_Nit_ID," & _
                                  "PRO_Causacion_Interes," & _
                                  "PRO_Causacion_Mora," & _
                                  "PRO_Base_Mora," & _
                                  "PRO_Capitalizacion," & _
                                  "PRO_Control_Activo" & _
                                " FROM Financiacion")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_Tran_ID_1," & _
                                  "PRO_Tran_ID_2," & _
                                  "PRO_Tran_ID_3," & _
                                  "PRO_Cuenta_1," & _
                                  "PRO_Cuenta_2," & _
                                  "PRO_Cuenta_3," & _
                                  "PRO_Cuenta_4," & _
                                  "PRO_Cuenta_5," & _
                                  "PRO_Cuenta_6," & _
                                  "PRO_Cuenta_7," & _
                                  "PRO_Cuenta_8," & _
                                  "PRO_Cuenta_9," & _
                                  "PRO_Cuenta_10," & _
                                  "PRO_Cuenta_11," & _
                                  "PRO_Cuenta_12," & _
                                  "PRO_Cuenta_13," & _
                                  "PRO_Cuenta_14," & _
                                  "PRO_Cuenta_15," & _
                                  "PRO_Cuenta_16," & _
                                  "PRO_Cuenta_17," & _
                                  "PRO_Cuenta_18," & _
                                  "PRO_Cuenta_19," & _
                                  "PRO_Cuenta_20," & _
                                  "PRO_Cuenta_21," & _
                                  "PRO_Cuenta_22," & _
                                  "PRO_Cuenta_23," & _
                                  "PRO_Cuenta_24," & _
                                  "PRO_Cuenta_25," & _
                                  "PRO_Cuenta_26," & _
                                  "PRO_Cuenta_27," & _
                                  "PRO_Cuenta_28," & _
                                  "PRO_Cuenta_29," & _
                                  "PRO_Cuenta_30," & _
                                  "PRO_Cuenta_31," & _
                                  "PRO_Cuenta_32," & _
                                  "PRO_Cuenta_33," & _
                                  "PRO_Cuenta_34," & _
                                  "PRO_Cuenta_35," & _
                                  "PRO_Cuenta_36," & _
                                  "PRO_Cuenta_37," & _
                                  "PRO_Cuenta_38," & _
                                  "PRO_Cuenta_39," & _
                                  "PRO_Cuenta_40," & _
                                  "PRO_Cuenta_41," & _
                                  "PRO_Cuenta_42," & _
                                  "PRO_Cuenta_43," & _
                                  "PRO_Cuenta_44," & _
                                  "PRO_Cuenta_45," & _
                                  "PRO_Cuenta_46," & _
                                  "PRO_Cuenta_47," & _
                                  "PRO_Cuenta_48," & _
                                  "PRO_Cuenta_49," & _
                                  "PRO_Cuenta_50," & _
                                  "PRO_FechaActualizacion," & _
                                  "PRO_Usuario," & _
                                  "PRO_Nit_ID," & _
                                  "PRO_Causacion_Interes," & _
                                  "PRO_Causacion_Mora," & _
                                  "PRO_Base_Mora," & _
                                  "PRO_Capitalizacion," & _
                                  "PRO_Control_Activo" & _
                                " FROM Financiacion")
            Else
                sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_Tran_ID_1," & _
                                  "PRO_Tran_ID_2," & _
                                  "PRO_Tran_ID_3," & _
                                  "PRO_Cuenta_1," & _
                                  "PRO_Cuenta_2," & _
                                  "PRO_Cuenta_3," & _
                                  "PRO_Cuenta_4," & _
                                  "PRO_Cuenta_5," & _
                                  "PRO_Cuenta_6," & _
                                  "PRO_Cuenta_7," & _
                                  "PRO_Cuenta_8," & _
                                  "PRO_Cuenta_9," & _
                                  "PRO_Cuenta_10," & _
                                  "PRO_Cuenta_11," & _
                                  "PRO_Cuenta_12," & _
                                  "PRO_Cuenta_13," & _
                                  "PRO_Cuenta_14," & _
                                  "PRO_Cuenta_15," & _
                                  "PRO_Cuenta_16," & _
                                  "PRO_Cuenta_17," & _
                                  "PRO_Cuenta_18," & _
                                  "PRO_Cuenta_19," & _
                                  "PRO_Cuenta_20," & _
                                  "PRO_Cuenta_21," & _
                                  "PRO_Cuenta_22," & _
                                  "PRO_Cuenta_23," & _
                                  "PRO_Cuenta_24," & _
                                  "PRO_Cuenta_25," & _
                                  "PRO_Cuenta_26," & _
                                  "PRO_Cuenta_27," & _
                                  "PRO_Cuenta_28," & _
                                  "PRO_Cuenta_29," & _
                                  "PRO_Cuenta_30," & _
                                  "PRO_Cuenta_31," & _
                                  "PRO_Cuenta_32," & _
                                  "PRO_Cuenta_33," & _
                                  "PRO_Cuenta_34," & _
                                  "PRO_Cuenta_35," & _
                                  "PRO_Cuenta_36," & _
                                  "PRO_Cuenta_37," & _
                                  "PRO_Cuenta_38," & _
                                  "PRO_Cuenta_39," & _
                                  "PRO_Cuenta_40," & _
                                  "PRO_Cuenta_41," & _
                                  "PRO_Cuenta_42," & _
                                  "PRO_Cuenta_43," & _
                                  "PRO_Cuenta_44," & _
                                  "PRO_Cuenta_45," & _
                                  "PRO_Cuenta_46," & _
                                  "PRO_Cuenta_47," & _
                                  "PRO_Cuenta_48," & _
                                  "PRO_Cuenta_49," & _
                                  "PRO_Cuenta_50," & _
                                  "PRO_FechaActualizacion," & _
                                  "PRO_Usuario," & _
                                  "PRO_Nit_ID," & _
                                  "PRO_Causacion_Interes," & _
                                  "PRO_Causacion_Mora," & _
                                  "PRO_Base_Mora," & _
                                  "PRO_Capitalizacion," & _
                                  "PRO_Control_Activo" & _
                                " FROM Financiacion" & _
                          " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListFinanciacion = listFinanciacion(StrQuery, Conexion, "List")

        Return ObjListFinanciacion

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Financiacion (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertFinanciacion(ByVal vp_Obj As FinanciacionClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Financiacion (" & _
            "PRO_Nit_ID," & _
            "PRO_producto_ID," & _
            "PRO_Descripcion," & _
            "PRO_TP_ID," & _
            "PRO_STP_ID," & _
            "PRO_Tran_ID_1," & _
            "PRO_Tran_ID_2," & _
            "PRO_Tran_ID_3," & _
            "PRO_Cuenta_1," & _
            "PRO_Cuenta_2," & _
            "PRO_Cuenta_3," & _
            "PRO_Cuenta_4," & _
            "PRO_Cuenta_5," & _
            "PRO_Cuenta_6," & _
            "PRO_Cuenta_7," & _
            "PRO_Cuenta_8," & _
            "PRO_Cuenta_9," & _
            "PRO_Cuenta_10," & _
            "PRO_Cuenta_11," & _
            "PRO_Cuenta_12," & _
            "PRO_Cuenta_13," & _
            "PRO_Cuenta_14," & _
            "PRO_Cuenta_15," & _
            "PRO_Cuenta_16," & _
            "PRO_Cuenta_17," & _
            "PRO_Cuenta_18," & _
            "PRO_Cuenta_19," & _
            "PRO_Cuenta_20," & _
            "PRO_Cuenta_21," & _
            "PRO_Cuenta_22," & _
            "PRO_Cuenta_23," & _
            "PRO_Cuenta_24," & _
            "PRO_Cuenta_25," & _
            "PRO_Cuenta_26," & _
            "PRO_Cuenta_27," & _
            "PRO_Cuenta_28," & _
            "PRO_Cuenta_29," & _
            "PRO_Cuenta_30," & _
            "PRO_Cuenta_31," & _
            "PRO_Cuenta_32," & _
            "PRO_Cuenta_33," & _
            "PRO_Cuenta_34," & _
            "PRO_Cuenta_35," & _
            "PRO_Cuenta_36," & _
            "PRO_Cuenta_37," & _
            "PRO_Cuenta_38," & _
            "PRO_Cuenta_39," & _
            "PRO_Cuenta_40," & _
            "PRO_Cuenta_41," & _
            "PRO_Cuenta_42," & _
            "PRO_Cuenta_43," & _
            "PRO_Cuenta_44," & _
            "PRO_Cuenta_45," & _
            "PRO_Cuenta_46," & _
            "PRO_Cuenta_47," & _
            "PRO_Cuenta_48," & _
            "PRO_Cuenta_49," & _
            "PRO_Cuenta_50," & _
            "PRO_FechaActualizacion," & _
            "PRO_Usuario," & _
            "PRO_Causacion_Interes," & _
            "PRO_Causacion_Mora," & _
            "PRO_Base_Mora," & _
            "PRO_Capitalizacion," & _
            "PRO_Control_Activo" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Producto_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.TP_ID & "',")
        sql.AppendLine("'" & vp_Obj.STP_ID & "',")
        sql.AppendLine("'" & vp_Obj.Tran_ID_1 & "',")
        sql.AppendLine("'" & vp_Obj.Tran_ID_2 & "',")
        sql.AppendLine("'" & vp_Obj.Tran_ID_3 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_1 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_2 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_3 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_4 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_5 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_6 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_7 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_8 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_9 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_10 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_11 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_12 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_13 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_14 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_15 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_16 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_17 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_18 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_19 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_20 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_21 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_22 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_23 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_24 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_25 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_26 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_27 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_28 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_29 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_30 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_31 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_32 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_33 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_34 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_35 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_36 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_37 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_38 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_39 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_40 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_41 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_42 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_43 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_44 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_45 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_46 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_47 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_48 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_49 & "',")
        sql.AppendLine("'" & vp_Obj.Cuenta_50 & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.Usuario & "',")
        sql.AppendLine("'" & vp_Obj.Causacion_Interes & "',")
        sql.AppendLine("'" & vp_Obj.Causacion_Mora & "',")
        sql.AppendLine("'" & vp_Obj.Base_Mora & "',")
        sql.AppendLine("'" & vp_Obj.Capitalizacion & "',")
        sql.AppendLine("'" & vp_Obj.Control_Activo & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Cliente (UPDATE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_O_Obj As FinanciacionClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""
        sql.AppendLine(" UPDATE Financiacion SET " & _
                          " PRO_Descripcion ='" & vp_O_Obj.Descripcion & "', " & _
                          " PRO_TP_ID ='" & vp_O_Obj.TP_ID & "', " & _
                          " PRO_STP_ID ='" & vp_O_Obj.STP_ID & "', " & _
                          " PRO_Tran_ID_1 ='" & vp_O_Obj.Tran_ID_1 & "', " & _
                          " PRO_Tran_ID_2 ='" & vp_O_Obj.Tran_ID_2 & "', " & _
                          " PRO_Tran_ID_3 ='" & vp_O_Obj.Tran_ID_3 & "', " & _
                          " PRO_Cuenta_1 ='" & vp_O_Obj.Cuenta_1 & "', " & _
                          " PRO_Cuenta_2 ='" & vp_O_Obj.Cuenta_2 & "', " & _
                          " PRO_Cuenta_3 ='" & vp_O_Obj.Cuenta_3 & "', " & _
                          " PRO_Cuenta_4 ='" & vp_O_Obj.Cuenta_4 & "', " & _
                          " PRO_Cuenta_5 ='" & vp_O_Obj.Cuenta_5 & "', " & _
                          " PRO_Cuenta_6 ='" & vp_O_Obj.Cuenta_6 & "', " & _
                          " PRO_Cuenta_7 ='" & vp_O_Obj.Cuenta_7 & "', " & _
                          " PRO_Cuenta_8 ='" & vp_O_Obj.Cuenta_8 & "', " & _
                          " PRO_Cuenta_9 ='" & vp_O_Obj.Cuenta_9 & "', " & _
                          " PRO_Cuenta_10 ='" & vp_O_Obj.Cuenta_10 & "', " & _
                          " PRO_Cuenta_11 ='" & vp_O_Obj.Cuenta_11 & "', " & _
                          " PRO_Cuenta_12 ='" & vp_O_Obj.Cuenta_12 & "', " & _
                          " PRO_Cuenta_13 ='" & vp_O_Obj.Cuenta_13 & "', " & _
                          " PRO_Cuenta_14 ='" & vp_O_Obj.Cuenta_14 & "', " & _
                          " PRO_Cuenta_15 ='" & vp_O_Obj.Cuenta_15 & "', " & _
                          " PRO_Cuenta_16 ='" & vp_O_Obj.Cuenta_16 & "', " & _
                          " PRO_Cuenta_17 ='" & vp_O_Obj.Cuenta_17 & "', " & _
                          " PRO_Cuenta_18 ='" & vp_O_Obj.Cuenta_18 & "', " & _
                          " PRO_Cuenta_19 ='" & vp_O_Obj.Cuenta_19 & "', " & _
                          " PRO_Cuenta_20 ='" & vp_O_Obj.Cuenta_20 & "', " & _
                          " PRO_Cuenta_21 ='" & vp_O_Obj.Cuenta_21 & "', " & _
                          " PRO_Cuenta_22 ='" & vp_O_Obj.Cuenta_22 & "', " & _
                          " PRO_Cuenta_23 ='" & vp_O_Obj.Cuenta_23 & "', " & _
                          " PRO_Cuenta_24 ='" & vp_O_Obj.Cuenta_24 & "', " & _
                          " PRO_Cuenta_25 ='" & vp_O_Obj.Cuenta_25 & "', " & _
                          " PRO_Cuenta_26 ='" & vp_O_Obj.Cuenta_26 & "', " & _
                          " PRO_Cuenta_27 ='" & vp_O_Obj.Cuenta_27 & "', " & _
                          " PRO_Cuenta_28 ='" & vp_O_Obj.Cuenta_28 & "', " & _
                          " PRO_Cuenta_29 ='" & vp_O_Obj.Cuenta_29 & "', " & _
                          " PRO_Cuenta_30 ='" & vp_O_Obj.Cuenta_30 & "', " & _
                          " PRO_Cuenta_31 ='" & vp_O_Obj.Cuenta_31 & "', " & _
                          " PRO_Cuenta_32 ='" & vp_O_Obj.Cuenta_32 & "', " & _
                          " PRO_Cuenta_33 ='" & vp_O_Obj.Cuenta_33 & "', " & _
                          " PRO_Cuenta_34 ='" & vp_O_Obj.Cuenta_34 & "', " & _
                          " PRO_Cuenta_35 ='" & vp_O_Obj.Cuenta_35 & "', " & _
                          " PRO_Cuenta_36 ='" & vp_O_Obj.Cuenta_36 & "', " & _
                          " PRO_Cuenta_37 ='" & vp_O_Obj.Cuenta_37 & "', " & _
                          " PRO_Cuenta_38 ='" & vp_O_Obj.Cuenta_38 & "', " & _
                          " PRO_Cuenta_39 ='" & vp_O_Obj.Cuenta_39 & "', " & _
                          " PRO_Cuenta_40 ='" & vp_O_Obj.Cuenta_40 & "', " & _
                          " PRO_Cuenta_41 ='" & vp_O_Obj.Cuenta_41 & "', " & _
                          " PRO_Cuenta_42 ='" & vp_O_Obj.Cuenta_42 & "', " & _
                          " PRO_Cuenta_43 ='" & vp_O_Obj.Cuenta_43 & "', " & _
                          " PRO_Cuenta_44 ='" & vp_O_Obj.Cuenta_44 & "', " & _
                          " PRO_Cuenta_45 ='" & vp_O_Obj.Cuenta_45 & "', " & _
                          " PRO_Cuenta_46 ='" & vp_O_Obj.Cuenta_46 & "', " & _
                          " PRO_Cuenta_47 ='" & vp_O_Obj.Cuenta_47 & "', " & _
                          " PRO_Cuenta_48 ='" & vp_O_Obj.Cuenta_48 & "', " & _
                          " PRO_Cuenta_49 ='" & vp_O_Obj.Cuenta_49 & "', " & _
                          " PRO_Cuenta_50 ='" & vp_O_Obj.Cuenta_50 & "', " & _
                          " PRO_FechaActualizacion ='" & vp_O_Obj.FechaActualizacion & "', " & _
                          " PRO_Usuario ='" & vp_O_Obj.Usuario & "', " & _
                          " PRO_Causacion_Interes ='" & vp_O_Obj.Causacion_Interes & "', " & _
                          " PRO_Causacion_Mora ='" & vp_O_Obj.Causacion_Mora & "', " & _
                          " PRO_Base_Mora ='" & vp_O_Obj.Base_Mora & "', " & _
                          " PRO_Capitalizacion ='" & vp_O_Obj.Capitalizacion & "', " & _
                          " PRO_Control_Activo ='" & vp_O_Obj.Control_Activo & "'" & _
                       " WHERE PRO_producto_ID = '" & vp_O_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Financiacion (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseFinanciacion(ByVal vp_Obj As FinanciacionClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Financiacion WHERE PRO_producto_ID = '" & vp_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_Obj.Nit_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

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
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTipo_P(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TPL_ID AS ID, CAST(TPL_ID AS NVARCHAR(3))+ ' - '+  TPL_Descripcion AS Descripcion FROM TIPOPRODUCTO_LEASING ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListSubTipo_P(ByVal vp_S_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT ST.STPL_ID AS ID, CAST(ST.STPL_ID AS NVARCHAR(5)) + ' - ' + ST.STPL_Descripcion  FROM R_TIPO_SUBTIPO_LEASING R " & _
                   " INNER JOIN SUB_TIPOPRODUCTO_LEASING ST ON ST.STPL_ID = R.RTS_Subtipo_ID " & _
                   " WHERE R.RTS_Tipo_ID = '" & vp_S_ID & "'")
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
    Public Function Charge_DropListTipo_A(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TA_ID AS ID, CAST(TA_ID AS NVARCHAR(3))+ ' - '+  TA_Descripcion AS Descripcion FROM TIPOACTIVO ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListSubTipo_A(ByVal vp_S_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT ST.STA_ID AS ID, CAST(ST.STA_ID AS NVARCHAR(5)) + ' - ' + ST.STA_Descripcion  FROM R_TIPO_SUBTIPO_ACTIVO R " & _
                   " INNER JOIN SUB_TIPOACTIVO ST ON ST.STA_ID = R.RTS_Subtipo_ID " & _
                   " WHERE R.RTS_Tipo_ID = '" & vp_S_ID & "'")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTransaccion(ByVal vp_S_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT T_ID AS ID,CAST(T_ID AS NVARCHAR(5))+ ' - ' + T_Descripcion AS Descripcion FROM TRANSACCIONES ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Financiacion para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listFinanciacion(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListFinanciacion As New List(Of FinanciacionClass)

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

                    Dim objFinanciacion As New FinanciacionClass
                    'cargamos datos sobre el objeto de login

                    objFinanciacion.Producto_ID = ReadConsulta.GetValue(0)
                    objFinanciacion.Descripcion = ReadConsulta.GetValue(1)
                    objFinanciacion.TP_ID = ReadConsulta.GetValue(2)
                    objFinanciacion.STP_ID = ReadConsulta.GetValue(3)
                    objFinanciacion.Tran_ID_1 = ReadConsulta.GetValue(4)
                    objFinanciacion.Tran_ID_2 = ReadConsulta.GetValue(5)
                    objFinanciacion.Tran_ID_3 = ReadConsulta.GetValue(6)

                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objFinanciacion.Cuenta_1 = ReadConsulta.GetValue(7) Else objFinanciacion.Cuenta_1 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objFinanciacion.Cuenta_2 = ReadConsulta.GetValue(8) Else objFinanciacion.Cuenta_2 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objFinanciacion.Cuenta_3 = ReadConsulta.GetValue(9) Else objFinanciacion.Cuenta_3 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objFinanciacion.Cuenta_4 = ReadConsulta.GetValue(10) Else objFinanciacion.Cuenta_4 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objFinanciacion.Cuenta_5 = ReadConsulta.GetValue(11) Else objFinanciacion.Cuenta_5 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objFinanciacion.Cuenta_6 = ReadConsulta.GetValue(12) Else objFinanciacion.Cuenta_6 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objFinanciacion.Cuenta_7 = ReadConsulta.GetValue(13) Else objFinanciacion.Cuenta_7 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objFinanciacion.Cuenta_8 = ReadConsulta.GetValue(14) Else objFinanciacion.Cuenta_8 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objFinanciacion.Cuenta_9 = ReadConsulta.GetValue(15) Else objFinanciacion.Cuenta_9 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objFinanciacion.Cuenta_10 = ReadConsulta.GetValue(16) Else objFinanciacion.Cuenta_10 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objFinanciacion.Cuenta_11 = ReadConsulta.GetValue(17) Else objFinanciacion.Cuenta_11 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objFinanciacion.Cuenta_12 = ReadConsulta.GetValue(18) Else objFinanciacion.Cuenta_12 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objFinanciacion.Cuenta_13 = ReadConsulta.GetValue(19) Else objFinanciacion.Cuenta_13 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objFinanciacion.Cuenta_14 = ReadConsulta.GetValue(20) Else objFinanciacion.Cuenta_14 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objFinanciacion.Cuenta_15 = ReadConsulta.GetValue(21) Else objFinanciacion.Cuenta_15 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objFinanciacion.Cuenta_16 = ReadConsulta.GetValue(22) Else objFinanciacion.Cuenta_16 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objFinanciacion.Cuenta_17 = ReadConsulta.GetValue(23) Else objFinanciacion.Cuenta_17 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objFinanciacion.Cuenta_18 = ReadConsulta.GetValue(24) Else objFinanciacion.Cuenta_18 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objFinanciacion.Cuenta_19 = ReadConsulta.GetValue(25) Else objFinanciacion.Cuenta_19 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objFinanciacion.Cuenta_20 = ReadConsulta.GetValue(26) Else objFinanciacion.Cuenta_20 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objFinanciacion.Cuenta_21 = ReadConsulta.GetValue(27) Else objFinanciacion.Cuenta_21 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objFinanciacion.Cuenta_22 = ReadConsulta.GetValue(28) Else objFinanciacion.Cuenta_22 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objFinanciacion.Cuenta_23 = ReadConsulta.GetValue(29) Else objFinanciacion.Cuenta_23 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then objFinanciacion.Cuenta_24 = ReadConsulta.GetValue(30) Else objFinanciacion.Cuenta_24 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then objFinanciacion.Cuenta_25 = ReadConsulta.GetValue(31) Else objFinanciacion.Cuenta_25 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(32))) Then objFinanciacion.Cuenta_26 = ReadConsulta.GetValue(32) Else objFinanciacion.Cuenta_26 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(33))) Then objFinanciacion.Cuenta_27 = ReadConsulta.GetValue(33) Else objFinanciacion.Cuenta_27 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(34))) Then objFinanciacion.Cuenta_28 = ReadConsulta.GetValue(34) Else objFinanciacion.Cuenta_28 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(35))) Then objFinanciacion.Cuenta_29 = ReadConsulta.GetValue(35) Else objFinanciacion.Cuenta_29 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(36))) Then objFinanciacion.Cuenta_30 = ReadConsulta.GetValue(36) Else objFinanciacion.Cuenta_30 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(37))) Then objFinanciacion.Cuenta_31 = ReadConsulta.GetValue(37) Else objFinanciacion.Cuenta_31 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(38))) Then objFinanciacion.Cuenta_32 = ReadConsulta.GetValue(38) Else objFinanciacion.Cuenta_32 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(39))) Then objFinanciacion.Cuenta_33 = ReadConsulta.GetValue(39) Else objFinanciacion.Cuenta_33 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(40))) Then objFinanciacion.Cuenta_34 = ReadConsulta.GetValue(40) Else objFinanciacion.Cuenta_34 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(41))) Then objFinanciacion.Cuenta_35 = ReadConsulta.GetValue(41) Else objFinanciacion.Cuenta_35 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(42))) Then objFinanciacion.Cuenta_36 = ReadConsulta.GetValue(42) Else objFinanciacion.Cuenta_36 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(43))) Then objFinanciacion.Cuenta_37 = ReadConsulta.GetValue(43) Else objFinanciacion.Cuenta_37 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(44))) Then objFinanciacion.Cuenta_38 = ReadConsulta.GetValue(44) Else objFinanciacion.Cuenta_38 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(45))) Then objFinanciacion.Cuenta_39 = ReadConsulta.GetValue(45) Else objFinanciacion.Cuenta_39 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(46))) Then objFinanciacion.Cuenta_40 = ReadConsulta.GetValue(46) Else objFinanciacion.Cuenta_40 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(47))) Then objFinanciacion.Cuenta_41 = ReadConsulta.GetValue(47) Else objFinanciacion.Cuenta_41 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(48))) Then objFinanciacion.Cuenta_42 = ReadConsulta.GetValue(48) Else objFinanciacion.Cuenta_42 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(49))) Then objFinanciacion.Cuenta_43 = ReadConsulta.GetValue(49) Else objFinanciacion.Cuenta_43 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(50))) Then objFinanciacion.Cuenta_44 = ReadConsulta.GetValue(50) Else objFinanciacion.Cuenta_44 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(51))) Then objFinanciacion.Cuenta_45 = ReadConsulta.GetValue(51) Else objFinanciacion.Cuenta_45 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(52))) Then objFinanciacion.Cuenta_46 = ReadConsulta.GetValue(52) Else objFinanciacion.Cuenta_46 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(53))) Then objFinanciacion.Cuenta_47 = ReadConsulta.GetValue(53) Else objFinanciacion.Cuenta_47 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(54))) Then objFinanciacion.Cuenta_48 = ReadConsulta.GetValue(54) Else objFinanciacion.Cuenta_48 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(55))) Then objFinanciacion.Cuenta_49 = ReadConsulta.GetValue(55) Else objFinanciacion.Cuenta_49 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(56))) Then objFinanciacion.Cuenta_50 = ReadConsulta.GetValue(56) Else objFinanciacion.Cuenta_40 = ""

                    objFinanciacion.FechaActualizacion = ReadConsulta.GetValue(57)
                    objFinanciacion.Usuario = ReadConsulta.GetValue(58)
                    objFinanciacion.Nit_ID = ReadConsulta.GetValue(59)

                    If Not (IsDBNull(ReadConsulta.GetValue(60))) Then objFinanciacion.Causacion_Interes = ReadConsulta.GetValue(60) Else objFinanciacion.Causacion_Interes = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(61))) Then objFinanciacion.Causacion_Mora = ReadConsulta.GetValue(61) Else objFinanciacion.Causacion_Mora = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(62))) Then objFinanciacion.Base_Mora = ReadConsulta.GetValue(62) Else objFinanciacion.Base_Mora = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(63))) Then objFinanciacion.Capitalizacion = ReadConsulta.GetValue(63) Else objFinanciacion.Capitalizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(64))) Then objFinanciacion.Control_Activo = ReadConsulta.GetValue(64) Else objFinanciacion.Control_Activo = ""

                    'agregamos a la lista
                    ObjListFinanciacion.Add(objFinanciacion)

                End While

            Case "Matrix"
                While ReadConsulta.Read

                    Dim objFinanciacion As New FinanciacionClass
                    'cargamos datos sobre el objeto de login

                    objFinanciacion.Nit_ID = ReadConsulta.GetValue(0)
                    objFinanciacion.Producto_ID = ReadConsulta.GetValue(1)
                    objFinanciacion.Descripcion = ReadConsulta.GetValue(2)
                    objFinanciacion.TP_ID = ReadConsulta.GetValue(3)
                    objFinanciacion.STP_ID = ReadConsulta.GetValue(4)

                    'agregamos a la lista
                    ObjListFinanciacion.Add(objFinanciacion)

                End While


        End Select



        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListFinanciacion

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As FinanciacionClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM Financiacion " & _
                       " WHERE PRO_producto_ID = '" & vp_O_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Financiacion
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Financiacion()

        Dim ObjList As New List(Of FinanciacionClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT  PRO_Nit_ID, " & _
                   "         PRO_producto_ID, " & _
                   "         PRO_Descripcion , " & _
                   "         PRO_TP_ID, " & _
                   "         PRO_STP_ID " & _
                   " FROM Financiacion " & _
                   " ORDER BY PRO_producto_ID ASC")
        Dim StrQuery As String = sql.ToString

        ObjList = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee la matriz de Financiacion
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Financiacion()

        Dim ObjList As New List(Of FinanciacionClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT	FIN_Nit_ID, " & _
                   " 		FIN_Financiacion_ID, " & _
                   "		FIN_Descripcion, " & _
                   "		FIN_Calculo, " & _
                   "		FIN_Calculo_Cuota_Final, " & _
                   "		FIN_Modalidad_Pago," & _
                   "		FIN_Periodo_Pago, " & _
                   "		FIN_Tipo_Cuota, " & _
                   "		FIN_Formula_FK, " & _
                   "		FIN_Base_Calculo, " & _
                   "		FIN_Tasa_FK," & _
                   "		FIN_Tipo_Tasa, " & _
                   "		FIN_Puntos_Adicionales, " & _
                   "		FIN_Tasa_Mora_FK," & _
                   "		FIN_Tasa_Usura_FK, " & _
                   "		FIN_Ciclo_Cobro_FK" & _
                   " FROM FINANCIACION  " & _
                   " ORDER BY FIN_Nit_ID, FIN_Financiacion_ID ASC")
        Dim StrQuery As String = sql.ToString

        ObjList = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
