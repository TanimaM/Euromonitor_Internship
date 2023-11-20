// app.ts
import { UserData } from './iFetch';

class UserApp {
    userListElement: HTMLElement | null;

    constructor() {
        this.userListElement = document.getElementById('userList');
        this.init();
    }

    async fetchData(url: string): Promise<UserData[]> {
        const response = await fetch(url);
        const data = await response.json();
        return data.data || [];
    }

    displayUsers(users: UserData[]): void {
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user';
            userElement.innerHTML = `
                <img src="${user.avatar}" alt="${user.first_name}">
                <div class="info">
                    <h2>${user.first_name}</h2>
                    <p>${user.email}</p>
                </div>
            `;

            userElement.addEventListener('click', () => {
                this.navigateToUserDetails(user);
            });

            if (this.userListElement) {
                this.userListElement.appendChild(userElement);
            }
        });
    }

    navigateToUserDetails(user: UserData): void {
        const userDetailsPage = window.open('', '_blank');
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
        } else {
            console.error('Error opening user details page. Make sure pop-ups are allowed.');
        }
    }

    async init(): Promise<void> {
        try {
            const users = await this.fetchData('https://reqres.in/api/users');
            this.displayUsers(users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UserApp();
});
