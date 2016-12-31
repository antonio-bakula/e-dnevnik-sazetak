class SubjectGrade {
  constructor(subject, grade) {
    this.Subject = "";
    if (arguments.length > 0) {
      this.Subject = subject;
    }
    this.Grade = NaN;
    if (arguments.length > 1) {
      this.Grade = grade;
    }
  }

  get Valid() {
    return this.Subject.length > 0 && !isNaN(this.Grade) && !isNaN(this.FinalGrade) && this.Grade > 0 && this.FinalGrade > 0;;
  }

  get FinalGrade () {
    if (isNaN(this.Grade)) {
      return NaN;
    } else {
      return Math.round(this.Grade);
    }
  }

}

class GradeList {
  constructor() {
    this._grades = new Array(0);
    this._sum = new SubjectGrade('Ukupno');
  }

  get Sum() {
    this._sum.Grade = this._grades.map(nn => nn.FinalGrade).reduce((a, b) => a + b, 0) / this._grades.length;
    return this._sum;
  }

  get Items() {
    return this._grades;
  }

  get Valid() {
    return this._grades.length > 0;
  }

  addGrade(subject, gradeAmount) {
    var gr = new SubjectGrade(subject, gradeAmount);
    return addGradeObject(gr);
  }

  addGradeObject(gradeObject) {
    if (gradeObject.Valid) {
      this._grades.push(gradeObject);
    }
    return gradeObject.Valid;
  }

}

class GradeTableFactory {
  constructor (gradeList) {
    this._gradeList = null;
    if (arguments.length > 0) {
      this._gradeList = gradeList;
    } else {
      this._gradeList = new GradeList();
    }
    
    this.ColumnSubject = new GradeTableColumnInfo('Predmet');
    this.ColumnGrade = new GradeTableColumnInfo('Prosjek');
    this.ColumnFinalGrade = new GradeTableColumnInfo('Ocjena');
    this.ExcellenceMarkCssClass = '';
  }


  get GradeList() {
    return this._gradeList;
  }


  BuildTableElement() {
    var tableElement = document.createElement('table');
    
    var th = this._getTableHeader();
    tableElement.appendChild(th);

    var tf = this._createGradeTableRow(this.GradeList.Sum, 'tfoot');
    tableElement.appendChild(tf);

    var tbody = document.createElement('tbody');
    for (var gr of this.GradeList.Items)
    {
      var tr = this._createGradeTableRow(gr);
      tbody.appendChild(tr);
    }
    tableElement.appendChild(tbody);

    return tableElement;
  }

  _getTableHeader() {
    var th = document.createElement('thead');
    
    var tds = this._getHeaderTableCell(this.ColumnSubject);
    th.appendChild(tds);
    
    var tdg = this._getHeaderTableCell(this.ColumnGrade);
    th.appendChild(tdg);

    var tdf = this._getHeaderTableCell(this.ColumnFinalGrade);
    th.appendChild(tdf);

    return th;
  }

  _getHeaderTableCell(columnInfo) {
    return this._createTableData(columnInfo.Title, columnInfo.CssClass);
  }

  _createTableData(textContent, cssClass) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(textContent));

    if (cssClass) {
      td.classList.add(cssClass);
    }
    return td;
  }

  _createGradeTableRow(grade, tag = 'tr') {
    var tr = document.createElement(tag);
    
    var tds = this._createTableData(grade.Subject, this.ColumnSubject.CssClass);
    tr.appendChild(tds);

    var tdg = this._createTableData(grade.Grade.toFixed(2), this.ColumnGrade.CssClass);
    tr.appendChild(tdg);

    var tdf = this._createTableData(grade.FinalGrade.toString(), this.ColumnFinalGrade.CssClass);
    tr.appendChild(tdf);

    if (this.ExcellenceMarkCssClass && grade.Grade == 5.00) {
      tr.classList.add(this.ExcellenceMarkCssClass);
    }

    return tr;
  }

}

class GradeTableColumnInfo {
  constructor(title, cssClass) {
    this.Title = "";
    this.CssClass = "";
    if (arguments.length > 0) {
      this.Title = title;
    }
    if (arguments.length  > 1) {
      this.CssClass = cssClass;
    }
  }
}