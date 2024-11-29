const fakeMeetingData = [
  {
    meetingId: "meeting1",
    projectId: "project123",
    title: "Team Alignment Meeting",
    description: "Discuss team alignment and project updates.",
    startDate: "2024-12-01",
    moderator: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        companyName: "TechCorp",
        isUser: true,
      },
    ],
    startTime: "10:00 AM",
    timeZone: "UTC+0",
    duration: 60, // in minutes
    ongoing: false,
    enableBreakoutRoom: true,
    meetingPasscode: "123456",
  },
  {
    meetingId: "meeting2",
    projectId: "project124",
    title: "Product Launch Discussion",
    description: "Brainstorm ideas for the upcoming product launch.",
    startDate: "2024-12-02",
    moderator: [
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        companyName: "Innovate Inc",
        isUser: true,
      },
    ],
    startTime: "2:00 PM",
    timeZone: "UTC+1",
    duration: 90,
    ongoing: false,
    enableBreakoutRoom: false,
    meetingPasscode: "654321",
  },
  {
    meetingId: "meeting3",
    projectId: "project125",
    title: "Client Feedback Session",
    description: "Gather client feedback for project improvements.",
    startDate: "2024-12-03",
    moderator: [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        companyName: "Client Solutions",
        isUser: true,
      },
    ],
    startTime: "4:00 PM",
    timeZone: "UTC+3",
    duration: 120,
    ongoing: true,
    enableBreakoutRoom: true,
    meetingPasscode: "987654",
  },
];


const liveMeetingData = [
  {
    meetingId: "meeting1",
    moderator: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        companyName: "TechCorp",
        isUser: true,
      },
    ],
    ongoing: true,
    isStreaming: false,
    participantChat: [
      { sender: "Alice", message: "Hello, Moderator!" },
      { sender: "Moderator", message: "Hello, Alice!" },
    ],
    observerChat: [
      { sender: "Observer1", message: "Looks good!" },
      { sender: "Observer2", message: "Agreed!" },
    ],
    waitingRoom: [
      { firstName: "Bob", lastName: "Smith", email: "bob.smith@example.com" },
    ],
    removedParticipant: [
      { firstName: "Eve", lastName: "Brown", email: "eve.brown@example.com" },
    ],
    participantList: [
      { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com" },
    ],
    observerList: [
      { firstName: "Observer1", lastName: "Williams", email: "observer1@example.com" },
      { firstName: "Observer2", lastName: "Taylor", email: "observer2@example.com" },
    ],
  },
  {
    meetingId: "meeting456",
    moderator: [
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        companyName: "InnovateNow",
        isUser: true,
      },
    ],
    ongoing: false,
    isStreaming: true,
    participantChat: [],
    observerChat: [
      { sender: "ObserverA", message: "Waiting for updates." },
    ],
    waitingRoom: [
      { firstName: "Charlie", lastName: "Adams", email: "charlie.adams@example.com" },
    ],
    removedParticipant: [],
    participantList: [],
    observerList: [
      { firstName: "ObserverA", lastName: "Green", email: "observerA@example.com" },
    ],
  },
];

module.exports = {
  fakeMeetingData, liveMeetingData
}


