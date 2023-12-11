package com.awesomeproject.httpserver

import android.database.sqlite.SQLiteDatabase
import com.awesomeproject.httpserver.DaoMaster.DevOpenHelper
import com.facebook.react.bridge.ReactApplicationContext


class DaoManager private constructor(context: ReactApplicationContext) {
    private val writableDatabase: SQLiteDatabase
    private val daoMaster: DaoMaster
    private val daoSession: DaoSession
    private val mTestDao: TestDao

    init {
        val helper = DevOpenHelper(context, DB_NAME, null)
        writableDatabase = helper.writableDatabase
        daoMaster = DaoMaster(writableDatabase)
        daoSession = daoMaster.newSession()
        mTestDao = daoSession.getTestDao()
    }

    val testDao: TestDao get() = mTestDao

    companion object {
        const val DB_NAME = "de-db"
        var instance: DaoManager? = null

        @Synchronized
        fun init(context: ReactApplicationContext) {
            if (instance == null) {
                instance = DaoManager(context)
            }
        }
    }
}