package com.awesomeproject.httpserver

import org.greenrobot.greendao.*
import org.greenrobot.greendao.database.Database
import org.greenrobot.greendao.identityscope.IdentityScopeType
import org.greenrobot.greendao.internal.DaoConfig

class DaoSession(
    db: Database,
    type: IdentityScopeType,
    daoConfigMap: Map<Class<out AbstractDao<*, *>?>?, DaoConfig>
) :
    AbstractDaoSession(db) {
    private val testDaoConfig: DaoConfig
    private val testDao: TestDao

    init {
        testDaoConfig = daoConfigMap[TestDao::class.java]!!.clone()
        testDaoConfig.initIdentityScope(type)
        testDao = TestDao(testDaoConfig, this)
        registerDao(Test::class.java, testDao)
    }

    fun clear() {
        testDaoConfig.clearIdentityScope()
    }

    fun getTestDao(): TestDao {
        return testDao
    }
}