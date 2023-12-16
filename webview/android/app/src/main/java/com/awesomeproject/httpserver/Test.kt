package com.awesomeproject.httpserver

import androidx.room.*

@Entity(tableName = "test")
data class Test(
    @PrimaryKey val id: Long,
    @ColumnInfo(name = "info") val info: String,
)