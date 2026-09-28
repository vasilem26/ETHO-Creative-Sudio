(function(){
  var form = document.getElementById("form");
  var err = document.getElementById("err");
  var ok = document.getElementById("ok");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var valid = name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      err.hidden = !!valid;
      if(!valid){ return; }
      /* Connect this to a backend or a form service (e.g. Formspree) to receive enquiries by email. */
      ok.classList.add("show");
      form.reset();
    });
  }
  var yr = document.getElementById("yr");
  if(yr){ yr.textContent = new Date().getFullYear(); }

  var moreBtn = document.getElementById("projMoreBtn");
  if(moreBtn){
    moreBtn.addEventListener("click", function(){
      var grid = document.getElementById("projGrid");
      var hiddenTiles = grid.querySelectorAll(".tile[hidden]");
      if(hiddenTiles.length){
        hiddenTiles.forEach(function(t,i){
          t.removeAttribute("hidden");
          t.classList.add("tile-anim");
          t.style.transitionDelay = (i*90)+"ms";
        });
        // force a reflow so the browser registers the starting state before animating in
        void grid.offsetWidth;
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){
            hiddenTiles.forEach(function(t){ t.classList.add("show"); });
          });
        });
        moreBtn.textContent = "View fewer";
        moreBtn.setAttribute("aria-expanded","true");
      } else {
        var extras = [];
        grid.querySelectorAll(".tile").forEach(function(t,i){ if(i>2){ extras.push(t); } });
        extras.forEach(function(t,i){
          t.style.transitionDelay = (i*40)+"ms";
          t.classList.remove("show");
        });
        setTimeout(function(){
          extras.forEach(function(t){
            t.setAttribute("hidden","");
            t.classList.remove("tile-anim");
            t.style.transitionDelay = "";
          });
        }, 420);
        moreBtn.textContent = "View more";
        moreBtn.setAttribute("aria-expanded","false");
        grid.scrollIntoView({behavior:"smooth", block:"start"});
      }
    });
  }
})();
