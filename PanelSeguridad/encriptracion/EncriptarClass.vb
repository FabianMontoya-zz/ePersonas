Imports System.Text
Imports System.Security.Cryptography
Imports System.IO

Public Class EncriptarClass
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
    ''' <param name="SourceText"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Encriptacion_MD5(ByVal SourceText As String) As String

        'Create an encoding object to ensure the encoding standard for the source text
        Dim Ue As New UnicodeEncoding()
        'Retrieve a byte array based on the source text
        Dim ByteSourceText() As Byte = Ue.GetBytes(SourceText)
        'Instantiate an MD5 Provider object
        Dim Md5 As New MD5CryptoServiceProvider()
        'Compute the hash value from the source
        Dim ByteHash() As Byte = Md5.ComputeHash(ByteSourceText)
        'And convert it to String format for return
        Return Convert.ToBase64String(ByteHash)

    End Function

#Region "Enciptación de URL"
    Private mbytKey(7) As Byte
    Private mbytIV(7) As Byte

    Private Function convierteLlave(ByVal strLlave As String) As Boolean
        Try
            Dim bp(strLlave.Length - 1) As Byte
            Dim aEnc As ASCIIEncoding = New ASCIIEncoding()
            aEnc.GetBytes(strLlave, 0, strLlave.Length, bp, 0)

            Dim sha As SHA1CryptoServiceProvider = New SHA1CryptoServiceProvider()
            Dim bpHash() As Byte = sha.ComputeHash(bp)

            Dim i As Integer
            For i = 0 To 7
                mbytKey(i) = bpHash(i)
            Next i
            For i = 8 To 15
                mbytIV(i - 8) = bpHash(i)
            Next

            Return True

        Catch e As Exception
            Return False
        End Try
    End Function

    Public Function encriptaDato(ByVal strDato As String) As String
        Dim strResultado As String

        If strDato.Length > 92160 Then
            strResultado = "Error. Data String too large. Keep within 90Kb."
            Return strResultado
        End If

        If Not (convierteLlave("FabianM")) Then
            strResultado = "Error. Fail to generate key for encryption"
            Return strResultado
        End If

        strDato = String.Format("{0,5:00000}" & strDato, strDato.Length)

        Dim rbData(strDato.Length - 1) As Byte
        Dim aEnc As New ASCIIEncoding()
        aEnc.GetBytes(strDato, 0, strDato.Length, rbData, 0)

        Dim descsp As DESCryptoServiceProvider = New DESCryptoServiceProvider()

        Dim desEncrypt As ICryptoTransform = descsp.CreateEncryptor(mbytKey, mbytIV)

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
            strResultado = ""
        Else
            strResultado = Convert.ToBase64String(mOut.GetBuffer(), 0, CInt(mOut.Length))
        End If
        Return strResultado

    End Function

    Public Function desencriptaDato(ByVal strDato As String) As String

        Dim strResultado As String

        If Not (convierteLlave("FabianM")) Then
            strResultado = "Error. Fail to generate key for decryption"
            Return strResultado
        End If

        Dim nReturn As Integer = 0
        Dim descsp As New DESCryptoServiceProvider()
        Dim desDecrypt As ICryptoTransform = descsp.CreateDecryptor(mbytKey, mbytIV)

        Dim mOut As New MemoryStream()
        Dim cs As New CryptoStream(mOut, desDecrypt, CryptoStreamMode.Write)

        Dim bPlain(strDato.Length - 1) As Byte
        Try
            bPlain = Convert.FromBase64CharArray(strDato.ToCharArray(), 0, strDato.Length)
        Catch e As Exception
            strResultado = "Error. Input Data is not base64 encoded."
            Return strResultado
        End Try

        Dim lRead As Long = 0
        Dim lReadNow As Long = 0
        Dim lTotal As Long = strDato.Length

        Try
            Do While (lTotal >= lRead)
                cs.Write(bPlain, 0, bPlain.Length)
                lReadNow = CLng(((bPlain.Length / descsp.BlockSize) * descsp.BlockSize))
                lRead = lReadNow + lRead
            Loop

            Dim aEnc As New ASCIIEncoding()
            strResultado = aEnc.GetString(mOut.GetBuffer(), 0, CInt(mOut.Length))

            Dim strLen As String = strResultado.Substring(0, 5)
            Dim nLen As Integer = CInt(strLen)
            strResultado = strResultado.Substring(5, nLen)
            nReturn = CInt(mOut.Length)

            Return strResultado

        Catch e As Exception
            strResultado = "Error. Decryption Failed. Possibly due to incorrect Key or corrupted data"
        End Try
        Return strResultado
    End Function
#End Region

End Class
