# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Phase 1 - Basic Setup

[x] git init
[x] npm init
[x] npm install express pg
[x] spin up server
[x] serve index.html/scripts/css

Phase 2 - pool setup

[] create a db/table 
[x] create pool module 
[x] require in server.js 
[] make GET route w/ SELECT * FROM tableName 
[] test in browser 
[] GET call on page load

Phase 3 - interface/POST

[] interface for displaying tasks 
[] interface for adding a task 
[] capture user input & send to server via POST 
[] input new message into db in POST route s

Phase 4 - delete

[] display messages on DOM 
[] add a "delete" button with data-id tag 
[] test clieck handler with $( this ).data( 'id' ) 
[] send DELETE req w/ ID 
[] delete message from db 
[] repeat for PUT 