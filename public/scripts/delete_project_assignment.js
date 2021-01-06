/*
Description: Enables the ability to delete a composit entity row.
*/

// // Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Retrieve Current ID
    var projectAssignment = document.querySelector('#modal_delete_project_assignment').value
    var parsed = projectAssignment.replace(/\s*\(.*?\)\s*/g, '');
    parsed = parsed.replace("<--->", "")
    parsed = parsed.split(' ');

    // Loop through split array collecting info
    matches=[]
    for (var i = 0; i < parsed.length; i++) {

        // Remove space character from string
        parsed[i] = parsed[i].replace("&nbsp;", "")

        // Remove whitespace from string
        parsed[i] = parsed[i].replace(/\s/g,'')
        matches.push(parsed[i]);
    }

    // Set variables for payload
    projectID = matches[0]
    developerID = matches[1]

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {projectID: projectID, developerID: developerID}

    //Process Delete Request to Server
    request.open("delete", "/project_assignments/delete_project_assignment", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this project assignment.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});