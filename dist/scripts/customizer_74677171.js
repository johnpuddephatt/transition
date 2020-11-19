!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/wp-content/themes/transition/dist/",n(n.s=17)}({17:function(t,e,n){n(18),t.exports=n(20)},18:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(19),o=n.n(i);wp.customize("blogdescription",function(t){t.bind(function(t){return o()(".site-footer--title").text(t)})}),wp.customize("home_about_text",function(t){t.bind(function(t){return o()(".home-about--title").text(t)})}),wp.customize("home_about_button",function(t){t.bind(function(t){return o()(".home-about--button span").text(t)})}),wp.customize("home_projects_text",function(t){t.bind(function(t){return o()(".home-projects--intro--text").text(t)})}),wp.customize("newsletter_heading",function(t){t.bind(function(t){return o()(".newsletter-signup--heading").text(t)})}),wp.customize("newsletter_disclaimer",function(t){t.bind(function(t){return o()(".newsletter-signup--disclaimer").html(t)})}),wp.customize("contact_phone_human",function(t){t.bind(function(t){return o()(".contact-phone").text(t)})}),wp.customize("contact_email",function(t){t.bind(function(t){return o()(".contact-email").text(t)})}),wp.customize("contact_address",function(t){t.bind(function(t){return o()(".contact-address").text(t)})}),wp.customize("home_sketchbook_text",function(t){t.bind(function(t){return o()(".home-scrapbook--intro").text(t)})}),wp.customize("home_sketchbook_button",function(t){t.bind(function(t){return o()(".home-scrapbook--button span").text(t)})}),o()(document).ready(function(t){function e(e,n){void 0===n&&(n="");var i='<div class="repeater" style="display:none"><input type="text" value="'+n+'" class="repeater-input" placeholder="https://" /><span class="dashicons dashicons-sort"></span><a class="customize-control-sortable-repeater-delete" href="#"><span class="dashicons dashicons-no-alt"></span></a></div>';e.find(".sortable").append(i),e.find(".sortable").find(".repeater:last").slideDown("slow",function(){t(this).find("input").focus()})}function n(e){var n=e.find(".repeater-input").map(function(){return t(this).val()}).toArray();e.find(".customize-control-sortable-repeater").val(n),e.find(".customize-control-sortable-repeater").trigger("change")}
/**
	 * Slider Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */function i(e){var n=e.find(".sortable-pill-checkbox").map(function(){if(t(this).is(":checked"))return t(this).val()}).toArray();e.find(".customize-control-sortable-pill-checkbox").val(n).trigger("change")}
/**
	 * Dropdown Select2 Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */function o(t){var e={font:t.find(".google-fonts-list").val(),regularweight:t.find(".google-fonts-regularweight-style").val(),italicweight:t.find(".google-fonts-italicweight-style").val(),boldweight:t.find(".google-fonts-boldweight-style").val(),category:t.find(".google-fonts-category").val()};t.find(".customize-control-google-font-selection").val(JSON.stringify(e)).trigger("change")}
/**
	 * TinyMCE Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */function r(t){var e;return(t=t.replace(/ /g,"")).match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)?(e=100*parseFloat(t.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1]).toFixed(2),e=parseInt(e)):e=100,e}function a(t,e,n,i){var o,r,a;o=e.data("a8cIris"),r=e.data("wpWpColorPicker"),o._color._alpha=t,a=o._color.toString(),e.val(a),r.toggler.css({"background-color":a}),i&&l(t,n),e.wpColorPicker("color",a)}function l(t,e){e.slider("value",t),e.find(".ui-slider-handle").text(t.toString())}
/**
	 * Sortable Repeater Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */
