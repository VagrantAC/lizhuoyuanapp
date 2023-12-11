package com.awesomeproject.fileserver

import android.widget.Toast
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.IOException


class FileServerModule(private var reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(
    reactContext
) {
    companion object {
        private const val DURATION_SHORT_KEY = "SHORT"
        private const val DURATION_LONG_KEY = "LONG"
    }

    override fun getName(): String {
        return "ToastExample";
    }

    override fun getConstants(): Map<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants[DURATION_SHORT_KEY] = Toast.LENGTH_SHORT
        constants[DURATION_LONG_KEY] = Toast.LENGTH_LONG
        return constants
    }

    @ReactMethod
    fun show(message: String?, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }

    @ReactMethod
    fun reset(promise: Promise) {
        val server = FileServer(reactContext)
        try {
            server.start()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        promise.resolve(server.listeningPort)
    }
}