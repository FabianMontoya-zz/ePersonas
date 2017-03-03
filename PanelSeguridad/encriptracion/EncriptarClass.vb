Imports System.Text
Imports System.Security.Cryptography
Imports System.IO

Public Class EncriptarClass
#Region "Variables Globales"
    Private vg_b_mbytKey(7) As Byte
    Private vg_b_mbytIV(7) As Byte
    Private vg_S_Llave As String = "FabianM"
#End Region

    ''' <summary>
    ''' funcion para encriptacion del password diseñada por
    ''' German Alejandro Rodriguez
    ''' </summary>
    ''' <param name="pl_S_password"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Encriptacion(ByVal pl_S_password As String)

        Dim vl_S_passEncrip, vl_S_pass As String

        vl_S_pass = UCase(pl_S_password)
        vl_S_passEncrip = ""
        ' procedimiento de encripcion
        For index = 1 To Len(vl_S_pass)
            vl_S_passEncrip = vl_S_passEncrip & "0" & Asc(Mid(vl_S_pass, index, 1))
        Next

        Return vl_S_passEncrip

    End Function

    ''' <summary>
    ''' funcion para encriptacion del password MD5
    ''' </summary>
    ''' <param name="vp_s_SourceText"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Encriptacion_MD5(ByVal vp_s_SourceText As String) As String

        'Create an encoding object to ensure the encoding standard for the source text
        Dim Ue As New UnicodeEncoding()
        'Retrieve a byte array based on the source text
        Dim ByteSourceText() As Byte = Ue.GetBytes(vp_s_SourceText)
        'Instantiate an MD5 Provider object
        Dim Md5 As New MD5CryptoServiceProvider()
        'Compute the hash value from the source
        Dim ByteHash() As Byte = Md5.ComputeHash(ByteSourceText)
        'And convert it to String format for return
        Return Convert.ToBase64String(ByteHash)

    End Function

#Region "Encriptación de URL"

    '****IMPORTANTE: Estos métodos tambien se utilizan en la aplicación de escritorio EnrollermetAPP utilizada en el módulo de huellas

    ''' <summary>
    ''' Transformamos la llave que se usará para la Encriptación/Desencriptación
    ''' </summary>
    ''' <param name="vp_s_Llave"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function convierteLlave(ByVal vp_s_Llave As String) As Boolean
        Try
            Dim bp(vp_s_Llave.Length - 1) As Byte
            Dim aEnc As ASCIIEncoding = New ASCIIEncoding()
            aEnc.GetBytes(vp_s_Llave, 0, vp_s_Llave.Length, bp, 0)

            Dim sha As SHA1CryptoServiceProvider = New SHA1CryptoServiceProvider()
            Dim bpHash() As Byte = sha.ComputeHash(bp)

            Dim i As Integer
            For i = 0 To 7
                vg_b_mbytKey(i) = bpHash(i)
            Next i
            For i = 8 To 15
                vg_b_mbytIV(i - 8) = bpHash(i)
            Next

            Return True

        Catch e As Exception
            Return False
        End Try
    End Function

    ''' <summary>
    ''' Función que encripta la cadena que recibe
    ''' </summary>
    ''' <param name="vp_s_Dato"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function encriptaDato(ByVal vp_s_Dato As String) As String
        Dim vl_s_Resultado As String

        If vp_s_Dato.Length > 92160 Then
            vl_s_Resultado = "Error. Data String too large. Keep within 90Kb."
            Return vl_s_Resultado
        End If

        If Not (convierteLlave(vg_S_Llave)) Then
            vl_s_Resultado = "Error. Fail to generate key for encryption"
            Return vl_s_Resultado
        End If

        vp_s_Dato = String.Format("{0,5:00000}" & vp_s_Dato, vp_s_Dato.Length)

        Dim rbData(vp_s_Dato.Length - 1) As Byte
        Dim aEnc As New ASCIIEncoding()
        aEnc.GetBytes(vp_s_Dato, 0, vp_s_Dato.Length, rbData, 0)

        Dim descsp As DESCryptoServiceProvider = New DESCryptoServiceProvider()

        Dim desEncrypt As ICryptoTransform = descsp.CreateEncryptor(vg_b_mbytKey, vg_b_mbytIV)

        Dim mStream As New MemoryStream(rbData)
        Dim cs As New CryptoStream(mStream, desEncrypt, CryptoStreamMode.Read)
        Dim mOut As New MemoryStream()

        Dim bytesRead As Integer
        Dim output(1023) As Byte
        Do
            bytesRead = cs.Read(output, 0, 1024)
            If Not (bytesRead = 0) Then
                mOut.Write(output, 0, bytesRead)
            End If
        Loop While (bytesRead > 0)

        If mOut.Length = 0 Then
            vl_s_Resultado = ""
        Else
            vl_s_Resultado = Convert.ToBase64String(mOut.GetBuffer(), 0, CInt(mOut.Length))
        End If
        Return vl_s_Resultado

    End Function

    ''' <summary>
    ''' Función que desencripta la cadena recibida
    ''' </summary>
    ''' <param name="vp_s_Dato"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function desencriptaDato(ByVal vp_s_Dato As String) As String

        Dim vl_s_Resultado As String

        If Not (convierteLlave(vg_S_Llave)) Then
            vl_s_Resultado = "Error. Fail to generate key for decryption"
            Return vl_s_Resultado
        End If

        Dim nReturn As Integer = 0
        Dim descsp As New DESCryptoServiceProvider()
        Dim desDecrypt As ICryptoTransform = descsp.CreateDecryptor(vg_b_mbytKey, vg_b_mbytIV)

        Dim mOut As New MemoryStream()
        Dim cs As New CryptoStream(mOut, desDecrypt, CryptoStreamMode.Write)

        Dim bPlain(vp_s_Dato.Length - 1) As Byte
        Try
            bPlain = Convert.FromBase64CharArray(vp_s_Dato.ToCharArray(), 0, vp_s_Dato.Length)
        Catch e As Exception
            vl_s_Resultado = "Error. Input Data is not base64 encoded."
            Return vl_s_Resultado
        End Try

        Dim lRead As Long = 0
        Dim lReadNow As Long = 0
        Dim lTotal As Long = vp_s_Dato.Length

        Try
            Do While (lTotal >= lRead)
                cs.Write(bPlain, 0, bPlain.Length)
                lReadNow = CLng(((bPlain.Length / descsp.BlockSize) * descsp.BlockSize))
                lRead = lReadNow + lRead
            Loop

            Dim aEnc As New ASCIIEncoding()
            vl_s_Resultado = aEnc.GetString(mOut.GetBuffer(), 0, CInt(mOut.Length))

            Dim strLen As String = vl_s_Resultado.Substring(0, 5)
            Dim nLen As Integer = CInt(strLen)
            vl_s_Resultado = vl_s_Resultado.Substring(5, nLen)
            nReturn = CInt(mOut.Length)

            Return vl_s_Resultado

        Catch e As Exception
            vl_s_Resultado = "Error. Decryption Failed. Possibly due to incorrect Key or corrupted data"
        End Try
        Return vl_s_Resultado
    End Function

#End Region

End Class
