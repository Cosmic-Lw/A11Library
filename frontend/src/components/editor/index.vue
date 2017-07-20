<template>
  <div>
      <span class="quill-editor-example col-md-8">
        <!-- quill-editor -->
        <quill-editor v-model="contentin"
                      :options="editorOption">
        </quill-editor>
        <Button type="info" style="float: right">取消</Button>
        <Button type="success" style="float: right">完成</Button>
      </span>
      <span class= "col-md-4">
      <Upload
        multiple
        type="drag"
        action="fileuploadpath"
        :default-file-list="defaultList">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
        </div>
      </Upload>
      </span>
  </div>
</template>

<script>
  import Quill from 'quill'
  import { ImageImport } from './modules/ImageImport.js'
  import { ImageResize } from './modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
  
  export default {
    data() {
      return {
        name: 'register-modules-example',
        editorOption: {}
      }
    },
    methods: {
    },
    props: {
      fileuploadpath: '//jsonplaceholder.typicode.com/posts/',
      contentin: '<p>Click on the Image Below to resize</p>' + '<p><img src="https://surmon-china.github.io/vue-video-player/static/images/author.jpg" width="400"></p>' +
                '<p>Or drag/paste an image here</p>',
      defaultList: [{
        'name': 'a42bdcc1178e62b4694c830f028db5c0',
        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      },
      {
        'name': 'bc7521e033abdd1e92222d733590f104',
        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
      }],
      commitrouter: ''
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted() {
    }
  }
</script>

<style>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
