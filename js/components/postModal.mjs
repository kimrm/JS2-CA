export default function postModal(elementId) {
  const html = `
    <div id="${elementId}" class="modal" tabindex="-1">
        <div class="modal-dialog modal-xl">            
            <div class="modal-content">    
              <div class="modal-header">                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>               
            </div>
        </div>
    </div>
    `;

  const template = document.createElement("template");
  template.innerHTML = html;
  const container = template.content.cloneNode(true);

  return container;
}
