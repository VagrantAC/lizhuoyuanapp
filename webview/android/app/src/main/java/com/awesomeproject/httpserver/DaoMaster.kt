package com.awesomeproject.httpserver

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteDatabase.CursorFactory
import android.util.Log
import org.greenrobot.greendao.AbstractDaoMaster
import org.greenrobot.greendao.database.*
import org.greenrobot.greendao.identityscope.IdentityScopeType

class DaoMaster(db: Database?) : AbstractDaoMaster(db, SCHEMA_VERSION) {
    constructor(db: SQLiteDatabase?) : this(StandardDatabase(db))

    init {
        registerDaoClass(TestDao::class.java)
    }

    override fun newSession(): DaoSession {
        return DaoSession(db, IdentityScopeType.Session, daoConfigMap)
    }

    override fun newSession(type: IdentityScopeType): DaoSession {
        return DaoSession(db, type, daoConfigMap)
    }

    abstract class OpenHelper : DatabaseOpenHelper {
        constructor(context: Context?, name: String?) : super(context, name, SCHEMA_VERSION)
        constructor(context: Context?, name: String?, factory: CursorFactory?) : super(
            context,
            name,
            factory,
            SCHEMA_VERSION
        )

        override fun onCreate(db: Database) {
            Log.i("greenDAO", "Creating tables for schema version $SCHEMA_VERSION")
            createAllTables(db, false)
        }
    }

    /** WARNING: Drops all table on Upgrade! Use only during development.  */
    class DevOpenHelper : OpenHelper {
        constructor(context: Context?, name: String?) : super(context, name)
        constructor(context: Context?, name: String?, factory: CursorFactory?) : super(
            context,
            name,
            factory
        )

        override fun onUpgrade(db: Database, oldVersion: Int, newVersion: Int) {
            Log.i(
                "greenDAO",
                "Upgrading schema from version $oldVersion to $newVersion by dropping all tables"
            )
            dropAllTables(db, true)
            onCreate(db)
        }
    }

    companion object {
        const val SCHEMA_VERSION = 1

        fun createAllTables(db: Database, ifNotExists: Boolean) {
            TestDao.createTable(db, ifNotExists)
        }

        fun dropAllTables(db: Database, ifExists: Boolean) {
            TestDao.dropTable(db, ifExists)
        }

        fun newDevSession(context: Context?, name: String?): DaoSession {
            val db = DevOpenHelper(context, name).writableDb
            val daoMaster = DaoMaster(db)
            return daoMaster.newSession()
        }
    }
}