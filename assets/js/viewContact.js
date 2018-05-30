
$(document).ready(function(){
    var desig="",title=""; 
    var urlparams=GetURLParams();
    var id=urlparams['contact'];
    var global="";

    $(document).on('click','.delete', function () {
        var id = $(this).attr('id');
        if(confirm("Are you sure you want to delete this?")){
            $.ajax({
                async:false,
                url: urlRoot + 'contacts/' + id + '/',
                type: 'DELETE',
                datatype: 'JSON',
                success: function () {
                    window.location.href="contactlist.html";
                },
                error: function(error){
                    swal({
                        title: "Action Denied",
                        text: "This record cannot be deleted beacuse it is linked to client",
                        icon:"warning",
                    });
                }
            });
        }
    });

    $.ajax({
        url: urlRoot + 'common/form-data',
        type: 'GET',
        dataType:'JSON', 
        success: function(data){ 
            if(data){
            global=data;
            }
        }
    });
    $.ajax({
        url: urlRoot + 'contacts/display/' + id,
        type: 'GET',
        dataType:'JSON', //to parse string into JSON object,
        success: function(data){ 
            if(data){
                var mails=data.email_addresses;
                var phones=data.phone_numbers;
                $("#btncnv1").attr("href","AddClient.html?contact="+id);
                $("#btndef1").attr("href","AddContact.html?contact="+id);
                $(".delete").attr("id",id);
                $("#title").html(data.title)
                $("#name").html(data.name);

                for(var i=0;i<phones.length;i++){
                    if(phones[i].is_primary===true)
                        $("#pphone").html(phones[i].number);      
                }

                for(var i=0;i<mails.length;i++){
                    if(mails[i].is_primary===true)
                        $("#pemail").html(mails[i].email);      
                }

                var mails=data.email_addresses;
                var phones=data.phone_numbers;
                var txt="",txt2="";
                for(var i=0;i<mails.length;i++){
                    $("#omail").html("<ol type=\"1\">"); 
                    if(mails[i].is_primary===false)
                        txt+="<li>"+mails[i].email+"</li>";
                    $("#omail").append(txt?txt:'NONE MENTIONED');
                    $("#omail").append("</ol>");
                    $("#omail").children().css('list-style-type','none');
                }
                for(var i=0;i<phones.length;i++){
                    $("#ophone").html("<ol type=\"1\">"); 
                    if(phones[i].is_primary===false)
                        txt2+="<li>"+phones[i].number+"</li>";
                    
                    $("#ophone").append(txt2?txt2:'NONE MENTIONED');
                    $("#ophone").append("</ol>"); 
                    $("#ophone").children().css('list-style-type','none');
                }
                
                if(data.address!="")
                    $("#address").html(data.address.split('_').join(', '));
                
                $("#dob").html(data.dob);
                
                $("#gender").html(data.gender);
                
                
                
                if((website=data.contact_organisation.organisation.website)!=""){

                    $("#organisation").html(data.contact_organisation.organisation.name);
                    $("#group").html(data.contact_organisation.organisation.group);
                    branchid=data.contact_organisation.branch;
                    $("#addorg").html(data.contact_organisation.organisation.branches.find(function(branch){
                        return branch.id === branchid;}).address);
                    $("#branch").html(data.contact_organisation.organisation.branches.find(function(branch){
                        return branch.id === branchid;}).name);
                    $("#desig").html(global.designations.find(function(desig){
                        return desig.id === data.contact_organisation.designation;}).designation);
                    $("#weblink").html(website);
                    $("#weblink").attr("href",website);
                }

                if(data.contact_organisation){
                    $("#industrytpe").html(data.contact_organisation.organisation.industry_types[0]);
                    $("#businesstype").html(data.contact_organisation.organisation.business_types[0]);
                    $("#businessnature").html(data.contact_organisation.organisation.business_natures[0]);
                }
                if(data.lead){
                    $("#source").html(data.lead.source);
                    $("#reference").html(data.lead.reference);
                    $("#status").html(data.lead.status);
                    $("#priority").html(data.lead.priority);
                    $("#potent").html(data.lead.potential_services);
                    $("#originator").html(data.lead.originators);
                    $("#assignee").html(data.lead.assignees);
                    $("#notes").html(data.lead.notes);
                }
            }

        }
    });
 });
 