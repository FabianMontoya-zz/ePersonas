Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_ActivosSQLClass

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_Activos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_Activos(ByVal vp_Obj As C_ActivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CONTRATOS (" & _
            "CON_Nit_ID," & _
            "CON_Contrato_ID," & _
            "CON_Descripcion," & _
            "CON_TypeDocument_ID," & _
            "CON_Document_ID," & _
            "CON_Cod_Moneda," & _
            "CON_Val_Cont," & _
            "CON_Val_Finan," & _
            "CON_Val_Op_Compra," & _
            "CON_Estado_Cont_ID," & _
            "CON_Saldo_Cap," & _
            "CON_Saldo_Int," & _
            "CON_Saldo_Int_Mora," & _
            "CON_Saldo_Otros," & _
            "CON_Secuencia_Cargue," & _
            "CON_FechaActualizacion," & _
            "CON_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Val_Op_Compra & "',")
        sql.AppendLine("'" & vp_Obj.Secuencia_Cargue & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#Region "CONSULTAS DROP LIST"


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de C_Activos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listC_Activos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListC_Activos As New List(Of C_ActivosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"

         

        End Select


        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListC_Activos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_ActivosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CONTRATOS " & _
                       " WHERE CON_Nit_ID = '" & vp_O_Obj.Nit_ID & "' AND CON_Contrato_ID = '" & vp_O_Obj.TypeDocument_ID_R & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function



#End Region

End Class
