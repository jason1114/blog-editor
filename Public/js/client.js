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
			return;
		}
		var id = $(this).attr("data-id") 
		$.getJSON(config['web_root']+"Home/Draft/delete_draft",
			{id:id},function(data){
			if(data.result==="ok"){
				$table.find("tr[data-id="+id+"]").remove()
			}else{
				alert(data.info)
			}
		})
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
		re_load_thumb(get_thumb_name(data.title))
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
	$("#thumb").attr("src",config['thumb_dir']+title+".jpg")
}
function parse(content){
	var head = content.split("---")[1]
	var lines = head.split("\n")
	var result = {}
	for(var i=0;i<lines.length;i++){
		var titleIdx = lines[i].indexOf("title:")
		if(titleIdx>=0){
			result['title'] = lines[i].substring(titleIdx+6).trim()
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
			return {id:$("update_title").attr("data-id")}
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
				alert("Upload error:"+data['error'])
			}
		}
	});
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
	bind_file_upload_event($("#inset_upload"),function(){

	})
	bind_file_upload_event($("#attachment_upload"),function(){

	})
	
})