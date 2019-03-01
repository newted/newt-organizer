const programs = {
  P001: {
    courses: ["C001", "C002"],
    dateCreated: "2019-02-18T21:25:23.916Z",
    institution: "Udacity",
    name: "React Nanodegree",
    _id: "P001",
    _user: "demouser"
  },
  P002: {
    courses: ["C003", "C004"],
    dateCreated: "2019-02-19T21:25:23.916Z",
    institution: "British Columbia Institute of Technology",
    name: "Business Intelligence I",
    _id: "P002",
    _user: "demouser"
  }
};

const courses = {
  C001: {
    assignments: [
      {
        completed: true,
        dateCreated: "2019-02-19T21:25:48.205Z",
        dateDue: "2019-02-21T08:00:00.000Z",
        details: "Learn about JSX, a JavaScript syntax extension.",
        inProgress: false,
        name: "Practicing JSX",
        _id: "A001"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: "2019-02-26T08:00:00.000Z",
        details: "The building blocks of React.",
        inProgress: true,
        name: "Function and Class Components",
        _id: "A002"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T23:25:48.205Z",
        dateDue: "2019-02-27T08:00:00.000Z",
        details: "Storing and using component-specific data.",
        inProgress: false,
        name: "Managing State",
        _id: "A003"
      }
    ],
    dataCreated: "2019-02-19T21:25:23.916Z",
    name: "React Fundamentals",
    programId: "P001",
    _id: "C001"
  },
  C002: {
    assignments: [
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: "2019-03-08T08:00:00.000Z",
        inProgress: false,
        name: "Actions and Reducers",
        _id: "A004"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:55.205Z",
        dateDue: "2019-03-08T08:00:00.000Z",
        inProgress: false,
        name: "Redux Store",
        _id: "A005"
      }
    ],
    dataCreated: "2019-02-20T21:25:23.916Z",
    name: "Intro to Redux",
    programId: "P001",
    _id: "C002"
  },
  C003: {
    assignments: [],
    dateCreated: "2019-02-20T21:25:23.916Z",
    name: "Fundamentals of Data Visualization",
    programId: "P002",
    _id: "C003"
  },
  C004: {
    assignments: [],
    dateCreated: "2019-02-20T21:35:23.916Z",
    name: "Intro to Tableau",
    programId: "P002",
    _id: "C004"
  }
};

export function _getPrograms() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...programs }), 300);
  });
}

export function _getCourses() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...courses }), 300);
  });
}
