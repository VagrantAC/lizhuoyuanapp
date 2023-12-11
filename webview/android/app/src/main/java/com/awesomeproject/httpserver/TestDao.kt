package com.awesomeproject.httpserver

import android.database.Cursor
import android.database.sqlite.SQLiteStatement
import org.greenrobot.greendao.AbstractDao
import org.greenrobot.greendao.Property
import org.greenrobot.greendao.database.Database
import org.greenrobot.greendao.database.DatabaseStatement
import org.greenrobot.greendao.internal.DaoConfig

class TestDao : AbstractDao<Test?, Long?> {
    object Properties {
        val Id: Property = Property(0, Long::class.java, "id", true, "id")
        val Info: Property = Property(1, String::class.java, "info", false, "info")
    }

    constructor(config: DaoConfig?) : super(config)
    constructor(config: DaoConfig?, daoSession: DaoSession?) : super(config, daoSession)

    override fun bindValues(stmt: DatabaseStatement, entity: Test?) {
        stmt.clearBindings()
        val id: Long? = entity?.getId()
        if (id != null) {
            stmt.bindLong(1, id)
        }
        val info: String? = entity?.getInfo()
        if (info != null) {
            stmt.bindString(2, info)
        }
    }

    override fun bindValues(stmt: SQLiteStatement, entity: Test?) {
        stmt.clearBindings()
        val id: Long? = entity?.getId()
        if (id != null) {
            stmt.bindLong(1, id)
        }
        val info: String? = entity?.getInfo()
        if (info != null) {
            stmt.bindString(2, info)
        }
    }

    public override fun readKey(cursor: Cursor, offset: Int): Long? {
        return if (cursor.isNull(offset + 0)) null else cursor.getLong(offset + 0)
    }

    public override fun readEntity(cursor: Cursor, offset: Int): Test {
        return Test(
            if (cursor.isNull(offset + 0)) null else cursor.getLong(offset + 0),  // id
            if (cursor.isNull(offset + 1)) null else cursor.getString(offset + 1),  // sid
        )
    }

    public override fun readEntity(cursor: Cursor, entity: Test?, offset: Int) {
        entity?.setId(if (cursor.isNull(offset + 0)) null else cursor.getLong(offset + 0))
        entity?.setInfo(if (cursor.isNull(offset + 1)) null else cursor.getString(offset + 1))
    }

    override fun updateKeyAfterInsert(entity: Test?, rowId: Long): Long {
        entity?.setId(rowId)
        return rowId
    }

    public override fun getKey(entity: Test?): Long? {
        return entity?.getId()
    }

    public override fun hasKey(entity: Test?): Boolean {
        return entity?.getId() != null
    }

    override fun isEntityUpdateable(): Boolean {
        return true
    }

    companion object {
        const val TABLENAME: String = "TEST"
        fun createTable(db: Database, ifNotExists: Boolean) {
            val constraint = if (ifNotExists) "IF NOT EXISTS " else ""
            db.execSQL(
                "CREATE TABLE " + constraint + "\"TEST\" (" +
                        "\"id\" INTEGER PRIMARY KEY AUTOINCREMENT ," +  // 0: id
                        "\"info\" TEXT)"// 1: info
            )
        }

        fun dropTable(db: Database, ifExists: Boolean) {
            val sql = "DROP TABLE " + (if (ifExists) "IF EXISTS " else "") + "\"TEST\""
            db.execSQL(sql)
        }
    }
}