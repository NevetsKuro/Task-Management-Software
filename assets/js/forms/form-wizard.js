/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/forms.js;

*/


"use strict";


$(document).ready(function() {

    var $validator1 = $("#frmHorizontalWizard").validate({
        rules: {
            fullname: {
                required: true
            },
		    email: {
                required: true,
                email: true
		    },
		    password: {
                required: true
		    },
		    confirm_password: {
                required: true,
                equalTo: '#frmHorizontalWizard #password'
		    },
		    first_name: {
                required: true
		    },
		    last_name: {
                required: true
		    },
		    age: {
                required: true
            },
		    card_number: {
                required: true,
                number: true
		    },
		    security_code: {
                required: true,
                number: true
		    },
		    card_holders_name: {
                required: true
            },
		    expiration: {
                required: true,
                date: true
            },
		    csv: {
                required: true,
                number: true
            }
        }
    });

    var $validator2 = $("#frmVerticalWizard").validate({
        rules: {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
            confirm_password: {
                required: true,
                equalTo: '#frmVerticalWizard #password'
            },
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            age: {
                required: true
            },
            card_number: {
                required: true,
                number: true
            },
            security_code: {
                required: true,
                number: true
            },
            card_holders_name: {
                required: true
            },
            expiration: {
                required: true,
                date: true
            },
            csv: {
                required: true,
                number: true
            }
        }
    });
 
    $('#horizontal-wizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs',
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#horizontal-wizard').find('.progress-bar').css({width:$percent+'%'});
        },
        'onNext': function(tab, navigation, index) {
            var $valid = $("#frmHorizontalWizard").valid();
            if(!$valid) {
                $validator1.focusInvalid();
                return false;
            }
        },
        'onTabClick': function(tab, navigation, index) {
            var $valid = $("#frmHorizontalWizard").valid();
            if(!$valid) {
                $validator1.focusInvalid();
                return false;
            }
        },
    });

   $('#vertical-wizard').bootstrapWizard({
        'tabClass': 'nav nav-tabs',
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#vertical-wizard').find('.progress-bar').css({width:$percent+'%'});
        },
        'onNext': function(tab, navigation, index) {
            var $valid = $("#frmVerticalWizard").valid();
            if(!$valid) {
                $validator2.focusInvalid();
                return false;
            }
        },
        'onTabClick': function(tab, navigation, index) {
            var $valid = $("#frmVerticalWizard").valid();
            if(!$valid) {
                $validator2.focusInvalid();
                return false;
            }
        },
    });

});