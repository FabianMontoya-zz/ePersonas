Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class ProductosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Productos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllProductos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListProductos As New List(Of ProductosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_TA_ID," & _
                                  "PRO_STA_ID," & _
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
                                  "PRO_Nit_ID" & _
                                " FROM PRODUCTOS")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_TA_ID," & _
                                  "PRO_STA_ID," & _
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
                                  "PRO_Nit_ID" & _
                                " FROM PRODUCTOS")
            Else
                sql.Append(" SELECT PRO_producto_ID," & _
                                  "PRO_Descripcion," & _
                                  "PRO_TP_ID," & _
                                  "PRO_STP_ID," & _
                                  "PRO_TA_ID," & _
                                  "PRO_STA_ID," & _
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
                                  "PRO_Nit_ID" & _
                                " FROM PRODUCTOS" & _
                          " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListProductos = listProductos(StrQuery, Conexion)

        Return ObjListProductos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Productos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertProductos(ByVal vp_Obj As ProductosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PRODUCTOS (" & _
            "PRO_Nit_ID," & _
            "PRO_producto_ID," & _
            "PRO_Descripcion," & _
            "PRO_TP_ID," & _
            "PRO_STP_ID," & _
            "PRO_TA_ID," & _
            "PRO_STA_ID," & _
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
            "PRO_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Producto_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.TP_ID & "',")
        sql.AppendLine("'" & vp_Obj.STP_ID & "',")
        sql.AppendLine("'" & vp_Obj.TA_ID & "',")
        sql.AppendLine("'" & vp_Obj.STA_ID & "',")
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
        sql.AppendLine("'" & vp_Obj.Usuario & "' ) ")

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
    Public Function Update(ByVal vp_O_Obj As ProductosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""
        sql.AppendLine(" UPDATE PRODUCTOS SET " & _
                          " PRO_Descripcion ='" & vp_O_Obj.Descripcion & "', " & _
                          " PRO_TP_ID ='" & vp_O_Obj.TP_ID & "', " & _
                          " PRO_STP_ID ='" & vp_O_Obj.STP_ID & "', " & _
                          " PRO_TA_ID ='" & vp_O_Obj.TA_ID & "', " & _
                          " PRO_STA_ID ='" & vp_O_Obj.STA_ID & "', " & _
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
                          " PRO_Usuario ='" & vp_O_Obj.Usuario & "'" & _
                       " WHERE PRO_producto_ID = '" & vp_O_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Productos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseProductos(ByVal vp_Obj As ProductosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE PRODUCTOS WHERE PRO_producto_ID = '" & vp_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_Obj.Nit_ID & "'")
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
    ''' funcion que trae el listado de Productos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listProductos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListProductos As New List(Of ProductosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objProductos As New ProductosClass
            'cargamos datos sobre el objeto de login


            objProductos.Producto_ID = ReadConsulta.GetValue(0)
            objProductos.Descripcion = ReadConsulta.GetValue(1)
            objProductos.TP_ID = ReadConsulta.GetValue(2)
            objProductos.STP_ID = ReadConsulta.GetValue(3)
            objProductos.TA_ID = ReadConsulta.GetValue(4)
            objProductos.STA_ID = ReadConsulta.GetValue(5)
            objProductos.Tran_ID_1 = ReadConsulta.GetValue(6)
            objProductos.Tran_ID_2 = ReadConsulta.GetValue(7)
            objProductos.Tran_ID_3 = ReadConsulta.GetValue(8)

            If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objProductos.Cuenta_1 = ReadConsulta.GetValue(9) Else objProductos.Cuenta_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objProductos.Cuenta_2 = ReadConsulta.GetValue(10) Else objProductos.Cuenta_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objProductos.Cuenta_3 = ReadConsulta.GetValue(11) Else objProductos.Cuenta_3 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objProductos.Cuenta_4 = ReadConsulta.GetValue(12) Else objProductos.Cuenta_4 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objProductos.Cuenta_5 = ReadConsulta.GetValue(13) Else objProductos.Cuenta_5 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objProductos.Cuenta_6 = ReadConsulta.GetValue(14) Else objProductos.Cuenta_6 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objProductos.Cuenta_7 = ReadConsulta.GetValue(15) Else objProductos.Cuenta_7 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objProductos.Cuenta_8 = ReadConsulta.GetValue(16) Else objProductos.Cuenta_8 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objProductos.Cuenta_9 = ReadConsulta.GetValue(17) Else objProductos.Cuenta_9 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objProductos.Cuenta_10 = ReadConsulta.GetValue(18) Else objProductos.Cuenta_10 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objProductos.Cuenta_11 = ReadConsulta.GetValue(19) Else objProductos.Cuenta_11 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objProductos.Cuenta_12 = ReadConsulta.GetValue(20) Else objProductos.Cuenta_12 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objProductos.Cuenta_13 = ReadConsulta.GetValue(21) Else objProductos.Cuenta_13 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objProductos.Cuenta_14 = ReadConsulta.GetValue(22) Else objProductos.Cuenta_14 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objProductos.Cuenta_15 = ReadConsulta.GetValue(23) Else objProductos.Cuenta_15 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objProductos.Cuenta_16 = ReadConsulta.GetValue(24) Else objProductos.Cuenta_16 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objProductos.Cuenta_17 = ReadConsulta.GetValue(25) Else objProductos.Cuenta_17 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objProductos.Cuenta_18 = ReadConsulta.GetValue(26) Else objProductos.Cuenta_18 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objProductos.Cuenta_19 = ReadConsulta.GetValue(27) Else objProductos.Cuenta_19 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objProductos.Cuenta_20 = ReadConsulta.GetValue(28) Else objProductos.Cuenta_20 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objProductos.Cuenta_21 = ReadConsulta.GetValue(29) Else objProductos.Cuenta_21 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(30))) Then objProductos.Cuenta_22 = ReadConsulta.GetValue(30) Else objProductos.Cuenta_22 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(31))) Then objProductos.Cuenta_23 = ReadConsulta.GetValue(31) Else objProductos.Cuenta_23 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(32))) Then objProductos.Cuenta_24 = ReadConsulta.GetValue(32) Else objProductos.Cuenta_24 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(33))) Then objProductos.Cuenta_25 = ReadConsulta.GetValue(33) Else objProductos.Cuenta_25 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(34))) Then objProductos.Cuenta_26 = ReadConsulta.GetValue(34) Else objProductos.Cuenta_26 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(35))) Then objProductos.Cuenta_27 = ReadConsulta.GetValue(35) Else objProductos.Cuenta_27 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(36))) Then objProductos.Cuenta_28 = ReadConsulta.GetValue(36) Else objProductos.Cuenta_28 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(37))) Then objProductos.Cuenta_29 = ReadConsulta.GetValue(37) Else objProductos.Cuenta_29 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(38))) Then objProductos.Cuenta_30 = ReadConsulta.GetValue(38) Else objProductos.Cuenta_30 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(39))) Then objProductos.Cuenta_31 = ReadConsulta.GetValue(39) Else objProductos.Cuenta_31 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(40))) Then objProductos.Cuenta_32 = ReadConsulta.GetValue(40) Else objProductos.Cuenta_32 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(41))) Then objProductos.Cuenta_33 = ReadConsulta.GetValue(41) Else objProductos.Cuenta_33 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(42))) Then objProductos.Cuenta_34 = ReadConsulta.GetValue(42) Else objProductos.Cuenta_34 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(43))) Then objProductos.Cuenta_35 = ReadConsulta.GetValue(43) Else objProductos.Cuenta_35 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(44))) Then objProductos.Cuenta_36 = ReadConsulta.GetValue(44) Else objProductos.Cuenta_36 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(45))) Then objProductos.Cuenta_37 = ReadConsulta.GetValue(45) Else objProductos.Cuenta_37 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(46))) Then objProductos.Cuenta_38 = ReadConsulta.GetValue(46) Else objProductos.Cuenta_38 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(47))) Then objProductos.Cuenta_39 = ReadConsulta.GetValue(47) Else objProductos.Cuenta_39 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(48))) Then objProductos.Cuenta_40 = ReadConsulta.GetValue(48) Else objProductos.Cuenta_40 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(49))) Then objProductos.Cuenta_41 = ReadConsulta.GetValue(49) Else objProductos.Cuenta_41 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(50))) Then objProductos.Cuenta_42 = ReadConsulta.GetValue(50) Else objProductos.Cuenta_42 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(51))) Then objProductos.Cuenta_43 = ReadConsulta.GetValue(51) Else objProductos.Cuenta_43 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(52))) Then objProductos.Cuenta_44 = ReadConsulta.GetValue(52) Else objProductos.Cuenta_44 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(53))) Then objProductos.Cuenta_45 = ReadConsulta.GetValue(53) Else objProductos.Cuenta_45 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(54))) Then objProductos.Cuenta_46 = ReadConsulta.GetValue(54) Else objProductos.Cuenta_46 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(55))) Then objProductos.Cuenta_47 = ReadConsulta.GetValue(55) Else objProductos.Cuenta_47 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(56))) Then objProductos.Cuenta_48 = ReadConsulta.GetValue(56) Else objProductos.Cuenta_48 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(57))) Then objProductos.Cuenta_49 = ReadConsulta.GetValue(57) Else objProductos.Cuenta_49 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(58))) Then objProductos.Cuenta_50 = ReadConsulta.GetValue(58) Else objProductos.Cuenta_40 = ""

            objProductos.FechaActualizacion = ReadConsulta.GetValue(59)
            objProductos.Usuario = ReadConsulta.GetValue(60)
            objProductos.Nit_ID = ReadConsulta.GetValue(61)

            'agregamos a la lista
            ObjListProductos.Add(objProductos)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListProductos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As ProductosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM PRODUCTOS " & _
                       " WHERE PRO_producto_ID = '" & vp_O_Obj.Producto_ID & "' AND PRO_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region

End Class
