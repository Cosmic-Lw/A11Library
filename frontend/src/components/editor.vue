<template>
<div>
      <div class="md-subhead">
        <span>04 Example (register modules){{content}}</span>
      </div>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor v-model="content"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <div class="html ql-editor" v-html="content"></div>
      </div>
      {{defaultList}}
      <div>
      {{uploadList}}
      </div>
  <template>
    <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        name="avatar"
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :max-size="2048"
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :on-preview='select'
        multiple
        type="drag"
        action="/api/upload"
        style="display: inline-block;width:58px;">
        <div name="avatar" style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="查看图片" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
</template>
  


<form id='editfile' method='post' action='/api/upload' enctype='multipart/form-data'>
    <input name="text" type="text"/>
    选择图片：<input name="avatar" id='upfile' type='file'/>
    <input type='submit' value='提交'/>
</form>


</div>
</template>

<script>
  import Quill from 'quill'
  import { ImageImport } from '../modules/ImageImport.js'
  import { ImageResize } from '../modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
  
  export default {
    data() {
      return {
        name: 'register-modules-example',
        content: '<p>Click on the Image Below to resize</p>' + 
                 '<p><img src="https://surmon-china.github.io/vue-video-player/static/images/author.jpg" width="400"></p>' +
                 '<p>Or drag/paste an image here</p>',
        editorOption: {
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['image']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageImport: true,
            imageResize: {
              displaySize: true
            }
          }
        },
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    methods: {
      onEditorChange(editor) {
        console.log('editor change!', editor)
        console.log(this.content)
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleFormatError (file) {
        this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        console.log(res.filepath)
        file.url = res.filepath;
        console.log("返回数据", res);
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
          if (!check) {
            this.$Notice.warning({
              title: '最多只能上传 5 张图片。'
            });
          }
        return check;    
      },
      select (file) {
        console.log('file', file)
        console.log('handle: ', this.name)
      }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
        this.container =  this.container + '<p><img src=/"'+ this.uploadList[0].url +'/>'+'</p>'
        console.log(this.container)
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
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
