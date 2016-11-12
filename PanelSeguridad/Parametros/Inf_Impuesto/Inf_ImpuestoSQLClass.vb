Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Inf_ImpuestoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Inf_Impuesto parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListInf_Impuesto As New List(Of Inf_ImpuestoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT IIMP_Cod_ID, " & _
                        "     IIMP_Ciudad_ID, " & _
                        "     IIMP_Impuesto_Gasto_ID, " & _
                        "     IIMP_Nit_ID, " & _
                        "     IIMP_TypeDocument_ID, " & _
                        "     IIMP_Document_ID, " & _
                        "     IIMP_FechaActualizacion, " & _
                        "     IIMP_Usuario, " & _
                        "     P.P_Name, " & _
                        "     C.C_Descripcion, " & _
                        "     IM_G.IM_Descripcion, " & _
                        "     CLI.CLI_Nombre, " & _
                        "     TD.TD_Descripcion " & _
                        " FROM INF_IMPUESTO INF_IM  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = INF_IM.IIMP_Cod_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = INF_IM.IIMP_Ciudad_ID " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = INF_IM.IIMP_Impuesto_Gasto_ID " & _
                        " INNER JOIN M_SEGURIDAD.dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = INF_IM.IIMP_TypeDocument_ID " & _
                        " INNER JOIN CLIENTE CLI ON CLI.CLI_Document_ID = INF_IM.IIMP_Document_ID  ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT IIMP_Cod_ID, " & _
                        "     IIMP_Ciudad_ID, " & _
                        "     IIMP_Impuesto_Gasto_ID, " & _
                        "     IIMP_Nit_ID, " & _
                        "     IIMP_TypeDocument_ID, " & _
                        "     IIMP_Document_ID, " & _
                        "     IIMP_FechaActualizacion, " & _
                        "     IIMP_Usuario, " & _
                        "     P.P_Name, " & _
                        "     C.C_Descripcion, " & _
                        "     IM_G.IM_Descripcion, " & _
                        "     CLI.CLI_Nombre, " & _
                        "     TD.TD_Descripcion " & _
                        " FROM INF_IMPUESTO INF_IM  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = INF_IM.IIMP_Cod_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = INF_IM.IIMP_Ciudad_ID " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = INF_IM.IIMP_Impuesto_Gasto_ID " & _
                        " INNER JOIN M_SEGURIDAD.dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = INF_IM.IIMP_TypeDocument_ID " & _
                        " INNER JOIN CLIENTE CLI ON CLI.CLI_Document_ID = INF_IM.IIMP_Document_ID  ")
            Else
                sql.Append(" SELECT IIMP_Cod_ID, " & _
                        "     IIMP_Ciudad_ID, " & _
                        "     IIMP_Impuesto_Gasto_ID, " & _
                        "     IIMP_Nit_ID, " & _
                        "     IIMP_TypeDocument_ID, " & _
                        "     IIMP_Document_ID, " & _
                        "     IIMP_FechaActualizacion, " & _
                        "     IIMP_Usuario, " & _
                        "     P.P_Name, " & _
                        "     C.C_Descripcion, " & _
                        "     IM_G.IM_Descripcion, " & _
                        "     CLI.CLI_Nombre, " & _
                        "     TD.TD_Descripcion " & _
                        " FROM INF_IMPUESTO INF_IM  " & _
                        " INNER JOIN PAISES P ON P.P_Cod = INF_IM.IIMP_Cod_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = INF_IM.IIMP_Ciudad_ID " & _
                        " INNER JOIN IMPUESTO_GASTO IM_G ON IM_G.IM_Impuesto_Gasto_ID = INF_IM.IIMP_Impuesto_Gasto_ID " & _
                        " INNER JOIN M_SEGURIDAD.dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = INF_IM.IIMP_TypeDocument_ID " & _
                        " INNER JOIN CLIENTE CLI ON CLI.CLI_Document_ID = INF_IM.IIMP_Document_ID  " & _
                        " AND " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListInf_Impuesto = list(StrQuery, Conexion)

        Return ObjListInf_Impuesto

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo  Inf_Impuesto (INSERT)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_O_Obj As Inf_ImpuestoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INF_IMPUESTO (" & _
            " IIMP_Cod_ID," & _
            " IIMP_Ciudad_ID," & _
            " IIMP_Impuesto_Gasto_ID," & _
            " IIMP_Nit_ID," & _
            " IIMP_TypeDocument_ID," & _
            " IIMP_Document_ID," & _
            " IIMP_FechaActualizacion," & _
            " IIMP_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_O_Obj.Cod_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Ciudad_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Impuesto_Gasto_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_O_Obj.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Inf_Impuesto (DELETE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete(ByVal vp_O_Obj As Inf_ImpuestoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine(" DELETE INF_IMPUESTO " & _
                       " WHERE IIMP_Cod_ID = '" & vp_O_Obj.Cod_ID & "'" & _
                       " AND IIMP_Ciudad_ID = '" & vp_O_Obj.Ciudad_ID & "'" & _
                       " AND IIMP_Impuesto_Gasto_ID = '" & vp_O_Obj.Impuesto_Gasto_ID & "'" & _
                       " AND IIMP_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND IIMP_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                       " AND IIMP_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")

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
    ''' <param name="vp_S_Index"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCiudad(ByVal vp_S_Index As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT C_Ciudad_ID AS ID,CAST(C_Ciudad_ID AS NVARCHAR(15)) + ' - ' + C_Descripcion AS DESCRIPCION FROM CIUDADES WHERE C_Pais_ID = '" & vp_S_Index & "'")
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

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCliente(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT CLI_Nit_ID AS ID,CAST(CLI_Nit_ID AS NVARCHAR(20)) + ' - ' +  CLI_Nombre AS descripcion FROM CLIENTE WHERE CLI_OP_Empresa ='S' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Nit_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCliente_H(ByVal vp_S_Nit_ID As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT  CAST(CLI_TypeDocument_ID AS NVARCHAR(4)) + '_' + CAST(CLI_Document_ID AS NVARCHAR(20)) AS ID, " & _
                   " CAST(CLI_TypeDocument_ID AS NVARCHAR(4)) + ' - ' + CAST(CLI_Document_ID AS NVARCHAR(20)) + ' - ' + CLI_Nombre AS Descripcion  " & _
                   " FROM CLIENTE " & _
                   " WHERE CLI_Document_ID IN (SELECT CLI_Document_ID  FROM CLIENTE WHERE CLI_OP_Transito ='S' OR CLI_OP_Hacienda ='S') " & _
                   " AND CLI_Nit_ID ='" & vp_S_Nit_ID & "'")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    Public Function Consulta_Repetido(ByVal vp_O_Obj As Inf_ImpuestoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM INF_IMPUESTO " & _
                       " WHERE IIMP_Cod_ID = '" & vp_O_Obj.Cod_ID & "'" & _
                       " AND IIMP_Ciudad_ID = '" & vp_O_Obj.Ciudad_ID & "'" & _
                       " AND IIMP_Impuesto_Gasto_ID = '" & vp_O_Obj.Impuesto_Gasto_ID & "'" & _
                       " AND IIMP_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND IIMP_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                       " AND IIMP_Nit_ID = '" & vp_O_Obj.Nit_ID & "'")


        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Inf_Impuesto para armar la tabla
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

        Dim ObjListInf_Impuesto As New List(Of Inf_ImpuestoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objInf_Impuesto As New Inf_ImpuestoClass
            'cargamos datos sobre el objeto de login
            objInf_Impuesto.Cod_ID = ReadConsulta.GetValue(0)
            objInf_Impuesto.Ciudad_ID = ReadConsulta.GetValue(1)
            objInf_Impuesto.Impuesto_Gasto_ID = ReadConsulta.GetValue(2)
            objInf_Impuesto.Nit_ID = ReadConsulta.GetValue(3)
            objInf_Impuesto.TypeDocument_ID = ReadConsulta.GetValue(4)
            objInf_Impuesto.Document_ID = ReadConsulta.GetValue(5)

            objInf_Impuesto.FechaActualizacion = ReadConsulta.GetValue(6)
            objInf_Impuesto.Usuario = ReadConsulta.GetValue(7)
            objInf_Impuesto.DescripCod = ReadConsulta.GetValue(8)
            objInf_Impuesto.DescripCiudad = ReadConsulta.GetValue(9)
            objInf_Impuesto.DescripImpuesto_Gasto = ReadConsulta.GetValue(10)
            objInf_Impuesto.DescripNitResponsable = ReadConsulta.GetValue(11)
            objInf_Impuesto.DescripTypeDocument = ReadConsulta.GetValue(12)
          

            'agregamos a la lista
            ObjListInf_Impuesto.Add(objInf_Impuesto)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListInf_Impuesto

    End Function

#End Region

End Class
