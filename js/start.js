
eDnevnikOpciUspjeh('#courses .sectionTitle', 'e-dnevnik-table');

function eDnevnikOpciUspjeh(appendToSelector, tableClass)
{
  // if e-dnevnik-summary allready exists work is allread done
  if ($('#e-dnevnik-summary') != null) {
    return;
  }

  var grades = findAllGrades();
  if (!grades.Valid) {
    return;
  }

  var root = document.createElement('div');
  root.id = 'e-dnevnik-summary';
  root.classList.add('e-dnevnik-wrapper');

  var table = generateGradesTable(grades);
  table.classList.add(tableClass);
  root.appendChild(table);

  $(appendToSelector).appendChild(root);
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
  var gradesSelect = document.querySelectorAll('.grades');
  for (var grobj of gradesSelect)
  {
    var sg = getSubjectGrade(grobj);
    grades.addGradeObject(sg);
  }
  return grades;
}

function getSubjectGrade(grel) {
  var subgr = new SubjectGrade();

  var course = grel.parentElement.previousSibling.querySelector('.course');
  if (course != null) {
    var courseFullDesc = course.innerText;
    var teacher = course.querySelector('.course-info');
    if (teacher != null) {
      var courseDesc = courseFullDesc.replace(teacher.innerText, '').trim();
      subgr.Subject = courseDesc;
    }
  }

  var average = grel.querySelector('.average');
  if (average != null) {
    var avgText = average.textContent.replace(',', '.').replace(/[^\d.-]/g, '');
    subgr.Grade = Number.parseFloat(avgText);    
  }
  return subgr;
}  