t(".sortable_repeater_control").each(function(){var n,i=t(this).find(".customize-control-sortable-repeater").val().split(","),o=i.length;if(o>0&&(t(this).find(".repeater-input").val(i[0]),o>1))for(n=1;n<o;++n)e(t(this),i[n])}),t(".sortable_repeater.sortable").on("click",".customize-control-sortable-repeater-delete",function(e){e.preventDefault(),t(this).parent().parent().find(".repeater").length>1?t(this).parent().slideUp("fast",function(){var e=t(this).parent().parent();t(this).remove(),n(e)}):(t(this).parent().find(".repeater-input").val(""),n(t(this).parent().parent().parent()))}),t(".customize-control-sortable-repeater-add").click(function(i){i.preventDefault(),e(t(this).parent()),n(t(this).parent())}),t(".sortable_repeater.sortable").change(function(){n(t(this).parent())}),t(".sortable_repeater.sortable").on("blur",".repeater-input",function(){var e=t(this),n=e.val();n&&!n.match(/^.+:\/\/.*/)&&e.val("https://"+n).trigger("change")}),t(".slider-custom-control").each(function(){var e=t(this).find(".customize-control-slider-value").val(),n=t(this).find(".slider"),i=parseFloat(n.attr("slider-min-value")),o=parseFloat(n.attr("slider-max-value")),r=parseFloat(n.attr("slider-step-value"));n.slider({value:e,min:i,max:o,step:r,change:function(e,n){t(this).parent().find(".customize-control-slider-value").trigger("change")}})}),t(".slider").on("slide",function(e,n){t(this).parent().find(".customize-control-slider-value").val(n.value)}),t(".slider-reset").on("click",function(){var e=t(this).attr("slider-reset-value");t(this).parent().find(".customize-control-slider-value").val(e),t(this).parent().find(".slider").slider("value",e)}),t(".customize-control-slider-value").blur(function(){var e=t(this).val(),n=t(this).parent().find(".slider"),i=parseInt(n.attr("slider-min-value")),o=parseInt(n.attr("slider-max-value"));e<i&&(e=i,t(this).val(e)),e>o&&(e=o,t(this).val(e)),t(this).parent().find(".slider").slider("value",e)}),
/**
	 * Single Accordion Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */
t(".single-accordion-toggle").click(function(){var e=t(this);t(this).parent().find(".single-accordion").slideToggle("slow",function(){e.toggleClass("single-accordion-toggle-rotate",t(this).is(":visible"))})}),
/**
	 * Image Checkbox Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */
t(".multi-image-checkbox").on("change",function(){var e,n;
/**
	 * Pill Checkbox Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */e=t(this).parent().parent(),n=e.find(".multi-image-checkbox").map(function(){if(t(this).is(":checked"))return t(this).val()}).toArray(),e.find(".customize-control-multi-image-checkbox").val(n).trigger("change")}),t(".pill_checkbox_control .sortable").sortable({placeholder:"pill-ui-state-highlight",update:function(e,n){i(t(this).parent())}}),t(".pill_checkbox_control .sortable-pill-checkbox").on("change",function(){i(t(this).parent().parent().parent())}),t(".customize-control-dropdown-select2").each(function(){t(".customize-control-select2").select2({allowClear:!0})}),t(".customize-control-select2").on("change",function(){var e=t(this).val();t(this).parent().find(".customize-control-dropdown-select2").val(e).trigger("change")}),
/**
	 * Googe Font Select Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */
t(".google-fonts-list").each(function(e,n){t(n).hasClass("select2-hidden-accessible")||t(n).select2()}),t(".google-fonts-list").on("change",function(){var e=t(this).parent().parent().find(".google-fonts-regularweight-style"),n=t(this).parent().parent().find(".google-fonts-italicweight-style"),i=t(this).parent().parent().find(".google-fonts-boldweight-style"),r=t(this).val(),a=t(this).attr("control-name"),l=0,c=0;e.empty(),n.empty(),i.empty(),n.prop("disabled",!1),i.prop("disabled",!1);var s=_wpCustomizeSettings.controls[a],p=t.map(s.skyrocketfontslist,function(t,e){if(t.family===r)return e})[0];t.each(s.skyrocketfontslist[p].variants,function(o,r){e.append(t("<option></option>").val(r).html(r)),r.indexOf("italic")>=0?(n.append(t("<option></option>").val(r).html(r)),l++):(i.append(t("<option></option>").val(r).html(r)),c++)}),0==l&&(n.append(t("<option></option>").val("").html("Not Available for this font")),n.prop("disabled","disabled")),0==c&&(i.append(t("<option></option>").val("").html("Not Available for this font")),i.prop("disabled","disabled")),t(this).parent().parent().find(".google-fonts-category").val(s.skyrocketfontslist[p].category),o(t(this).parent().parent())}),t(".google_fonts_select_control select").on("change",function(){o(t(this).parent().parent())}),t(".customize-control-tinymce-editor").each(function(){var e=_wpCustomizeSettings.controls[t(this).attr("id")].skyrockettinymcetoolbar1,n=_wpCustomizeSettings.controls[t(this).attr("id")].skyrockettinymcetoolbar2,i=_wpCustomizeSettings.controls[t(this).attr("id")].skyrocketmediabuttons;wp.editor.initialize(t(this).attr("id"),{tinymce:{wpautop:!0,toolbar1:e,toolbar2:n},quicktags:!0,mediaButtons:i})}),t(document).on("tinymce-editor-init",function(e,n){n.on("change",function(e){tinyMCE.triggerSave(),t("#"+n.id).trigger("change")})}),
/**
	 * WP ColorPicker Alpha Color Picker Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */
