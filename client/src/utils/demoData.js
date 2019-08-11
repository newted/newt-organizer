import moment from "moment";

// Create a due date based on the number of days prior to today, so that the
// demo data is always relevant and populates the UI.
const prevDueDater = numDays => {
  return moment()
    .subtract(numDays, "days")
    .format();
};

// Create future due date based on number of days from today.
const futureDueDater = numDays => {
  return moment()
    .add(numDays, "days")
    .format();
};

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
    institution: "Crash Course",
    name: "Crash Course",
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
        dateDue: prevDueDater(20),
        details: "Learn about JSX, a JavaScript syntax extension.",
        inProgress: false,
        name: "Practicing JSX",
        _id: "A001"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: prevDueDater(10),
        details: "The building blocks of React.",
        inProgress: true,
        name: "Function and Class Components",
        _id: "A002"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T23:25:48.205Z",
        dateDue: futureDueDater(1),
        details: "Storing and using component-specific data.",
        inProgress: false,
        name: "Managing State",
        _id: "A003"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T23:25:48.205Z",
        dateDue: futureDueDater(8),
        details: "Handling events with React elements.",
        inProgress: false,
        name: "Handling Events",
        _id: "A010"
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
        completed: true,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: prevDueDater(11),
        inProgress: false,
        name: "Actions and Reducers",
        _id: "A004"
      },
      {
        completed: true,
        dateCreated: "2019-02-20T21:25:55.205Z",
        dateDue: prevDueDater(4),
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
    assignments: [
      {
        completed: true,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: prevDueDater(3),
        details: "John Green investigates the dawn of human civilization.",
        inProgress: false,
        name: "The Agricultural Revolution",
        _id: "A006"
      },
      {
        completed: true,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: prevDueDater(1),
        details:
          "John Green teaches you about one of the largest of the ancient civilizations.",
        inProgress: false,
        name: "Indus Valley Civilization",
        _id: "A007"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: futureDueDater(1),
        details:
          "John presents Mesopotamia, and the early civilizations that arose around the Fertile Crescent",
        inProgress: false,
        name: "Mesopotamia",
        _id: "A008"
      },
      {
        completed: false,
        dateCreated: "2019-02-20T21:25:48.205Z",
        dateDue: futureDueDater(4),
        details: "John covers the long, long history of ancient Egypt.",
        inProgress: false,
        name: "Ancient Egypt",
        _id: "A009"
      }
    ],
    dateCreated: "2019-02-20T21:25:23.916Z",
    name: "Crash Course World History",
    programId: "P002",
    _id: "C003"
  },
  C004: {
    assignments: [
      {
        completed: false,
        dateCreated: "2019-08-08T21:25:48.205Z",
        dateDue: prevDueDater(1),
        details:
          "We're going to take a look at computing's origins, because even though our digital computers are relatively new, the need for computation is not!",
        inProgress: false,
        name: "Early Computing: Crash Course Computer Science #1",
        _id: "A011",
        videoInfo: {
          thumbnails: {
            maxres: {
              url: "https://i.ytimg.com/vi/O5nskjZ_GoI/maxresdefault.jpg",
              width: 1280,
              height: 720
            }
          },
          videoId: "O5nskjZ_GoI",
          channelId: "UCX6b17PVsYBQ0ip5gyeme-Q",
          datePublished: {
            $date: "2017-02-22T22:00:02.000Z"
          }
        },
        hasKnowledgeTracking: true,
        source: "youtube"
      }
    ],
    dateCreated: "2019-08-08T21:25:48.205Z",
    name: "Crash Course Computer Science",
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
