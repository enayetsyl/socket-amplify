# Software Requirements Specification (SRS)

## Overview of the Original Project
This project is a module within a larger system with the following key features:

### Roles and Responsibilities
1. External Admin

- Dashboard Features:
  - Manage contacts and projects.
- Contacts:
  - Create, view, edit, and delete contacts.
  - Contacts represent users assigned roles such as Admin, Moderator, or Observer within projects.

2. Projects
Each project consists of:

- Meetings:
  - Manage meetings (create, edit, view, delete).
  - Assign roles (Moderator, Admin, Observer) to contacts.
  - Roles in meetings:
    - Moderator: Controls the meeting, starts/stops the meeting, and engages in chats.
    - Admin/Observer: View-only role. Can participate in chat but not audio/video.
    - Participant: Engages directly with the Moderator via audio/video.
- Members:
  - Add contacts to projects.
- Polls:
  - Manage polls for use during meetings.
- Repository:
  - Store and manage project-related media/documents.

3. Meeting Roles and Interaction

- Moderators can:
  - Start/stop meetings.
  - Chat one-to-one or in groups.
- Observers/Admins can:
  - Watch the meeting like a livestream and chat with the Moderator.
- Participants can:
  - Join meetings via links provided by the External Admin.
  - Engage in audio/video interactions with the Moderator.

## Task Overview
### Features to Implement
1. Meeting Joining:

- Roles: Moderator, Participant, Observer, and Admin.
- Authentication: Ensure proper validation of links, emails, and passcodes for joining.

2. WebSocket Integration:

- Enable real-time functionalities:
  - One-to-One Chat: Between Moderator and Participants/Observers.
  - Group Chat: Independent group chats for Participants and Observers.

3. Backend Architecture:

- Simulate backend functionality using fake data (no database).
- Maintain clean, reusable, and modular code.
- Follow best practices.

4. Frontend:

- Minimal UI to focus on core functionality.

## Detailed Workflow

### Meeting Tab (Moderator Starts Meeting)
1. Moderator clicks "Start Meeting."
2. Emit a WebSocket message with:
  - Moderator details (name, email, role).
  - meetingId.
3. Backend:
- Check if the meeting exists:
    - If not: Send an error message.
    - If ongoing: Send "meeting in progress" message.
    - If valid: Mark meeting as ongoing, save the state, and notify the frontend.

4. Frontend:
- Redirect Moderator to:
```javascript
window.open(`/meeting/${meeting._id}?fullName=${encodeURIComponent(fullName)}&role=Moderator`, "_blank");
```

### Participant Joins Meeting

1. Participant accesses: /join-meeting/:meetingId.
2. Enters name and email.
3. Emit a WebSocket message with:
  - Name, email, role: Participant.
  - meetingId from params.
4. Backend:
- Validate meeting existence:
  - If not: Send an error message.
  - If in waiting room: Notify frontend.
  - If already in meeting: Notify frontend.
  - If valid: Add the Participant to the waitingRoom.
5. Frontend:
  - Waiting Room:
```javascript
router.push(`/participant-waiting-room/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);
```
  - In Meeting:
```javascript
router.push(`/meeting/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Participant`);
```
### Participant Waiting Room

1. Listen for backend messages:
  - Removed from waiting room: Redirect to /remove-participant.
  - Admitted to meeting: Redirect to:
```javascript
router.push(`/meeting/${params.id}?fullName=${encodeURIComponent(fullName)}&role=${encodeURIComponent(userRole)}`);
```
### Observer Joins Meeting

1. Observer accesses /join-meeting/:meetingId.
2. Enters name, email, and passcode.
3. Emit a WebSocket message with:
  - Name, email, role: Observer.
  - Passcode and meetingId.
4. Backend:
  - Validate meeting and observer details:
    - If invalid: Send error message.
    - If valid: Add Observer to observerList.
5. Frontend:
  - Not Streaming: Redirect to:
```javascript
router.push(`/observer-waiting-room/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Observer`);
```
  - Streaming: Redirect to:
```javascript
router.push(`/meeting/${meetingId}?fullName=${encodeURIComponent(formData.fullName)}&role=Observer`);
```
### Meeting Page (/meeting/:meetingId)
Implement the following features:

1. Participant Waiting Room:
  - Moderator can accept/reject participants:
    - Accept: Move Participant to participantList and redirect them to the meeting.
    - Reject: Remove Participant from waitingRoom and redirect to /remove-participant.
2. Remove Participants:
  - Moderator removes a Participant:
    - Remove from participantList.
    - Redirect to /remove-participant.
3. Move Participants to Waiting Room:
  - Moderator moves a Participant:
    - Transfer from participantList to waitingRoom.
    - Redirect to /participant-waiting-room.
4. Chats:
  - One-to-one chats between Moderator and Participants.
  - Separate group chats:
    - Participants-only group chat.
    - Observers-only group chat.
5. Streaming Controls:
  - Start Streaming: Move all Observers from observer-waiting-room to the meeting.
  - Stop Streaming: Move all Observers back to the observer-waiting-room.
6. Observer Chats:
Enable one-to-one and group chats for Observers (separate from Participant chats).

## Best Practices

1. Backend:

  - Use WebSocket for all real-time communications.
  - Simulate data handling (no database).

2. Frontend:

- Focus on functionality over UI aesthetics.
- Modular and reusable codebase.

3. Code Quality:

- Ensure clean and maintainable code.
- Follow best practices for WebSocket integration and event handling.
