// List of users
let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];
// Colorzie the status depend on its value : En validation, Validé, Rejeté
const ColorizeStatusOfUser = (status, el) => {
  if (status === "En validation") {
    el.classList.add("on-validation");
  } else if (status === "Validé") {
    el.classList.add("valide");
  } else if (status === "Rejeté") {
    el.classList.add("rejected");
  } else {
    el.classList.add("");
  }
};

// Display data in a specific format : dd/mm/yyyy
const formatDate = (date) => {
  let day = new Date(date).toLocaleDateString("en-us", { day: "numeric" });
  let month = new Date(date).toLocaleDateString("en-us", { month: "numeric" });
  let year = new Date(date).toLocaleDateString("en-us", { year: "numeric" });
  return `${day}/${month}/${year}`;
};

// delete a user from the list
const deleteRow = (index) => {
  users.splice(index, 1);
  loadTableData(users);
};

// Load data in the table when the page is loaded
const loadTableData = (users) => {
  let tableBody = document.getElementById("tableData");
  let txt = "";
  for (let i = 0; i < users.length; i++) {
    txt =
      txt +
      `<br/><tr><td>${users[i].id}</td>
      <td>${users[i].createdDate}</td><td class="badge statusEl${users[i].id}">${users[i].status}
      </td>
      <td>${users[i].firstName}</td>
      <td>${users[i].lastName}</td>
      <td>${users[i].userName}</td>
      <td>${users[i].registrationNumber}</td>
      <td><button class="button_default" onclick="deleteRow(${i});"> Delete </button></td></tr>`;
  }
  tableBody.innerHTML = txt;

  users.map((user) => {
    let statusEl = document.querySelector(`.statusEl${user.id}`);
    ColorizeStatusOfUser(user.status, statusEl);
  });
};

//Add user to the table
const addTableRow = () => {
  let createdDate = document.getElementById("createdDate").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let userName = document.getElementById("userName").value;
  let status = document.getElementById("status").value;
  let registrationNumber = document.getElementById("registrationNumber").value;

  createdDate = formatDate(createdDate);
  if (
    isEmpty(createdDate) ||
    isEmpty(firstName) ||
    isEmpty(lastName) ||
    isEmpty(userName) ||
    isEmpty(status) ||
    isEmpty(registrationNumber)
  ) {
    alert("Please fill all the fields");
  } else {
    users.push({
      id: generateID(9),
      createdDate: createdDate,
      status: status,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      registrationNumber: registrationNumber,
    });
    loadTableData(users);
  }
};

// Generate a random ID with a specific length for a user
const generateID = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// check if values of input is empty  (we'll )
const isEmpty = (str) => {
  return !str.trim().length;
};

// formatting the created date of the initial data
const formattingCreatedDate = () => {
  users.map((user) => {
    user.createdDate = formatDate(user.createdDate);
    console.log(user.createdDate);
  });
};

// Modal for adding a user to the table (modal is hidden by default)
const activatePopupButton = document.querySelector("#add-user__button");
const commentPopup = document.querySelector(".modal");
const closePopupButton = document.querySelector(".modal__close-button");
const nameInputField =
  document.querySelector(
    "#modal__form--name"
  ); /* I select the field for further autofocus */

closePopupButton.addEventListener("click", function () {
  commentPopup.classList.add("modal-visually-hidden");
  document.querySelector("body").style.overflow = "visible";
});

activatePopupButton.addEventListener("click", function () {
  commentPopup.classList.remove("modal-visually-hidden");
  nameInputField.focus(); /*this line should autofocus the field in question*/
  console.log(nameInputField.autofocus);
  document.querySelector("body").style.overflow = "hidden";
});

// Load data in the table when the page is loaded
formattingCreatedDate();
loadTableData(users);
