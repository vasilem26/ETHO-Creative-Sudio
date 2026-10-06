(function(){
  var form = document.getElementById("form");
  var err = document.getElementById("err");
  var sendErr = document.getElementById("sendErr");
  var ok = document.getElementById("ok");
  var submitBtn = document.getElementById("submitBtn");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var valid = name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      err.hidden = !!valid;
      if(!valid){ return; }

      sendErr.hidden = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function(response){
        if(response.ok){
          ok.classList.add("show");
          form.reset();
        } else {
          sendErr.hidden = false;
        }
      }).catch(function(){
        sendErr.hidden = false;
      }).finally(function(){
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
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

(function(){
  var grid=document.getElementById("projGrid");
  if(!grid){ return; }
  var tiles=[].slice.call(grid.querySelectorAll(".tile"));
  var lb=document.createElement("div");
  lb.className="lb"; lb.hidden=true;
  lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true"); lb.setAttribute("aria-label","Photo viewer");
  lb.innerHTML='<button class="lb-x" type="button" aria-label="Close">&times;</button><button class="lb-prev" type="button" aria-label="Previous photo">&lsaquo;</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-next" type="button" aria-label="Next photo">&rsaquo;</button>';
  document.body.appendChild(lb);
  var img=lb.querySelector("img"), cap=lb.querySelector("figcaption"), cur=0, startX=0;
  function show(i){
    cur=(i+tiles.length)%tiles.length;
    var t=tiles[cur], im=t.querySelector("img");
    img.src=im.getAttribute("src"); img.alt=im.alt;
    cap.textContent=t.querySelector("h3").textContent;
  }
  function open(i){ show(i); lb.hidden=false; document.body.style.overflow="hidden"; lb.querySelector(".lb-x").focus(); }
  function close(){ lb.hidden=true; document.body.style.overflow=""; }
  tiles.forEach(function(t,i){ t.addEventListener("click",function(e){ e.preventDefault(); open(i); }); });
  lb.addEventListener("click",function(e){ if(e.target===lb||e.target.tagName==="FIGURE"){ close(); } });
  lb.querySelector(".lb-x").addEventListener("click",close);
  lb.querySelector(".lb-prev").addEventListener("click",function(){ show(cur-1); });
  lb.querySelector(".lb-next").addEventListener("click",function(){ show(cur+1); });
  document.addEventListener("keydown",function(e){
    if(lb.hidden){ return; }
    if(e.key==="Escape"){ close(); }
    if(e.key==="ArrowLeft"){ show(cur-1); }
    if(e.key==="ArrowRight"){ show(cur+1); }
  });
  lb.addEventListener("touchstart",function(e){ startX=e.changedTouches[0].clientX; },{passive:true});
  lb.addEventListener("touchend",function(e){
    var dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>50){ show(cur+(dx<0?1:-1)); }
  },{passive:true});
})();
