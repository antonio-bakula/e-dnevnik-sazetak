
eDnevnikOpciUspjeh('#courses .sectionTitle', 'e-dnevnik-table');

function eDnevnikOpciUspjeh(appendToSelector, tableClass)
{
  // if e-dnevnik-summary allready exists work is allread done
  if ($('#e-dnevnik-summary').length > 0) {
    return;
  }

  var grades = findAllGrades();
  if (!grades.Valid) {
    return;
  }

  var root = document.createElement('div');
  root.id = 'e-dnevnik-summary';
  root.classList.add('e-dnevnik-wrapper');

  var table = generateGradesElements(grades);
  table.classList.add(tableClass);
  root.appendChild(table);

  $(appendToSelector)[0].appendChild(root);
}

function generateGradesTable(grades) 
{
  var factory = new GradeTableFactory(grades);
  factory.ColumnGrade.CssClass = 'txt-num';
  factory.ColumnFinalGrade.CssClass = 'txt-num';
  factory.ExcellenceMarkCssClass = 'excellence-mark';
  return factory.BuildTableElement();
}

function findAllGrades()
{
  var grades = new GradeList();
  var gradesSelect = $('.grades');
  for (var grobj of gradesSelect)
  {
    var sg = getSubjectGrade(grobj);
    grades.addGradeObject(sg);
  }
  return grades;
}

function getSubjectGrade(grel) {
  var subgr = new SubjectGrade();

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
  }
  return subgr;
}  


