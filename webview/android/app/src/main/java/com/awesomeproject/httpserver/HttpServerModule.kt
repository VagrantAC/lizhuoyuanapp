package com.awesomeproject.httpserver

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
import org.opencv.core.Core
import org.opencv.core.CvType.CV_32F
import org.opencv.core.CvType.CV_8UC3
import org.opencv.core.Mat
import org.opencv.core.MatOfByte
import org.opencv.core.Size
import org.opencv.imgcodecs.Imgcodecs
import org.opencv.imgproc.Imgproc
import java.util.*

@Serializable
data class DTest(val id: Long, val info: String)
@Serializable
data class TestList(val tests: MutableList<DTest>)

@Serializable
data class Color(val r: Double, var g: Double, var b: Double);


class HttpServerModule(private var reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "HttpServer"
    }

    @ReactMethod
    fun reset(promise: Promise) {
//        DaoManager.init(reactContext);
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
                    try {
                        call.respond(DTest(id.toLong(), AppDatabase.getInstance(reactContext).testDao().loadInfosById(id).toString()))
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.ExpectationFailed, e.message!!);
                    }
                }
                delete("/") {
                    val id = call.request.queryParameters["id"]!!;
                    try {
                        AppDatabase.getInstance(reactContext).testDao().deleteById(id)
                        call.respond(HttpStatusCode.OK, "delete success")
                    } catch (e: Exception) {
                        call.respond(HttpStatusCode.Forbidden, e.message!!)
                    }
                }
                post("/") {
                    val info = call.receiveText()
                    try {
                        AppDatabase.getInstance(reactContext).testDao().upsert(Test(System.currentTimeMillis(), info))
                        call.respond(HttpStatusCode.OK, "insert success")
                    } catch(e: Exception) {
                        call.respond(HttpStatusCode.Forbidden, e.message!!)
                    }
                }
                get("/keys") {
                    val tests: MutableList<DTest> = mutableListOf()
                    val allIds = AppDatabase.getInstance(reactContext).testDao().getAllIds()
                    allIds.forEach {id ->
                        tests.add(DTest(id, ""))
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
                        val imageData = Base64.getDecoder().decode(base64Image);

                        // 读取图像数据为 OpenCV 的 Mat 对象
                        val imageMat =
                            Imgcodecs.imdecode(MatOfByte(*imageData), Imgcodecs.IMREAD_UNCHANGED)

                        // 将图像从 RGBA 转换为 RGB
                        Imgproc.cvtColor(imageMat, imageMat, Imgproc.COLOR_RGBA2RGB)

                        // 创建与输入图像尺寸相同的 Mat 对象，用于存储 HSV 图像
                        val hsvMat = Mat(imageMat.rows(), imageMat.cols(), CV_8UC3)

                        // 将 RGB 图像转换为 HSV 图像
                        Imgproc.cvtColor(imageMat, hsvMat, Imgproc.COLOR_RGB2HSV)

                        val quality = 0.2
                        val qualityHsvMat = Mat()
                        val targetSize = Size(hsvMat.width() * quality, hsvMat.height() * quality)
                        Imgproc.resize(hsvMat, qualityHsvMat, targetSize)

                        // 将 HSV 图像转换为 Base64 字符串
                        val hsvMatOfByte = MatOfByte()
                        Imgcodecs.imencode(".png", qualityHsvMat, hsvMatOfByte)
                        val hsvBase64 = Base64.getEncoder().encodeToString(hsvMatOfByte.toArray())

                        // 释放内存
                        imageMat.release()
                        hsvMat.release()
                        call.respond(hsvBase64)
                    } catch (e: Exception) {
                        Log.e("ERROR", e.message!!)
                    }
                }
                post("/average") {
                    try {
                        val base64Image = call.receiveText()
                        val imageData = Base64.getDecoder().decode(base64Image);

                        // 读取图像数据为 OpenCV 的 Mat 对象
                        val imageMat =
                            Imgcodecs.imdecode(MatOfByte(*imageData), Imgcodecs.IMREAD_UNCHANGED)
                        // 将图像转换为 32-bit floating point 格式
                        val floatImage = Mat()
                        imageMat.convertTo(floatImage, CV_32F)

                        // 拆分图像通道
                        val channels = ArrayList<Mat>()
                        Core.split(floatImage, channels)

                        // 计算每个通道的平均值
                        val meanValues = DoubleArray(3)
                        for (i in 0 until 3) {
                            val meanValue = Core.mean(channels[i])
                            meanValues[i] = meanValue.`val`[0]
                        }
                        Log.i("IMAGE AVERAGE:", Color(meanValues[0], meanValues[1], meanValues[2]).toString())
                        call.respond(Color(meanValues[0], meanValues[1], meanValues[2]))
                    } catch(e: Exception) {
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
