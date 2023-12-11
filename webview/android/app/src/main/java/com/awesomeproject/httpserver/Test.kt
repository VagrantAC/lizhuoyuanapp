package com.awesomeproject.httpserver

import kotlinx.serialization.Serializable
import org.greenrobot.greendao.annotation.*

@Entity
class Test(l: Long?, s: String?) {
    @Id(autoincrement = true)
    private var id: Long? = l
    private var info: String? = s

    fun getId(): Long? {
        return id
    }

    fun setId(id: Long?) {
        this.id = id
    }

    fun getInfo(): String? {
        return info
    }

    fun setInfo(info: String?) {
        this.info = info
    }
}