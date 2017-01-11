Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_Politicas_SeguridadSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nueva Política de Seguridad (INSERT [**Completar**])
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAdm_Politicas_Seguridad(ByVal vp_Obj As Adm_Politicas_SeguridadClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        'sql.AppendLine("INSERT CONTRATOS (" & _
        '    "CO_Nit_ID," & _
        '    "CO_Sucursal_ID, " & _
        '    "CO_Colocacion_ID, " & _
        '    "CO_Descripcion, " & _
        '    "CO_TypeDocument_ID, " & _
        '    "CO_Document_ID, " & _
        '    "CO_Moneda_ID, " & _
        '    "CO_Producto_ID, " & _
        '    "CO_Condi_Financiacion_ID, " & _
        '    "CO_Unidad_Tiempo_ID, " & _
        '    "CO_Fecha_Apertura, " & _
        '    "CO_Plazo, " & _
        '    "CO_Politicas de Seguridad_ID, " & _
        '    "CO_Base_Calculo_ID, " & _
        '    "CO_Direccion_Correspondiente, " & _
        '    "CO_Valor_Total, " & _
        '    "CO_Valor_Financiado, " & _
        '    "CO_Valor_Opc_Compra, " & _
        '    "CO_Usuario_Creacion, " & _
        '    "CO_Fecha_Creacion, " & _
        '    "CO_UsuarioActualizacion, " & _
        '    "CO_Fecha_Actualizacion " & _
        '    ")")
        'sql.AppendLine("VALUES (")
        'sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Sucursal_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Colocacion_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        'sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Moneda_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Producto_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Condi_Financiacion_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Unidad_Tiempo_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Fecha_Apertura & "',")
        'sql.AppendLine("'" & vp_Obj.Plazo & "',")
        'sql.AppendLine("'" & vp_Obj.Politicas de Seguridad_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Base_Calculo_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Direccion_Correspondiente & "',")
        'sql.AppendLine("'" & vp_Obj.Valor_Total & "',")
        'sql.AppendLine("'" & vp_Obj.Valor_Financiado & "',")
        'sql.AppendLine("'" & vp_Obj.Valor_Opc_Compra & "',")
        'sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaActualizacion & "') ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"
    ''' <summary>
    ''' funcion que trae el listado de Politicas de Seguridad para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listPoliticasSeguridad(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListPoliticasSeguridad As New List(Of Adm_Politicas_SeguridadClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type

            Case "MatrixAll"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read
                    Dim objPoliticasSeguridad As New Adm_Politicas_SeguridadClass
                    'cargamos datos sobre el objeto de Politicas

                    objPoliticasSeguridad.Nit_ID = ReadConsulta.GetValue(0)
                    objPoliticasSeguridad.Politica_ID = ReadConsulta.GetValue(1)
                    objPoliticasSeguridad.Descripcion = ReadConsulta.GetValue(2)
                    objPoliticasSeguridad.DiasVigencia = ReadConsulta.GetValue(3)
                    objPoliticasSeguridad.MinNumeric = ReadConsulta.GetValue(4)
                    objPoliticasSeguridad.MinLetter() = ReadConsulta.GetValue(5)
                    objPoliticasSeguridad.NumericNotRepeat() = ReadConsulta.GetValue(6)
                    objPoliticasSeguridad.MaxErrorClave() = ReadConsulta.GetValue(7)
                    objPoliticasSeguridad.MaxErrorUser() = ReadConsulta.GetValue(8)
                    objPoliticasSeguridad.TipoEncriptacion() = ReadConsulta.GetValue(9)
                    objPoliticasSeguridad.CharacterRepeat() = ReadConsulta.GetValue(10)
                    objPoliticasSeguridad.lengthMinPassword() = ReadConsulta.GetValue(11)
                    objPoliticasSeguridad.lengthMaxPassword() = ReadConsulta.GetValue(12)
                    objPoliticasSeguridad.Token() = ReadConsulta.GetValue(13)
                    objPoliticasSeguridad.Index = ReadConsulta.GetValue(14)

                    'agregamos a la lista
                    ObjListPoliticasSeguridad.Add(objPoliticasSeguridad)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()

        'retornamos la consulta
        Return ObjListPoliticasSeguridad

    End Function
#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_Politicas_SeguridadClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM POLITICA_SEGURIDAD " & _
                       " WHERE PS_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND PS_Politica_ID = '" & vp_O_Obj.Politica_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de Politicas de Seguridad
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixAll_PoliticasSeguridad(ByVal Nit_ID As String)
        Dim ObjListPoliticasSeguridad As New List(Of Adm_Politicas_SeguridadClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT	PS_Nit_ID, PS_Politica_ID,  " & _
                              " PS_Descripcion, " & _
                              " PS_DiasVigencia, " & _
                              " PS_MinNumeric, " & _
                              " PS_MinLetter, " & _
                              " PS_NumericNotRepeat, " & _
                              " PS_MaxErrorClave, " & _
                              " PS_MaxErrorUser, " & _
                              " PS_TipoEncriptacion, " & _
                              " PS_CharacterRepeat, " & _
                              " PS_lengthMinPassword, " & _
                              " PS_lengthMaxPassword, " & _
                              " PS_Token, " & _
                              " ROW_NUMBER() OVER(ORDER BY PS_Nit_ID, PS_Politica_ID ASC) AS Index_PoliticasSeguridad " & _
                              " FROM POLITICA_SEGURIDAD " & _
                              " WHERE PS_Nit_ID = '" & Nit_ID & "' " & _
                              " ORDER BY PS_Nit_ID, PS_Politica_ID ASC")

        StrQuery = sql.ToString

        ObjListPoliticasSeguridad = listPoliticasSeguridad(StrQuery, Conexion, "MatrixAll")

        Return ObjListPoliticasSeguridad

    End Function

#End Region

End Class
