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

const courses = {
  P001: {
    individualContent: ["C001", "C002", "C003", "C010"],
    dateCreated: "2019-02-18T21:25:23.916Z",
    name: "React Fundamentals",
    _id: "P001",
    _user: "demouser"
  },
  P002: {
    individualContent: ["C004", "C005"],
    dateCreated: "2019-02-18T21:25:23.916Z",
    name: "Intro to Redux",
    _id: "P002",
    _user: "demouser"
  },
  P003: {
    individualContent: ["C006", "C007", "C008", "C009"],
    dateCreated: "2019-02-19T21:25:23.916Z",
    name: "Crash Course World History",
    _id: "P003",
    _user: "demouser"
  },
  P004: {
    individualContent: ["C011"],
    dateCreated: "2019-02-19T21:25:23.916Z",
    name: "Crash Course Computer Science",
    _id: "P004",
    _user: "demouser"
  }
};

const userContent = {
  C001: {
    isComplete: true,
    dateCreated: "2019-02-19T21:25:48.205Z",
    dateDue: prevDueDater(20),
    description: "Learn about JSX, a JavaScript syntax extension.",
    inProgress: false,
    name: "Practicing JSX",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C001"
  },
  C002: {
    isComplete: false,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: prevDueDater(10),
    description: "The building blocks of React.",
    inProgress: true,
    name: "Function and Class Components",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C002"
  },
  C003: {
    isComplete: false,
    dateCreated: "2019-02-20T23:25:48.205Z",
    dateDue: futureDueDater(2),
    description: "Storing and using component-specific data.",
    inProgress: false,
    name: "Managing State",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C003"
  },
  C010: {
    isComplete: false,
    dateCreated: "2019-02-20T23:25:48.205Z",
    dateDue: futureDueDater(8),
    description: "Handling events with React elements.",
    inProgress: false,
    name: "Handling Events",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C010"
  },
  C004: {
    isComplete: true,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: prevDueDater(11),
    inProgress: false,
    name: "Actions and Reducers",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C004"
  },
  C005: {
    isComplete: true,
    dateCreated: "2019-02-20T21:25:55.205Z",
    dateDue: prevDueDater(4),
    inProgress: false,
    name: "Redux Store",
    courseId: "P001",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C005"
  },
  C006: {
    isComplete: true,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: prevDueDater(3),
    description: "John Green investigates the dawn of human civilization.",
    inProgress: false,
    name: "The Agricultural Revolution",
    courseId: "P002",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C006"
  },
  C007: {
    isComplete: true,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: prevDueDater(1),
    description:
      "John Green teaches you about one of the largest of the ancient civilizations.",
    inProgress: false,
    name: "Indus Valley Civilization",
    courseId: "P002",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C007"
  },
  C008: {
    isComplete: false,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: futureDueDater(2),
    description:
      "John presents Mesopotamia, and the early civilizations that arose around the Fertile Crescent",
    inProgress: false,
    name: "Mesopotamia",
    courseId: "P002",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C008"
  },
  C009: {
    isComplete: false,
    dateCreated: "2019-02-20T21:25:48.205Z",
    dateDue: futureDueDater(4),
    description: "John covers the long, long history of ancient Egypt.",
    inProgress: false,
    name: "Ancient Egypt",
    courseId: "P002",
    sourceInfo: {
      name: "user"
    },
    contentInfo: {},
    _id: "C009"
  },
  C011: {
    isComplete: false,
    partOfCollection: false,
    dateCreated: "2019-08-08T21:25:48.205Z",
    dateDue: futureDueDater(1),
    description:
      "We're going to take a look at computing's origins, because even though our digital computers are relatively new, the need for computation is not!",
    inProgress: false,
    courseId: "P004",
    name: "Early Computing: Crash Course Computer Science #1",
    _id: "C011",
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
    hasQuiz: false,
    contentInfo: {
      primaryTopics: [
        { name: "abacus" },
        { name: "Analytical Engine" },
        { name: "Hollerith Machine" },
        { name: "pre-computed tables" },
        { name: "punch cards" },
        { name: "Step Reckoner" }
      ]
    },
    knowledgeModule: {
      name: "History of Computer Science"
    },
    sourceInfo: {
      name: "YouTube"
    }
  }
};

export function _getCourses() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...courses }), 300);
  });
}

export function _getUserContent() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...userContent }), 300);
  });
}
