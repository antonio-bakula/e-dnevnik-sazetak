
eDnevnikOpciUspjeh('h3', '#courses .sectionTitle', 'e-dnevnik-table');

function eDnevnikOpciUspjeh(htag, appendToSelector, tableClass)
{
  // if e-dnevnik-summary allready exists work is allread done
  if ($('#e-dnevnik-summary').length > 0) {
    return;
  }

  var grades = findAllGrades();
  if (grades.length == 0) {
    return;
  }

  var fg = calculateSumItem(grades);  
  var footerMarkup = addRowToMarkup('tfoot', fg);

  var rowsMarkup = '';
  for (var gr of grades)
  {
    rowsMarkup += addRowToMarkup('tr', gr);
  }

  var markup = 
  `
    <div id="e-dnevnik-summary" class="e-dnevnik-wrapper">
      <table class="${ tableClass }">
        <thead>
          <td>Predmet</td>
          <td class="txt-num">Prosjek</td>
          <td class="txt-num">Ocjena</td>
        </thead>
        ${ footerMarkup }
        <tbody>
          ${ rowsMarkup }
        </tbody>
      </table>
    </div>
  `;
  $(appendToSelector).append(markup);
}

function addRowToMarkup(tag, sg)
{
  var addClass = '';
  if (sg.Grade == 5.00) {
    addClass = ' class="excellence-mark"';
  }
  var row = 
    `
    <${ tag }${ addClass }>
      <td>${ sg.Subject }</td>
      <td class="txt-num">${ sg.Grade.toFixed(2) }</td>
      <td class="txt-num">${ sg.FinalGrade }</td>
    </${ tag }>
    `;
  return row;
}

// function generateGradesElements(grades) {
//   var root = document.createElement('div');
// }

function findAllGrades()
{
  var grades = new Array();
  var gradesSelect = $('.grades');
  for (var grobj of gradesSelect)
  {
    var sg = getSubjectGrades(grobj);
    if (sg.Valid) {
      grades.push(sg);
    }
  }
  return grades;
}

function calculateSumItem(grades)
{
  var fg = new Object();
  fg.Subject = 'Ukupno';
  fg.Grade = grades.map(nn => nn.FinalGrade).reduce((a, b) => a + b, 0) / grades.length;
  fg.FinalGrade = Math.round(fg.Grade);
  return fg;
}

function getSubjectGrades(grel) {
  var subgr = new Object();
  subgr.FinalGrade = NaN;
  subgr.Grade = NaN;
  subgr.Subject = "";

  var course = $(grel).prev().find('.course');
  if (course.length == 0) {
    course = $(grel).parent().prev().find('.course');
  }

  if (course.length > 0) {
    var courseFullDesc = course.text();
    var teacher = course.find('.course-info');
    if (teacher.length > 0) {
      var courseDesc = courseFullDesc.replace(teacher.text(), '').trim();
      subgr.Subject = courseDesc;
    }
  }

  var average = $(grel).find('.average');
  if (average.length > 0) {
    var avgText = average.text().replace(',', '.').replace(/[^\d.-]/g, '');
    subgr.Grade = Number.parseFloat(avgText);    
    subgr.FinalGrade = Math.round(subgr.Grade);
  }
  subgr.Valid = subgr.Subject.length > 0 && !isNaN(subgr.Grade) && !isNaN(subgr.FinalGrade) && subgr.Grade > 0 && subgr.FinalGrade > 0;
  return subgr;
}  

