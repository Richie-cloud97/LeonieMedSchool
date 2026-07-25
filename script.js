const button = document.getElementById("themeToggle");

button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        button.textContent = "☀️";
    }else{
        button.textContent = "🌙";
    }
});
