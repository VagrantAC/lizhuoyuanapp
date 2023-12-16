package com.awesomeproject.httpserver

import androidx.room.*

@Dao
interface TestDao {
    @Query("SELECT id FROM test")
    fun getAllIds(): List<Long>

    @Query("SELECT info FROM test WHERE id = :id")
    fun loadInfosById(id: String): String

    @Upsert
    fun upsert(test: Test)

    @Query("DELETE FROM test WHERE id = :id")
    fun deleteById(id: String)
}