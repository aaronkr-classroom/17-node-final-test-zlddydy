/**
 * Add toggle for profileImg edit button.
 */
const profileImgEditButton = document.getElementById("profileImg-edit-button");
const profileImgEdit = document.getElementById("inputProfileImg");

function toggleProfileImgEdit() {
  if (profileImgEdit.classList.contains("show-profileImg-edit")) {
    profileImgEdit.classList.remove("show-profileImg-edit");
  } else {
    profileImgEdit.classList.add("show-profileImg-edit");
  }
}

profileImgEditButton.addEventListener("click", toggleProfileImgEdit);
