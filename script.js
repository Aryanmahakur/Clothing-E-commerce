let hide = document.getElementById("hidden");
// login display
document.getElementById("loginicon").addEventListener('click', () => {
    hide.style.display = 'block'; // Enclose 'block' in quotes
});
//login hidden
document.getElementById("closebtn").addEventListener("click",()=>{
    hide.style.display='none';
});
document.getElementById("hambericon").addEventListener("click", () => {
    let links = document.getElementById("links");
    links.classList.toggle('active');
    console.log(links.classList); // Check if the class is being toggled
});
