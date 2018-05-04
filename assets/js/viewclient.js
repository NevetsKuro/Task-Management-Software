$(window).ready(function(){
    var global=[];
    var dat = $("#poctable").DataTable({
        columnDefs:[
            {
                "targets": [3],
                "visible": true,
            },
            {
                "targets": [4],
                "visible": false,
            },
            {
                "targets": [5],
                "visible": false,
            }
        ]
    });
    var p=GetURLParams();
    var leg=p['legalstats'];
    console.log(leg);
    var id=p['id'];
    var legalstatus="",data="",datag="",data2="",datatb="";
    if(leg){
        switch(leg){
            case '1':
            $("#gstdrop").addClass("hide");
            $("#individual").removeClass("hide");
            $("#branc").addClass("hide");
            $("#deso").addClass("hide");
            // $('.pocdesig').addClass("hide");
            // $('.pocpurpose').addClass("hide");
            dat.column(3).visible(true);
            dat.column(4).visible(false);
            dat.column(5).visible(false);
            legalstatus="individuals";
            break;

            case '2':
            $("#huf").removeClass("hide");
            // $('.pocreln').addClass("hide");
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='hufs';
            break;

            case '3':
            $("#prop").removeClass("hide");
            // $('.pocreln').addClass("hide");
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='proprietors';
            break;
            case '4':
            $("#partner").removeClass("hide");
            // $('.pocreln').addClass("hide");
            // $("#parttable").DataTable();
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='partnership-firms';
            break;

            case '5':
            $("#llp").removeClass("hide");
            // $('.pocreln').addClass("hide");
            // $('#llptable').DataTable();
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='limited-companies';
            break;

            case '6':
            $("#company").removeClass("hide");
            // $('.pocreln').addClass("hide");
            // $("#cmptable").DataTable();
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='llps';
            break;
            
            case '7': 
            $("#aop").removeClass("hide");
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='aop-boi';
            break;

            case '8':
            $("#trust").removeClass("hide");
            // $('.pocreln').addClass("hide");
            dat.column(3).visible(false);
            dat.column(4).visible(true);
            dat.column(5).visible(true);
            legalstatus='trusts';
            break;
        }
    }

    $.ajax({
        url: urlRoot + 'contacts/form-data',
        type: 'GET',
        dataType:'JSON', //to parse string into JSON object,
        success: function(datag){ 
            if(datag){
                global=datag;
            }
        }
    });

    $.ajax({
        url: urlRoot + 'clients/form-data',
        type: 'GET',
        dataType:'JSON', //to parse string into JSON object,
        success: function(data){ 
            if(data){
                global2=data;
            }
        }
    });

    $.ajax({
        url:urlRoot + 'clients/'+legalstatus+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#pan').html(data.pan_no);
            $('#indadhar').html(data.aadhar_no);
            $('.doc').html($.datepicker.formatDate("dd/mm/yy", new Date(data.commencement_date)));
            
            
            var cons=""
            cons=data.pocs;
            if(legalstatus=='partnership-firms'){
                var pars='';
                for (let i = 0; i < data.partners.length; i++) {
                    pars+= '<tr>';
                    pars+='<td>'+i+'</td>';
                    pars+='<td>'+data.partners[i].name+'</td>';
                    pars+='<td>'+data.partners[i].share+'</td>';
                    pars+='</tr>';
                }
                $('#partn').html(pars);
                $('.deedDoc').html($.datepicker.formatDate("dd/mm/yy", new Date(data.partnership_deed_date)));
            }
            if(legalstatus=='limited-companies'){
                var dirs='';
                for (let i = 0; i < data.directors.length; i++) {
                    dirs+='<tr>'
                    dirs+='<td>'+i +'</td>';
                    dirs+='<td>'+data.directors[i].name +'</td>';
                    dirs+='<td>'+data.directors[i].din +'</td>';
                    dirs+='</tr>';
                }
                $('#directors').html(dirs);
            }
            if(legalstatus=='llps'){
                var dpars='';
                for (let i = 0; i < data.designated_partners.length; i++) {
                    dpars+='<tr>'
                    dpars+='<td>'+i +'</td>';
                    dpars+='<td>'+data.designated_partners[i].name +'</td>';
                    dpars+='<td>'+data.designated_partners[i].din +'</td>';
                    dpars+='</tr>';
                }
                $('#desigp').html(dpars);
                var parss='';
                for (let i = 0; i < data.other_partners.length; i++) {
                    parss += data.other_partners[i].name;
                }
                $('#dPars').html(parss);
            }
            if(legalstatus=='trusts'){
                var trustee='';
                for (let i = 0; i < data.trustee.length; i++) {
                    trustee+=data.trustee[i].name;
                }
                $('#tnot').html(trustee);
            }
            
            // var relation, purpose;
            for(var i=0;i<data.pocs.length;i++){
                // if(legalstatus === 'individuals'){
                //     var relationid = data.pocs[i].relation;
                //     relation = global2.relation.find(function(rel){
                //         return rel.id == relationid;
                //     }).relation;
                // }else{
                //     purpose = data.pocs[i].purpose;
                // }
                // var relation = '';
                var purpose = '';
                if(data.pocs[i].is_primary==true){
                    $.ajax({
                        url:urlRoot + 'contacts/display/' + data.pocs[i].contact,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data2){
                            $('#name').html(data2.name);
                            var dob=data2.dob;
                            var splitDate = dob.split('-');
                            $('.dob').html(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
                            $('#address').html(data2.address);
                            var phones=data2.phone_numbers;
                            var mails=data2.email_addresses;
                            for(var i=0;i<phones.length;i++){
                                if(phones[i].is_primary===true){
                                    $("#phone").html(phones[i].number);
                                }
                            }
                            for(var i=0;i<mails.length;i++){
                                if(mails[i].is_primary===true){
                                    $("#mail").html(mails[i].email);
                                }
                            }
                            if(contact_organisation){
                                $('#group').html(data2.contact_organisation.organisation.group);
                                $('#website').html(data2.contact_organisation.organisation.website);
                                $('#website').attr("href",data2.contact_organisation.organisation.website);
                                var org = data2.contact_organisation.organisation;
                                var branchid = data2.contact_organisation.branch;
                                var brans = org.branches.find(function(branch){return branch.id === branchid;});
                                $('#branchname').html(brans.name);
                                $('#baddress').html(brans.address);
                                $('#bgst').html(brans.gstin);
                            }
                        },
                        error:function(error){
                            console.log(error.responseText);
                        }
                    });
                }
                else if(data.pocs[i].is_primary==false){
                    $.ajax({
                        url: urlRoot + 'contacts/display/'+data.pocs[i].contact,
                        type: 'GET',
                        dataType: 'JSON',
                        success: function(datatb){
                            var dname=datatb.name;
                            var phon="",mal="";
                            for(var j=0;j<datatb.phone_numbers.length;j++){
                                if(datatb.phone_numbers[j].is_primary===true)
                                    phon=datatb.phone_numbers[j].number;      
                            }
                            for(var k=0;k<datatb.email_addresses.length;k++){
                                if(datatb.email_addresses[k].is_primary===true)
                                   mal=datatb.email_addresses[k].email;      
                            }
                            
                            if(legalstatus=="individuals"){
                                var designation='';
                                var relationid = data.pocs[i].relation;
                                var relation = global2.relation.find(function(rel){
                                    return rel.id == relationid;
                                }).relation;
                                var purpose='';
                                dat.row.add([
                                    datatb.name,
                                    phon,
                                    mal,
                                    relation,
                                    designation,
                                    purpose
                                ]).draw(false);
                            }
                            else{
                                if(datatb.contact_organisation){
                                    var design = global.designations.find(function(des){
                                        return des.id===datatb.contact_organisation.designation
                                        }).designation;
                                }
                                dat.row.add([
                                    datatb.name,
                                    phon,
                                    mal,
                                    relation,
                                    design,
                                    purpose
                                ]).draw(false);
                            }
                        },
                        error:function(error){
                            console.log(error.responseText);
                        }
                    });
                }
            }
        }
    });
});