
  $(document).ready(function(){


    window.urlRoot = 'http://35.202.86.61/office-management/';

            var currDate = new Date().getFullYear();

            window.datetime = function(){
                $(".dobdatepickr").datepicker({
                    changeMonth:true,
                    changeYear:true,
                    yearRange: "1850:"+currDate,
                    dateFormat:'dd/mm/yy',
                    autoclose: true
                });
                
                $(".datepickr").datepicker({
                    changeMonth:true,
                    changeYear:true,
                    yearRange: "1850:3000",
                    dateFormat:'dd/mm/yy',
                    autoclose: true
                });

                $('input.timepicker').timepicker({
                    dropdown:false,
                    dynamic:true
                });
            }
            datetime();        
            window.inputChanges = function(){
                var $form = $('#addContact_form'),
                origForm = $form.serialize();
                var UpdateCont = [];
                $(document).on('change input','form :input', function() {
                    console.log($form.serialize() !== origForm);
                    
                    UpdateCont.push($(this));
                });
                    return UpdateCont;
            }

            // window.inputChanges = function(){
            //     var $form = $('#addContact_form'), origForm = $form.serializeArray();
            //     return origForm;
            // }


            // window.UpdateCont = [];
            // $(document).on('change input','form :input', function() {
            //     UpdateCont.push($(this));
            // });
               
           //Submit button
        //    var $form = $('#addContact_form'),
        //     if($form.serialize() !== origForm))           
                //Send Put request


            //Validators for form
            $(document).on('change',".llpin_valid", function(){
                var inputvalues = $(this).val();
                var llpinformat = new RegExp('^[A-Z]{3}[0-9]{4}$');
                
                if (llpinformat.test(inputvalues)) {
                return true;
                } else {
                    swal('Wrong Format','Please Enter Valid LLPIN Number','error');
                    $(this).val('');
                    $(this).focus();
                }
                
            });

        $(document).on('change',".cin_valid", function(){    
            var inputvalues = $(this).val();
            var cinformat = new RegExp('^[A-Z]{1}[0-9]{5}[A_Z]{2}[0-9]{4}[A_Z]{3}[0-9]{6}$');
            
            if (cinformat.test(inputvalues)) {
            return true;
            } else {
                swal('Wrong Format','Please Enter Valid CIN Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });

        $(document).on('change',".din_valid", function(){    
            var inputvalues = $(this).val();
            var dinformat = new RegExp('^[0-9]{8}$');
            
            if (dinformat.test(inputvalues)) {
            return true;
            } else {
                swal('Wrong Format','Please Enter Valid DIN Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });

        /*
        $(document).on('change',".aadhar_valid", function(){    
            var inputvalues = $(this).val();
            var aadharformat = new RegExp('^[0-9]{16}$');
            
            if (aadharformat.test(inputvalues)) {
            return true;
            } else {
                swal('Wrong format','Please Enter Valid Aadhar Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });
        */

        $(document).on('change',".pannumber_valid", function(){    
            var inputvalues = $(this).val();
            var pannumber = new RegExp('^[A-Z]{5}[0-9]{4}[A-Z]{1}$');
            
            if (pannumber.test(inputvalues)) {
            return true;
            } else {
                swal('Wrong format','Please Enter Valid PAN/TAN Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });

        $(document).on('change',".gstinnumber", function(){    
            var inputvalues = $(this).val();
            var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}[A-Z]{1}[1-9]{1}$');
            
            if (gstinformat.test(inputvalues)) {
                return true;
            } else {
                swal('Wrong format','Please Enter Valid GSTIN Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });

        $(document).on('change',".contactnumber_valid", function(){    
            var inputvalues = $(this).val();
            var phoneformat = new RegExp('^[0-9]{10}$');
            
            if (phoneformat.test(inputvalues)||inputvalues == "") {
            return true;
            } else {
                swal('Wrong format','Please Enter Valid Phone Number','error');
                $(this).val('');
                $(this).focus();
            }
            
        });

        $(document).on('change',".email_valid", function(){
            var email = $(this).val();
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(String(email).toLowerCase())||email == "") {
                return true;
            } else {
                swal('Wrong format','Please Enter Valid Email Id','error');
                $(this).val('');
                $(this).focus();
            }
        });

        // $(document).on('change',".email_valid", function(){
        //     var email = $(this).val();
        //     var re = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');

        //     if (re.test(String(email).toLowerCase())) {
        //     return true;
        //     } else {
        //         swal('Wrong format','Please Enter Valid Email Id','error');
        //         $(this).val('');
        //         $(this).focus();
        //     }
        // });

        $(document).on('change',".website_valid", function(){
            var website = $(this).val();
            var reg = new RegExp('^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]){3,}(\.){1}[a-z]{2,4}');

            if (reg.test(String(website).toLowerCase())||website == "") {
            return true;
            } else {
                swal('Wrong format','Please Enter Valid Url','error');
                $(this).val('');
                $(this).focus();
            }
        });

        $(document).on('focus', 'form :input:not(select)' ,function(){
            $('html, body').animate({
                scrollTop : $(this).offset().top - 180
            },
            'slow');
            // console.log($(this).offset().top);
        });

        window.editSelect = function(){
            $(".editselect").select2({
            tags: true,
            createTag: function (params) {
                return {
                id: params.term,
                text: params.term,
                newOption: true
                }
            },
            templateResult: function (data) {
                var $result = $("<span></span>");

                $result.text(data.text);

                if (data.newOption) {
                $result.append(" <em>(add new)</em>");
                }

                return $result;
            }
            });
            $(document).on('select2:select','.editselect', function (e) {
                var data = e.params.data;
                console.log(data);
            });
        }
            editSelect();


        window.GetURLParams = function(){
            var urlParams;
            var groupdata = {};
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query = window.location.search.substring(1);

            urlParams = {};
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);

            return urlParams;
        }

        window.breakName = function(name){
            var ns = name.split(' ');
            var rtn = new Object();
            rtn.firstName = ns[0];
            if(ns.length>2)
            {
                rtn.middleName = ns[1];
            }
            else
            {
                rtn.middleName = '';
            
            }
            rtn.lastName = ns[ns.length-1];

            return rtn;
        }

        window.breakAddress = function (address) {
            var addr = address.split('_');
            var rtn = new Object();
            rtn.StreetAddress = addr[0];
            rtn.City = addr[1];
            rtn.Pincode = addr[2];
            rtn.State = addr[3];

            return rtn;
        }

        window.PopulateStates = function (parent) {
            //Populate States
            $(parent).append('<option value="Maharashtra">Maharashtra</option>');
            $(parent).append('<option value="Gujarat">Gujarat</option>');
            $(parent).append('<option value="Rajasthan">Rajasthan</option>');

        }
        
    
       window.getContactRow = function (){
        contactArr=[]
        $('#contact-row .new').each(function(index){
            countryCode = '+91';
            contact = new Object(); 
            contact['category'] = $(this).find('.contactnumber_category').val();
            contact['number'] = countryCode + $(this).find('.addContact_contactNumbers').val();
            contact['is_primary'] = $(this).find('.cn_is_primary').is(':checked');
            contactArr.push(contact);
        });
            return contactArr;
        }
    
        window.getEmailRow=function(){
            var emailArr=[];
        $('#email-row .new').each(function(index) {
            email = new Object();
            email['category'] = $(this).find('.email_category').val();
            email['email'] = $(this).find('.addContact_emailIds').val();
            email['is_primary'] = $(this).find('.ea_is_primary').is(':checked');
            emailArr.push(email);
        });
        return emailArr;
        }
    
        window.getWebsiteRow=function(){
            var websiteArr=[];
        $('#website-row .new').each(function(index){
            websiteCategorySelected = $(this).find('.socialmedia_category').val();
            website = new Object();
            website['social_media'] = websiteCategorySelected;
            var webs = $(this).find('.social_media_link').val();
            if (webs.indexOf('http://') > -1 || webs.indexOf('https://') > -1) {
                    webs = webs;
                } else {
                    webs = "http://" + webs;
                }
            website['link'] = webs;
            websiteArr.push(website);
        });
        return websiteArr;
        }
    
        window.getHoaddressRow=function(){
            var branchesHead=[];
        $('#hoaddress-row .new').each(function( index ) {
            branches = new Object();
            console.log(index + ' has been selected : ' + ($(this).find('.hoaddress_from').is(":checked")==true?true:false));
            var bid = $(this).attr("bid");
            if(bid != "null"){ 
                branches['id'] = bid;
             }
            branches['name'] = $(this).find('.hoBranchName').val();            
            branches['address'] = $(this).find('.hoaddresses').val();           
            branches['is_head_office'] = $(this).find('.hoaddress_isHO').is(':checked');
            branchesHead.push(branches);
        });
        return branchesHead;
        }

        window.getFormateDateToServer=function(dt){
            var splitDate = dt.split('/');
            return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
        }

        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        window.csrftoken = getCookie('csrftoken');
});



    
