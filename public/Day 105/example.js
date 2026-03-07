const form = document.getElementById("exampleForm");
const success = document.getElementById("success");

form.addEventListener("submit", function(e){

e.preventDefault();

/* show success message */

success.classList.remove("hidden");

/* reset form */

form.reset();

/* scroll to message */

success.scrollIntoView({
behavior:"smooth"
});

});