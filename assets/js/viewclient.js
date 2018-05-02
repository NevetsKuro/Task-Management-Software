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
        url:urlRoot + 'clients/'+legalstatus+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#pan').html(data.pan_no);
            $('#indadhar').html(data.aadhar_no);
            var cons=""
            cons=data.pocs;
            for(var i=0;i<data.pocs.length;i++){
                if(data.pocs[i].is_primary===true){
                    $.ajax({
                        url:urlRoot + 'contacts/display/' + data.pocs[i].contact,
                        type: 'GET',
                        dataType: 'json',
                        success: function(data2){
                            $('#name').html(data2.name);
                            $('#group').html(data2.contact_organisation.organisation.group);
                            $('#website').html(data2.contact_organisation.organisation.website);
                            $('#website').attr("href",data2.contact_organisation.organisation.website);
                            var dob=data2.dob;
                            var splitDate = dob.split('-');
                            $('#indob').html(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);
                            $('#address').html(data2.address);
                            var phones=data2.phone_numbers;
                            var mails=data2.email_addresses;
                            for(var i=0;i<phones.length;i++){
                                if(phones[i].is_primary===true)
                                    $("#phone").html(phones[i].number);      
                            }
                            for(var i=0;i<mails.length;i++){
                                if(mails[i].is_primary===true)
                                    $("#mail").html(mails[i].email);      
                            }
                        }
                    });
                }
                else{
                    $.ajax({
                        url: urlRoot + 'contacts/display/'+data.pocs[i].contact,
                        type: 'GET',
                        dataType: 'json',
                        success: function(datatb){
                            var dname=datatb.name;
                            var Purpose="Purpose";
                            var phon="",mal="";
                            for(var j=0;j<datatb.phone_numbers.length;j++){
                                if(datatb.phone_numbers[j].is_primary===true)
                                    phon=datatb.phone_numbers[j].number;      
                            }
                            for(var k=0;k<datatb.email_addresses.length;k++){
                                if(datatb.email_addresses[k].is_primary===true)
                                   mal=datatb.email_addresses[k].email;      
                            }
                            var relation="Friend";
                            if(legalstatus=="individuals"){
                                var purpose=null;
                                var designation=null;
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
                                var relation=null;
                                dat.row.add([
                                    datatb.name,
                                    phon,
                                    mal,
                                    relation,
                                    global.designations.find(function(des){
                                        return des.id===datatb.contact_organisation.designation
                                        }).designation,
                                    purpose
                                ]).draw(false);
                            }
                        }
                    });
                }
            }
        }
    });
});