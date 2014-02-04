function load_draft_list(page_num,page_size,callback){	
	$.getJSON(config['web_root']+"Home/Draft/list_drafts",
		{page_num:page_num,page_size:page_size},function(data){
		var $table = $("#west table")
		// do some clean jobs
		$table.html('')
		$("#go_previous,#go_next").addClass("disabled")
		// create new elements
		for(var i=0;i<data.drafts.length;i++){
			var $del = $("<a/>").addClass("btn btn-danger btn-xs pull-right remove_draft")
			.append($("<span/>").addClass("glyphicon glyphicon-remove"))
			.attr("data-id",data.drafts[i]['id'])
			var $td = $("<td/>")
			var $tr = $("<tr/>").attr("data-id",data.drafts[i]['id'])
			$td.text(data.drafts[i]['title'])
			$td.append($del)
			$tr.append($td)
			$table.append($tr)
		}
		draft_list_events_binding($table,data)
		var total_page = Math.ceil(data['total']/page_size)
		$("#current_page").text(data['current'])
		$("#total_page").text(total_page)
		if(data['current']>1){
			$("#go_previous").removeClass("disabled").attr("data-page",data['current']-1)
		}
		if(data['current']<total_page){
			$("#go_next").removeClass("disabled").attr("data-page",data['current']+1)
		}
		if(callback){
			callback(data)	
		}		
	})
}
function draft_list_events_binding($table,data){
	$table.find("a.remove_draft").click(function(){
		var c = confirm("Are you sure to delete?")
		if(!c){
			return false;
		}
		var id = $(this).attr("data-id") 
		$.getJSON(config['web_root']+"Home/Draft/delete_draft",
			{id:id},function(data){
			if(data.result==="ok"){
				$table.find("tr[data-id="+id+"]").remove()
				if(id===$("#update_title").attr("data-id")){
					clear_draft();					
				}
			}else{
				alert(data.info)
			}
		})
		return false;
	})
	$table.find("tr").click(function(){
		var id = $(this).attr("data-id")
		load_draft(id)
	})
}
function load_draft(id,callback){
	$.getJSON(config['web_root']+"Home/Draft/load_draft",
	{id:id},function(data){
		$("#title").val(data['title'])
		$("#create_time").text(data['create_time'])
		$("#last_save_time").text(data['last_save_time'])
		$("#update_title").attr("data-id",id)
		editor.setValue(data['content'])
		var result = parse(data['content'])
		$("#ptitle").text(result['title'])
		re_load_thumb(get_thumb_name(data.title)+'.jpg')
		load_images(id)
		load_attachments(id)
		if(callback){
			callback(data)
		}
	})
	function get_thumb_name(title){
		var first_word = title.split("-")[3]
		var begin_idx = title.indexOf(first_word)
		return title.substring(begin_idx)
	}
}
function re_load_thumb(title){
	$("#thumb").attr("src",config['thumb_dir']+title)
}
function parse(content){
	var head = content.split("---")[1]
	var lines = head.split("\n")
	var result = {}
	for(var i=0;i<lines.length;i++){
		var titleIdx = lines[i].indexOf("title:")
		if(titleIdx>=0){
			result['title'] = lines[i].substring(titleIdx+6).trim().split('"')[1]
			continue
		}
		titleIdx = lines[i].indexOf("date:")
		if(titleIdx>=0){
			result['date'] = new Date(
				Date.parse(
					lines[i].substring(titleIdx+5).trim()
					)
				).toDateString()
			continue
		}
		titleIdx = lines[i].indexOf("categories:")
		if(titleIdx>=0){
			result['tags'] = lines[i].substring(titleIdx+11).trim().split(' ')
			continue
		}
	}
	return result
}
function load_images(id,callback){
	$.getJSON(config['web_root']+"Home/Image/list_images",{id:id},
		function(data){
			var $table = $("#east-center table")
			// do some clean jobs
			$table.html('').attr("data-id",id)
			// create new elements
			for(var i=0;i<data.length;i++){
				var $del = $("<a/>").addClass("btn btn-danger btn-xs pull-right remove_image")
				.append($("<span/>").addClass("glyphicon glyphicon-remove"))
				.attr("data-filename",data[i]['filename'])
				var $td = $("<td/>")
				var $tr = $("<tr/>").attr("data-filename",data[i]['filename'])
				$td.append(
					$("<a/>").text(data[i]['filename'])
					.attr("href",config['inset_dir']+data[i]['filename'])
					.attr("target","_blank")
					)
				$td.append($del)
				$tr.append($td)
				$table.append($tr)
			}
			image_list_events_binding($table,data)
		})	
}
function image_list_events_binding($table,data){
	$table.find("a.remove_image").click(function(){
		var c = confirm("Are you sure to delete?")
		if(!c){
			return;
		}
		var filename = $(this).attr("data-filename") 
		$.getJSON(config['web_root']+"Home/Image/delete_image",
			{filename:filename},function(data){
			if(data.result==="ok"){
				$table.find("tr[data-filename='"+filename+"']").remove()
			}else{
				alert(data.info)
			}
		})
	})
}
function load_attachments(id,callback){
	$.getJSON(config['web_root']+"Home/Attachment/list_attachments",{id:id},
		function(data){
			var $table = $("#east-south table")
			// do some clean jobs
			$table.html('').attr("data-id",id)
			// create new elements
			for(var i=0;i<data.length;i++){
				var $del = $("<a/>").addClass("btn btn-danger btn-xs pull-right remove_attachment")
				.append($("<span/>").addClass("glyphicon glyphicon-remove"))
				.attr("data-filename",data[i]['filename'])
				var $td = $("<td/>")
				var $tr = $("<tr/>").attr("data-filename",data[i]['filename'])
				$td.append(
					$("<a/>").text(data[i]['filename'])
					.attr("href",config['attachment_dir']+data[i]['filename'])
					.attr("target","_blank")
					)
				$td.append($del)
				$tr.append($td)
				$table.append($tr)
			}
			attachment_list_events_binding($table,data)
		})	
}
function attachment_list_events_binding($table,data){
	$table.find("a.remove_attachment").click(function(){
		var c = confirm("Are you sure to delete?")
		if(!c){
			return;
		}
		var filename = $(this).attr("data-filename") 
		$.getJSON(config['web_root']+"Home/Attachment/delete_attachment",
			{filename:filename},function(data){
			if(data.result==="ok"){
				$table.find("tr[data-filename='"+filename+"']").remove()
			}else{
				alert(data.info)
			}
		})
	})
}
function clear_draft(){
	$("#east-center table,#east-south table,#update_title").removeAttr("data-id")
	$("#east-center table,#east-south table").html('')
	$("#thumb").attr("src",'')
	$("#title").val('')
	$("#create_time,#last_save_time,#ptitle").text('')
	editor.setValue('')
}

