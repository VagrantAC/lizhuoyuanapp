package com.awesomeproject.httpserver

import android.database.Cursor
import android.util.Log
import com.facebook.react.bridge.*
import io.ktor.http.HttpStatusCode
import kotlinx.serialization.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.serialization.Serializable
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.request.receiveText

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
        embeddedServer(Netty, port = 7890) {
            install(ContentNegotiation) {
                json(Json {
                    prettyPrint = true
                    isLenient = true
                })
            }
            routing {
                get("/") {
                    val id = call.request.queryParameters["id"]!!;
                    var cursor: Cursor? = null
                    var info = ""
                    try {
                        cursor = DaoManager.instance?.testDao?.database?.rawQuery("SELECT id FROM TEST WHERE id = ?", arrayOf(id))
                        if (cursor != null && cursor.moveToFirst()) {
                            do {
                                info = cursor.getString(0)
                            } while (cursor.moveToNext())
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
            }
        }.start(wait = false)
    }
}
