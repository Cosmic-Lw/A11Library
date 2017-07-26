extends ../layout.pug

block additional_head_begin
  title 文章编辑

block content
  .container
    h1.page-title= title || "添加新文章"
    .row
      .col-md-8
        .form-group
          input.form-control#title(type='text' placeholder='文章标题' value=title)
          textarea#content(style='margin-top: 5px')!= content
      .col-md-4
        h4 单击上传后的文件可以将链接插入进文章中，使用 tools > source code 可以直接编辑文章的HTML代码
        form.dropzone#file-uploader(style="height: 100;")
          .dz-message 将文件拖至此处或点击上传
          br
          .dz-message 如果是图片的话，会被自动插入到文章中
        #upload-result
        button.btn.btn-success#upload(
          type='button'
          onClick='startPost();'
          style='margin-top: 5px')= (title ? "修改文章" : "发布文章")

block page_level_plugins
  script(src='http://cdn.bootcss.com/dropzone/4.3.0/min/dropzone.min.js')
  link(rel='stylesheet', href='/css/NodeRes1010/dropzone.css')

block additional_footer_script
  script.
    var fileid= #{file_id}
    var dropzone = new Dropzone('#file-uploader', {
      url: '/upload/100',
      maxFilesize: 50,
      thumbnailHeight: 120,
      thumbnailWidth: 120,
      paramName: 'inputfile',
    })

    function checkTypeAndInsertLink(event, data){
      var img_ext = ['.jpg', '.jpeg', '.bmp', '.png'];
      var is_img = false;
      for(var i in img_ext){
        if(event.name.toLowerCase().endsWith(img_ext[i])){
            is_img = true;
            break;
          }
      }

      if(is_img){
        var raw = "<img src='"+ data.file_url + "' />";
      }else{
        var raw = "<a href='"+data.file_url+"'>"+ event.name+" </a>";
      }
      tinymce.activeEditor.execCommand('mceInsertRawHTML', false, raw);
    }

    dropzone.on('success', function(event, data){
      //dropzone.removeFile(event);
      console.log(event);

      checkTypeAndInsertLink(event, data);

      event.previewElement.onclick = function(){
        checkTypeAndInsertLink(event, data);
      }

      //tinymce.activeEditor.execCommand('mceInsertRawHTML', false,
      //  "<a href='"+data.file_url+"'>"+ event.name+" </a>");
    })

    tinyMCE.init({
      selector: '#content',
      height: '500px',
      plugins: "code",
      menubar: "file edit insert view format table tools",
    });

    function startPost(){
      $('#upload-result').html('<div class="alert alert-info">提交中……</div>');
      if(fileid){
        var url='/content/admin/update-article/'+fileid;
      }else{
        var url = '/content/admin/upload-article';
      }
      var uploaded_ob = {article_name: $('#title').val(),
        article_content: tinyMCE.get('content').getContent({format: 'raw'})};
      console.log(uploaded_ob);
      try{
        $.ajax({
          type: "POST",
          url: url,
          data: uploaded_ob,
          success: function(res){
            if(res.success == 1){
              if(fileid){
                $('#upload-result').html('<div class="alert alert-success">更新成功，地址为： <a href="' + res.link
                  + '"> 文章地址 </a> </div>');
              }else{
                $('#upload-result').html('<div class="alert alert-success">发布成功，地址为： <a href="' + res.link
                  + '"> 文章地址 </a> </div>');
                var lst = res.link.split('/');
                fileid = parseInt(lst[lst.length-1]);
              }
            }else{
              $('#upload-result').html('<div class="alert alert-danger">' + res.info + '</div>');
              console.error(res);
            }
          }
        });
      }catch(err){
        console.error(err);
      }
    }
