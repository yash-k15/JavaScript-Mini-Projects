//INIT GitHub
const github = new GitHub;

//INIT UI
const ui = new UI;
//Search Input
const searchUser = document.getElementById('searchUsers');

searchUser.addEventListener('keyup', (e) => {

    //Get input text
    const userText = e.target.value;
    if(userText !== '') {
        //Make a http call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found') {
                //show alert
                ui.showAlert('User not Found', 'alert alert-danger');
            } else {
                //show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        })
    } else {
        //clear profile
        ui.clearProfile();
    }
});