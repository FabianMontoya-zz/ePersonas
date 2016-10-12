Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Relaciones_FinancierasSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Releciones Financieras parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Nit As String, ByVal vp_S_TypeDoc As String, ByVal vp_S_Doc As String)

        Dim ObjList As New List(Of Relaciones_FinancierasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT RF_Nit_ID," & _
                   "       RF_TypeDocument_ID, " & _
                   "       RF_Document_ID, " & _
                   "       RF_TypeDocument_ID_EF, " & _
                   "       RF_Document_ID_EF, " & _
                   "       RF_TipoCuenta, " & _
                   "       RF_Cuenta, " & _
                   "       RF_Usuario_Creacion, " & _
                   "       RF_FechaCreacion, " & _
                   "       RF_Usuario_Actualizacion, " & _
                   "       RF_FechaActualizacion,  " & _
                   "       C.CLI_Nombre,  " & _
                   "       TC.TC_Descripcion  " & _
                   " FROM RELACIONES_FINANCIERAS RF" & _
                   " INNER JOIN CLIENTE C ON C.CLI_Document_ID = RF.RF_Document_ID_EF " & _
                   " INNER JOIN TIPOCUENTA TC ON TC.TC_ID = RF.RF_TipoCuenta " & _
                   " WHERE RF_Nit_ID = '" & vp_S_Nit & "' " & _
                   " AND RF_TypeDocument_ID = '" & vp_S_TypeDoc & "' " & _
                   " AND RF_Document_ID = '" & vp_S_Doc & "' ")

        StrQuery = sql.ToString

        ObjList = List(StrQuery, Conexion)

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo  Relaciones Financieras (INSERT)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_O_Obj As Relaciones_FinancierasClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT RELACIONES_FINANCIERAS (" & _
            " RF_Nit_ID, " & _
            " RF_TypeDocument_ID, " & _
            " RF_Document_ID, " & _
            " RF_TypeDocument_ID_EF, " & _
            " RF_Document_ID_EF, " & _
            " RF_TipoCuenta, " & _
            " RF_Cuenta, " & _
            " RF_Usuario_Creacion, " & _
            " RF_FechaCreacion, " & _
            " RF_Usuario_Actualizacion, " & _
            " RF_FechaActualizacion " & _
             ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_O_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDocument_ID_EF & "',")
        sql.AppendLine("'" & vp_O_Obj.Document_ID_EF & "',")
        sql.AppendLine("'" & vp_O_Obj.TipoCuenta & "',")
        sql.AppendLine("'" & vp_O_Obj.Cuenta & "',")
        sql.AppendLine("'" & vp_O_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_O_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Direcciones (DELETE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete_All(ByVal vp_O_Obj As Relaciones_FinancierasClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
       
        sql.AppendLine(" DELETE RELACIONES_FINANCIERAS " & _
                       " WHERE RF_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RF_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND RF_Document_ID = '" & vp_O_Obj.Document_ID & "'")

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Releciones Financieras para armar la tabla
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

        Dim ObjList As New List(Of Relaciones_FinancierasClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim obj As New Relaciones_FinancierasClass
            'cargamos datos sobre el objeto de login
            obj.Nit_ID = ReadConsulta.GetValue(0)
            obj.TypeDocument_ID = ReadConsulta.GetValue(1)
            obj.Document_ID = ReadConsulta.GetValue(2)

            obj.TypeDocument_ID_EF = ReadConsulta.GetValue(3)
            obj.Document_ID_EF = ReadConsulta.GetValue(4)
            obj.TipoCuenta = ReadConsulta.GetValue(5)
            obj.Cuenta = ReadConsulta.GetValue(6)

            obj.UsuarioCreacion = ReadConsulta.GetValue(7)
            obj.FechaCreacion = ReadConsulta.GetValue(8)

            obj.UsuarioActualizacion = ReadConsulta.GetValue(9)
            obj.FechaActualizacion = ReadConsulta.GetValue(10)

            obj.DescripEntidad = ReadConsulta.GetValue(11)
            obj.DecripCuenta = ReadConsulta.GetValue(12)
            'agregamos a la lista
            ObjList.Add(obj)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

End Class
