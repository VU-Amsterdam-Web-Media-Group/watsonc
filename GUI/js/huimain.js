
 function populateFiles(data) {
  for (var i = 0; i < data.length; i++) {

  	$("#filearea").append("<div class='fileline'>"+data[i].filename+"</div>")
  }
  $( "#tabs" ).tabs();
}

 
function addTableHeaders(table){
    var fields = [
	{'label':'ID', 'alt': 'Worker ID'}, 
	{'label': 'Agr', 'alt': "Worker-worker Agreement"}, 
	{'label': 'Agr. Diff','alt': 'Difference between agreement of worker and average agreement of the job workers'},
	{'label': 'Cos', 'alt' : 'Cosine'}, 
	{'label': 'W-S Score', 'alt' : 'Worker-Sentence Score: Sentence Clarity - Cosine'},     
	{'label': 'Annot/Sent', 'alt': 'Annotations per Sentence'}, 
	{'label': 'Avg. Annot/Sent', 'alt': 'avg(#Annot/Sentence[Set]) - #Annot/Sentence[Worker]'}, 
	{'label': 'Avg. Time', 'alt': 'Average task completion time of the worker (for all the tasks she has completed)'}, 
	{'label': 'Diff Avg. Time', 'alt': 'avg(Task completion time[Set]) - avg(Task Completion Time[Worker])'}, 
	{'label': 'Filters', 'alt': 'Filters that have identified the worker as a possible spammer' }, 
	{'label': 'Channel'}
    ];
   
    var row = document.createElement("tr");
    for(i=0; i<fields.length; i++){	
	var cell = document.createElement("td");	   
	if(fields[i].alt){

	    var elem = document.createElement("span");	   
	    elem.setAttribute('title', fields[i].alt)
	    var cellText = document.createTextNode(fields[i].label); 	
	    elem.appendChild(cellText)
	} else {
	    var elem = document.createTextNode(fields[i].label); 		    
	}
	cell.appendChild(elem)
	row.appendChild(cell)	    
    }
    table.appendChild(row)
} 

 
 function addClassesToFilterRow(){
	 var table = $("#historytable");
	 var headerRows = $(table).find(".tablesorter-headerRow").children();
	 var filterRows =  $(table).find(".tablesorter-filter-row").children();
	 for ( var int = 0; int < headerRows.length; int++) {
		 var hrow =  $(headerRows[int]);
		var classname = $(headerRows[int]).attr('class').split(' ');
		if (classname[0].substring(0,1) == 'c') {
			$(filterRows[int]).addClass(classname[0]);
		}
	}
	 
	 
	 
 }
 
 
 $(function () {
	    $.scrollUp();
	});
 
 
 (function($) {

		$.scrollUp = function (options) {

			// Defaults
			var defaults = {
				scrollName: 'scrollUp', // Element ID
				topDistance: 80, // Distance from top before showing element (px)
				topSpeed: 300, // Speed back to top (ms)
				animation: 'fade', // Fade, slide, none
				animationInSpeed: 200, // Animation in speed (ms)
				animationOutSpeed: 200, // Animation out speed (ms)
				scrollText: 'Back to top', // Text for element
				scrollImg: false, // Set true to use image
				activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			};

			var o = $.extend({}, defaults, options),
				scrollId = '#' + o.scrollName;

			// Create element
			$('<a/>', {
				id: o.scrollName,
				href: '#top',
			//  title: o.scrollText
			}).appendTo('body');

			// If not using an image display text
			if (!o.scrollImg) {
				$(scrollId).text(o.scrollText);
			}

			// Minium CSS to make the magic happen
			$(scrollId).css({'display':'none','position': 'fixed','z-index': '2147483647'});

			// Active point overlay
			if (o.activeOverlay) {
				$("body").append("<div id='"+ o.scrollName +"-active'></div>");
				$(scrollId+"-active").css({ 'position': 'absolute', 'top': o.topDistance+'px', 'width': '100%', 'border-top': '1px dotted '+o.activeOverlay, 'z-index': '2147483647' });
			}

			// Scroll function
			$(window).scroll(function(){	
				switch (o.animation) {
					case "fade":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed) );
						break;
					case "slide":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed) );
						break;
					default:
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0) );
				}
			});

			// To the top
			$(scrollId).click( function(event) {
				$('html, body').animate({scrollTop:0}, o.topSpeed);
				event.preventDefault();
			});

		};
	})(jQuery);

 
 
