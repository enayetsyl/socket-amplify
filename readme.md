# SRS 

## Overview of original project

This project is a section of a large project. Original project has following following features.
When a user will register into the system his role will be External Admin. He will have a dashboard with option to create contacts and projects. Contacts are the person's who will act as Admin/Moderator/Observer in the project created by the external admin. External admin can create contact and then these will be shown under the contact tab in a table. From this table external admin can view/edit/delete a contact.

External Admin can also create project. Inside each project there will be meetings, members, polls and repository.
Inside each project external admin can create, edit, view and delete meetings. From his contact list he can assign one or more person as moderator/admin/observer of the meetings.  Moderator has power to start and end the meeting. Admin and observer can only join the meeting and watch the meeting happening between moderator and participant. Admin and observer can not participate in the meeting through audio and video. They can only send message to the moderator and participate in group chat between moderator and observers.
Inside each project external admin can add members into the project from the contact list.
Inside each project external admin can create, edit, view and delete polls. These polls will be used during the actual meeting. 
Inside each project external admin can create, edit, view and delete media and doc related to the project. These will be stored into repository. They will be used before, during and after the meeting.

Meeting will be take place between participants and moderator. Moderator will start the meeting from the meeting tab by clicking start meeting button. Moderator can start and end meeting, he can engage in one to one chat with participant and observer. He can also engage in group chat with observers and participants. Observer and Admin can join the meeting from the meeting tab by clicking start meeting button. They can not participate in the meeting. They can watch it like video streaming. Observer will also have separate link to join the meeting where he have to put his name, email and a passcode that will be shared with him by external admin earlier. Participant will receive a link from the external admin and have to provide name and email to join the meeting. 

## Overview of the task to do

We have to implement meeting joining (Moderator, observer, participant, admin) functionality, one-to-one and group chat functionality using web socket.

## Detail workflow

Page Meeting Tab- Moderator will click start-meeting button. It will emit a socket message with moderator name, email, role and meetingId. At backend it will check whether a meeting exist with that id. If not it will send error message. If yes it will check whether the ongoing property value is true. if yes will send message that meeting is in progress. If not it will set the ongoing property value to true, save it into db and send message to the frontend that meeting started. If meeting is ongoing or meeting started then at the frontend moderator should be sent to a new route as follows window.open( `/meeting/${meeting._id}?fullName=${encodeURIComponent(fullName)}&role=Moderator`,
 "_blank");

 Page Participant join - The address will be as follows /join-meeting/meetingId. Participant will provide name and email. meetingId will be captured from the params. A message should emit with name, email, role: participant and meetingId. At backend it will check whether a meeting exist with that id. If not it will send error message. If yes it will check whether in the liveMeeting.waitingRoom array consist participant email. If yes it will inform frontend that participant already in the waiting room. If no it will check liveMeeting.participantsList contains participant email. If yes it will inform frontend that participant  already in the meeting. If no it will add the participant name role and email as an object in the liveMeeting.waitingRoom and send message to the frontend.  If frontend receive message that participant is in waiting room then it will push the participant to  router.push(`/participant-waiting-room/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);
If frontend receive message that participant is in the meeting then it should push them to router.push(
`/meeting/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);

Page - Participant waiting room- It will receive two types of message from the backend and accordingly perform following actions. If received message that participant removed from the waiting room then should push to router.push("/remove-participant"); route. If received participant admitted to the meeting then should be pushed to router.push(`/meeting/${params.id}?fullName=${encodeURIComponent(fullName)}&role=${encodeURIComponent(userRole)}`); route. 

Page - Observer join meeting - Observer will put name, email, passcode in the from. We should send following message to the backend name, email, role: Observer, passcode and meetingId from params. Backend will check whether the meeting exist. If not exist send error message. If meeting exist it will check whether email is available in the observerList array. If not push name and role in the observerList array. At the frontend if the meeting streaming is false observer should be pushed to the router.push(`/observer-waiting-room/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Observer`); route. At the frontend if the meeting streaming is true observer should be pushed to the router.push(`/meeting/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Observer`); route.

Page- meeting/meetingId page - In this page following functionality need to implement.
1. If participant is in the waiting room then moderator should see the list. If he accept then at the backend user will be removed from waitingList to the participantList and at the frontend relevant participant should navigate to the meeting from the waiting room. If moderator reject the participant then at the backend the participant information should be removed from the waitingList and at the frontend the participant should be navigate to the remove-participant page from the waiting room. 
2. Moderator can remove a participant from the meeting. In that case participant will navigate to the remove-participant page and at the backend should be removed from the participantList. 
3. Moderator can move a participant from the meeting to the waiting room. In that case participant should be navigate to the participant-waiting-room route and at the backend his information should be transferred from participantList to the waitingList.
4. Moderator can chat with any participant during the meeting.
5. Participant can not chat with other participant during the meeting.
6. Moderator and participant can able to group chat during the meeting.
7. Moderator can click start streaming in that case all the observer from the observer waiting room will be navigate to the meeting route. 
8. Moderator can click stop streaming in that case all the observers in the meeting will be navigate to the observer-waiting room.
9. Moderator and observer can engage in one to one chat and separate group chat independent of participant group chat.


At the backend we will not implement any database. We will use fake data. We have to use web socket for it. We have to maintain clean, reuseable, modular code. We have to apply all the best practice. 
At the frontend the ui will be minimal. Our main focus is the functionality not the ui as UI will be implemented at the main application.
