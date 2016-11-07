Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class FasecoldaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Fasecolda parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllFasecolda(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListFasecolda As New List(Of FasecoldaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT FAS_Fasecolda_ID," & _
                                  "FAS_Clase," & _
                                  "FAS_Marca," & _
                                  "FAS_Linea," & _
                                  "FAS_Cilindraje," & _
                                  "FAS_ValYear_1," & _
                                  "FAS_ValYear_2," & _
                                  "FAS_ValYear_3," & _
                                  "FAS_ValYear_4," & _
                                  "FAS_ValYear_5," & _
                                  "FAS_ValYear_6," & _
                                  "FAS_ValYear_7," & _
                                  "FAS_ValYear_8," & _
                                  "FAS_ValYear_9," & _
                                  "FAS_ValYear_10," & _
                                  "FAS_ValYear_11," & _
                                  "FAS_ValYear_12," & _
                                  "FAS_ValYear_13," & _
                                  "FAS_ValYear_14," & _
                                  "FAS_ValYear_15," & _
                                  "FAS_ValYear_16," & _
                                  "FAS_ValYear_17," & _
                                  "FAS_ValYear_18," & _
                                  "FAS_ValYear_19," & _
                                  "FAS_ValYear_20," & _
                                  "FAS_ValYear_21," & _
                                  "FAS_ValYear_22," & _
                                  "FAS_ValYear_23," & _
                                  "FAS_ValYear_24," & _
                                  "FAS_ValYear_25," & _
                                  "FAS_Estado," & _
                                  "FAS_FechaActualizacion," & _
                                  "FAS_Usuario" & _
                               " FROM FASECOLDA")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT FAS_Fasecolda_ID," & _
                                  "FAS_Clase," & _
                                  "FAS_Marca," & _
                                  "FAS_Linea," & _
                                  "FAS_Cilindraje," & _
                                  "FAS_ValYear_1," & _
                                  "FAS_ValYear_2," & _
                                  "FAS_ValYear_3," & _
                                  "FAS_ValYear_4," & _
                                  "FAS_ValYear_5," & _
                                  "FAS_ValYear_6," & _
                                  "FAS_ValYear_7," & _
                                  "FAS_ValYear_8," & _
                                  "FAS_ValYear_9," & _
                                  "FAS_ValYear_10," & _
                                  "FAS_ValYear_11," & _
                                  "FAS_ValYear_12," & _
                                  "FAS_ValYear_13," & _
                                  "FAS_ValYear_14," & _
                                  "FAS_ValYear_15," & _
                                  "FAS_ValYear_16," & _
                                  "FAS_ValYear_17," & _
                                  "FAS_ValYear_18," & _
                                  "FAS_ValYear_19," & _
                                  "FAS_ValYear_20," & _
                                  "FAS_ValYear_21," & _
                                  "FAS_ValYear_22," & _
                                  "FAS_ValYear_23," & _
                                  "FAS_ValYear_24," & _
                                  "FAS_ValYear_25," & _
                                  "FAS_Estado," & _
                                  "FAS_FechaActualizacion," & _
                                  "FAS_Usuario" & _
                               " FROM FASECOLDA")
            Else
                sql.Append(" SELECT FAS_Fasecolda_ID," & _
                                  "FAS_Clase," & _
                                  "FAS_Marca," & _
                                  "FAS_Linea," & _
                                  "FAS_Cilindraje," & _
                                  "FAS_ValYear_1," & _
                                  "FAS_ValYear_2," & _
                                  "FAS_ValYear_3," & _
                                  "FAS_ValYear_4," & _
                                  "FAS_ValYear_5," & _
                                  "FAS_ValYear_6," & _
                                  "FAS_ValYear_7," & _
                                  "FAS_ValYear_8," & _
                                  "FAS_ValYear_9," & _
                                  "FAS_ValYear_10," & _
                                  "FAS_ValYear_11," & _
                                  "FAS_ValYear_12," & _
                                  "FAS_ValYear_13," & _
                                  "FAS_ValYear_14," & _
                                  "FAS_ValYear_15," & _
                                  "FAS_ValYear_16," & _
                                  "FAS_ValYear_17," & _
                                  "FAS_ValYear_18," & _
                                  "FAS_ValYear_19," & _
                                  "FAS_ValYear_20," & _
                                  "FAS_ValYear_21," & _
                                  "FAS_ValYear_22," & _
                                  "FAS_ValYear_23," & _
                                  "FAS_ValYear_24," & _
                                  "FAS_ValYear_25," & _
                                  "FAS_Estado," & _
                                  "FAS_FechaActualizacion," & _
                                  "FAS_Usuario" & _
                               " FROM FASECOLDA " & _
                          " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListFasecolda = listFasecolda(StrQuery, Conexion)

        Return ObjListFasecolda

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Fasecolda (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertFasecolda(ByVal vp_Obj As FasecoldaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT FASECOLDA (" & _
            "FAS_Fasecolda_ID," & _
            "FAS_Clase," & _
            "FAS_Marca," & _
            "FAS_Linea," & _
            "FAS_Cilindraje," & _
            "FAS_ValYear_1," & _
            "FAS_ValYear_2," & _
            "FAS_ValYear_3," & _
            "FAS_ValYear_4," & _
            "FAS_ValYear_5," & _
            "FAS_ValYear_6," & _
            "FAS_ValYear_7," & _
            "FAS_ValYear_8," & _
            "FAS_ValYear_9," & _
            "FAS_ValYear_10," & _
            "FAS_ValYear_11," & _
            "FAS_ValYear_12," & _
            "FAS_ValYear_13," & _
            "FAS_ValYear_14," & _
            "FAS_ValYear_15," & _
            "FAS_ValYear_16," & _
            "FAS_ValYear_17," & _
            "FAS_ValYear_18," & _
            "FAS_ValYear_19," & _
            "FAS_ValYear_20," & _
            "FAS_ValYear_21," & _
            "FAS_ValYear_22," & _
            "FAS_ValYear_23," & _
            "FAS_ValYear_24," & _
            "FAS_ValYear_25," & _
            "FAS_Estado," & _
            "FAS_FechaActualizacion," & _
            "FAS_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Fasecolda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Clase & "',")
        sql.AppendLine("'" & vp_Obj.Marca & "',")
        sql.AppendLine("'" & vp_Obj.Linea & "',")
        sql.AppendLine("'" & vp_Obj.Cilindraje & "',")
        sql.AppendLine("'" & vp_Obj.Year_1 & "',")
        sql.AppendLine("'" & vp_Obj.Year_2 & "',")
        sql.AppendLine("'" & vp_Obj.Year_3 & "',")
        sql.AppendLine("'" & vp_Obj.Year_4 & "',")
        sql.AppendLine("'" & vp_Obj.Year_5 & "',")
        sql.AppendLine("'" & vp_Obj.Year_6 & "',")
        sql.AppendLine("'" & vp_Obj.Year_7 & "',")
        sql.AppendLine("'" & vp_Obj.Year_8 & "',")
        sql.AppendLine("'" & vp_Obj.Year_9 & "',")
        sql.AppendLine("'" & vp_Obj.Year_10 & "',")
        sql.AppendLine("'" & vp_Obj.Year_11 & "',")
        sql.AppendLine("'" & vp_Obj.Year_12 & "',")
        sql.AppendLine("'" & vp_Obj.Year_13 & "',")
        sql.AppendLine("'" & vp_Obj.Year_14 & "',")
        sql.AppendLine("'" & vp_Obj.Year_15 & "',")
        sql.AppendLine("'" & vp_Obj.Year_16 & "',")
        sql.AppendLine("'" & vp_Obj.Year_17 & "',")
        sql.AppendLine("'" & vp_Obj.Year_18 & "',")
        sql.AppendLine("'" & vp_Obj.Year_19 & "',")
        sql.AppendLine("'" & vp_Obj.Year_20 & "',")
        sql.AppendLine("'" & vp_Obj.Year_21 & "',")
        sql.AppendLine("'" & vp_Obj.Year_22 & "',")
        sql.AppendLine("'" & vp_Obj.Year_23 & "',")
        sql.AppendLine("'" & vp_Obj.Year_24 & "',")
        sql.AppendLine("'" & vp_Obj.Year_25 & "',")
        sql.AppendLine("'" & vp_Obj.Estado & "',")
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
    Public Function Update(ByVal vp_O_Obj As FasecoldaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""
        sql.AppendLine(" UPDATE Fasecolda SET " & _
                          " FAS_Clase ='" & vp_O_Obj.Clase & "', " & _
                          " FAS_Marca ='" & vp_O_Obj.Marca & "', " & _
                          " FAS_Linea ='" & vp_O_Obj.Linea & "', " & _
                          " FAS_Cilindraje ='" & vp_O_Obj.Cilindraje & "', " & _
                          " FAS_ValYear_1 ='" & vp_O_Obj.Year_1 & "', " & _
                          " FAS_ValYear_2 ='" & vp_O_Obj.Year_2 & "', " & _
                          " FAS_ValYear_3 ='" & vp_O_Obj.Year_3 & "', " & _
                          " FAS_ValYear_4 ='" & vp_O_Obj.Year_4 & "', " & _
                          " FAS_ValYear_5 ='" & vp_O_Obj.Year_5 & "', " & _
                          " FAS_ValYear_6 ='" & vp_O_Obj.Year_6 & "', " & _
                          " FAS_ValYear_7 ='" & vp_O_Obj.Year_7 & "', " & _
                          " FAS_ValYear_8 ='" & vp_O_Obj.Year_8 & "', " & _
                          " FAS_ValYear_9 ='" & vp_O_Obj.Year_9 & "', " & _
                          " FAS_ValYear_10 ='" & vp_O_Obj.Year_10 & "', " & _
                          " FAS_ValYear_11 ='" & vp_O_Obj.Year_11 & "', " & _
                          " FAS_ValYear_12 ='" & vp_O_Obj.Year_12 & "', " & _
                          " FAS_ValYear_13 ='" & vp_O_Obj.Year_13 & "', " & _
                          " FAS_ValYear_14 ='" & vp_O_Obj.Year_14 & "', " & _
                          " FAS_ValYear_15 ='" & vp_O_Obj.Year_15 & "', " & _
                          " FAS_ValYear_16 ='" & vp_O_Obj.Year_16 & "', " & _
                          " FAS_ValYear_17 ='" & vp_O_Obj.Year_17 & "', " & _
                          " FAS_ValYear_18 ='" & vp_O_Obj.Year_18 & "', " & _
                          " FAS_ValYear_19 ='" & vp_O_Obj.Year_19 & "', " & _
                          " FAS_ValYear_20 ='" & vp_O_Obj.Year_20 & "', " & _
                          " FAS_ValYear_21 ='" & vp_O_Obj.Year_21 & "', " & _
                          " FAS_ValYear_22 ='" & vp_O_Obj.Year_22 & "', " & _
                          " FAS_ValYear_23 ='" & vp_O_Obj.Year_23 & "', " & _
                          " FAS_ValYear_24 ='" & vp_O_Obj.Year_24 & "', " & _
                          " FAS_ValYear_25 ='" & vp_O_Obj.Year_25 & "', " & _
                          " FAS_Estado ='" & vp_O_Obj.Estado & "', " & _
                          " FAS_FechaActualizacion ='" & vp_O_Obj.FechaActualizacion & "', " & _
                          " FAS_Usuario ='" & vp_O_Obj.Usuario & "'" & _
                       " WHERE FAS_Fasecolda_ID = '" & vp_O_Obj.Fasecolda_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Fasecolda (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseFasecolda(ByVal vp_Obj As FasecoldaClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE FASECOLDA WHERE FAS_Fasecolda_ID = '" & vp_Obj.Fasecolda_ID & "'")
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

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Fasecolda para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listFasecolda(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListFasecolda As New List(Of FasecoldaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objFasecolda As New FasecoldaClass
            'cargamos datos sobre el objeto de login


            objFasecolda.Fasecolda_ID = ReadConsulta.GetValue(0)
            If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objFasecolda.Clase = ReadConsulta.GetValue(1) Else objFasecolda.Clase = ""

            If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objFasecolda.Marca = ReadConsulta.GetValue(2) Else objFasecolda.Marca = ""
            If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objFasecolda.Linea = ReadConsulta.GetValue(3) Else objFasecolda.Linea = ""
            If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objFasecolda.Cilindraje = ReadConsulta.GetValue(4) Else objFasecolda.Cilindraje = 0


            If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objFasecolda.Year_1 = ReadConsulta.GetValue(5) Else objFasecolda.Year_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objFasecolda.Year_2 = ReadConsulta.GetValue(6) Else objFasecolda.Year_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objFasecolda.Year_3 = ReadConsulta.GetValue(7) Else objFasecolda.Year_3 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objFasecolda.Year_4 = ReadConsulta.GetValue(8) Else objFasecolda.Year_4 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objFasecolda.Year_5 = ReadConsulta.GetValue(9) Else objFasecolda.Year_5 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objFasecolda.Year_6 = ReadConsulta.GetValue(10) Else objFasecolda.Year_6 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objFasecolda.Year_7 = ReadConsulta.GetValue(11) Else objFasecolda.Year_7 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objFasecolda.Year_8 = ReadConsulta.GetValue(12) Else objFasecolda.Year_8 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objFasecolda.Year_9 = ReadConsulta.GetValue(13) Else objFasecolda.Year_9 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objFasecolda.Year_10 = ReadConsulta.GetValue(14) Else objFasecolda.Year_10 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objFasecolda.Year_11 = ReadConsulta.GetValue(15) Else objFasecolda.Year_11 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objFasecolda.Year_12 = ReadConsulta.GetValue(16) Else objFasecolda.Year_12 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objFasecolda.Year_13 = ReadConsulta.GetValue(17) Else objFasecolda.Year_13 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objFasecolda.Year_14 = ReadConsulta.GetValue(18) Else objFasecolda.Year_14 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objFasecolda.Year_15 = ReadConsulta.GetValue(19) Else objFasecolda.Year_15 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objFasecolda.Year_16 = ReadConsulta.GetValue(20) Else objFasecolda.Year_16 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objFasecolda.Year_17 = ReadConsulta.GetValue(21) Else objFasecolda.Year_17 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objFasecolda.Year_18 = ReadConsulta.GetValue(22) Else objFasecolda.Year_18 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objFasecolda.Year_19 = ReadConsulta.GetValue(23) Else objFasecolda.Year_19 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objFasecolda.Year_20 = ReadConsulta.GetValue(24) Else objFasecolda.Year_20 = ""

            If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objFasecolda.Year_21 = ReadConsulta.GetValue(25) Else objFasecolda.Year_21 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objFasecolda.Year_22 = ReadConsulta.GetValue(26) Else objFasecolda.Year_22 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objFasecolda.Year_23 = ReadConsulta.GetValue(27) Else objFasecolda.Year_23 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objFasecolda.Year_24 = ReadConsulta.GetValue(28) Else objFasecolda.Year_24 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objFasecolda.Year_25 = ReadConsulta.GetValue(29) Else objFasecolda.Year_25 = ""
          
            objFasecolda.Estado = ReadConsulta.GetValue(30)
            objFasecolda.FechaActualizacion = ReadConsulta.GetValue(31)
            objFasecolda.Usuario = ReadConsulta.GetValue(32)
           
            'agregamos a la lista
            ObjListFasecolda.Add(objFasecolda)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListFasecolda

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As FasecoldaClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM FASECOLDA " & _
                       " WHERE FAS_Fasecolda_ID = '" & vp_O_Obj.Fasecolda_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region

End Class
