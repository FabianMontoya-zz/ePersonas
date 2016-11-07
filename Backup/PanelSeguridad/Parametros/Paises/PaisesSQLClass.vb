Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class PaisesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Paises parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllPaises(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListPaises As New List(Of PaisesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim conexion As String = conex.typeConexion("2")
        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT P_Cod, " & _
                       " P_Name, " & _
                       " P_Est_LUN," & _
                        " P_Est_MAR," & _
                        " P_Est_MIE," & _
                        " P_Est_JUE," & _
                        " P_Est_VIE," & _
                        " P_Est_SAB," & _
                        " P_Est_DOM," & _
                        " P_HoF1_LUN," & _
                        " P_HoI1_LUN," & _
                        " P_HoI2_LUN," & _
                        " P_HoF2_LUN," & _
                        " P_HoI3_LUN," & _
                        " P_HoF3_LUN," & _
                        " P_HoI4_LUN," & _
                        " P_HoF4_LUN," & _
                        " P_HoI1_MAR," & _
                        " P_HoF1_MAR," & _
                        " P_HoI2_MAR," & _
                        " P_HoF2_MAR," & _
                        " P_HoI3_MAR," & _
                        " P_HoF3_MAR," & _
                        " P_HoI4_MAR," & _
                        " P_HoF4_MAR," & _
                        " P_HoI1_MIE," & _
                        " P_HoF1_MIE," & _
                        " P_HoI2_MIE," & _
                        " P_HoF2_MIE," & _
                        " P_HoI3_MIE," & _
                        " P_HoF3_MIE," & _
                        " P_HoI4_MIE," & _
                        " P_HoF4_MIE," & _
                        " P_HoI1_JUE," & _
                        " P_HoF1_JUE," & _
                        " P_HoI2_JUE," & _
                        " P_HoF2_JUE," & _
                        " P_HoI3_JUE," & _
                        " P_HoF3_JUE," & _
                        " P_HoI4_JUE," & _
                        " P_HoF4_JUE," & _
                        " P_HoI1_VIE," & _
                        " P_HoF1_VIE," & _
                        " P_HoI2_VIE," & _
                        " P_HoF2_VIE," & _
                        " P_HoI3_VIE," & _
                        " P_HoF3_VIE," & _
                        " P_HoI4_VIE," & _
                        " P_HoF4_VIE," & _
                        " P_HoI1_SAB," & _
                        " P_HoF1_SAB," & _
                        " P_HoI2_SAB," & _
                        " P_HoF2_SAB," & _
                        " P_HoI3_SAB," & _
                        " P_HoF3_SAB," & _
                        " P_HoI4_SAB," & _
                        " P_HoF4_SAB," & _
                        " P_HoI1_DOM," & _
                        " P_HoF1_DOM," & _
                        " P_HoI2_DOM," & _
                        " P_HoF2_DOM," & _
                        " P_HoI3_DOM," & _
                        " P_HoF3_DOM," & _
                        " P_HoI4_DOM," & _
                        " P_HoF4_DOM," & _
                       " P_FechaActualizacion,  " & _
                       " P_Usuario," & _
                       " P_Moneda," & _
                       " P_SWIFT" & _
                       " FROM PAISES ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT P_Cod, " & _
                       " P_Name, " & _
                       " P_Est_LUN," & _
                        " P_Est_MAR," & _
                        " P_Est_MIE," & _
                        " P_Est_JUE," & _
                        " P_Est_VIE," & _
                        " P_Est_SAB," & _
                        " P_Est_DOM," & _
                        " P_HoF1_LUN," & _
                        " P_HoI1_LUN," & _
                        " P_HoI2_LUN," & _
                        " P_HoF2_LUN," & _
                        " P_HoI3_LUN," & _
                        " P_HoF3_LUN," & _
                        " P_HoI4_LUN," & _
                        " P_HoF4_LUN," & _
                        " P_HoI1_MAR," & _
                        " P_HoF1_MAR," & _
                        " P_HoI2_MAR," & _
                        " P_HoF2_MAR," & _
                        " P_HoI3_MAR," & _
                        " P_HoF3_MAR," & _
                        " P_HoI4_MAR," & _
                        " P_HoF4_MAR," & _
                        " P_HoI1_MIE," & _
                        " P_HoF1_MIE," & _
                        " P_HoI2_MIE," & _
                        " P_HoF2_MIE," & _
                        " P_HoI3_MIE," & _
                        " P_HoF3_MIE," & _
                        " P_HoI4_MIE," & _
                        " P_HoF4_MIE," & _
                        " P_HoI1_JUE," & _
                        " P_HoF1_JUE," & _
                        " P_HoI2_JUE," & _
                        " P_HoF2_JUE," & _
                        " P_HoI3_JUE," & _
                        " P_HoF3_JUE," & _
                        " P_HoI4_JUE," & _
                        " P_HoF4_JUE," & _
                        " P_HoI1_VIE," & _
                        " P_HoF1_VIE," & _
                        " P_HoI2_VIE," & _
                        " P_HoF2_VIE," & _
                        " P_HoI3_VIE," & _
                        " P_HoF3_VIE," & _
                        " P_HoI4_VIE," & _
                        " P_HoF4_VIE," & _
                        " P_HoI1_SAB," & _
                        " P_HoF1_SAB," & _
                        " P_HoI2_SAB," & _
                        " P_HoF2_SAB," & _
                        " P_HoI3_SAB," & _
                        " P_HoF3_SAB," & _
                        " P_HoI4_SAB," & _
                        " P_HoF4_SAB," & _
                        " P_HoI1_DOM," & _
                        " P_HoF1_DOM," & _
                        " P_HoI2_DOM," & _
                        " P_HoF2_DOM," & _
                        " P_HoI3_DOM," & _
                        " P_HoF3_DOM," & _
                        " P_HoI4_DOM," & _
                        " P_HoF4_DOM," & _
                       " P_FechaActualizacion,  " & _
                       " P_Usuario," & _
                       " P_Moneda," & _
                       " P_SWIFT" & _
                       " FROM PAISES ")
            Else
                sql.Append(" SELECT P_Cod, " & _
                       " P_Name, " & _
                       " P_Est_LUN," & _
                        " P_Est_MAR," & _
                        " P_Est_MIE," & _
                        " P_Est_JUE," & _
                        " P_Est_VIE," & _
                        " P_Est_SAB," & _
                        " P_Est_DOM," & _
                        " P_HoF1_LUN," & _
                        " P_HoI1_LUN," & _
                        " P_HoI2_LUN," & _
                        " P_HoF2_LUN," & _
                        " P_HoI3_LUN," & _
                        " P_HoF3_LUN," & _
                        " P_HoI4_LUN," & _
                        " P_HoF4_LUN," & _
                        " P_HoI1_MAR," & _
                        " P_HoF1_MAR," & _
                        " P_HoI2_MAR," & _
                        " P_HoF2_MAR," & _
                        " P_HoI3_MAR," & _
                        " P_HoF3_MAR," & _
                        " P_HoI4_MAR," & _
                        " P_HoF4_MAR," & _
                        " P_HoI1_MIE," & _
                        " P_HoF1_MIE," & _
                        " P_HoI2_MIE," & _
                        " P_HoF2_MIE," & _
                        " P_HoI3_MIE," & _
                        " P_HoF3_MIE," & _
                        " P_HoI4_MIE," & _
                        " P_HoF4_MIE," & _
                        " P_HoI1_JUE," & _
                        " P_HoF1_JUE," & _
                        " P_HoI2_JUE," & _
                        " P_HoF2_JUE," & _
                        " P_HoI3_JUE," & _
                        " P_HoF3_JUE," & _
                        " P_HoI4_JUE," & _
                        " P_HoF4_JUE," & _
                        " P_HoI1_VIE," & _
                        " P_HoF1_VIE," & _
                        " P_HoI2_VIE," & _
                        " P_HoF2_VIE," & _
                        " P_HoI3_VIE," & _
                        " P_HoF3_VIE," & _
                        " P_HoI4_VIE," & _
                        " P_HoF4_VIE," & _
                        " P_HoI1_SAB," & _
                        " P_HoF1_SAB," & _
                        " P_HoI2_SAB," & _
                        " P_HoF2_SAB," & _
                        " P_HoI3_SAB," & _
                        " P_HoF3_SAB," & _
                        " P_HoI4_SAB," & _
                        " P_HoF4_SAB," & _
                        " P_HoI1_DOM," & _
                        " P_HoF1_DOM," & _
                        " P_HoI2_DOM," & _
                        " P_HoF2_DOM," & _
                        " P_HoI3_DOM," & _
                        " P_HoF3_DOM," & _
                        " P_HoI4_DOM," & _
                        " P_HoF4_DOM," & _
                       " P_FechaActualizacion,  " & _
                       " P_Usuario," & _
                       " P_Moneda," & _
                       " P_SWIFT" & _
                       " FROM PAISES " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListPaises = listPaises(StrQuery, conexion, "List")

        Return ObjListPaises

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Paises (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertPaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PAISES (" & _
            " P_Cod," & _
            " P_Name," & _
            " P_Moneda," & _
            " P_SWIFT," & _
            " P_Est_LUN," & _
            " P_Est_MAR," & _
            " P_Est_MIE," & _
            " P_Est_JUE," & _
            " P_Est_VIE," & _
            " P_Est_SAB," & _
            " P_Est_DOM," & _
            " P_HoF1_LUN," & _
            " P_HoI1_LUN," & _
            " P_HoI2_LUN," & _
            " P_HoF2_LUN," & _
            " P_HoI3_LUN," & _
            " P_HoF3_LUN," & _
            " P_HoI4_LUN," & _
            " P_HoF4_LUN," & _
            " P_HoI1_MAR," & _
            " P_HoF1_MAR," & _
            " P_HoI2_MAR," & _
            " P_HoF2_MAR," & _
            " P_HoI3_MAR," & _
            " P_HoF3_MAR," & _
            " P_HoI4_MAR," & _
            " P_HoF4_MAR," & _
            " P_HoI1_MIE," & _
            " P_HoF1_MIE," & _
            " P_HoI2_MIE," & _
            " P_HoF2_MIE," & _
            " P_HoI3_MIE," & _
            " P_HoF3_MIE," & _
            " P_HoI4_MIE," & _
            " P_HoF4_MIE," & _
            " P_HoI1_JUE," & _
            " P_HoF1_JUE," & _
            " P_HoI2_JUE," & _
            " P_HoF2_JUE," & _
            " P_HoI3_JUE," & _
            " P_HoF3_JUE," & _
            " P_HoI4_JUE," & _
            " P_HoF4_JUE," & _
            " P_HoI1_VIE," & _
            " P_HoF1_VIE," & _
            " P_HoI2_VIE," & _
            " P_HoF2_VIE," & _
            " P_HoI3_VIE," & _
            " P_HoF3_VIE," & _
            " P_HoI4_VIE," & _
            " P_HoF4_VIE," & _
            " P_HoI1_SAB," & _
            " P_HoF1_SAB," & _
            " P_HoI2_SAB," & _
            " P_HoF2_SAB," & _
            " P_HoI3_SAB," & _
            " P_HoF3_SAB," & _
            " P_HoI4_SAB," & _
            " P_HoF4_SAB," & _
            " P_HoI1_DOM," & _
            " P_HoF1_DOM," & _
            " P_HoI2_DOM," & _
            " P_HoF2_DOM," & _
            " P_HoI3_DOM," & _
            " P_HoF3_DOM," & _
            " P_HoI4_DOM," & _
            " P_HoF4_DOM," & _
            " P_FechaActualizacion," & _
            " P_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Paises.Cod & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Name & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Moneda & "',")
        sql.AppendLine("'" & vp_Obj_Paises.SWIFT & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Est_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_LUN & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_MAR & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_MIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_JUE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_VIE & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_SAB & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI1_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF1_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI2_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF2_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI3_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF3_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoI4_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.HoF4_DOM & "',")
        sql.AppendLine("'" & vp_Obj_Paises.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Usuario & "' ) ")

        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la ACTUALIZACION de nuevo Paises (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdatePaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine(" UPDATE PAISES SET " & _
                       " P_Name = '" & vp_Obj_Paises.Name & "'," & _
                       " P_Est_LUN = '" & vp_Obj_Paises.Est_LUN & "'," & _
                       " P_Moneda = '" & vp_Obj_Paises.Moneda & "'," & _
                       " P_SWIFT = '" & vp_Obj_Paises.SWIFT & "'," & _
                        " P_Est_MAR = '" & vp_Obj_Paises.Est_MAR & "'," & _
                        " P_Est_MIE = '" & vp_Obj_Paises.Est_MIE & "'," & _
                        " P_Est_JUE = '" & vp_Obj_Paises.Est_JUE & "'," & _
                        " P_Est_VIE = '" & vp_Obj_Paises.Est_VIE & "'," & _
                        " P_Est_SAB = '" & vp_Obj_Paises.Est_SAB & "'," & _
                        " P_Est_DOM = '" & vp_Obj_Paises.Est_DOM & "'," & _
                        " P_HoF1_LUN = '" & vp_Obj_Paises.HoF1_LUN & "'," & _
                        " P_HoI1_LUN = '" & vp_Obj_Paises.HoI1_LUN & "'," & _
                        " P_HoI2_LUN = '" & vp_Obj_Paises.HoI2_LUN & "'," & _
                        " P_HoF2_LUN = '" & vp_Obj_Paises.HoF2_LUN & "'," & _
                        " P_HoI3_LUN = '" & vp_Obj_Paises.HoI3_LUN & "'," & _
                        " P_HoF3_LUN = '" & vp_Obj_Paises.HoF3_LUN & "'," & _
                        " P_HoI4_LUN = '" & vp_Obj_Paises.HoI4_LUN & "'," & _
                        " P_HoF4_LUN = '" & vp_Obj_Paises.HoF4_LUN & "'," & _
                        " P_HoI1_MAR = '" & vp_Obj_Paises.HoI1_MAR & "'," & _
                        " P_HoF1_MAR = '" & vp_Obj_Paises.HoF1_MAR & "'," & _
                        " P_HoI2_MAR = '" & vp_Obj_Paises.HoI2_MAR & "'," & _
                        " P_HoF2_MAR = '" & vp_Obj_Paises.HoF2_MAR & "'," & _
                        " P_HoI3_MAR = '" & vp_Obj_Paises.HoI3_MAR & "'," & _
                        " P_HoF3_MAR = '" & vp_Obj_Paises.HoF3_MAR & "'," & _
                        " P_HoI4_MAR = '" & vp_Obj_Paises.HoI4_MAR & "'," & _
                        " P_HoF4_MAR = '" & vp_Obj_Paises.HoF4_MAR & "'," & _
                        " P_HoI1_MIE = '" & vp_Obj_Paises.HoI1_MIE & "'," & _
                        " P_HoF1_MIE = '" & vp_Obj_Paises.HoF1_MIE & "'," & _
                        " P_HoI2_MIE = '" & vp_Obj_Paises.HoI2_MIE & "'," & _
                        " P_HoF2_MIE = '" & vp_Obj_Paises.HoF2_MIE & "'," & _
                        " P_HoI3_MIE = '" & vp_Obj_Paises.HoI3_MIE & "'," & _
                        " P_HoF3_MIE = '" & vp_Obj_Paises.HoF3_MIE & "'," & _
                        " P_HoI4_MIE = '" & vp_Obj_Paises.HoI4_MIE & "'," & _
                        " P_HoF4_MIE = '" & vp_Obj_Paises.HoF4_MIE & "'," & _
                        " P_HoI1_JUE = '" & vp_Obj_Paises.HoI1_JUE & "'," & _
                        " P_HoF1_JUE = '" & vp_Obj_Paises.HoF1_JUE & "'," & _
                        " P_HoI2_JUE = '" & vp_Obj_Paises.HoI2_JUE & "'," & _
                        " P_HoF2_JUE = '" & vp_Obj_Paises.HoF2_JUE & "'," & _
                        " P_HoI3_JUE = '" & vp_Obj_Paises.HoI3_JUE & "'," & _
                        " P_HoF3_JUE = '" & vp_Obj_Paises.HoF3_JUE & "'," & _
                        " P_HoI4_JUE = '" & vp_Obj_Paises.HoI4_JUE & "'," & _
                        " P_HoF4_JUE = '" & vp_Obj_Paises.HoF4_JUE & "'," & _
                        " P_HoI1_VIE = '" & vp_Obj_Paises.HoI1_VIE & "'," & _
                        " P_HoF1_VIE = '" & vp_Obj_Paises.HoF1_VIE & "'," & _
                        " P_HoI2_VIE = '" & vp_Obj_Paises.HoI2_VIE & "'," & _
                        " P_HoF2_VIE = '" & vp_Obj_Paises.HoF2_VIE & "'," & _
                        " P_HoI3_VIE = '" & vp_Obj_Paises.HoI3_VIE & "'," & _
                        " P_HoF3_VIE = '" & vp_Obj_Paises.HoF3_VIE & "'," & _
                        " P_HoI4_VIE = '" & vp_Obj_Paises.HoI4_VIE & "'," & _
                        " P_HoF4_VIE = '" & vp_Obj_Paises.HoF4_VIE & "'," & _
                        " P_HoI1_SAB = '" & vp_Obj_Paises.HoI1_SAB & "'," & _
                        " P_HoF1_SAB = '" & vp_Obj_Paises.HoF1_SAB & "'," & _
                        " P_HoI2_SAB = '" & vp_Obj_Paises.HoI2_SAB & "'," & _
                        " P_HoF2_SAB = '" & vp_Obj_Paises.HoF2_SAB & "'," & _
                        " P_HoI3_SAB = '" & vp_Obj_Paises.HoI3_SAB & "'," & _
                        " P_HoF3_SAB = '" & vp_Obj_Paises.HoF3_SAB & "'," & _
                        " P_HoI4_SAB = '" & vp_Obj_Paises.HoI4_SAB & "'," & _
                        " P_HoF4_SAB = '" & vp_Obj_Paises.HoF4_SAB & "'," & _
                        " P_HoI1_DOM = '" & vp_Obj_Paises.HoI1_DOM & "'," & _
                        " P_HoF1_DOM = '" & vp_Obj_Paises.HoF1_DOM & "'," & _
                        " P_HoI2_DOM = '" & vp_Obj_Paises.HoI2_DOM & "'," & _
                        " P_HoF2_DOM = '" & vp_Obj_Paises.HoF2_DOM & "'," & _
                        " P_HoI3_DOM = '" & vp_Obj_Paises.HoI3_DOM & "'," & _
                        " P_HoF3_DOM = '" & vp_Obj_Paises.HoF3_DOM & "'," & _
                        " P_HoI4_DOM = '" & vp_Obj_Paises.HoI4_DOM & "'," & _
                        " P_HoF4_DOM = '" & vp_Obj_Paises.HoF4_DOM & "'," & _
                       " P_FechaActualizacion = '" & vp_Obj_Paises.FechaActualizacion & "'," & _
                       " P_Usuario = '" & vp_Obj_Paises.Usuario & "'" & _
                       " WHERE P_Cod = '" & vp_Obj_Paises.Cod & "'")

        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Paises (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ErasePaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE PAISES WHERE P_Cod = " & vp_Obj_Paises.Cod)
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
    Public Function Charge_DropListMoneda(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT CM_Cod_Moneda_ID AS ID, CAST(CM_Cod_Moneda_ID  AS NVARCHAR(5)) + ' - ' + CM_Descripcion AS descripcion FROM MONEDA_COD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Paises para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listPaises(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListPaises As New List(Of PaisesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()


        Select Case vp_S_Type

            Case "Matrix"
                While ReadConsulta.Read

                    Dim objPaises As New PaisesClass

                    objPaises.Cod = ReadConsulta.GetValue(0)
                    objPaises.Name = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objPaises.IndexInicial = ReadConsulta.GetValue(2) Else objPaises.IndexInicial = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objPaises.IndexFinal = ReadConsulta.GetValue(3) Else objPaises.IndexFinal = 0
                    'agregamos a la lista
                    ObjListPaises.Add(objPaises)

                End While
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objPaises As New PaisesClass
                    'cargamos datos sobre el objeto de login
                    objPaises.Cod = ReadConsulta.GetValue(0)
                    objPaises.Name = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objPaises.Est_LUN = ReadConsulta.GetValue(2) Else objPaises.Est_LUN = "L"
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objPaises.Est_MAR = ReadConsulta.GetValue(3) Else objPaises.Est_MAR = "L"
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objPaises.Est_MIE = ReadConsulta.GetValue(4) Else objPaises.Est_MIE = "L"
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objPaises.Est_JUE = ReadConsulta.GetValue(5) Else objPaises.Est_JUE = "L"
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objPaises.Est_VIE = ReadConsulta.GetValue(6) Else objPaises.Est_VIE = "L"
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objPaises.Est_SAB = ReadConsulta.GetValue(7) Else objPaises.Est_SAB = "F"
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objPaises.Est_DOM = ReadConsulta.GetValue(8) Else objPaises.Est_DOM = "F"
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objPaises.HoF1_LUN = ReadConsulta.GetValue(9) Else objPaises.HoF1_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objPaises.HoI1_LUN = ReadConsulta.GetValue(10) Else objPaises.HoI1_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objPaises.HoI2_LUN = ReadConsulta.GetValue(11) Else objPaises.HoI2_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objPaises.HoF2_LUN = ReadConsulta.GetValue(12) Else objPaises.HoF2_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objPaises.HoI3_LUN = ReadConsulta.GetValue(13) Else objPaises.HoI3_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objPaises.HoF3_LUN = ReadConsulta.GetValue(14) Else objPaises.HoF3_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objPaises.HoI4_LUN = ReadConsulta.GetValue(15) Else objPaises.HoI4_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objPaises.HoF4_LUN = ReadConsulta.GetValue(16) Else objPaises.HoF4_LUN = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objPaises.HoI1_MAR = ReadConsulta.GetValue(17) Else objPaises.HoI1_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objPaises.HoF1_MAR = ReadConsulta.GetValue(18) Else objPaises.HoF1_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objPaises.HoI2_MAR = ReadConsulta.GetValue(19) Else objPaises.HoI2_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objPaises.HoF2_MAR = ReadConsulta.GetValue(20) Else objPaises.HoF2_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objPaises.HoI3_MAR = ReadConsulta.GetValue(21) Else objPaises.HoI3_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objPaises.HoF3_MAR = ReadConsulta.GetValue(22) Else objPaises.HoF3_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objPaises.HoI4_MAR = ReadConsulta.GetValue(23) Else objPaises.HoI4_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objPaises.HoF4_MAR = ReadConsulta.GetValue(24) Else objPaises.HoF4_MAR = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objPaises.HoI1_MIE = ReadConsulta.GetValue(25) Else objPaises.HoI1_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objPaises.HoF1_MIE = ReadConsulta.GetValue(26) Else objPaises.HoF1_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objPaises.HoI2_MIE = ReadConsulta.GetValue(27) Else objPaises.HoI2_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objPaises.HoF2_MIE = ReadConsulta.GetValue(28) Else objPaises.HoF2_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objPaises.HoI3_MIE = ReadConsulta.GetValue(29) Else objPaises.HoI3_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then objPaises.HoF3_MIE = ReadConsulta.GetValue(30) Else objPaises.HoF3_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then objPaises.HoI4_MIE = ReadConsulta.GetValue(31) Else objPaises.HoI4_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(32))) Then objPaises.HoF4_MIE = ReadConsulta.GetValue(32) Else objPaises.HoF4_MIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(33))) Then objPaises.HoI1_JUE = ReadConsulta.GetValue(33) Else objPaises.HoI1_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(34))) Then objPaises.HoF1_JUE = ReadConsulta.GetValue(34) Else objPaises.HoF1_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(35))) Then objPaises.HoI2_JUE = ReadConsulta.GetValue(35) Else objPaises.HoI2_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(36))) Then objPaises.HoF2_JUE = ReadConsulta.GetValue(36) Else objPaises.HoF2_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(37))) Then objPaises.HoI3_JUE = ReadConsulta.GetValue(37) Else objPaises.HoI3_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(38))) Then objPaises.HoF3_JUE = ReadConsulta.GetValue(38) Else objPaises.HoF3_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(39))) Then objPaises.HoI4_JUE = ReadConsulta.GetValue(39) Else objPaises.HoI4_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(40))) Then objPaises.HoF4_JUE = ReadConsulta.GetValue(40) Else objPaises.HoF4_JUE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(41))) Then objPaises.HoI1_VIE = ReadConsulta.GetValue(41) Else objPaises.HoI1_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(42))) Then objPaises.HoF1_VIE = ReadConsulta.GetValue(42) Else objPaises.HoF1_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(43))) Then objPaises.HoI2_VIE = ReadConsulta.GetValue(43) Else objPaises.HoI2_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(44))) Then objPaises.HoF2_VIE = ReadConsulta.GetValue(44) Else objPaises.HoF2_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(45))) Then objPaises.HoI3_VIE = ReadConsulta.GetValue(45) Else objPaises.HoI3_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(46))) Then objPaises.HoF3_VIE = ReadConsulta.GetValue(46) Else objPaises.HoF3_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(47))) Then objPaises.HoI4_VIE = ReadConsulta.GetValue(47) Else objPaises.HoI4_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(48))) Then objPaises.HoF4_VIE = ReadConsulta.GetValue(48) Else objPaises.HoF4_VIE = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(49))) Then objPaises.HoI1_SAB = ReadConsulta.GetValue(49) Else objPaises.HoI1_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(50))) Then objPaises.HoF1_SAB = ReadConsulta.GetValue(50) Else objPaises.HoF1_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(51))) Then objPaises.HoI2_SAB = ReadConsulta.GetValue(51) Else objPaises.HoI2_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(52))) Then objPaises.HoF2_SAB = ReadConsulta.GetValue(52) Else objPaises.HoF2_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(53))) Then objPaises.HoI3_SAB = ReadConsulta.GetValue(53) Else objPaises.HoI3_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(54))) Then objPaises.HoF3_SAB = ReadConsulta.GetValue(54) Else objPaises.HoF3_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(55))) Then objPaises.HoI4_SAB = ReadConsulta.GetValue(55) Else objPaises.HoI4_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(56))) Then objPaises.HoF4_SAB = ReadConsulta.GetValue(56) Else objPaises.HoF4_SAB = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(57))) Then objPaises.HoI1_DOM = ReadConsulta.GetValue(57) Else objPaises.HoI1_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(58))) Then objPaises.HoF1_DOM = ReadConsulta.GetValue(58) Else objPaises.HoF1_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(59))) Then objPaises.HoI2_DOM = ReadConsulta.GetValue(59) Else objPaises.HoI2_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(60))) Then objPaises.HoF2_DOM = ReadConsulta.GetValue(60) Else objPaises.HoF2_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(61))) Then objPaises.HoI3_DOM = ReadConsulta.GetValue(61) Else objPaises.HoI3_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(62))) Then objPaises.HoF3_DOM = ReadConsulta.GetValue(62) Else objPaises.HoF3_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(63))) Then objPaises.HoI4_DOM = ReadConsulta.GetValue(63) Else objPaises.HoI4_DOM = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(64))) Then objPaises.HoF4_DOM = ReadConsulta.GetValue(64) Else objPaises.HoF4_DOM = ""
                    objPaises.FechaActualizacion = ReadConsulta.GetString(65)
                    objPaises.Usuario = ReadConsulta.GetString(66)
                    If Not (IsDBNull(ReadConsulta.GetValue(67))) Then objPaises.Moneda = ReadConsulta.GetValue(67) Else objPaises.Moneda = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(68))) Then objPaises.SWIFT = ReadConsulta.GetValue(68) Else objPaises.SWIFT = ""

                    'agregamos a la lista
                    ObjListPaises.Add(objPaises)

                End While

        End Select

   
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListPaises

    End Function

#End Region

#Region "OTRAS FUNCIONES"


#End Region
End Class