t(".wpcolorpicker-alpha-color-picker").each(function(e,n){var i={palettes:_wpCustomizeSettings.controls[t(this).attr("id")].colorpickerpalette};t(n).wpColorPicker(i)}),
/**
 	 * Alpha Color Picker Custom Control
 	 *
 	 * @author Braad Martin <http://braadmartin.com>
 	 * @license http://www.gnu.org/licenses/gpl-3.0.html
 	 * @link https://github.com/BraadMartin/components/tree/master/customizer/alpha-color-picker
 	 */
t(".alpha-color-control").each(function(){var e,n,i,o,c,s,p,u,d;e=t(this),n=e.val().replace(/\s+/g,""),i=e.attr("data-palette"),o=e.attr("data-show-opacity"),c=e.attr("data-default-color"),s={change:function(t,n){var i,o,a;i=e.attr("data-customize-setting-link"),o=e.wpColorPicker("color"),c==o&&(a=r(o),u.find(".ui-slider-handle").text(a)),wp.customize(i,function(t){t.set(o)}),p.find(".transparency").css("background-color",n.color.toString("no-alpha"))},palettes:-1!==i.indexOf("|")?i.split("|"):"false"!=i},e.wpColorPicker(s),p=e.parents(".wp-picker-container:first"),t('<div class="alpha-color-picker-container"><div class="min-click-zone click-zone"></div><div class="max-click-zone click-zone"></div><div class="alpha-slider"></div><div class="transparency"></div></div>').appendTo(p.find(".wp-picker-holder")),u=p.find(".alpha-slider"),d={create:function(e,i){var o=t(this).slider("value");t(this).find(".ui-slider-handle").text(o),t(this).siblings(".transparency ").css("background-color",n)},value:r(n),range:"max",step:1,min:0,max:100,animate:300},u.slider(d),"true"==o&&u.find(".ui-slider-handle").addClass("show-opacity"),p.find(".min-click-zone").on("click",function(){a(0,e,u,!0)}),p.find(".max-click-zone").on("click",function(){a(100,e,u,!0)}),p.find(".iris-palette").on("click",function(){var n,i;l(i=r(n=t(this).css("background-color")),u),100!=i&&(n=n.replace(/[^,]+(?=\))/,(i/100).toFixed(2))),e.wpColorPicker("color",n)}),p.find(".button.wp-picker-clear").on("click",function(){var t=e.attr("data-customize-setting-link");e.wpColorPicker("color","#ffffff"),wp.customize(t,function(t){t.set("")}),l(100,u)}),p.find(".button.wp-picker-default").on("click",function(){l(r(c),u)}),e.on("input",function(){l(r(t(this).val()),u)}),u.slider().on("slide",function(n,i){a(parseFloat(i.value)/100,e,u,!1),t(this).find(".ui-slider-handle").text(i.value)})}),Color.prototype.toString=function(t){if("no-alpha"==t)return this.toCSS("rgba","1").replace(/\s+/g,"");if(1>this._alpha)return this.toCSS("rgba",this._alpha).replace(/\s+/g,"");var e=parseInt(this._color,10).toString(16);if(this.error)return"";if(e.length<6)for(var n=6-e.length-1;n>=0;n--)e="0"+e;return"#"+e}})},19:function(t,e){t.exports=jQuery},20:function(t,e){}});