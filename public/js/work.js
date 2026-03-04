document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("rating-slider");
    const output = document.getElementById("rating-value");

    if (!slider) {
        
        return;
    }

    if (!output) {
      
        return;
    }

    // initial state
    output.textContent = "⭐".repeat(slider.value);

    slider.addEventListener("input", function () {
       
        output.textContent = "⭐".repeat(this.value);
    });

});