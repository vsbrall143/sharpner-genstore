// Function to handle form submission



function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page

  // Retrieve values from input fields
  const item = document.getElementById('item').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const quantity = document.getElementById('quantity').value;
  
  // Check if the input fields are not empty
  if (item && description && price) {
    // Create a user object
    const userDetails = {
      item: item,
      description: description,
      price: price,
      quantity: quantity,
    };

    axios.post("http://localhost:2000/user/add-user", userDetails)
      .then((res) => {
        console.log(res);
        // Display the updated users list
        displayUsers();
      })
      .catch((err) => console.log(err));
    
    // Clear input fields after submission
    document.getElementById('item').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
  }
}

// Function to display users on the page
function displayUsers() {
  // Get the user list element (ul) from the DOM
  const userList = document.getElementById('user-list');

  // Clear the existing list to avoid duplication
  userList.innerHTML = '';

  axios.get("http://localhost:2000/user/get-users")
    .then((res) => {
      console.log(res.data.allUsers);
      for (let i = 0; i < res.data.allUsers.length; i++) {
        const user = res.data.allUsers[i];
        // console.log(res);
        
        // Create a list item for each user
        const listItem = document.createElement('li');
        listItem.textContent = ` item: ${user.item}, description: ${user.description}, price: ${user.price}, quantity: ${user.quantity}`;


        // Create an edit button
        const buy_1 = document.createElement('button');
        const buy_2 = document.createElement('button');
        const buy_3 = document.createElement('button');
        buy_1.textContent = 'buy_1';
        buy_2.textContent = 'buy_2';
        buy_3.textContent = 'buy_3';
        buy_1.style.marginLeft = '10px';
        buy_2.style.marginLeft = '10px';
        buy_3.style.marginLeft = '10px';
        // Add event listener to edit the user when the button is clicked
        buy_1.addEventListener('click', function() {
          axios.put(`http://localhost:2000/user/buy_1/${user.id}/1`)
            .then((res) => {
              console.log(res);
              location.reload();
            })
            .catch((err) => console.log(err));
        })
        buy_2.addEventListener('click', function() {
          axios.put(`http://localhost:2000/user/buy_2/${user.id}/2`)
          .then((res) => {
            console.log(res);
            location.reload();
          })
          .catch((err)=>console.log(err));
        })
        buy_3.addEventListener('click', function() {
          axios.put(`http://localhost:2000/user/buy_3/${user.id}/3`)
          .then((res) => {
            console.log(res);
            location.reload();
          })
          .catch((err)=>console.log(err));
        })
        // Append the delete and edit buttons to the list item
        listItem.appendChild(buy_1);
        listItem.appendChild(buy_2);
        listItem.appendChild(buy_3);
        // Append the list item to the ul
        userList.appendChild(listItem);
      }
    })
    .catch((err) => console.log(err));
}

// Initialize the users list display when the page loads
window.onload = displayUsers;
displayUsers();


// const userroutes = require('./routes/user');

// app.use(userroutes);