$(document).ready(function() {
	
	
	$("#statisticsarea").load("/wcs/dataproc/genAnalysisFiles.php");
	$("#preprocessarea").load("/wcs/preprocessing/preprocinterface.php");
		
    $(".changeStatus").change(function(){ 
    	
    alert($("option:selected", this).text() +" " + $(this).closest('tr').children().slice(1,2).text());
    $(this).parent().parent().children("td.cStatus").text($("option:selected", this).val());   
    var selectedstatus = $("option:selected", this).text();
    if(selectedstatus == "Pause")
    	{
    var xmlRequest = $.ajax({
    	type: 'POST',
        data: ({status : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
        url: '/wcs/GUI/statuschange/pause_job.php'
    	});
    	 
    	xmlRequest.done(alert("CrowdFlower Status Changed and Database Updated!"));
    	}
    else if(selectedstatus == "Resume")
    	{
    	 var xmlRequest = $.ajax({
    	    	type: 'POST',
    	        data: ({status : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
    	        url: '/wcs/GUI/statuschange/resume_job.php'
    	    	});
    	    	 
    	 xmlRequest.done(alert("CrowdFlower Status Changed and Database Updated!"));
    	}
    else if(selectedstatus == "Cancel")
	{
    	 var xmlRequest = $.ajax({
    	    	type: 'POST',
    	        data: ({status : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
    	        url: '/wcs/GUI/statuschange/cancel_job.php'
    	    	});
    	    	 
    	 xmlRequest.done(alert("CrowdFlower Status Changed and Database Updated!"));
	}
    else if(selectedstatus == "Delete")
	{
    	 var xmlRequest = $.ajax({
    	    	type: 'POST',
    	        data: ({status : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
    	        url: '/wcs/GUI/statuschange/delete_job.php'
    	    	});
    	    	 
    	 xmlRequest.done(alert("CrowdFlower Status Changed and Database Updated!"));
	}
    
    });
    $( "#tabs" ).tabs();	
    
    $(".takeAction").change(function(){ 
    	
    alert($("option:selected", this).text() +"  " + $(this).closest('tr').children().slice(1,2).text());
    if( $("option:selected", this).val() == "Extract" )
	 {
    	var xmlRequest = $.ajax({
        	type: 'POST',
            data: ({actions : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
            url: '/wcs/GUI/crowdflower/reachextractinfo.php'
        	});
        	 
        	xmlRequest.done(window.location="/wcs/GUI/index.php");
	 }
    else if( $("option:selected", this).val() == "Analyze" )
    {
    	var xmlRequest = $.ajax({
        	type: 'POST',
            data: ({actions : $("option:selected", this).val(), job_id : $(this).closest('tr').children().slice(1,2).text()}),
            url: '/wcs/dataproc/genAnalysisFiles.php'
        	});
        	 
        	xmlRequest.done(window.location="/wcs/GUI/index.php");
    }
    });
    $( "#tabs" ).tabs();	
    
});


	
$(function() {
	
	// Pop-up dialog - Select a file from the server
	 $( "#dialog-confirm" ).dialog({
		  autoOpen: false,
	      resizable: true,
	      height:650,
	      width:1245,
	      modal: true,
	      buttons: {
	          "Confirm": function() {
	          $( this ).dialog( "close" );
	          if ($('input:radio[name=radiofile]:checked', this).closest('tr').children().slice(1, 2).text().length == 0 )
	        	  {
	        	      alert("Please select a file!");
	        	      $( "#dialog-confirm" ).dialog( "open" );
	        	  }
	          else
	        	  {
	          alert($('input:radio[name=radiofile]:checked', this).closest('tr').children().slice(1, 2).text() + ' is selected!');	
	          $( "#fileid" ).val($('input:radio[name=radiofile]:checked', this).closest('tr').children().slice(0, 1).text());
	          $("#sentences" ).val($('input:radio[name=radiofile]:checked', this).closest('tr').children().slice(3, 4).text());
	          $("label[for='uploadedfile']").text($('input:radio[name=radiofile]:checked', this).closest('tr').children().slice(1, 2).text());  
	        	  }
	          },
	        Cancel: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
   $( "#uploadedfile" ).click(function() {
   $( "#dialog-confirm" ).dialog( "open" );
   });
   
  
   
   // Pop-up dialog - Block Spammers
   $( "#dialog-blockspammers" ).dialog({
		  autoOpen: false,
	      resizable: true,
	      height:600,
	      width:1000,
	      modal: true,
	      buttons: {
	          "Block": function() {
	//		$( this ).dialog( "close" );
	
	//	alert("ok");
	//		$('#myform').bind('submit', function (event) {
	//	event.preventDefault();
	//	var reason = document.getElementById("reason").value;
	//	if (reason.length < 25) {
	//		alert("The reason should have at least 25 characters!");
	//		return ;
	//	}
	//	else {
			$.ajax({
				type:'POST',
    				url:'/wcs/crowdflower/blockusers.php',
				datatype: 'text',
    				data: $("#myform").serialize(),
				success: function() {
  //  					window.location.reload(true);
				}
			}).done(function( msg ) {
  				 alert(msg);
			});
	//	}
//	});
//	return false;
      		},
	        Cancel: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
     $(".blockspammers").click(function(){	 
    	 $( "#dialog-blockspammers" ).dialog( "open" );	 
    	 $("#spamblockjobid").val($(this).closest('tr').children().slice(1, 2).text());
    	 var xmlRequest = $.ajax({
  	     type: 'POST',
  	     data: ({'job_id': $("#spamblockjobid").val() }),
  	     url: '/wcs/GUI/services/getSpammers.php'
  	 });
  	 
  	 xmlRequest.done( function(data) {
		 $("#spammerfound").children().remove();
		 var tbl = document.getElementById("spammerfound"); 	    	    	     
	     
	     addTableHeaders(tbl);
	     
	     var obj = jQuery.parseJSON(data);
	     var keys = Object.keys(obj[0]); 

	     for (i = 0; i < obj.length; i++){
		 var row = document.createElement("tr");
		 for (j = 0; j < keys.length; j++){
		     if(j == 0) {
			 var cell = document.createElement("td");
			 var labelValue = obj[i][keys[j]];
                   	 var checkbox = document.createElement("input"); 
                      	 checkbox.setAttribute("type", "checkbox");
                      	 checkbox.setAttribute("name", "workerId[]");
                      	 checkbox.setAttribute("value", labelValue);
                     	 cell.appendChild(checkbox);
			 
		     	 var link = document.createElement("a");
                     	 link.setAttribute('href', '/wcs/analytics/worker.php?worker_id='+labelValue)
                     	 link.setAttribute('target', '_blank')
                      	 link.appendChild(document.createTextNode(labelValue));
			 
			 cell.appendChild(link);
			 cell.appendChild(document.createElement("br")); 	     
			 row.appendChild(cell);		 
		     }
		     else {
			 var cell = document.createElement("td");    

			 var abbr = new Array();
			 abbr['CF'] = 'Content Filter';
			 abbr['NO'] = "None Other";
			 abbr['RT'] = "Repeated text";
			 abbr['RR'] = "Repeated response";
			 abbr['RND'] = "Random text";
			 abbr['NR'] = "No relation";			 			 
			 
			 if(keys[j] == 'filters'){
			     for(k = 0; k < obj[i][keys[j]].length; k++){
				 var filter = document.createElement("span");				 
				 var filterCode = obj[i][keys[j]][k];
				 filter.appendChild(document.createTextNode(filterCode+' '));				 
				 filter.setAttribute('title', abbr[filterCode]);
				 cell.appendChild(filter);
			     }			     
			 } else {

                   	     var cellText = document.createTextNode(obj[i][keys[j]]); 
			     cell.appendChild(cellText);
			 }
                         row.appendChild(cell);
		     }    
		 }
		 tbl.appendChild(row);
	     }
             tbl.setAttribute("border", "1");
  	 }); 
     });
     
   $('#passjobid').click(function() {
   	    
 var arr = [];    

 $(':checkbox[name=job_ids]:checked').each(function()     
 {         
     arr.push(this.value);    
 });    
                     
// $("#testjobidarray").val(arr);
 
/* var xmlRequest = $.ajax({
	   	   type: 'POST',
	       data: ({'job_ids': arr}),
	      // url: '/wcs/set_analytics.php'
	       url: '/wcs/testjobidarrary.php'
	   	});
	   	 
	xmlRequest.done( function(data) {
		   $("#testjobidarray").val(data);
		   // window.location="/wcs/index.php";
		   //window.open('/wcs/set_analytics.php');
		  //analytics = window.open();
		 // analytics.parent.document.body.appendChild(data);
		  //analytics.focus();
		   window.open();
		   document.body.appendChild(data);
	}); 	
 */
 
 
 var StatisticsForm = document.createElement("form");
 StatisticsForm.target = "Analysis";
 StatisticsForm.method = "POST"; 
 StatisticsForm.action = "/wcs/analytics/job.php";
 
 var hiddenInput = document.createElement("input");
 hiddenInput.type = "hidden";
 hiddenInput.name = "postback";
 hiddenInput.value = "1";
 StatisticsForm.appendChild(hiddenInput);
  	 	 
	 for (var i = 0; i < arr.length; i++) {     
	     var StatisticsInput = document.createElement("input");
		 StatisticsInput.type = "hidden";
		 StatisticsInput.name = "job_ids[]";
		 StatisticsInput.value = arr[i];
		 StatisticsForm.appendChild(StatisticsInput);
	 }
	 
 document.body.appendChild(StatisticsForm);

// Statistics = window.open("", "Analysis", "status=0,title='Statistical Analyses',height=700,width=1000,scrollbars=1");

 Statistics = $(this).attr('target', '_blank');
	 
if (Statistics) {
 StatisticsForm.submit();
} else {
 alert('You must allow popups for this Statistics to work.');
}
 
//window.open("http://www.google.com","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");

 });
   
   
  
});



 function PreviewImage (uri, image_name) {

	  imageDialog = $("#dialog-image");
	  imageTag = $('#statisticsimage');

	  // Get statistics_image_id
	  uriParts = uri.split("=");
	  image_id = uriParts[uriParts.length - 1];
	  
	  imageTag.attr('src', uri);

	  imageTag.load(function(){

	    $( "#dialog-image" ).dialog({
		      resizable: true,
              height: 'auto',
		      width: 'auto',
		      modal: true,
		      title: image_name,
		      buttons: {
		          "Download": function() {
		          $( this ).dialog( "close" );
		          window.open("http://crowd-watson.nl/wcs/GUI/services/getFile.php?id="+image_id);
		          },
		        Cancel: function() {
		          $( this ).dialog( "close" );
		        }
		      }
		    });
	  });
	  
	}

 
 
$(document).ready(function() {

	  $('#showimage').click(function(event) {

		event.preventDefault();
		PreviewImage($(this).attr('href'), $(this).attr('value'));

	});

	//$("button").button().click(function(event) {
	//	event.preventDefault();
	//});

	$("div#accordion").accordion({
		collapsible : true,
		heightStyle : "content",
	});

	
	
	$("#hidecolumns").multiselect({

		
		click : function(event, ui) {
			
			if (ui.checked) {
				$("." + ui.value).show();
			} else {
				$("." + ui.value).hide();
			}	
		
	  }
	
	});
	
    $("#hidecolumns").multiselect("checkAll");
    
    $('td.cChannelsPercentage').load(function() {
        var len = $(this).text().length;
        if (len >= 10) {
            $(this).text($(this).text().substring(0, 10));
        }
    });
    
    $('.ui-multiselect-all').click(function() {  
   	 $("#hidecolumns > option").each(function() {
   			$("." + this.value).show();
   		});
   });
    
    
    $('.ui-multiselect-none').click(function() {  
   	 $("#hidecolumns > option").each(function() {
   			$("." + this.value).hide();
   		});
   });
    
});
	
	
	
$(function() {
	
	  // call the tablesorter plugin
	  $("table.tablesorter").tablesorter({
		    theme: 'default',

		    // hidden filter input/selects will resize the columns, so try to minimize the change
		    widthFixed : true,

		    showProcessing: true,
		    headerTemplate : '{content} {icon}',
		    // initialize zebra striping and filter widgets
		    widgets: [ "zebra", "filter", "stickyHeaders", "resizable", 'col-reorder'],
		    

		    // headers: { 5: { sorter: false, filter: false } },

		    widgetOptions : {
		    	
		      zebra: [
			              "ui-widget-content even",
			              "ui-state-default odd"
			         ],
			 
			         
		      // If there are child rows in the table (rows with class name from "cssChildRow" option)
		      // and this option is true and a match is found anywhere in the child row, then it will make that row
		      // visible; default is false
		      filter_childRows : true,

		      // if true, a filter will be added to the top of each table column;
		      // disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
		      // if you set this to false, make sure you perform a search using the second method below
		      filter_columnFilters : true,
		     
		      // css class applied to the table row containing the filters & the inputs within that row
		      filter_cssFilter : 'tablesorter-filter',

		      // add custom filter functions using this option
		      // see the filter widget custom demo for more specifics on how to use this option
		      filter_functions : null,

		      // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
		      // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
		      filter_hideFilters : false,

		      // Set this option to false to make the searches case sensitive
		      filter_ignoreCase : true,

		      // jQuery selector string of an element used to reset the filters
		      filter_reset : 'button.reset',

		      // Delay in milliseconds before the filter widget starts searching; This option prevents searching for
		      // every character while typing and should make searching large tables faster.
		      filter_searchDelay : 300,

		      // Set this option to true to use the filter to find text from the start of the column
		      // So typing in "a" will find "albert" but not "frank", both have a's; default is false
		      filter_startsWith : false,

		      // Filter using parsed content for ALL columns
		      // be careful on using this on date columns as the date is parsed and stored as time in seconds
		      filter_useParsedData : false,
		      
		      resizable_addLastColumn : true,
		      
		      stickyHeaders : 'tablesorter-stickyHeader',
		      
		     
		    }

		  });
	  
	  
	  
	
		
	  addClassesToFilterRow();
	  

	  // External search
	  // buttons set up like this:
	  // <button class="search" data-filter-column="4" data-filter-text="2?%">Saved Search</button>
	 	  $('button.search').click(function(){
	    /*** first method *** data-filter-column="1" data-filter-text="!son"
	      add search value to Discount column (zero based index) input */
	    var filters = $('table.tablesorter').find('input.tablesorter-filter'),
	      col = $(this).data('filter-column'), // zero-based index
	      txt = $(this).data('filter-text'); // text to add to filter

	    filters.val(''); // clear all filters
	    filters.eq(col).val(txt).trigger('search', false);
	   

	    /*** second method ***
	      this method bypasses the filter inputs, so the "filter_columnFilters"
	      option can be set to false (no column filters showing)
	    ******/
	    /*
	    var columns = [];
	    columns[4] = '2?%'; // or define the array this way [ '', '', '', '2?%' ]
	    $('table').trigger('search', [columns]);
	    */

	  });

	});