
interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

document.addEventListener('DOMContentLoaded', function () {
    
    fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(data => {
            displayUsers(data.data);
        });

    
    function displayUsers(users: UserData[]) {
        var userListElement = document.getElementById('userList');
        users.forEach(function (user) {
            var userElement = document.createElement('div');
            userElement.className = 'user';
            userElement.innerHTML = `
                <img src="${user.avatar}" alt="${user.first_name}">
                <div class="info">
                    <h2>${user.first_name}</h2>
                    <p>${user.email}</p>
                </div>
            `;

            
            userElement.addEventListener('click', function () {
                navigateToUserDetails(user);
            });

            if (userListElement) {
                userListElement.appendChild(userElement);
            }
        });
    }

    
    function navigateToUserDetails(user: UserData) {
        
        var userDetailsPage = window.open('', '_blank');
        if (userDetailsPage) {
            userDetailsPage.document.write(`
                <html>
                    <head>
                        <title>User Details</title>
                    </head>
                    <body>
                        <div class="user-details">
                            <img src="${user.avatar}" alt="${user.first_name}">
                            <div class="info">
                                <h2>${user.first_name} ${user.last_name}</h2>
                                <p>${user.email}</p>
                            </div>
                        </div>
                    </body>
                </html>
            `);
        }
    }
});
