$(document).ready(function(document) {
  $('#tabs li a:not(:first)').addClass('inactive');
  $('.container').hide();
  $('.container:first').show();

  $('#tabs li a').click(function() {
    var t = $(this).attr('id');
    if ($(this).hasClass('inactive')) { //this is the start of our condition 
      $('#tabs li a').addClass('inactive');
      $(this).removeClass('inactive');

      $('.container').hide();
      $('#' + t + 'C').fadeIn('fast');
    }
  });
  getParam();
});

function parseit() {
  $('tab1C').empty();
  $('tab2C').empty();
  var input = $('#demo_csv').html();
  var data = $.csv.toArrays(input);
  var displayPLP = generateTablePLP(data);
  var displayOSS = generateTableOSS(data);
}

function generateTablePLP(data) {
  var html = '';
  var date = '';
   function filterResults() {
    var date = '';
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
    if (day !== '' && year !== '') {
      date = ' - ' + day + '/' + month + '/' + year
    } else if (day == '' && year !== '') {
      date = ' - ' + year
    } else {
      date = ''
    }
    if (project == "PLP" && year == j && format === "Printed Press") {
      html += '<li class="returned">' + source + ', ' + headline + date + '</li>';
    } else if (project == "PLP" && year == j && format == "Television") {
      html += '<li class="returned">' + source + ', ' + headline + date + '</li>';
    } else if (project == "PLP" && year == j) {
      html += '<li class="returned">' + source + ', <a href="' + url + '">' + headline + '</a> ' + date + '</li>';
    }
  }
  for (j = 2022; j >= 2012; j--) {
    html += '<h2>' + j + '</h2><ul>';
    if (language == "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        filterResults();
      }
    }
    if (language == "SelectLang" && mediatype !== "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][9] == mediatype) {
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
        if (data[i][8] == language && data[i][9] == mediatype) {
          filterResults();
        }
      }
    }
    if (html == '<h2>' + j + '</h2><ul>') {
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

function generateTableOSS(data) {
  var html = '';
  var date = '';
   function filterResults() {
    var date = '';
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
    if (day !== '' && year !== '') {
      date = ' - ' + day + '/' + month + '/' + year
    } else if (day == '' && year !== '') {
      date = ' - ' + year
    } else {
      date = ''
    }
    if (project == "OSS" && year == j && format === "Printed Press") {
      html += '<li class="returned">' + source + ', ' + headline + date + '</li>';
    } else if (project == "OSS" && year == j && format == "Television") {
      html += '<li class="returned">' + source + ', ' + headline + date + '</li>';
    } else if (project == "OSS" && year == j) {
      html += '<li class="returned">' + source + ', <a href="' + url + '">' + headline + '</a> ' + date + '</li>';
    }
  }
  for (j = 2022; j >= 2012; j--) {
    html += '<h2>' + j + '</h2><ul>';
    if (language == "SelectLang" && mediatype == "SelectMed") {
      for (i = 1; i < data.length; i++) {
        filterResults();
      }
    }
    if (language == "SelectLang" && mediatype !== "SelectMed") {
      for (i = 1; i < data.length; i++) {
        if (data[i][9] == mediatype) {
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
        if (data[i][8] == language && data[i][9] == mediatype) {
          filterResults();
        }
      }
    }
    if (html == '<h2>' + j + '</h2><ul>') {
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

document.getElementById("reset").addEventListener("click", resetList);
