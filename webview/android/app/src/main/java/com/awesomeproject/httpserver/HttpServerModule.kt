package com.awesomeproject.httpserver

import android.database.Cursor
import android.util.Log
import com.facebook.react.bridge.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.request.receiveText
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import org.opencv.android.OpenCVLoader
import org.opencv.core.CvType.CV_8UC3
import org.opencv.core.Mat
import org.opencv.core.MatOfByte
import org.opencv.imgcodecs.Imgcodecs
import org.opencv.imgproc.Imgproc
import java.util.*

@Serializable
data class DTest(val id: Long, val info: String)
@Serializable
data class TestList(val tests: MutableList<DTest>)


class HttpServerModule(private var reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "HttpServer"
    }

    @ReactMethod
    fun reset(promise: Promise) {
        DaoManager.init(reactContext);
//        OpenCV.loadShared()
        embeddedServer(Netty, port = 7890) {
            install(ContentNegotiation) {
                json(Json {
                    prettyPrint = true
                    isLenient = true
                })
            }
            install(CORS) {
                allowMethod(HttpMethod.Delete)
                allowMethod(HttpMethod.Options)
                allowMethod(HttpMethod.Get)
                allowMethod(HttpMethod.Post)
                // 添加其他允许的 HTTP 方法
                allowHeader(HttpHeaders.AccessControlAllowHeaders)
                allowHeader(HttpHeaders.ContentType)
                allowHeader(HttpHeaders.AccessControlAllowOrigin)
                anyHost()
                // 允许任何来源访问资源

                allowCredentials = true
            }
            routing {
                get("/") {
                    val id = call.request.queryParameters["id"]!!;
                    var cursor: Cursor? = null
                    var info = ""
                    try {
                        cursor = DaoManager.instance?.testDao?.database?.rawQuery("SELECT info FROM TEST WHERE id = ?", arrayOf(id))
                        if (cursor != null && cursor.moveToFirst()) {
                            info = cursor.getString(0)
                        }
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.ExpectationFailed, e.message!!);
                    } finally {
                        cursor?.close()
                    }
                    try {
                        call.respond(DTest(id.toLong(), info))
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.ExpectationFailed, e.message!!);
                    }
                }
                delete("/") {
                    val id = call.request.queryParameters["id"]!!;
                    if (DaoManager.instance?.testDao != null) {
                        val database = DaoManager.instance!!.testDao.database
                        val sql = "DELETE FROM TEST WHERE id = ?"
                        database?.execSQL(sql, arrayOf(id))
                        call.respond(HttpStatusCode.OK, "delete success")
                    } else {
                        call.respond(HttpStatusCode.Forbidden, "delete faild")
                    }
                }
                post("/") {
                    val info = call.receiveText()
                    if (DaoManager.instance?.testDao != null) {
                        val database = DaoManager.instance!!.testDao.database
                        val sql = "INSERT OR REPLACE INTO TEST (id, info) VALUES (?, ?)"
                        database?.execSQL(sql, arrayOf(System.currentTimeMillis(), info))
                        call.respond(HttpStatusCode.OK, "insert success")
                    } else {
                        call.respond(HttpStatusCode.Forbidden, "insert faild")
                    }
                }
                get("/keys") {
                    var cursorKeys: Cursor? = null;
                    val tests: MutableList<DTest> = mutableListOf()
                    try {
                        cursorKeys = DaoManager.instance?.testDao?.database?.rawQuery("SELECT id FROM TEST", null)
                        if (cursorKeys != null && cursorKeys.moveToFirst()) {
                            do {
                                val id = cursorKeys.getLong(0)
                                tests.add(DTest(id, ""))
                            } while (cursorKeys.moveToNext())
                        }
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.ExpectationFailed, e.message!!);
                    } finally {
                        cursorKeys?.close()
                    }

                    try {
                        val testList = TestList(tests = tests);
                        call.respond(testList)
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.ExpectationFailed, e.message!!);
                    }
                }
                post("/rgb2hsv") {
                    try {
                        val base64Image = call.receiveText()
                        Log.e("base64Image", base64Image)
                        val imageData = Base64.getDecoder().decode(base64Image);
                        Log.e("imageData", imageData.toString())

                        // 读取图像数据为 OpenCV 的 Mat 对象
                        val imageMat =
                            Imgcodecs.imdecode(MatOfByte(*imageData), Imgcodecs.IMREAD_UNCHANGED)

                        // 将图像从 RGBA 转换为 RGB
                        Imgproc.cvtColor(imageMat, imageMat, Imgproc.COLOR_RGBA2RGB)

                        // 创建与输入图像尺寸相同的 Mat 对象，用于存储 HSV 图像
                        val hsvMat = Mat(imageMat.rows(), imageMat.cols(), CV_8UC3)

                        // 将 RGB 图像转换为 HSV 图像
                        Imgproc.cvtColor(imageMat, hsvMat, Imgproc.COLOR_RGB2HSV)

                        // 将 HSV 图像转换为 Base64 字符串
                        val hsvMatOfByte = MatOfByte()
                        Imgcodecs.imencode(".png", hsvMat, hsvMatOfByte)
                        val hsvBase64 = Base64.getEncoder().encodeToString(hsvMatOfByte.toArray())

                        // 释放内存
                        imageMat.release()
                        hsvMat.release()
                        call.respond(hsvBase64)
                    } catch (e: Exception) {
                        Log.e("ERROR", e.message!!)
                    }
                }
            }
        }.start(wait = false)
    }

    companion object {
        init {
            OpenCVLoader.initDebug()
//            System.loadLibrary(Core.NATIVE_LIBRARY_NAME)
        }
    }
}
