<template>
  <div class="app-container">
    医院设置列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getHospSetList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" width="180"/>

      <el-table-column prop="hoscode" label="医院编号" width="160"/>

      <el-table-column prop="apiUrl" label="地址" width="200"/>

      <el-table-column prop="contactsName" label="联系人"/>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{ scope.row.status===1?'可用':'不可用' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/hospset/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id,0)"
          >锁定</el-button>
          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id,1)"
          >取消锁定</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div>
      <el-button type="danger" size="mini" @click="removeBatch()">批量删除</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getHospSetList"
    />
  </div>
</template>

<script>
import hospset from "@/api/yygh/hospset";
export default {
  data() {
    return {
      multipleSelection: [], //复选框
      listLoading: false, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 3, // 每页记录数
      searchObj: {} // 查询条件
    };
  },
  created() {
    this.getHospSetList();
  },
  methods: {
    // lockHospSet(id,status){
    //   debugger
    //   hospset.lockHospSet(id,status).then(response=>{
    //       // this.$message({
    //       //   type : 'success',
    //       //   message: '更新成功'
    //       // });
    //       this.getHospSetList()
    //   })
    // },
    getHospSetList(page = 1) {
      console.log("加载列表");
      this.page = page;
      hospset
        .getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          if (response.success === true) {
            this.list = response.data.rows;
            this.total = response.data.total;
          } else {
            this.listLoading = false;
          }
          //关闭加载
        });
    },
    //查询结果清除方法
    resetData() {
      this.searchObj = {};
      this.getHospSetList();
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除该设置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return hospset.deleteById(id);
        })
        .then(() => {
          //删除成功刷新页面
          this.getHospSetList();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        });
    },
    //获取选择的复选框
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    //批量删除
    removeBatch() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //从数组中获取所有选中的ID
        var idList = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        hospset.delbatchHospSet(idList).then(response => {
          this.$message({
            type: "suceess",
            message: "批量删除成功"
          });
          this.getHospSetList();
        });
      });
    }
  }
};
</script>
