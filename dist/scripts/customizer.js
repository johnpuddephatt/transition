/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/transition/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
module.exports = __webpack_require__(20);


/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* eslint-disable */



// wp.customize('blogname', (value) => {
//   value.bind(to => jQuery('.brand').text(to));
// });

wp.customize('blogdescription', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.site-footer--title').text(to); });
});

wp.customize('home_about_text', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.home-about--title').text(to); });
});

wp.customize('home_about_button', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.home-about--button span').text(to); });
});

wp.customize('home_projects_text', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.home-projects--intro--text').text(to); });
});

wp.customize('newsletter_heading', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.newsletter-signup--heading').text(to); });
});

wp.customize('newsletter_disclaimer', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.newsletter-signup--disclaimer').html(to); });
});

wp.customize('contact_phone_human', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.contact-phone').text(to); });
});

wp.customize('contact_email', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.contact-email').text(to); });
});

wp.customize('contact_address', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.contact-address').text(to); });
});

wp.customize('home_sketchbook_text', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.home-scrapbook--intro').text(to); });
});

wp.customize('home_sketchbook_button', function (value) {
  value.bind(function (to) { return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.home-scrapbook--button span').text(to); });
});


__WEBPACK_IMPORTED_MODULE_0_jquery___default()( document ).ready(function(jQuery) {
	"use strict";

	/**
	 * Sortable Repeater Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	// Update the values for all our input fields and initialise the sortable repeater
	jQuery('.sortable_repeater_control').each(function() {
		var this$1 = this;

		// If there is an existing customizer value, populate our rows
		var defaultValuesArray = jQuery(this).find('.customize-control-sortable-repeater').val().split(',');
		var numRepeaterItems = defaultValuesArray.length;

		if(numRepeaterItems > 0) {
			// Add the first item to our existing input field
			jQuery(this).find('.repeater-input').val(defaultValuesArray[0]);
			// Create a new row for each new value
			if(numRepeaterItems > 1) {
				var i;
				for (i = 1; i < numRepeaterItems; ++i) {
					skyrocketAppendRow(jQuery(this$1), defaultValuesArray[i]);
				}
			}
		}
	});

	// Make our Repeater fields sortable
	// jQuery(this).find('.sortable_repeater.sortable').sortable({
	// 	update: function(event, ui) {
	// 		skyrocketGetAllInputs(jQuery(this).parent());
	// 	}
	// });

	// Remove item starting from it's parent element
	jQuery('.sortable_repeater.sortable').on('click', '.customize-control-sortable-repeater-delete', function(event) {
		event.preventDefault();
		var numItems = jQuery(this).parent().parent().find('.repeater').length;

		if(numItems > 1) {
			jQuery(this).parent().slideUp('fast', function() {
				var parentContainer = jQuery(this).parent().parent();
				jQuery(this).remove();
				skyrocketGetAllInputs(parentContainer);
			})
		}
		else {
			jQuery(this).parent().find('.repeater-input').val('');
			skyrocketGetAllInputs(jQuery(this).parent().parent().parent());
		}
	});

	// Add new item
	jQuery('.customize-control-sortable-repeater-add').click(function(event) {
		event.preventDefault();
		skyrocketAppendRow(jQuery(this).parent());
		skyrocketGetAllInputs(jQuery(this).parent());
	});

	// Refresh our hidden field if any fields change
	jQuery('.sortable_repeater.sortable').change(function() {
		skyrocketGetAllInputs(jQuery(this).parent());
	})

	// Add https:// to the start of the URL if it doesn't have it
	jQuery('.sortable_repeater.sortable').on('blur', '.repeater-input', function() {
		var url = jQuery(this);
		var val = url.val();
		if(val && !val.match(/^.+:\/\/.*/)) {
			// Important! Make sure to trigger change event so Customizer knows it has to save the field
			url.val('https://' + val).trigger('change');
		}
	});

	// Append a new row to our list of elements
	function skyrocketAppendRow(jQueryelement, defaultValue) {
		if ( defaultValue === void 0 ) defaultValue = '';

		var newRow = '<div class="repeater" style="display:none"><input type="text" value="' + defaultValue + '" class="repeater-input" placeholder="https://" /><span class="dashicons dashicons-sort"></span><a class="customize-control-sortable-repeater-delete" href="#"><span class="dashicons dashicons-no-alt"></span></a></div>';

		jQueryelement.find('.sortable').append(newRow);
		jQueryelement.find('.sortable').find('.repeater:last').slideDown('slow', function(){
			jQuery(this).find('input').focus();
		});
	}

	// Get the values from the repeater input fields and add to our hidden field
	function skyrocketGetAllInputs(jQueryelement) {
		var inputValues = jQueryelement.find('.repeater-input').map(function() {
			return jQuery(this).val();
		}).toArray();
		// Add all the values from our repeater fields to the hidden field (which is the one that actually gets saved)
		jQueryelement.find('.customize-control-sortable-repeater').val(inputValues);
		// Important! Make sure to trigger change event so Customizer knows it has to save the field
		jQueryelement.find('.customize-control-sortable-repeater').trigger('change');
	}

	/**
	 * Slider Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	// Set our slider defaults and initialise the slider
	jQuery('.slider-custom-control').each(function(){
		var sliderValue = jQuery(this).find('.customize-control-slider-value').val();
		var newSlider = jQuery(this).find('.slider');
		var sliderMinValue = parseFloat(newSlider.attr('slider-min-value'));
		var sliderMaxValue = parseFloat(newSlider.attr('slider-max-value'));
		var sliderStepValue = parseFloat(newSlider.attr('slider-step-value'));

		newSlider.slider({
			value: sliderValue,
			min: sliderMinValue,
			max: sliderMaxValue,
			step: sliderStepValue,
			change: function(e,ui){
				// Important! When slider stops moving make sure to trigger change event so Customizer knows it has to save the field
				jQuery(this).parent().find('.customize-control-slider-value').trigger('change');
	      }
		});
	});

	// Change the value of the input field as the slider is moved
	jQuery('.slider').on('slide', function(event, ui) {
		jQuery(this).parent().find('.customize-control-slider-value').val(ui.value);
	});

	// Reset slider and input field back to the default value
	jQuery('.slider-reset').on('click', function() {
		var resetValue = jQuery(this).attr('slider-reset-value');
		jQuery(this).parent().find('.customize-control-slider-value').val(resetValue);
		jQuery(this).parent().find('.slider').slider('value', resetValue);
	});

	// Update slider if the input field loses focus as it's most likely changed
	jQuery('.customize-control-slider-value').blur(function() {
		var resetValue = jQuery(this).val();
		var slider = jQuery(this).parent().find('.slider');
		var sliderMinValue = parseInt(slider.attr('slider-min-value'));
		var sliderMaxValue = parseInt(slider.attr('slider-max-value'));

		// Make sure our manual input value doesn't exceed the minimum & maxmium values
		if(resetValue < sliderMinValue) {
			resetValue = sliderMinValue;
			jQuery(this).val(resetValue);
		}
		if(resetValue > sliderMaxValue) {
			resetValue = sliderMaxValue;
			jQuery(this).val(resetValue);
		}
		jQuery(this).parent().find('.slider').slider('value', resetValue);
	});

	/**
	 * Single Accordion Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery('.single-accordion-toggle').click(function() {
		var jQueryaccordionToggle = jQuery(this);
		jQuery(this).parent().find('.single-accordion').slideToggle('slow', function() {
			jQueryaccordionToggle.toggleClass('single-accordion-toggle-rotate', jQuery(this).is(':visible'));
		});
	});

	/**
	 * Image Checkbox Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery('.multi-image-checkbox').on('change', function () {
	  skyrocketGetAllImageCheckboxes(jQuery(this).parent().parent());
	});

	// Get the values from the checkboxes and add to our hidden field
	function skyrocketGetAllImageCheckboxes(jQueryelement) {
	  var inputValues = jQueryelement.find('.multi-image-checkbox').map(function() {
	    if( jQuery(this).is(':checked') ) {
	      return jQuery(this).val();
	    }
	  }).toArray();
	  // Important! Make sure to trigger change event so Customizer knows it has to save the field
	  jQueryelement.find('.customize-control-multi-image-checkbox').val(inputValues).trigger('change');
	}

	/**
	 * Pill Checkbox Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery( ".pill_checkbox_control .sortable" ).sortable({
		placeholder: "pill-ui-state-highlight",
		update: function( event, ui ) {
			skyrocketGetAllPillCheckboxes(jQuery(this).parent());
		}
	});

	jQuery('.pill_checkbox_control .sortable-pill-checkbox').on('change', function () {
		skyrocketGetAllPillCheckboxes(jQuery(this).parent().parent().parent());
	});

	// Get the values from the checkboxes and add to our hidden field
	function skyrocketGetAllPillCheckboxes(jQueryelement) {
		var inputValues = jQueryelement.find('.sortable-pill-checkbox').map(function() {
			if( jQuery(this).is(':checked') ) {
				return jQuery(this).val();
			}
		}).toArray();
		jQueryelement.find('.customize-control-sortable-pill-checkbox').val(inputValues).trigger('change');
	}

	/**
	 * Dropdown Select2 Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery('.customize-control-dropdown-select2').each(function(){
		jQuery('.customize-control-select2').select2({
			allowClear: true
		});
	});

	jQuery(".customize-control-select2").on("change", function() {
		var select2Val = jQuery(this).val();
		jQuery(this).parent().find('.customize-control-dropdown-select2').val(select2Val).trigger('change');
	});

	/**
	 * Googe Font Select Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery('.google-fonts-list').each(function (i, obj) {
		if (!jQuery(obj).hasClass('select2-hidden-accessible')) {
			jQuery(obj).select2();
		}
	});

	jQuery('.google-fonts-list').on('change', function() {
		var elementRegularWeight = jQuery(this).parent().parent().find('.google-fonts-regularweight-style');
		var elementItalicWeight = jQuery(this).parent().parent().find('.google-fonts-italicweight-style');
		var elementBoldWeight = jQuery(this).parent().parent().find('.google-fonts-boldweight-style');
		var selectedFont = jQuery(this).val();
		var customizerControlName = jQuery(this).attr('control-name');
		var elementItalicWeightCount = 0;
		var elementBoldWeightCount = 0;

		// Clear Weight/Style dropdowns
		elementRegularWeight.empty();
		elementItalicWeight.empty();
		elementBoldWeight.empty();
		// Make sure Italic & Bold dropdowns are enabled
		elementItalicWeight.prop('disabled', false);
		elementBoldWeight.prop('disabled', false);

		// Get the Google Fonts control object
		var bodyfontcontrol = _wpCustomizeSettings.controls[customizerControlName];

		// Find the index of the selected font
		var indexes = jQuery.map(bodyfontcontrol.skyrocketfontslist, function(obj, index) {
			if(obj.family === selectedFont) {
				return index;
			}
		});
		var index = indexes[0];

		// For the selected Google font show the available weight/style variants
		jQuery.each(bodyfontcontrol.skyrocketfontslist[index].variants, function(val, text) {
			elementRegularWeight.append(
				jQuery('<option></option>').val(text).html(text)
			);
			if (text.indexOf("italic") >= 0) {
				elementItalicWeight.append(
					jQuery('<option></option>').val(text).html(text)
				);
				elementItalicWeightCount++;
			} else {
				elementBoldWeight.append(
					jQuery('<option></option>').val(text).html(text)
				);
				elementBoldWeightCount++;
			}
		});

		if(elementItalicWeightCount == 0) {
			elementItalicWeight.append(
				jQuery('<option></option>').val('').html('Not Available for this font')
			);
			elementItalicWeight.prop('disabled', 'disabled');
		}
		if(elementBoldWeightCount == 0) {
			elementBoldWeight.append(
				jQuery('<option></option>').val('').html('Not Available for this font')
			);
			elementBoldWeight.prop('disabled', 'disabled');
		}

		// Update the font category based on the selected font
		jQuery(this).parent().parent().find('.google-fonts-category').val(bodyfontcontrol.skyrocketfontslist[index].category);

		skyrocketGetAllSelects(jQuery(this).parent().parent());
	});

	jQuery('.google_fonts_select_control select').on('change', function() {
		skyrocketGetAllSelects(jQuery(this).parent().parent());
	});

	function skyrocketGetAllSelects(jQueryelement) {
		var selectedFont = {
			font: jQueryelement.find('.google-fonts-list').val(),
			regularweight: jQueryelement.find('.google-fonts-regularweight-style').val(),
			italicweight: jQueryelement.find('.google-fonts-italicweight-style').val(),
			boldweight: jQueryelement.find('.google-fonts-boldweight-style').val(),
			category: jQueryelement.find('.google-fonts-category').val()
		};

		// Important! Make sure to trigger change event so Customizer knows it has to save the field
		jQueryelement.find('.customize-control-google-font-selection').val(JSON.stringify(selectedFont)).trigger('change');
	}

	/**
	 * TinyMCE Custom Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	jQuery('.customize-control-tinymce-editor').each(function(){
		// Get the toolbar strings that were passed from the PHP Class
		var tinyMCEToolbar1String = _wpCustomizeSettings.controls[jQuery(this).attr('id')].skyrockettinymcetoolbar1;
		var tinyMCEToolbar2String = _wpCustomizeSettings.controls[jQuery(this).attr('id')].skyrockettinymcetoolbar2;
		var tinyMCEMediaButtons = _wpCustomizeSettings.controls[jQuery(this).attr('id')].skyrocketmediabuttons;

		wp.editor.initialize( jQuery(this).attr('id'), {
			tinymce: {
				wpautop: true,
				toolbar1: tinyMCEToolbar1String,
				toolbar2: tinyMCEToolbar2String
			},
			quicktags: true,
			mediaButtons: tinyMCEMediaButtons
		});
	});
	jQuery(document).on( 'tinymce-editor-init', function( event, editor ) {
		editor.on('change', function(e) {
			tinyMCE.triggerSave();
			jQuery('#'+editor.id).trigger('change');
		});
	});

	/**
	 * WP ColorPicker Alpha Color Picker Control
	 *
	 * @author Anthony Hortin <http://maddisondesigns.com>
	 * @license http://www.gnu.org/licenses/gpl-2.0.html
	 * @link https://github.com/maddisondesigns
	 */

	// Manually initialise the wpColorPicker controls so we can add the color picker palette
	jQuery('.wpcolorpicker-alpha-color-picker').each(function( i, obj ) {
		var paletteColors = _wpCustomizeSettings.controls[jQuery(this).attr('id')].colorpickerpalette;
		var options = {
			palettes: paletteColors
		};
		jQuery(obj).wpColorPicker( options );
	} );

	/**
 	 * Alpha Color Picker Custom Control
 	 *
 	 * @author Braad Martin <http://braadmartin.com>
 	 * @license http://www.gnu.org/licenses/gpl-3.0.html
 	 * @link https://github.com/BraadMartin/components/tree/master/customizer/alpha-color-picker
 	 */

	// Loop over each control and transform it into our color picker.
	jQuery( '.alpha-color-control' ).each( function() {

		// Scope the vars.
		var jQuerycontrol, startingColor, paletteInput, showOpacity, defaultColor, palette,
			colorPickerOptions, jQuerycontainer, jQueryalphaSlider, alphaVal, sliderOptions;

		// Store the control instance.
		jQuerycontrol = jQuery( this );

		// Get a clean starting value for the option.
		startingColor = jQuerycontrol.val().replace( /\s+/g, '' );

		// Get some data off the control.
		paletteInput = jQuerycontrol.attr( 'data-palette' );
		showOpacity  = jQuerycontrol.attr( 'data-show-opacity' );
		defaultColor = jQuerycontrol.attr( 'data-default-color' );

		// Process the palette.
		if ( paletteInput.indexOf( '|' ) !== -1 ) {
			palette = paletteInput.split( '|' );
		} else if ( 'false' == paletteInput ) {
			palette = false;
		} else {
			palette = true;
		}

		// Set up the options that we'll pass to wpColorPicker().
		colorPickerOptions = {
			change: function( event, ui ) {
				var key, value, alpha, jQuerytransparency;

				key = jQuerycontrol.attr( 'data-customize-setting-link' );
				value = jQuerycontrol.wpColorPicker( 'color' );

				// Set the opacity value on the slider handle when the default color button is clicked.
				if ( defaultColor == value ) {
					alpha = acp_get_alpha_value_from_color( value );
					jQueryalphaSlider.find( '.ui-slider-handle' ).text( alpha );
				}

				// Send ajax request to wp.customize to trigger the Save action.
				wp.customize( key, function( obj ) {
					obj.set( value );
				});

				jQuerytransparency = jQuerycontainer.find( '.transparency' );

				// Always show the background color of the opacity slider at 100% opacity.
				jQuerytransparency.css( 'background-color', ui.color.toString( 'no-alpha' ) );
			},
			palettes: palette // Use the passed in palette.
		};

		// Create the colorpicker.
		jQuerycontrol.wpColorPicker( colorPickerOptions );

		jQuerycontainer = jQuerycontrol.parents( '.wp-picker-container:first' );

		// Insert our opacity slider.
		jQuery( '<div class="alpha-color-picker-container">' +
				'<div class="min-click-zone click-zone"></div>' +
				'<div class="max-click-zone click-zone"></div>' +
				'<div class="alpha-slider"></div>' +
				'<div class="transparency"></div>' +
			'</div>' ).appendTo( jQuerycontainer.find( '.wp-picker-holder' ) );

		jQueryalphaSlider = jQuerycontainer.find( '.alpha-slider' );

		// If starting value is in format RGBa, grab the alpha channel.
		alphaVal = acp_get_alpha_value_from_color( startingColor );

		// Set up jQuery UI slider() options.
		sliderOptions = {
			create: function( event, ui ) {
				var value = jQuery( this ).slider( 'value' );

				// Set up initial values.
				jQuery( this ).find( '.ui-slider-handle' ).text( value );
				jQuery( this ).siblings( '.transparency ').css( 'background-color', startingColor );
			},
			value: alphaVal,
			range: 'max',
			step: 1,
			min: 0,
			max: 100,
			animate: 300
		};

		// Initialize jQuery UI slider with our options.
		jQueryalphaSlider.slider( sliderOptions );

		// Maybe show the opacity on the handle.
		if ( 'true' == showOpacity ) {
			jQueryalphaSlider.find( '.ui-slider-handle' ).addClass( 'show-opacity' );
		}

		// Bind event handlers for the click zones.
		jQuerycontainer.find( '.min-click-zone' ).on( 'click', function() {
			acp_update_alpha_value_on_color_control( 0, jQuerycontrol, jQueryalphaSlider, true );
		});
		jQuerycontainer.find( '.max-click-zone' ).on( 'click', function() {
			acp_update_alpha_value_on_color_control( 100, jQuerycontrol, jQueryalphaSlider, true );
		});

		// Bind event handler for clicking on a palette color.
		jQuerycontainer.find( '.iris-palette' ).on( 'click', function() {
			var color, alpha;

			color = jQuery( this ).css( 'background-color' );
			alpha = acp_get_alpha_value_from_color( color );

			acp_update_alpha_value_on_alpha_slider( alpha, jQueryalphaSlider );

			// Sometimes Iris doesn't set a perfect background-color on the palette,
			// for example rgba(20, 80, 100, 0.3) becomes rgba(20, 80, 100, 0.298039).
			// To compensante for this we round the opacity value on RGBa colors here
			// and save it a second time to the color picker object.
			if ( alpha != 100 ) {
				color = color.replace( /[^,]+(?=\))/, ( alpha / 100 ).toFixed( 2 ) );
			}

			jQuerycontrol.wpColorPicker( 'color', color );
		});

		// Bind event handler for clicking on the 'Clear' button.
		jQuerycontainer.find( '.button.wp-picker-clear' ).on( 'click', function() {
			var key = jQuerycontrol.attr( 'data-customize-setting-link' );

			// The #fff color is delibrate here. This sets the color picker to white instead of the
			// defult black, which puts the color picker in a better place to visually represent empty.
			jQuerycontrol.wpColorPicker( 'color', '#ffffff' );

			// Set the actual option value to empty string.
			wp.customize( key, function( obj ) {
				obj.set( '' );
			});

			acp_update_alpha_value_on_alpha_slider( 100, jQueryalphaSlider );
		});

		// Bind event handler for clicking on the 'Default' button.
		jQuerycontainer.find( '.button.wp-picker-default' ).on( 'click', function() {
			var alpha = acp_get_alpha_value_from_color( defaultColor );

			acp_update_alpha_value_on_alpha_slider( alpha, jQueryalphaSlider );
		});

		// Bind event handler for typing or pasting into the input.
		jQuerycontrol.on( 'input', function() {
			var value = jQuery( this ).val();
			var alpha = acp_get_alpha_value_from_color( value );

			acp_update_alpha_value_on_alpha_slider( alpha, jQueryalphaSlider );
		});

		// Update all the things when the slider is interacted with.
		jQueryalphaSlider.slider().on( 'slide', function( event, ui ) {
			var alpha = parseFloat( ui.value ) / 100.0;

			acp_update_alpha_value_on_color_control( alpha, jQuerycontrol, jQueryalphaSlider, false );

			// Change value shown on slider handle.
			jQuery( this ).find( '.ui-slider-handle' ).text( ui.value );
		});

	});

	/**
	 * Override the stock color.js toString() method to add support for outputting RGBa or Hex.
	 */
	Color.prototype.toString = function( flag ) {

		// If our no-alpha flag has been passed in, output RGBa value with 100% opacity.
		// This is used to set the background color on the opacity slider during color changes.
		if ( 'no-alpha' == flag ) {
			return this.toCSS( 'rgba', '1' ).replace( /\s+/g, '' );
		}

		// If we have a proper opacity value, output RGBa.
		if ( 1 > this._alpha ) {
			return this.toCSS( 'rgba', this._alpha ).replace( /\s+/g, '' );
		}

		// Proceed with stock color.js hex output.
		var hex = parseInt( this._color, 10 ).toString( 16 );
		if ( this.error ) { return ''; }
		if ( hex.length < 6 ) {
			for ( var i = 6 - hex.length - 1; i >= 0; i-- ) {
				hex = '0' + hex;
			}
		}

		return '#' + hex;
	};

	/**
	 * Given an RGBa, RGB, or hex color value, return the alpha channel value.
	 */
	function acp_get_alpha_value_from_color( value ) {
		var alphaVal;

		// Remove all spaces from the passed in value to help our RGBa regex.
		value = value.replace( / /g, '' );

		if ( value.match( /rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/ ) ) {
			alphaVal = parseFloat( value.match( /rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/ )[1] ).toFixed(2) * 100;
			alphaVal = parseInt( alphaVal );
		} else {
			alphaVal = 100;
		}

		return alphaVal;
	}

	/**
	 * Force update the alpha value of the color picker object and maybe the alpha slider.
	 */
	 function acp_update_alpha_value_on_color_control( alpha, jQuerycontrol, jQueryalphaSlider, update_slider ) {
		var iris, colorPicker, color;

		iris = jQuerycontrol.data( 'a8cIris' );
		colorPicker = jQuerycontrol.data( 'wpWpColorPicker' );

		// Set the alpha value on the Iris object.
		iris._color._alpha = alpha;

		// Store the new color value.
		color = iris._color.toString();

		// Set the value of the input.
		jQuerycontrol.val( color );

		// Update the background color of the color picker.
		colorPicker.toggler.css({
			'background-color': color
		});

		// Maybe update the alpha slider itself.
		if ( update_slider ) {
			acp_update_alpha_value_on_alpha_slider( alpha, jQueryalphaSlider );
		}

		// Update the color value of the color picker object.
		jQuerycontrol.wpColorPicker( 'color', color );
	}

	/**
	 * Update the slider handle position and label.
	 */
	function acp_update_alpha_value_on_alpha_slider( alpha, jQueryalphaSlider ) {
		jQueryalphaSlider.slider( 'value', alpha );
		jQueryalphaSlider.find( '.ui-slider-handle' ).text( alpha.toString() );
	}

});

/**
 * Remove attached events from the Upsell Section to stop panel from being able to open/close
 */
// ( function( jQuery, api ) {
// 	api.sectionConstructor['skyrocket-upsell'] = api.Section.extend( {
//
// 		// Remove events for this type of section.
// 		attachEvents: function () {},
//
// 		// Ensure this type of section is active. Normally, sections without contents aren't visible.
// 		isContextuallyActive: function () {
// 			return true;
// 		}
// 	} );
// } )( jQuery, wp.customize );


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=customizer.js.map