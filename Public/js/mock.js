$.mockjax({
  url: config['web_root']+"Home/Draft/list_drafts",
  data:{page_num:1,page_size:10},
  responseTime: 750,
  responseText: {
    total: 30,
    current: 1,
    drafts: [
    	{id:1,title:"draft 1",content:"",create_time:"",last_save_time:""},
    	{id:2,title:"draft 2",content:"",create_time:"",last_save_time:""},
    	{id:3,title:"draft 3",content:"",create_time:"",last_save_time:""},
    	{id:4,title:"draft 4",content:"",create_time:"",last_save_time:""},
    	{id:5,title:"draft 5",content:"",create_time:"",last_save_time:""},
    	{id:6,title:"draft 6",content:"",create_time:"",last_save_time:""},
    	{id:7,title:"draft 7",content:"",create_time:"",last_save_time:""},
    	{id:8,title:"draft 8",content:"",create_time:"",last_save_time:""},
    	{id:9,title:"draft 9",content:"",create_time:"",last_save_time:""},
    	{id:10,title:"draft 10",content:"",create_time:"",last_save_time:""},
    ]
  }
});

$.mockjax({
  url: config['web_root']+"Home/Draft/list_drafts",
  data:{page_num:2,page_size:10},
  responseTime: 750,
  responseText: {
    total: 30,
    current: 2,
    drafts: [
    	{id:11,title:"draft 11",content:"",create_time:"",last_save_time:""},
    	{id:12,title:"draft 12",content:"",create_time:"",last_save_time:""},
    	{id:13,title:"draft 13",content:"",create_time:"",last_save_time:""},
    	{id:14,title:"draft 14",content:"",create_time:"",last_save_time:""},
    	{id:15,title:"draft 15",content:"",create_time:"",last_save_time:""},
    	{id:16,title:"draft 16",content:"",create_time:"",last_save_time:""},
    	{id:17,title:"draft 17",content:"",create_time:"",last_save_time:""},
    	{id:18,title:"draft 18",content:"",create_time:"",last_save_time:""},
    	{id:19,title:"draft 19",content:"",create_time:"",last_save_time:""},
    	{id:20,title:"draft 20",content:"",create_time:"",last_save_time:""},
    ]
  }
});

$.mockjax({
  url: config['web_root']+"Home/Draft/list_drafts",
  data:{page_num:3,page_size:10},
  responseTime: 750,
  responseText: {
    total: 30,
    current: 3,
    drafts: [
      {id:21,title:"draft 21",content:"",create_time:"",last_save_time:""},
      {id:22,title:"draft 22",content:"",create_time:"",last_save_time:""},
      {id:23,title:"draft 23",content:"",create_time:"",last_save_time:""},
      {id:24,title:"draft 24",content:"",create_time:"",last_save_time:""},
      {id:25,title:"draft 25",content:"",create_time:"",last_save_time:""},
      {id:26,title:"draft 26",content:"",create_time:"",last_save_time:""},
      {id:27,title:"draft 27",content:"",create_time:"",last_save_time:""},
      {id:28,title:"draft 28",content:"",create_time:"",last_save_time:""},
      {id:29,title:"draft 29",content:"",create_time:"",last_save_time:""},
      {id:30,title:"draft 30",content:"",create_time:"",last_save_time:""},
    ]
  }
});
$.get(config['public']+"2013-10-03-openstack-startup-guide-with-ubuntu.markdown",function(data){
  $.mockjax({
    url: config['web_root']+"Home/Draft/load_draft",
    responseTime: 750,
    responseText: {
      id:1,
      title:"2013-10-03-openstack-startup-guide-with-ubuntu",
      content:data,
      create_time:"2013-10-1 20:08:55",
      last_save_time:"2014-1-24 20:07:38"    
    }
  });
})


$.mockjax({
  url: config['web_root']+"Home/Draft/delete_draft",
  data: {id:5},
  responseTime: 750,
  responseText: {
    result:"error",
    info:"Draft with id "+5+" not exists"
  }
});
$.mockjax({
  url: config['web_root']+"Home/Draft/delete_draft",
  responseTime: 750,
  responseText: {
    result:"ok"
  }
});
$.mockjax({
  url: config['web_root']+"Home/Image/list_images",
  responseTime: 750,
  responseText: [
    {filename:'openstack-logo.jpg'},
    {filename:'openstack-nova-image-list.png'}
  ]
});
$.mockjax({
  url: config['web_root']+"Home/Attachment/list_attachments",
  responseTime: 750,
  responseText: [
    {filename:'test_document.zip'}
  ]
});
$.mockjax({
  url: config['web_root']+"Home/Image/delete_image",
  data:{filename:'openstack-logo.jpg'},
  responseTime: 750,
  responseText: {
    result:'ok'
  }
});
$.mockjax({
  url: config['web_root']+"Home/Image/delete_image",
  data:{filename:'openstack-nova-image-list.png'},
  responseTime: 750,
  responseText: {
    result:'error',
    info:'No such image'
  }
});
$.mockjax({
  url: config['web_root']+"Home/Attachment/delete_attachment",
  responseTime: 750,
  responseText: {
    result:'ok'
  }
});
$.mockjax({
  url: config['web_root']+"Home/Draft/rename_draft",
  responseTime: 750,
  responseText: {
    result:'ok'
  }
});