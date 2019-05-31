export const assignmentInputFields = [
  {
    label: "Name",
    name: "name",
    required: true
  },
  {
    label: "Details",
    name: "details",
    required: false
  },
  {
    label: "Due Date",
    name: "dateDue",
    required: true,
    type: "datepicker"
  }
];

export const youtubeInputFields = [
  {
    label: "Video Link",
    name: "videoLink",
    required: true
  }
]

export const assignmentTableFields = {
  Name: {
    name: "name",
    width: "35%"
  },
  Details: {
    name: "details",
    width: "40%"
  },
  "Due Date": {
    name: "dateDue",
    width: "20%"
  },
  Status: {
    name: "status",
    width: "5%"
  }
};
