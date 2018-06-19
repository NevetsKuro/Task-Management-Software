$(window).ready(function(){
    var global=[];
    
    var p=GetURLParams();
    var id=p['id'];
    var legalstatus = p['legalstatus'];
    var T_legalstatus;
    if(legalstatus){
        switch(legalstatus){
            case '1':
            $("#individual").removeClass("hide");
            $(".company_common").addClass("hide");
            $("#org_details").addClass("hide");
            $(".individuals").removeClass("hide");
            T_legalstatus="individuals";
            break;

            case '2':
            $("#huf").removeClass("hide");
            $(".huf").removeClass("hide");
            
            T_legalstatus='hufs';
            break;

            case '3':
            $("#prop").removeClass("hide");
            $(".prop").removeClass("hide");
            T_legalstatus='proprietors';
            break;

            case '4':
            $("#partner").removeClass("hide");
            $(".partner").removeClass("hide");
            T_legalstatus='partnership-firms';
            break;

            case '5':
            $("#llp").removeClass("hide");
            $(".llp").removeClass("hide");
            T_legalstatus='llps';
            break;

            case '6':
            $("#company").removeClass("hide");
            $(".company").removeClass("hide");
            T_legalstatus='limited-companies';
            break;
            
            case '7': 
            $("#aop").removeClass("hide");
            $(".aop").removeClass("hide");
            T_legalstatus='aop-boi';
            break;

            case '8':
            $("#trust").removeClass("hide");
            $(".trust").removeClass("hide");
            T_legalstatus='trusts';
            break;
        }
    }
    
    $.ajax({
        url: urlRoot + 'common/form-data',
        type: 'GET',
        dataType:'JSON', //to parse string into JSON object,
        success: function(data){ 
            if(data){
                global2=data;
                global=data;
            }
        }
    });

    $.ajax({
        url:urlRoot + 'clients/'+T_legalstatus+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(data){

            data.commencement_date?$('#dateOfCom').html($.datepicker.formatDate("dd/mm/yy", new Date(data.commencement_date))):$('.doc').html('');
            data.gstin?$('#gstin').html(data.gstin):$('#gstin').html('None');
            data.pan_no?$('#panno').html(data.pan_no):$('#panno').html('None');
            data.prospect.name?$('#name').html(data.prospect.name):$('#name').html('None');
            data.prospect.address?$('#address').html(data.prospect.address):$('#address').html('None');
            data.prospect.email?$("#mail").html('#mail'):$("#mail").html('');
            
            if(T_legalstatus=='individuals'){
                $('#ind_name').html(data.prospect.title+' '+data.prospect.name);
                data.typeOfWork?$('#ind_tow').html(data.typeOfWork):$('#ind_tow').html('None');
                var dob=data.dob;
                if(dob!=null){
                    var splitDate = dob.split('-');
                    $('#dob').html(splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
                }
                data.aadhar_no?$('#ind_aadhar').html(data.aadhar_no):$('#ind_aadhar').html('None');
            }
            if(T_legalstatus=='hufs'){
                data.karta_name?$('#nok').html(data.karta_name):$('#nok').html(' ');
                data.commencement_date?$('.doc').html(data.commencement_date):$('.doc').html('None');
            }
            
            if(T_legalstatus!='individuals'){
                var org = data.prospect;
                $('#NameBusiness').html(org.name)
                org.industry_types.length?$('#industry_types').html(org.industry_types.join('')):$('#industry_types').html('None');
                org.business_types.length?$('#business_types').html(org.business_types.join('')):$('#business_types').html('None');
                org.business_natures.length?$('#business_natures').html(org.business_natures.join()):$('#business_natures').html('None');
                $('#website').html(org.website);
                var obj = org.branches.find(function(a){ return a.is_head_office == true});
                if(obj){
                    $('#bname').html(obj.name);
                    $('#baddress').html(obj.address);
                }
                $('#gstin').html(data.gstin);
                $('#tan').html(data.tan_no);
            }
            
            if(T_legalstatus=='proprietors'){
                $('#pro_ownerName').html(data.owner_name);
            }

            if(T_legalstatus=='partnership-firms'){//4
                var pars='';
                for (let i = 0; i < data.partners.length; i++) {
                    pars+='<tr>';
                    pars+='<td>'+i+'</td>';
                    pars+='<td>'+data.partners[i].name+'</td>';
                    pars+='<td>'+data.partners[i].share+'</td>';
                    pars+='</tr>';
                }
                $('#partn').html(pars);
                $('.deedDoc').html($.datepicker.formatDate("dd/mm/yy", new Date(data.partnership_deed_date)));
            }
            if(T_legalstatus=='limited-companies'){//6
                var dirs='';
                for (let i = 0; i < data.directors.length; i++) {
                    dirs+='<tr>'
                    dirs+='<td>'+i +'</td>';
                    dirs+='<td>'+data.directors[i].name +'</td>';
                    dirs+='<td>'+data.directors[i].din +'</td>';
                    dirs+='</tr>';
                }
                $('#directors').html(dirs);
                $('#listed').html(data.stock_exchange_name);
                $('#company_doi').html($.datepicker.formatDate("dd/mm/yy", new Date(data.commencement_date)));
                $('#cin').html(data.cin);
                $('#type_company').html(data.company_type);
            }
            if(T_legalstatus=='llps'){//5
                var dpars='';
                for (let i = 1; i < data.designated_partners.length+1; i++) {
                    dpars+='<tr>'
                    dpars+='<td>'+i +'</td>';
                    dpars+='<td>'+data.designated_partners[i].name +'</td>';
                    dpars+='<td>'+data.designated_partners[i].din +'</td>';
                    dpars+='</tr>';
                }
                $('#desigp').html(dpars);
                if(data.other_partners.length){
                    $('#dPars').html($.map(data.other_partners,(a)=>a.name).join(','));
                }
                $('#pars_doi').html($.datepicker.formatDate("dd/mm/yy", new Date(data.commencement_date)));
                $('#llpin').html(data.llpin);
            }
            if(T_legalstatus=='trusts'){//8
                if(data.trustee.length){
                    $('#tnot').html($.map(data.trustee,(a)=>a.name).join(','));
                }
            }
            if(T_legalstatus=='aop-boi'){
                $('#reg').html(data.registration_no);
                if(data.members){
                    $('#members').html($.map(data.members,(a)=>a.name).join(','));
                }
            }

            var managers = data.managers;
            if(managers.length){
                var mans='';
                for (let i = 0; i < managers.length; i++) {
                    mans+=`<tr>
                    <td>${i+1}</td>
                    <td>${managers[i].service}</td>
                    <td>${managers[i].manager}</td>
                    <td>${managers[i].role}</td>
                    </tr>`;
                }
                $('#M_body').html(mans);
            }else{
                $('#M_body').html('<center><b>No Records Found</b></center>');
            }

            var pocs = data.pocs;
            if(pocs.length){
                var poc='';
                // var contacts = pocs.map((a)=>a.contact)

                for (let i = 0; i < pocs.length; i++) {
                    
                    $.ajax({
                        async:false,
                        url:urlRoot+'contacts/'+pocs[i].contact+'/',
                        type:'GET',
                        dataType:'JSON',
                        success:function(poca){
                            var a;
                            if(poca.phone_numbers.length){
                                a = poca.phone_numbers.find((a)=> a.is_primary==true).number;
                            }
                            var b;
                            if(poca.email_addresses.length){
                                b = poca.email_addresses.find((a)=>a.is_primary==true).email;
                            }
                            
                            poc+=`<tr>
                            <td>${i+1}</td>
                            <td>${poca.name}</td>
                            <td>${a?a:'Not mentioned'}</td>
                            <td>${b?b:'Not mentioned'}</td>
                            <td>${poca.contact_orga1nisation?poca.contact_orga1nisation.designation:'Not mentioned'}</td>
                            <td>${pocs[i].relation?pocs[i].relation:'Not mentioned'}</td>
                            <td>${pocs[i].purpose?pocs[i].purpose:'Not mentioned'}</td>
                            </tr>`;
                        },
                        error:function(error){
                            console.log(error.responseText);
                        }
                    });
                }
                $('#P_C_body').html(poc);
            }

            if(legalstatus=="1"){
                $('#tab2 > table > thead > tr > th:nth-child(6)').hide();
                $('#tab2 > table > tbody > tr > td:nth-child(6)').hide();
                $('#tab2 > table > thead > tr > th:nth-child(7)').hide();
                $('#tab2 > table > tbody > tr > td:nth-child(7)').hide();
            }else if(legalstatus!="1"){
                $('#tab2 > table > thead > tr > th:nth-child(5)').hide();
                $('#tab2 > table > tbody > tr > td:nth-child(5)').hide();
            }

            var statdocs = data.statdocs;
            if(statdocs.length){
                var stats='';
                for (let i = 0; i < statdocs.length; i++) {
                    stats+=`<tr>
                    <td>${i+1}</td>
                    <td>${statdocs[i].name}</td>
                    <td>${statdocs[i].number}</td>
                    <td>${statdocs[i].issuing_authority}</td>
                    <td>${statdocs[i].valid_from}</td>
                    <td>${statdocs[i].valid_till}</td>
                    <td>${statdocs[i].applicable_law}</td>
                    <td>${statdocs[i].document_type}</td>
                    </tr>`;
                }
                $('#Stats_body').html(stats);
            }else{
                $('#Stats_body').html('<center><b>No Records Found</b></center>');
            }
        }
    });
});