Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CargoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Cargo parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCargo(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListCargo As New List(Of CargoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append("DROP TABLE T_AREA_CARGO")
        StrQuery = sql.ToString
        conex.StrInsert_and_Update_All(StrQuery, "2")

        sql = New StringBuilder()

        sql.Append("EXEC CONSULT_T_AREA_CARGO 'Cargo'")
        StrQuery = sql.ToString
        conex.StrInsert_and_Update_All(StrQuery, "2")

        sql = New StringBuilder()

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT Nit_ID, " & _
                             " Area_Cargo_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT Nit_ID, " & _
                             " Area_Cargo_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO ")
            Else
                sql.Append(" SELECT Nit_ID, " & _
                             " Area_Cargo_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListCargo = listCargo(StrQuery, Conexion, "List")

        Return ObjListCargo

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Cargo (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Cargo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCargo(ByVal vp_Obj_Cargo As CargoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Cargo (" & _
            "C_Nit_ID," & _
            "C_Cargo_ID," & _
            "C_Descripcion," & _
            "C_CargoDependencia," & _
            "C_Politica_ID," & _
            "C_Usuario_Creacion," & _
            "C_FechaCreacion," & _
            "C_Usuario_Actualizacion," & _
            "C_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Cargo.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.Cargo_ID & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.CargoDependencia & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.Politica_ID & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Cargo.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Cargo (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Cargo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateCargo(ByVal vp_Obj_Cargo As CargoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE Cargo SET " & _
                       " C_Descripcion ='" & vp_Obj_Cargo.Descripcion & "', " & _
                       " C_CargoDependencia ='" & vp_Obj_Cargo.CargoDependencia & "', " & _
                       " C_Politica_ID ='" & vp_Obj_Cargo.Politica_ID & "', " & _
                       " C_Usuario_Actualizacion ='" & vp_Obj_Cargo.UsuarioActualizacion & "', " & _
                       " C_FechaActualizacion ='" & vp_Obj_Cargo.FechaActualizacion & "' " & _
                       " WHERE  C_Nit_ID = '" & vp_Obj_Cargo.Nit_ID & "' AND C_Cargo_ID = '" & vp_Obj_Cargo.Cargo_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Cargo (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Cargo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseCargo(ByVal vp_Obj_Cargo As CargoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Cargo WHERE C_Nit_ID = '" & vp_Obj_Cargo.Nit_ID & "' AND C_Cargo_ID = '" & vp_Obj_Cargo.Cargo_ID & "'")
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
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCargoDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_area_ID AS ID,CAST(A_area_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM AREA " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

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
    Public Function Charge_DropListSeguridad(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT PS_Politica_ID AS ID,CAST(PS_Politica_ID AS NVARCHAR(5)) + ' - ' + PS_Descripcion AS DESCRIPCION FROM POLITICA_SEGURIDAD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Cargo para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCargo(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCargo As New List(Of CargoClass)

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

                    Dim objCargo As New CargoClass
                    'cargamos datos sobre el objeto de login
                    objCargo.Nit_ID = ReadConsulta.GetValue(0)
                    objCargo.Cargo_ID = ReadConsulta.GetValue(1)
                    objCargo.Descripcion = ReadConsulta.GetValue(2)
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objCargo.CargoDependencia = ReadConsulta.GetValue(3) Else objCargo.CargoDependencia = 0
                    objCargo.Politica_ID = ReadConsulta.GetValue(4)

                    objCargo.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objCargo.FechaCreacion = ReadConsulta.GetValue(6)
                    objCargo.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objCargo.FechaActualizacion = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objCargo.DescripCargoDepen = ReadConsulta.GetValue(9) Else objCargo.DescripCargoDepen = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objCargo.DescripPolitica = ReadConsulta.GetValue(10) Else objCargo.DescripPolitica = ""
                    objCargo.DescripEmpresa = ReadConsulta.GetValue(11)

                    'agregamos a la lista
                    ObjListCargo.Add(objCargo)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCargo As New CargoClass
                    'cargamos datos sobre el objeto de login
                    objCargo.Cargo_ID = ReadConsulta.GetValue(0)
                    objCargo.Descripcion = ReadConsulta.GetValue(1)
                    objCargo.Nit_ID = ReadConsulta.GetValue(2)
                   
                    'agregamos a la lista
                    ObjListCargo.Add(objCargo)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCargo

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As CargoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM Cargo " & _
                       " WHERE C_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND C_Cargo_ID = '" & vp_O_Obj.Cargo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Areas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Cargo()

        Dim ObjList As New List(Of CargoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT C_Cargo_ID AS ID,CAST(C_Cargo_ID AS NVARCHAR(5)) + ' - ' + C_Descripcion AS DESCRIPCION, C_Nit_ID FROM CARGO  " & _
                   " ORDER BY C_Cargo_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listCargo(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class
