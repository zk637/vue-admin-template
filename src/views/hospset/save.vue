<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospset.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospset.hoscode"/>
      </el-form-item>
      <el-form-item label="api地址">
        <el-input v-model="hospset.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="hospset.contactsName"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="hospset.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 <script>
import hospset from "@/api/yygh/hospset";
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用,
      hospset: {}
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      hospset.getHospSetf(id).then(response => {
        this.hospset = response.data.hospitalSet;
      });
    }
  },
  methods: {
    saveOrUpdate() {
      if (!this.hospset.id) {
        //添加
        this.addHospSet();
      } else {
        this.modifyHospSet();
      }
    },
    addHospSet() {
        debugger
      this.saveBtnDisabled = true;
      hospset
        .saveHosp(this.hospset)
        .then(response => {
          return this.$message({
            type: 'success',
            message: '保存成功'
          });
           this.$router.push({ path: '/hospset/list' });
        })
    },
  modifyHospSet() {
    this.saveBtnDisabled=true
    debugger
    hospset
      .updateHospSet(this.hospset)
      .then(response => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.$router.push({ path: '/hospset/list' });
      })
    }
  } 
}
</script>

