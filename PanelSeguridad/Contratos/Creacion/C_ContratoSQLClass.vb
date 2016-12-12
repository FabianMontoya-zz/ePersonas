Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_ContratoSQLClass

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_Contrato (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_Contrato(ByVal vp_Obj As C_ContratoClass)

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
        sql.AppendLine("'" & vp_Obj.Contrato_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Val_Cont & "',")
        sql.AppendLine("'" & vp_Obj.Val_Finan & "',")
        sql.AppendLine("'" & vp_Obj.Val_Op_Compra & "',")
        sql.AppendLine("'" & vp_Obj.Estado_Cont_ID & "',")
        sql.AppendLine("'" & vp_Obj.Saldo_Cap & "',")
        sql.AppendLine("'" & vp_Obj.Saldo_Int & "',")
        sql.AppendLine("'" & vp_Obj.Saldo_Int_Mora & "',")
        sql.AppendLine("'" & vp_Obj.Saldo_Otros & "',")
        sql.AppendLine("'" & vp_Obj.Secuencia_Cargue & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#Region "CONSULTAS DROP LIST"
    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListEstado_Contrato(ByVal vp_S_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT EC_ID AS ID, CAST(EC_ID AS NVARCHAR(10))+ ' - ' + EC_Descripcion AS Descripcion FROM CONTRATO_ESTADO " & _
                   " ORDER BY EC_ID ASC  ")
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
    Public Function Charge_DropListHijo_Cliente(ByVal vp_S_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT  CAST(CLI_TypeDocument_ID AS NVARCHAR(4)) + '_' + CAST(CLI_Document_ID AS NVARCHAR(20)) AS ID, " & _
                   " CAST(CLI_TypeDocument_ID AS NVARCHAR(4)) + ' - ' + CAST(CLI_Document_ID AS NVARCHAR(20)) + ' - ' + CLI_Nombre AS Descripcion " & _
                   " FROM CLIENTE " & _
                   " WHERE CLI_OP_Cliente = 'S' " & _
                   " AND CLI_Nit_ID = '" & vp_S_ID & "'" & _
                   " ORDER BY CLI_Nombre ASC ")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function


#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de C_Contrato para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listC_Contrato(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListC_Contrato As New List(Of C_ContratoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"

            Case "Matrix_Contrato"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objC_Contrato As New C_ContratoClass
                    'cargamos datos sobre el objeto de login
                    objC_Contrato.Contrato_ID = ReadConsulta.GetValue(0)
                    objC_Contrato.Descripcion = ReadConsulta.GetValue(1)
                    objC_Contrato.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListC_Contrato.Add(objC_Contrato)

                End While

        End Select

        
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListC_Contrato

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_ContratoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CONTRATOS " & _
                       " WHERE CON_Nit_ID = '" & vp_O_Obj.Nit_ID & "' AND CON_Contrato_ID = '" & vp_O_Obj.Contrato_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    Function Matrix_Contratos()

        Dim ObjList As New List(Of C_ContratoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT CON_Contrato_ID, CAST(CON_Contrato_ID AS NVARCHAR(20)) + ' _ '+ CON_Descripcion AS DESCRIPCION, CON_Nit_ID FROM CONTRATOS ")

        Dim StrQuery As String = sql.ToString

        ObjList = listC_Contrato(StrQuery, Conexion, "Matrix_Contrato")

        Return ObjList
    End Function

#End Region

End Class
