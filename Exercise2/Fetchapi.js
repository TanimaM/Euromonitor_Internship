document.addEventListener('DOMContentLoaded', function () {
    fetch('https://reqres.in/api/users')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        displayUsers(data.data);
    });
    function displayUsers(users) {
        var userListElement = document.getElementById('userList');
        users.forEach(function (user) {
            var userElement = document.createElement('div');
            userElement.className = 'user';
            userElement.innerHTML = "\n                <img src=\"".concat(user.avatar, "\" alt=\"").concat(user.first_name, "\">\n                <div class=\"info\">\n                    <h2>").concat(user.first_name, "</h2>\n                    <p>").concat(user.email, "</p>\n                </div>\n            ");
            userElement.addEventListener('click', function () {
                navigateToUserDetails(user);
            });
            if (userListElement) {
                userListElement.appendChild(userElement);
            }
        });
    }
    function navigateToUserDetails(user) {
        var userDetailsPage = window.open('', '_blank');
        if (userDetailsPage) {
            userDetailsPage.document.write("\n                <html>\n                    <head>\n                        <title>User Details</title>\n                    </head>\n                    <body>\n                        <div class=\"user-details\">\n                            <img src=\"".concat(user.avatar, "\" alt=\"").concat(user.first_name, "\">\n                            <div class=\"info\">\n                                <h2>").concat(user.first_name, " ").concat(user.last_name, "</h2>\n                                <p>").concat(user.email, "</p>\n                            </div>\n                        </div>\n                    </body>\n                </html>\n            "));
        }
    }
});
