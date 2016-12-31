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