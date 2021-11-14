jQuery(document).ready(function($) {
$(document).ready(function(document) { 
$.ajax({
	  type: "GET",  
	  url: "https://github.com/maskedsarcastic/shiny-code-repository/blob/master/BNL_News.csv",
	  dataType: "text",       
	  success: function(response)  
	  {
		var test = $('#demo_csv').append(response);
  getParam();
}
});
}); 

function parseit() {
  $('tab1C').empty();
  $('tab2C').empty();
  var input = $('#demo_csv').html();
  var sortByCol2 = function(data) {
    data.sort(function(a,b){
      if (a[2]==b[2]){
      return b[1]-a[1];
    } 
    return b[2]-a[2];
  });
  return data;
}
  var datesort = $.csv.toArrays(input, { onPostParse: sortByCol2 });
  var displayOSS = generateTableOSS(datesort);
  var displayPLP = generateTablePLP(datesort);
}

function generateTableOSS(data) {
  var html = '';
  var date = '';  
  var link = '';      
  function filterResults() {
    var project = data[i][0];
    var day = data[i][1];
    var month = data[i][2];
    var year = data[i][3];
    var headline = data[i][4];
    var url = data[i][5];
    var source = data[i][6];
    var country = data[i][7];
    var lang = data[i][9];
    var format = data[i][9];
    var format2 = data[i][10];
    var broken = data[i][11];
    if (day !== '' && year !== '') {
      date = ' - ' + day + '/' + month + '/' + year
    } else if (day == '' && year !== '') {
      date = ' - ' + year
    } else {
      date = ''
    }
    if (url !== '' && broken !== "Broken"){
      link = ', <a href="' + url + '" target="_blank">' + headline + '</a> ';
    }
    else{
      link = ', ' + headline;
    }
    if (project == "OSS" && year == j) {
      html += '<li class="returned">' + source + link + date + '</li>';
    }
  }
  for (j = 2030; j >= 2000; j--) {
    html += '<h4>' + j + '</h4><ul>';
    if (language == "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        filterResults();
      }
    }
    if (language == "SelectLang" && mediatype !== "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][9] == mediatype || data[i][10] == mediatype) {
          filterResults();
        }
      }
    } else if (language !== "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][8] == language) {
          filterResults();
        }
      }
    } else {
      for (i = 1; i < data.length; i++) {
        if (data[i][8] == language && (data[i][9] == mediatype || data[i][10] == mediatype)) {
          filterResults();
        }
      }
    }
    if (html == '<h4>' + j + '</h4><ul>') {
      html = '';
    }
    html += '</ul>'
    $("#tab1C").append(html);
    html = '';
  }
  if ($('#tab1C').text().length < 1) {
    html = "<p>No results found</p>";
    $("#tab1C").append(html);
  }
}

function generateTablePLP(data) {
  var html = '';
  var date = '';  
  var link = '';      
  function filterResults() {
    var project = data[i][0];
    var day = data[i][1];
    var month = data[i][2];
    var year = data[i][3];
    var headline = data[i][4];
    var url = data[i][5];
    var source = data[i][6];
    var country = data[i][7];
    var lang = data[i][9];
    var format = data[i][9];
    var format2 = data[i][10];
    var broken = data[i][11];
    if (day !== '' && year !== '') {
      date = ' - ' + day + '/' + month + '/' + year
    } else if (day == '' && year !== '') {
      date = ' - ' + year
    } else {
      date = ''
    }
    if (url !== '' && broken !== "Broken"){
      link = ', <a href="' + url + '" target="_blank">' + headline + '</a> ';
    }
    else{
      link = ', ' + headline;
    }
    if (project == "PLP" && year == j) {
      html += '<li class="returned">' + source + link + date + '</li>';
    }
  }
  for (j = 2030; j >= 2000; j--) {
    html += '<h4>' + j + '</h4><ul>';
    if (language == "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        filterResults();
      }
    }
    if (language == "SelectLang" && mediatype !== "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][9] == mediatype || data[i][10] == mediatype) {
          filterResults();
        }
      }
    } else if (language !== "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][8] == language) {
          filterResults();
        }
      }
    } else {
      for (i = 1; i < data.length; i++) {
        if (data[i][8] == language && (data[i][9] == mediatype || data[i][10] == mediatype)) {
          filterResults();
        }
      }
    }
    if (html == '<h4>' + j + '</h4><ul>') {
      html = '';
    }
    html += '</ul>'
    $("#tab2C").append(html);
    html = '';
  }
  if ($('#tab2C').text().length < 1) {
    html = "<p>No results found</p>";
    $("#tab2C").append(html);
  }
}


function getParam() {
  $("#tab1C").empty();
  $("#tab2C").empty();
  language = '';
  mediatype = '';
  
  $("select[name='mediatype'] option:selected").each(function() {
    mediatype = $(this).attr('value');
  });
  $("select[name='language'] option:selected").each(function() {
    language = $(this).attr('value');
  });
  parseit();
}

function resetList(){
  $("select[name='mediatype']").val("SelectMed");
  $("select[name='language']").val("SelectLang");      
getParam();
}

$('#mediatype').on('change', function() {
getParam();
});

$('#language').on('change', function() {
getParam();
});

$(document).on("click", "#reset",function() {
  resetList();
});
});
