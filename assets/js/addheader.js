
$(document).ready(function(){
var h='';



h+= '<div class="header-wrapper">' ;

h+= '    <div class="header-left">' ;
h+= '        <div class="app-logo">' ;
h+= '            <p class="toggle-sidebar"><span class="fa fa-arrow-left left"></span></p>' ;
h+= '        </div>' ;
h+= '        <div class="app-name">' ;
h+= '            Calibre Admin' ;
h+= '        </div>' ;
h+= '    </div>' ;

h+= '    <div class="header-right">' ;

h+= '        <nav class="navbar navbar-default navbar-static">' ;
h+= '            <div class="container-fluid">' ;
h+= '                <div class="navbar-header">' ;
h+= '                    <button data-target=".bs-example-js-navbar-collapse" data-toggle="header-collapse" type="button" class="navbar-toggle"> ' ;
h+= '                        <span class="sr-only">Toggle navigation</span> ' ;
h+= '                        <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> ' ;
h+= '                    </button>' ;
h+= '                </div>' ;
h+= '                <div class="collapse navbar-collapse bs-example-js-navbar-collapse" style="height: auto; outline: 0px;">' ;
h+=`<div class="nav navbar-nav nav-left mob-hide" style="width:90%">
        <div class="row">
            <div class="col-sm-12">
                <ul class="watchrow">
                    <!--li class="p-0 m-t-1 watch">
                        <div class="stopwatch">
                            <label class="task" id="this">Here</label>
                            <label class="time" id="abc"></label>
                            <button class="start" id="abc"><span class="glyphicon glyphicon-play"></span></button>
                            <button class="pause" id="abc"><span class="glyphicon glyphicon-pause"></span></button>
                        </div>
                    </li>
                    <li class="p-0 m-t-1 watch">
                        <div class="stopwatch">
                            <label class="task" id="that">Here</label>
                            <label class="time" id="xyz"></label>
                            <button class="start" id="xyz"><span class="glyphicon glyphicon-play"></span></button>
                            <button class="pause" id="xyz"><span class="glyphicon glyphicon-pause"></span></button>
                        </div>
                    </li-->
                </ul>
            </div>
        </div>
    </div>
    
`

// h+= '                    <!-- End Navbar Left-->' ;
// h+= '                    <ul class="nav navbar-nav nav-left mob-hide">' ;
// h+= '                        <li class="dropdown"> <a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" data-toggle="dropdown">Dropdown</a>' ;
// h+= '                            <ul class="dropdown-menu drop-zoom-left">' ;
// h+= '                                <li class="dropdown-submenu"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1" data-toggle="dropdown">Action</a>' ;
// h+= '                                    <ul class="dropdown-menu drop-zoom-left">' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Sub Action</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Sub Action</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Sub Action</a></li>' ;
// h+= '                                        <li class="dropdown-submenu"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1" data-toggle="dropdown">Another sub action</a>' ;
// h+= '                                            <ul class="dropdown-menu drop-zoom-left">' ;
// h+= '                                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Sub Action</a></li>' ;
// h+= '                                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Another sub action</a></li>' ;
// h+= '                                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                            </ul>' ;
// h+= '                                        </li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                    </ul>' ;
// h+= '                                </li>' ;
// h+= '                                <li class="dropdown-submenu"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1" data-toggle="dropdown">Another action</a>' ;
// h+= '                                    <ul class="dropdown-menu drop-zoom-left">' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Sub Action</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Another sub action</a></li>' ;
// h+= '                                        <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                    </ul>' ;
// h+= '                                </li>' ;
// h+= '                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                                <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" tabindex="-1">Something else here</a></li>' ;
// h+= '                            </ul>' ;
// h+= '                        </li>' ;
// h+= '                        <li class="dropdown mega-menu">' ;
// h+= '                            <a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#" data-toggle="dropdown" aria-expanded="true">MEGA MENU</a>' ;
// h+= '                            <ul class="dropdown-menu mega-menu-container drop-zoom-left avoid-close">' ;
// h+= '                                <li>' ;
// h+= '                                    <div class="mega-menu-content">' ;
// h+= '                                        <div class="row">' ;
// h+= '                                            <div class="col-md-3">' ;
// h+= '                                                <h5 class="menu-heading">UI Elements</h5>' ;
// h+= '                                                <ul class="list-unstyled list-menu">' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-elements-accordions.php"> Accordions</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-elements-alerts.php"> Alerts</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-elements-buttons.php"> Buttons</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-elements-background-color.php"> Background Color</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-elements-foreground-color.php"> Foreground Color</a></li>' ;
// h+= '                                                </ul>' ;
// h+= '                                            </div>' ;
// h+= '                                            <div class="col-md-3">' ;
// h+= '                                                <h5 class="menu-heading">UI Helpers</h5>' ;
// h+= '                                                <ul class="list-unstyled list-menu">' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-helpers-animate-css.php"> Animate Css</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-helpers-counter.php"> Counter</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/ui-helpers-icheck.php"> iCheck</a></li>' ;
// h+= '                                                    ' ;
// h+= '                                                </ul>' ;
// h+= '                                            </div>' ;
// h+= '                                            <div class="col-md-3">' ;
// h+= '                                                <h5 class="menu-heading">Tables</h5>' ;
// h+= '                                                <ul class="list-unstyled list-menu">' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/table-basic.php">Basic Table</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/table-responsive.php">Responsive Table</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/table-dynamic.php">Dynamic Table</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/table-editable.php">Editable Table</a></li>' ;
// h+= '                                                </ul>' ;
// h+= '                                            </div>' ;
// h+= '                                            <div class="col-md-3">' ;
// h+= '                                                <h5 class="menu-heading">Forms</h5>' ;
// h+= '                                                <ul class="list-unstyled list-menu">' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/form-bootstrap.php">Bootstrap Forms</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/form-calibre.php">Calibre Forms</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/form-pickers.php">Form Pickers</a></li>' ;
// h+= '                                                    <li><a href="http://lancecoder.com/themes/calibre/layouts/iconic/form-tags-input.php">Form Tags Input</a></li>' ;
// h+= '                                                </ul>' ;
// h+= '                                            </div>' ;
// h+= '                                        </div><!--/row-->' ;
// h+= '                                    </div><!-- /mega-menu-content -->' ;
// h+= '                                </li>' ;
// h+= '                            </ul><!--/dropdown-menu mega-menu-container-->' ;
// h+= '                        </li>' ;
// h+= '                    </ul>' ;
// h+= '                    < !--End Navbar Left -->' ;

h+= '                    <!-- Start Navbar Right -->' ;
h+= '                    <ul class="nav navbar-nav navbar-right">' ;
h+= '                        <li class="dropdown header-notifcations"> ' ;
h+= '                            <a data-toggle="dropdown" class="dropdown-toggle" role="button" href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">' ;
h+= '                                <i class="fa fa-bell-o"></i>' ;
h+= '                                <span class="badge badge-primary notifications-counter">8</span>' ;
h+= '                            </a>' ;

h+= '                            <ul class="dropdown-menu drop-zoom-right avoid-close">' ;
h+= '                                <li>' ;
h+= '                                    <div role="tabpanel" class="">' ;
h+= '                                        <!-- Nav tabs -->' ;
h+= '                                        <ul class="nav nav-tabs nav-justified" role="tablist">' ;
h+= '                                            <li role="presentation" class="active"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#notif-tasks" role="tab" data-toggle="tab"><i class="font-awesome fa fa-tasks" aria-hidden="true"></i></a></li>' ;
h+= '                                            <li role="presentation"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#notif-approval" role="tab" data-toggle="tab"><i class="font-awesome fa fa-check" aria-hidden="true"></i></a></li>' ;
h+= '                                            <li role="presentation"><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#notif-general" role="tab" data-toggle="tab"><i class="fa icon-warning fa-fw"></i></a></li>' ;
h+= '                                        </ul>' ;
h+= '                                        <!-- Tab panes -->' ;
h+= '                                        <div class="tab-content">' ;
h+= '                                            <div role="tabpanel" class="tab-pane active fade in" id="notif-tasks">' ;
h+= '                                                <div class="notif-wrapper">' ;
h+= '                                                    <div class="notif-header">' ;
h+= '                                                        <h5>You have 10 pending tasks</h5>' ;
h+= '                                                    </div>' ;
h+= '                                                    <div class="notif-content" tabindex="5002" style="overflow-y: hidden; outline: none;">' ;
h+= '                                                        <ul class="list-unstyled">' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Laravel Login Customization</a></strong> ' ;
h+= '                                                                    <p>TASKS SECTION</p>' ;
h+= '                                                                    <div class="progress progress-xs">' ;
h+= '                                                                        <div class="progress-bar bg-info ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" data-transitiongoal="74" aria-valuenow="0" style="width: 74%;" aria-valuemin="0" aria-valuemax="100"><div class="ui-progressbar-value ui-widget-header ui-corner-left" style="display: none; width: 0%;"></div></div>' ;
h+= '                                                                    </div>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Admin theme enhancements</a></strong> ' ;
h+= '                                                                    <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    <div class="progress progress-xs">' ;
h+= '                                                                        <div class="progress-bar bg-success ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" data-transitiongoal="92" aria-valuenow="0" style="width: 92%;" aria-valuemin="0" aria-valuemax="100"><div class="ui-progressbar-value ui-widget-header ui-corner-left" style="display: none; width: 0%;"></div></div>' ;
h+= '                                                                    </div>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Wordress custom auth plugin</a></strong> ' ;
h+= '                                                                    <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    <div class="progress progress-xs">' ;
h+= '                                                                        <div class="progress-bar bg-warning ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" data-transitiongoal="68" aria-valuenow="0" style="width: 68%;" aria-valuemin="0" aria-valuemax="100"><div class="ui-progressbar-value ui-widget-header ui-corner-left" style="display: none; width: 0%;"></div></div>' ;
h+= '                                                                    </div>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li><li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Additional theme color</a></strong> ' ;
h+= '                                                                    <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    <div class="progress progress-xs">' ;
h+= '                                                                        <div class="progress-bar bg-danger ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" data-transitiongoal="54" aria-valuenow="0" style="width: 54%;" aria-valuemin="0" aria-valuemax="100"><div class="ui-progressbar-value ui-widget-header ui-corner-left" style="display: none; width: 0%;"></div></div>' ;
h+= '                                                                    </div>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                        </ul>' ;
h+= '                                                    </div><!--/notif-content-->' ;
h+= '                                                    <div class="notif-footer">' ;
h+= '                                                        <a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">See all tasks</a>' ;
h+= '                                                    </div><!--/notif-footer-->' ;

h+= '                                                </div><!--/notif-wrapper-->' ;
h+= '                                            </div>' ;
h+= '                                            <div role="tabpanel" class="tab-pane fade" id="notif-approval">' ;
h+= '                                                <div class="notif-wrapper">' ;
h+= '                                                    <div class="notif-header">' ;
h+= '                                                        <h5>You have 25 unread messages</h5>' ;
h+= '                                                    </div>' ;
h+= '                                                    <div class="notif-content" tabindex="5003" style="overflow-y: hidden; outline: none;">' ;
h+= '                                                        <ul class="list-unstyled">' ;
h+= '                                                            <li class="">' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended clearfix">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;

h+= '                                                                    <div class="profile-img">' ;
h+= '                                                                        <img src="assets/images/avatar2.jpg" alt="Profile">' ;
h+= '                                                                    </div>' ;
h+= '                                                                    <div class="message">' ;
h+= '                                                                        <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Juan Dela Cruz</a><span class="timeago">Just now</span></strong> ' ;

h+= '                                                                        <p>APPROVAL</p>' ;
h+= '                                                                    </div>' ;

h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended clearfix">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;

h+= '                                                                    <div class="profile-img">' ;
h+= '                                                                        <img src="assets/images/avatar3.jpg" alt="Profile">' ;
h+= '                                                                    </div>' ;
h+= '                                                                    <div class="message">' ;
h+= '                                                                        <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Teddy Bear</a><span class="timeago">2 minutes</span></strong> ' ;

h+= '                                                                        <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    </div>' ;

h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended clearfix">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;

h+= '                                                                    <div class="profile-img">' ;
h+= '                                                                        <img src="assets/images/avatar4.jpg" alt="Profile">' ;
h+= '                                                                    </div>' ;
h+= '                                                                    <div class="message">' ;
h+= '                                                                        <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">John Doe</a><span class="timeago">5 minutes</span></strong> ' ;

h+= '                                                                        <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    </div>' ;

h+= '                                                                </div>' ;
h+= '                                                            </li><li>' ;
h+= '                                                                <div class="alert alert-dismissable alert-styled alert-flat alert-extended clearfix">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;

h+= '                                                                    <div class="profile-img">' ;
h+= '                                                                        <img src="assets/images/avatar5.jpg" alt="Profile">' ;
h+= '                                                                    </div>' ;
h+= '                                                                    <div class="message">' ;
h+= '                                                                        <strong><a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">Juan Dela Cruz</a><span class="timeago">20 minutes</span></strong> ' ;

h+= '                                                                        <p>Consectetur adipiscing elit molestie lorem at</p>' ;
h+= '                                                                    </div>' ;

h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                        </ul>' ;
h+= '                                                    </div><!--/notif-content-->' ;
h+= '                                                    <div class="notif-footer">' ;
h+= '                                                        <a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">See all messages</a>' ;
h+= '                                                    </div><!--/notif-footer-->' ;

h+= '                                                </div><!--/notif-wrapper-->' ;
h+= '                                            </div>' ;
h+= '                                            <div role="tabpanel" class="tab-pane fade" id="notif-general">' ;
h+= '                                                <div class="notif-wrapper">' ;
h+= '                                                    <div class="notif-header">' ;
h+= '                                                        <h5>You have 4 important system notice</h5>' ;
h+= '                                                    </div>' ;
h+= '                                                    <div class="notif-content" tabindex="5004" style="overflow-y: hidden; outline: none;">' ;
h+= '                                                        <ul class="list-unstyled">' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-danger alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <span class="alert-icon"><i class="fa fa-bolt"></i></span>' ;
h+= '                                                                    <span class="message">GENERAL SECTION</span>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-info alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <span class="alert-icon"><i class="fa fa-bolt"></i></span>' ;
h+= '                                                                    <span class="message">Database need backup.</span>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-warning alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <span class="alert-icon"><i class="fa fa-bolt"></i></span>' ;
h+= '                                                                    <span class="message">Server overload.</span>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                            <li>' ;
h+= '                                                                <div class="alert alert-danger alert-dismissable alert-styled alert-flat alert-extended">' ;
h+= '                                                                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>' ;
h+= '                                                                    <span class="alert-icon"><i class="fa fa-bolt"></i></span>' ;
h+= '                                                                    <span class="message">Meet maximum data usage.</span>' ;
h+= '                                                                </div>' ;
h+= '                                                            </li>' ;
h+= '                                                        </ul>' ;
h+= '                                                    </div><!--/notif-content-->' ;
h+= '                                                    <div class="notif-footer">' ;
h+= '                                                        <a href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">See all notice</a>' ;
h+= '                                                    </div><!--/notif-footer-->' ;

h+= '                                                </div><!--/notif-wrapper-->' ;
h+= '                                            </div>' ;
h+= '                                        </div>' ;
h+= '                                    </div>' ;

h+= '                                </li>' ;
h+= '                            <div id="ascrail2002" class="nicescroll-rails" style="padding-left: 3px; padding-right: 3px; width: 9px; z-index: 998; background: rgb(253, 252, 252; cursor: default; position: absolute; top: 0px; left: 311px; height: 300px; opacity: 0;"><div style="position: relative; top: 0px; float: right; width: 3px; height: 259px; background-color: rgb(221, 221, 221; border: 0px solid rgb(255, 255, 255; background-clip: padding-box; border-radius: 0px;"></div></div><div id="ascrail2003" class="nicescroll-rails" style="padding-left: 3px; padding-right: 3px; width: 9px; z-index: 998; background: rgb(253, 252, 252; cursor: default; position: absolute; top: -63px; left: -1229px; height: 300px; display: none;"><div style="position: relative; top: 0px; float: right; width: 3px; height: 0px; background-color: rgb(221, 221, 221; border: 0px solid rgb(255, 255, 255; background-clip: padding-box; border-radius: 0px;"></div></div><div id="ascrail2004" class="nicescroll-rails" style="padding-left: 3px; padding-right: 3px; width: 9px; z-index: 998; background: rgb(253, 252, 252; cursor: default; position: absolute; top: -63px; left: -1229px; height: 300px; display: none;"><div style="position: relative; top: 0px; float: right; width: 3px; height: 0px; background-color: rgb(221, 221, 221; border: 0px solid rgb(255, 255, 255; background-clip: padding-box; border-radius: 0px;"></div></div></ul>' ;
h+= '                        </li>' ;
h+= '                        <li class="dropdown user-profile"> ' ;
h+= '                            <a data-toggle="dropdown" class="dropdown-toggle profile" role="button" href="http://lancecoder.com/themes/calibre/layouts/iconic/index.php#">' ;
h+= '                                <img src="assets/images/avatar1.jpg" class="img-circle top-avatar" height="40" width="40" alt="avatar">' ;
h+= '                            </a>' ;

h+= '                            <ul class="dropdown-menu drop-zoom-right profile-info">' ;
h+= '                                <li class="text-center">' ;
h+= '                                    <div class="header-cover">' ;

h+= '                                    </div>' ;
h+= '                                    <div class="profile-wrapper">' ;
h+= '                                        <img src="assets/images/avatar1.jpg" class="profile-image img-circle" alt="Profile Image">' ;

h+= '                                        <div class="account-info">' ;
h+= '                                            <h3 class="name">Juan Dela Cruz</h3>' ;
h+= '                                            <h6 class="position">Web Developer</h6>' ;
h+= '                                        </div>' ;
h+= '                                        <hr>' ;
h+= '                                        <div class="account-actions">' ;
h+= '                                            <a id="profile" href="#" class="btn btn-default btn-block btn-flat">Profile</a>' ;
h+= '                                            <a id="settings" href="#" class="btn btn-default btn-block btn-flat">Settings</a>' ;
h+= '                                            <a id="logout" href="#" class="btn btn-default btn-block btn-flat">Logout</a>' ;
h+= '                                        </div>' ;
h+= '                                    </div>' ;
h+= '                                </li>' ;
h+= '                            </ul>' ;
h+= '                        </li>' ;

h+= '                </div>' ;
h+= '                <!-- /.nav-collapse -->' ;
h+= '            </div>' ;
h+= '            <!-- /.container-fluid -->' ;
h+= '        </nav>' ;
h+= '        <!-- /navbar-example -->' ;
h+= '    </div><!--/header-right-->' ;
h+= '</div>' ;





$('#divHeader').html(h);


});

// var socket = io.connect('https://notification-server1.herokuapp.com');
//     socket.emit('authentication', { token : localStorage.getItem('token') });
//     socket.on('notification',function(data){
//         console.log(data);
//     var text=    `<li>
//                     <div class="alert alert-danger alert-dismissable alert-styled alert-flat alert-extended">
//                         <button type="button" data-dismiss="alert" aria-hidden="true" class="close">×</button>
//                         <span class="alert-icon"><i class="fa fa-bolt"></i></span>
//                         <span class="message">${data.notification.message}</span>
//                     </div>
//                 </li>`
    
//     if(data.notification.category=='T'){
//         $('#notif-tasks').find('ul').append(text);
//         console.log('appended to tasks');
//     }
//     if(data.notification.category=='A'){
//         $('#notif-approval').find('ul').append(text);
//         console.log('appended to approval');
//     }
//     if(data.notification.category=='G'){
//         $('#notif-general').find('ul').append(text);
//         console.log('appended to general');
//     }
        
    // });