function bind_file_upload_event($file_input,callback){
	var $progress_bar = $file_input.parent().siblings(".progress").find(".progress-bar")
	up = new uploader($file_input.get(0), {
		url:$file_input.attr("data-url"),
		autoUpload:true,
		before:function(){
			$progress_bar.css("width",'0')
			if(!$("#update_title").attr("data-id")){
				alert("Please select a draft.")
				return false
			}
			$progress_bar.text($file_input.val().split(/(\\|\/)/g).pop())
			return true;
		},
		get_data:function(){
			return {id:$("#update_title").attr("data-id")}
		},
		progress:function(ev){ 
			$progress_bar.css("width",Math.floor((ev.loaded/ev.total)*100)+'%')
		},
		error:function(ev){ alert(ev); },
		success:function(data){ 
			if(data['result']==='ok'){
				alert('Upload successfully!')
				if(callback){
					callback(data)
				}				
			}else{
				alert("Upload error:"+data['info'])
			}
		}
	});
}
function compile(mixed_content){
	var splited = mixed_content.split("---")
	var head = splited[1]
	var content = splited[2]
	var content_lines = content.split('\n')
	for(var i=0;i<content_lines.length;i++){
		var line = content_lines[i]
		if(line.indexOf('{%')!=-1&&line.indexOf('%}')!=-1&&line.indexOf('endhighlight')!=-1){
			content_lines[i] = "</code></pre></div>"
			continue;
		}
		if(line.indexOf('{%')!=-1&&line.indexOf('%}')!=-1&&line.indexOf('highlight')!=-1){
			var lang = line.split('highlight')[1].split('%}')[0].trim()
			content_lines[i] = "<div class='highlight'><pre><code class='"+lang+"'>"
			continue;
		}
	}
	var parsed_content = content_lines.join('\n').replace(/{{ site.images }}\//g,config['inset_dir'])
	var $div = $("<div/>").html(parsed_content)
	var $codes = $div.find(".highlight pre code")
	for(var i=0;i<$codes.length;i++){
		var $code = $($codes[i])
		var first = $code.text().substr(0,1)
		if(first === '\n'){
			$code.text($code.text().substr(1))
		}
	}
	var result = parse(mixed_content)
	return {parsed_content:$div.html(),title:result['title'],date:result['date'],tags:result['tags']}
}
$(function(){
	$("#go_previous,#go_next").click(function(){
		if($(this).hasClass("disabled")){
			return;
		}
		load_draft_list($(this).attr("data-page"),config['page_size'])
		return false;
	})
	$("#thumb").error(function(){
		$(this).attr("src",$(this).attr("data-holder"))
	})
	load_draft_list(1,10)
	editor = CodeMirror.fromTextArea(document.getElementById("content"), {
	    mode: 'markdown',
	    lineNumbers: true,
	    theme: "default",
	    lineWrapping: true,
	    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
	  });
	$("#update_title").click(function(){
		var id = $(this).attr("data-id")
		if(!id){
			return
		}
		$.getJSON(config["web_root"]+"Home/Draft/rename_draft",
			{id:id,new_title:$("#title").val()},
			function(data){
				if(data['result'] === 'ok'){
					alert("Rename draft ok")
					load_draft_list($("#current_page").text(),config['page_size'])
				}else{
					alert(data.info)
				}
			})
	})
	//test
	bind_file_upload_event($("#thumb_upload"),function(data){
		re_load_thumb(data.filename)
	})
	bind_file_upload_event($("#inset_upload"),function(data){
		load_images($("#update_title").attr("data-id"))
	})
	bind_file_upload_event($("#attachment_upload"),function(data){
		load_attachments($("#update_title").attr("data-id"))
	})
	$("#save-btn").click(function(){
		var id=$("#update_title").attr('data-id')
		if(!id){
			alert("Please select a draft")
			return false
		}
		$.post(config['web_root']+"Home/Draft/update_draft",{id:id,content:editor.getValue()},function(data){
			if(data['aff']===1){
				alert("Save draft ok.")
				load_draft(id)
			}else{
				alert(data['error'])
			}
		},'json')
		return false
	})
	var now = new Date()
	$("#new-title-input").val(
		now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
		+"-new-draft-title-here")
	$("#create_draft_btn").click(function(){
		$.getJSON(config['web_root']+"Home/Draft/create_draft",
			{title:$("#new-title-input").val()},
			function(data){
				if(data['aff']){
					clear_draft()
					load_draft_list(1,config['page_size'])
				}
			})
		return false;
	})
	$("#preview-btn").click(function(){
		var id=$("#update_title").attr('data-id')
		if(!id){
			alert("Please select a draft")
			return false
		}
		var mixed_content = editor.getValue();
		var converter = new Markdown.Converter();
		var result = compile(mixed_content)
		var html = converter.makeHtml(result['parsed_content']);
		console.log(html);
		console.log(result['date'])
		console.log(result['title'])
		console.log(JSON.stringify(result['tags']))
		return false;
	})
})