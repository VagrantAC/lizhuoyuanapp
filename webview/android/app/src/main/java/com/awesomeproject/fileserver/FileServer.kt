package com.awesomeproject.fileserver

import android.webkit.MimeTypeMap
import com.facebook.react.bridge.ReactApplicationContext
import fi.iki.elonen.NanoHTTPD
import java.io.IOException

class FileServer(private val context: ReactApplicationContext, port: Int = 0) : NanoHTTPD(port) {
    override fun serve(session: IHTTPSession): Response {
        val uri = session.uri
        return try {
            val inputStream = context.assets.open(uri.substring(1))
            newChunkedResponse(Response.Status.OK, getMimeType(uri), inputStream)
        } catch (e: IOException) {
            newFixedLengthResponse(
                Response.Status.NOT_FOUND,
                MIME_PLAINTEXT,
                "File not found."
            )
        }
    }

    private fun getMimeType(filePath: String): String? {
        val extension = MimeTypeMap.getFileExtensionFromUrl(filePath)
        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension)
    }
}
