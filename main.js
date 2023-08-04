let users = [];

// Function to save users to localStorage
function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

  // Function to load users from localStorage
function loadUsersFromLocalStorage() {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
}

  // Load users from localStorage on page load
users = loadUsersFromLocalStorage();

// Initialize initial users
if (users.length === 0) {
    users = [
        { id: 1, name: 'Emily Young', email: 'emily_y@example.com' },
        { id: 2, name: 'Sophia Harris', email: 'sophia_h@example.com' },
    ];
    saveUsersToLocalStorage();
}


// Function to render user list
function renderUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.setAttribute('data-id', user.id);

        const nameLabel = document.createElement('span');
        nameLabel.classList.add('user-name'); 
        nameLabel.textContent = user.name;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('user-buttons');

        const editButton = createButton('Edit', () => editUser(user.id));
        const removeButton = createButton('Remove', () => removeUser(user.id));
        const viewButton = createButton('View', () => viewUser(user));

        userDiv.appendChild(nameLabel);
        userDiv.appendChild(editButton);
        userDiv.appendChild(removeButton);
        userDiv.appendChild(viewButton);

        userList.appendChild(userDiv);
    });
}

// Helper function to create a button
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

// Function to edit user
function editUser(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        editingUserId = userId;
        const editForm = document.getElementById('edit-form');
        const editHeading = document.getElementById('edit-heading');
        editHeading.textContent = 'Edit User'; // Change the heading text
        editForm.style.display = 'block';
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
    }
}

// Function to remove user
function removeUser(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        const confirmation = confirm(`Are you sure you want to remove ${user.name}?`);
        if (confirmation) {
            const userIndex = users.indexOf(user);
            users.splice(userIndex, 1);
            editingUserId = null; 
            saveUsersToLocalStorage(); 
            renderUserList();
        }
    }
}

// Function to view user details
function viewUser(user) {
    const userDetails = document.getElementById('user-details');
    userDetails.innerHTML = `
        <h2>User Details</h2>
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <button onclick="editUser(${user.id})">Edit</button>
    `;
}

// Function to save edited user or add new user
function saveUser() {
    const newName = document.getElementById('edit-name').value;
    const newEmail = document.getElementById('edit-email').value;

    if (editingUserId !== null) {
        const editedUser = users.find(user => user.id === editingUserId);
        if (editedUser) {
            editedUser.name = newName;
            editedUser.email = newEmail;
            editingUserId = null;
        }
    } else {
        const newUser = {
            id: users.length + 1,
            name: newName,
            email: newEmail
        };
        users.push(newUser);
    }

    const editForm = document.getElementById('edit-form');
    editForm.style.display = 'none';

    saveUsersToLocalStorage(); 
    renderUserList();
}

// Function to show add user form
function showAddUserForm() {
    const editForm = document.getElementById('edit-form');
    const editHeading = document.querySelector('#edit-form h2'); 
    editHeading.textContent = 'Add User'; 
    editForm.style.display = 'block';
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-email').value = '';
    editingUserId = null;
}

renderUserList();
