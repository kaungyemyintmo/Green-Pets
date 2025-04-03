const mod = document.getElementById("mod"); 
mod.innerHTML =`
<div class="modal fade" id="tokenModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title text-danger" id="tokenTitle">Unauthorized or session expired.</h5>
    </div>
    <div class="modal-body">
      Please register or log in again.
    </div>
    <div class="modal-footer">
      <a href="login.html" class="btn btn-primary">Login!</a>
    </div>
  </div>
</div>
</div>`;


