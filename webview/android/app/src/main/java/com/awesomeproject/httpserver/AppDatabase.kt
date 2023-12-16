package com.awesomeproject.httpserver

import android.util.Log
import androidx.room.*
import androidx.sqlite.db.SupportSQLiteDatabase
import com.facebook.react.bridge.ReactApplicationContext

@Database(entities = [Test::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun testDao(): TestDao

    companion object {
        private const val DATABASE_NAME = "test_database"

        @Volatile private var instance: AppDatabase? = null
        fun getInstance(context: ReactApplicationContext): AppDatabase {
            return instance ?: synchronized(this) {
                instance ?: buildDatabase(context).also { instance = it }
            }
        }
        private fun buildDatabase(context: ReactApplicationContext): AppDatabase {
            return Room.databaseBuilder(context, AppDatabase::class.java, DATABASE_NAME).addCallback(
                object : RoomDatabase.Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        db.setMaximumSize(100L * 1024L * 1024L * 1024L);
                        Log.e("size in onCreate = ", db.maximumSize.toString())
                    }

                    override fun onOpen(db: SupportSQLiteDatabase) {
                        super.onOpen(db)
                        db.isDatabaseIntegrityOk
                        db.setMaximumSize(100L * 1024L * 1024L * 1024L);
                        Log.e("size in onOpen = ", db.maximumSize.toString())
                    }
                },
            ).build()
        }
    }
}