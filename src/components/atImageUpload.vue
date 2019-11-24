<template>
    <div class="at-image-upload">
        <el-upload
            class="upload-demo"
            drag
            :action="imageUrl"
            multiple
            name="uploadFile"
            :show-file-list="false"
            :on-success="success"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>
    </div>
</template>

<script>
import { imageUrl } from "@/tool/index";
export default {
  props: {
    config: {
      type: Object,
      default: function() {
        return {
          model: {},
          items: []
        };
      }
    }
  },
  data() {
    return {
      imageUrl,
      attachmentPath: ""
    };
  },
  components: {},
  computed: {},
  mounted: function() {},
  methods: {
    success: function(response, file, fileList) {
      const { code, data, message } = response;
      if (code === 200) {
        this.attachmentPath = data;
        this.$message.success("上传成功");
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
<style lang='scss' >
.at-image-upload {
  margin-left: 15px;
  .upload-demo,
  .el-upload,
  .el-upload-dragger {
    height: 60px;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .el-icon-upload {
      margin: 0px 15px;
    }
  }
}
</style>